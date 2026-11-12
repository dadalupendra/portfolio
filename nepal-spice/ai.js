/* ============================================================
   Nepal Spice — AI Concierge  (real menu data + local Ollama)
   ------------------------------------------------------------
   * Primary brain : Ollama running on THIS machine
                     http://localhost:11434  (free, no API key)
   * Backup brain  : a deterministic "smart search" over the REAL
                     menu (data.js), so the feature still answers
                     correctly when Ollama is not running.
   * The model only ever SEES a compact snapshot of real data
     (dishes, prices, veg/spice/allergens, the live cart, the
     restaurant rules) and answers in a strict JSON contract,
     which we VALIDATE before touching the shop.
   * Secrets: an optional API key (only needed for a hosted
     OpenAI-compatible relay, never for local Ollama) is stored
     in localStorage by the user themselves, masked in the UI,
     and sent only to the configured host. Nothing is hardcoded.
   ============================================================ */
(function () {
  "use strict";
  var $ = function (s) { return document.querySelector(s); };
  var LS = "nepalSpiceAI";

  /* ---------------- configuration ---------------- */
  function defaults() {
    return { host: "http://localhost:11434", model: "llama3.2", key: "", api: "auto" };
  }
  function cfg() {
    try {
      var c = JSON.parse(localStorage.getItem(LS) || "null") || {};
      var d = defaults();
      return {
        host:  typeof c.host === "string" && c.host ? c.host.replace(/\/+$/, "") : d.host,
        model: typeof c.model === "string" && c.model ? c.model : d.model,
        key:   typeof c.key === "string" ? c.key : "",
        api:   (c.api === "ollama" || c.api === "openai") ? c.api : "auto"
      };
    } catch (e) { return defaults(); }
  }
  function saveCfg(c) { try { localStorage.setItem(LS, JSON.stringify(c)); } catch (e) {} }

  /* ---------------- real-data snapshot for the prompt ---------------- */
  function menuSnapshot() {
    return (window.NSApp.foods() || []).map(function (f) {
      return {
        id: f.id, en: f.name.en, ja: f.name.ja, ne: f.name.ne,
        price: f.price, veg: !!f.veg, spice: f.spice,
        allergens: f.allergens || [], tags: f.tags || [], rating: f.rating
      };
    });
  }
  function systemPrompt() {
    var A = window.NSApp, R = window.RESTAURANT;
    var lines = [
      "You are the Nepal Spice AI concierge for a Nepali restaurant demo in Japan.",
      "Answer using ONLY the real data below. Never invent dishes, prices or facts.",
      "Menu (JSON): " + JSON.stringify(menuSnapshot()),
      "Live cart (JSON): " + JSON.stringify(A.cart()),
      "Rules: takeout tax " + (R.taxTakeout * 100) + "%, dine-in " + (R.taxDineIn * 100) +
        "%, delivery ¥" + R.deliveryFee + " (free from ¥" + R.freeDeliveryFrom + "), ETA " +
        R.etaMin + "-" + R.etaMax + " min. Currency JPY.",
      "Reply language: match the user's message language.",
      "Reply with ONLY this JSON: {\"reply\": string, \"actions\": [ ... ]} where each action is one of:",
      " {\"op\":\"add\",\"id\":\"<dish id>\",\"qty\":1}  {\"op\":\"search\",\"q\":\"...\"}",
      " {\"op\":\"veg\",\"on\":true|false}  {\"op\":\"cat\",\"id\":\"momo|rice|noodle|snack|drink|all\"}",
      "Use at most 3 actions. If nothing should change, \"actions\": [].",
      "Keep \"reply\" under 90 words and mention real prices like ¥780."
    ];
    return lines.join("\n");
  }

  /* ---------------- Ollama transport ---------------- */
  function headers(c) {
    var h = { "Content-Type": "application/json" };
    /* Only for hosted OpenAI-compatible relays. Local Ollama ignores auth. */
    if (c.key) h["Authorization"] = "Bearer " + c.key;
    return h;
  }
  /* One ping that also detects which API the host speaks:
       "ollama"  -> GET /api/tags
       "openai"  -> GET /v1/models   (any OpenAI-compatible relay:
                    OpenRouter, Groq, LM Studio, vLLM, a university proxy…)  */
  function ping(c, ms) {
    var ctl = new AbortController();
    var t = setTimeout(function () { ctl.abort(); }, ms || 2500);
    var get = function (url) {
      return fetch(url, { signal: ctl.signal, headers: headers(c) })
        .then(function (r) { return r.ok ? r.json() : Promise.reject(new Error("http " + r.status)); });
    };
    var ollama = function () { return get(c.host + "/api/tags").then(function (j) { j.__api = "ollama"; return j; }); };
    var openai = function () { return get(c.host + "/v1/models").then(function (j) { j.__api = "openai"; return j; }); };
    var p = c.api === "ollama" ? ollama() : c.api === "openai" ? openai() : ollama().catch(openai);
    return p.catch(function (e) { clearTimeout(t); throw e; });
  }
  function chat(c, messages, ms) {
    var ctl = new AbortController();
    var t = setTimeout(function () { ctl.abort(); }, ms || 20000);
    var isOllama = c.api !== "openai";
    var url  = isOllama ? c.host + "/api/chat" : c.host + "/v1/chat/completions";
    var body = isOllama
      ? { model: c.model, messages: messages, stream: false, format: "json", options: { temperature: 0.35 } }
      : { model: c.model, messages: messages, temperature: 0.35, response_format: { type: "json_object" } };
    return fetch(url, {
      method: "POST", signal: ctl.signal, headers: headers(c), body: JSON.stringify(body)
    }).then(function (r) {
      clearTimeout(t);
      if (!r.ok) throw new Error("http " + r.status);
      return r.json();
    }).then(function (j) {
      var content = isOllama
        ? (j && j.message && j.message.content)
        : (j && j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content);
      if (!content) throw new Error("empty reply");
      return parseContract(content);
    }).catch(function (e) { clearTimeout(t); throw e; });
  }

  /* ---------------- validate whatever the model returns ---------------- */
  function parseContract(text) {
    var obj;
    try { obj = JSON.parse(text); }
    catch (e) {
      var m = text.match(/\{[\s\S]*\}/);
      if (!m) throw e;
      obj = JSON.parse(m[0]);
    }
    var ids = window.NSApp.foodIds();
    var acts = [];
    (Array.isArray(obj.actions) ? obj.actions : []).forEach(function (a) {
      if (!a || typeof a !== "object") return;
      if (a.op === "add" && ids.indexOf(a.id) > -1) {
        acts.push({ op: "add", id: a.id, qty: Math.max(1, Math.min(20, parseInt(a.qty, 10) || 1)) });
      } else if (a.op === "search" && typeof a.q === "string") {
        acts.push({ op: "search", q: a.q.slice(0, 60) });
      } else if (a.op === "veg") {
        acts.push({ op: "veg", on: !!a.on });
      } else if (a.op === "cat" && /^(all|momo|rice|noodle|snack|drink)$/.test(a.id)) {
        acts.push({ op: "cat", id: a.id });
      }
    });
    return { reply: typeof obj.reply === "string" ? obj.reply.slice(0, 1500) : "", actions: acts.slice(0, 3) };
  }
  function applyActions(acts) {
    var A = window.NSApp;
    (acts || []).forEach(function (a) {
      if (a.op === "add") A.addToCart(a.id, a.qty);
      else if (a.op === "search") A.setQuery(a.q);
      else if (a.op === "veg") A.setVeg(a.on);
      else if (a.op === "cat") A.setCat(a.id);
    });
  }

  /* ---------------- offline brain: deterministic, uses real data ------ */
  function offlineAnswer(text) {
    var A = window.NSApp, t = A.t, lang = A.lang();
    var q = (text || "").toLowerCase();
    var name = function (f) { return f.name[lang] || f.name.en; };
    var money = function (n) { return "¥" + n.toLocaleString(lang === "ja" ? "ja-JP" : (lang === "ne" ? "ne-NP" : "en-US")); };

    /* cart question */
    if (/(cart|कार्ट|カート)/.test(q)) {
      var cart = A.cart();
      if (!cart.length) return { reply: t("aiCartEmpty"), actions: [] };
      var T = A.totals();
      return {
        reply: t("aiCartIntro") + "\n" + cart.map(function (c) {
          return "• " + c.name + " × " + c.qty + " — " + money(c.price * c.qty);
        }).join("\n") + "\n" + t("total") + ": " + money(T.total),
        actions: []
      };
    }

    var list = (window.NSApp.foods() || []).slice();
    var notes = [];
    if (/(veg|vegetarian|शाकाहारी|ベジ)/.test(q)) { list = list.filter(function (f) { return f.veg; }); notes.push(t("vegOnly")); }
    if (/(spicy|hot|piro|पिरो|辛い)/.test(q))     { list = list.filter(function (f) { return f.spice >= 2; }); notes.push(t("spice") + " 2+/3"); }
    if (/(mild|not spicy|less spicy|कम पिरो)/.test(q)) { list = list.filter(function (f) { return f.spice <= 1; }); }
    var budget = q.match(/(?:under|below|within|<|<=|भित्र|以内)\s*[¥￥]?\s*(\d{3,5})/) || q.match(/[¥￥]\s*(\d{3,5})\s*(?:bhitra|inside|under|以内|भित्र)/);
    if (budget) { var cap = +budget[1]; list = list.filter(function (f) { return f.price <= cap; }); notes.push("≤ " + money(cap)); }
    if (/(gluten[\s-]?free|no gluten)/.test(q))  { list = list.filter(function (f) { return (f.allergens || []).indexOf("gluten") === -1; }); notes.push("gluten-free"); }
    if (/(nut[\s-]?free|no nuts)/.test(q))       { list = list.filter(function (f) { return (f.allergens || []).indexOf("nuts") === -1; }); notes.push("nut-free"); }
    var cats = { momo: /momo|मःमः|モモ/, rice: /(rice|curry|bhat|dal|भात|करी|ご飯|カレー)/, noodle: /(noodle|soup|chowmein|thukpa|wai ?wai|नुडल|सुप|麺|スープ)/, snack: /(snack|grill|sekuwa|samosa|sel roti|bara|sukuti|खाजा|सेकुवा|スナック)/, drink: /(drink|sweet|dessert|lassi|chiya|tea|kheer|jamun|yomari|पेय|मिठाई|ドリンク)/ };
    for (var cid in cats) if (cats[cid].test(q)) { list = list.filter(function (f) { return f.cat === cid; }); notes.push(cid); break; }
    /* exact-ish dish name mention */
    var direct = (window.NSApp.foods() || []).filter(function (f) {
      return (f.name.en + " " + f.name.ja + " " + f.name.ne).toLowerCase().split(/[\s()\/]+/).some(function (w) {
        return w.length > 3 && q.indexOf(w) > -1;
      });
    });
    if (direct.length) list = direct;

    list.sort(function (a, b) { return b.rating - a.rating; });
    var top = list.slice(0, 3);
    if (!top.length) return { reply: t("aiRecNone"), actions: [] };

    var reply = t("aiRecIntro") + (notes.length ? " (" + notes.join(", ") + ")" : "") + "\n" +
      top.map(function (f) {
        return "• " + name(f) + " — " + money(f.price) +
               (f.veg ? " · " + t("veg") : "") +
               (f.spice ? " · " + t("spice") + " " + f.spice + "/3" : "") +
               " · ★" + f.rating.toFixed(1);
      }).join("\n");

    var acts = [];
    if (/(add|order|thap|थाप|追加|chhana|छान|halnu|हाल)/.test(q) && direct.length) {
      acts.push({ op: "add", id: direct[0].id, qty: 1 });
    }
    return { reply: reply, actions: acts };
  }

  /* ---------------- public ask(): online first, offline always ---------- */
  var history = [];
  function ask(text) {
    var c = cfg();
    history.push({ role: "user", content: text });
    if (history.length > 12) history = history.slice(-12);
    return ping(c).then(function (tags) {
      var api = tags.__api || c.api;
      var models = api === "openai"
        ? (tags.data || []).map(function (m) { return m.id; })
        : (tags.models || []).map(function (m) { return m.name; });
      var model = models.indexOf(c.model) > -1 ? c.model : (models[0] || c.model);
      var msgs = [{ role: "system", content: systemPrompt() }].concat(history);
      return chat({ host: c.host, model: model, key: c.key, api: api }, msgs)
        .then(function (res) { res.online = true; res.model = model; res.api = api; return res; });
    }).catch(function () {
      var res = offlineAnswer(text);
      res.online = false;
      return res;
    }).then(function (res) {
      history.push({ role: "assistant", content: res.reply });
      applyActions(res.actions);
      return res;
    });
  }

  /* ============================== UI ================================== */
  function bubble(cls, text) {
    var d = document.createElement("div");
    d.className = "msg " + cls;
    d.textContent = text;                 /* textContent => no XSS from model */
    d.style.whiteSpace = "pre-wrap";
    $("#aiBody").appendChild(d);
    $("#aiBody").scrollTop = $("#aiBody").scrollHeight;
    return d;
  }
  function setStatus(online, model) {
    var A = window.NSApp, el = $("#aiStatus");
    el.className = "ai-status " + (online ? "on" : "off");
    el.textContent = (online ? A.t("aiOnline") : A.t("aiOffline")) + (model ? " · " + model : "");
  }
  function refreshModels(c) {
    var sel = $("#aiModel");
    ping(c, 2000).then(function (tags) {
      var models = tags.__api === "openai"
        ? (tags.data || []).map(function (m) { return m.id; })
        : (tags && tags.models || []).map(function (m) { return m.name; });
      sel.replaceChildren();
      if (!models.length) models = [c.model];
      models.forEach(function (m) {
        var o = document.createElement("option"); o.value = m; o.textContent = m; sel.appendChild(o);
      });
      sel.value = models.indexOf(c.model) > -1 ? c.model : models[0];
      setStatus(true, sel.value);
    }).catch(function () {
      sel.replaceChildren();
      var o = document.createElement("option"); o.value = c.model; o.textContent = c.model + " (?)"; sel.appendChild(o);
      setStatus(false, "");
    });
  }
  function fillSettings() {
    var c = cfg();
    $("#aiHost").value = c.host;
    $("#aiApi").value = c.api;
    $("#aiKey").value = c.key ? "•".repeat(Math.min(24, c.key.length)) : "";
    $("#aiKey").dataset.real = c.key ? "1" : "";
    refreshModels(c);
  }
  function send(text) {
    if (!text || !text.trim()) return;
    var A = window.NSApp;
    bubble("user", text);
    var think = bubble("bot", A.t("aiThinking"));
    ask(text).then(function (res) {
      think.textContent = res.reply || A.t("aiRecNone");
      $("#aiBody").scrollTop = $("#aiBody").scrollHeight;
      setStatus(res.online, res.model || "");
    });
  }

  function wire() {
    var A = window.NSApp;
    $("#aiFab").addEventListener("click", function () {
      $("#aiChat").showModal();
      fillSettings();
      if (!$("#aiBody").children.length) {
        bubble("bot", A.t("aiTitle") + " 🍛\n" + A.t("aiPlaceholder"));
      }
    });
    $("#aiClose").addEventListener("click", function () { $("#aiChat").close(); });
    $("#aiSettingsBtn").addEventListener("click", function () {
      var box = $("#aiSettings"); box.hidden = !box.hidden;
      if (!box.hidden) fillSettings();
    });
    $("#aiSave").addEventListener("click", function () {
      var c = cfg();
      c.host = $("#aiHost").value.trim().replace(/\/+$/, "") || defaults().host;
      var k = $("#aiKey").value;
      var masked = $("#aiKey").dataset.real === "1";
      /* masked + untouched  -> keep stored key
         masked + edited     -> the typed text is the new key
         empty               -> clear the key                          */
      if (k === "") c.key = "";
      else if (masked && /^•+$/.test(k)) { /* keep c.key as-is */ }
      else c.key = k;
      c.model = $("#aiModel").value || c.model;
      c.api = $("#aiApi").value || "auto";
      saveCfg(c);
      $("#aiKey").dataset.real = c.key ? "1" : "";
      $("#aiSettings").hidden = true;
      refreshModels(c);
    });
    $("#aiTest").addEventListener("click", function () {
      var c = cfg();
      $("#aiTestMsg").textContent = "…";
      ping(c, 4000).then(function () { $("#aiTestMsg").textContent = window.NSApp.t("aiTestOk"); })
                   .catch(function () { $("#aiTestMsg").textContent = window.NSApp.t("aiTestFail"); });
    });
    $("#aiForm").addEventListener("submit", function (e) {
      e.preventDefault();
      var v = $("#aiInput").value;
      $("#aiInput").value = "";
      send(v);
    });
    $("#aiSugs").addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (b) send(b.getAttribute("data-q"));
    });
    /* suggestion chips re-render on language change */
    document.getElementById("language").addEventListener("change", renderSugs);
    renderSugs();
    /* show the real connection state as soon as the page loads, so the
       status pill is correct before the dialog is ever opened            */
    refreshModels(cfg());
  }
  function renderSugs() {
    var A = window.NSApp, box = $("#aiSugs");
    var sugs = [
      [A.t("aiSugVeg"),    "vegetarian recommendations"],
      [A.t("aiSugSpicy"),  "something spicy"],
      [A.t("aiSugBudget"), "under ¥800"],
      [A.t("aiSugCart"),   "what is in my cart?"]
    ];
    box.replaceChildren();
    sugs.forEach(function (s) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "chip"; b.textContent = s[0]; b.setAttribute("data-q", s[1]);
      box.appendChild(b);
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", wire);
  else wire();

  /* expose for tests */
  window.NepalSpiceAI = { ask: ask, cfg: cfg, saveCfg: saveCfg, offlineAnswer: offlineAnswer, ping: ping };
})();
