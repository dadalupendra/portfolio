(function () {
  const root = document.documentElement;

  // Year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Theme toggle
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    root.setAttribute("data-theme", "light");
    if (themeIcon) themeIcon.textContent = "☀️";
  } else {
    root.removeAttribute("data-theme");
    if (themeIcon) themeIcon.textContent = "🌙";
  }

  themeToggle?.addEventListener("click", () => {
    const isLight = root.getAttribute("data-theme") === "light";
    if (isLight) {
      root.removeAttribute("data-theme");
      localStorage.setItem("theme", "dark");
      if (themeIcon) themeIcon.textContent = "🌙";
    } else {
      root.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
      if (themeIcon) themeIcon.textContent = "☀️";
    }
  });

  // Mobile nav
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  navToggle?.addEventListener("click", () => {
    const open = navMenu?.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  navMenu?.addEventListener("click", (e) => {
    const t = e.target;
    if (t && t.classList && t.classList.contains("nav-link")) {
      navMenu.classList.remove("is-open");
      navToggle?.setAttribute("aria-expanded", "false");
    }
  });

  // Active nav highlight
  const sections = ["about", "skills", "projects", "education", "contact"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute("id");
        navLinks.forEach((a) => {
          a.classList.toggle("is-active", a.getAttribute("href") === `#${id}`);
        });
      });
    },
    { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 }
  );
  sections.forEach((sec) => observer.observe(sec));

  // Email
  const email = "upendradadal824@gmail.com";
  const emailText = document.getElementById("emailText");
  const emailText2 = document.getElementById("emailText2");
  const mailtoLink = document.getElementById("mailtoLink");
  if (emailText) emailText.textContent = email;
  if (emailText2) emailText2.textContent = email;
  if (mailtoLink) {
    mailtoLink.href = `mailto:${encodeURIComponent(email)}?subject=Portfolio%20Inquiry&body=Hi%20Dadal,%0A%0A`;
  }

  async function copyToClipboard(text) {
    try { await navigator.clipboard.writeText(text); return true; }
    catch { return false; }
  }

  const copyBtns = [
    document.getElementById("copyEmailBtn"),
    document.getElementById("copyEmailBtn2"),
  ].filter(Boolean);

  copyBtns.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const ok = await copyToClipboard(email);
      btn.textContent = ok ? "Copied ✅" : "Copy failed ❌";
      setTimeout(() => (btn.textContent = "Copy Email"), 1200);
    });
  });

  // Contact form -> opens mail app
  const form = document.getElementById("contactForm");
  const formNote = document.getElementById("formNote");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name")?.value?.trim() || "";
    const from = document.getElementById("email")?.value?.trim() || "";
    const message = document.getElementById("message")?.value?.trim() || "";

    if (!name || !from || !message) {
      if (formNote) formNote.textContent = "Please fill all fields.";
      return;
    }

    const subject = `Portfolio Inquiry from ${name}`;
    const body = `Name: ${name}\nEmail: ${from}\n\nMessage:\n${message}\n`;
    window.location.href =
      `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    if (formNote) formNote.textContent = "Opening email app…";
  });
})();

(() => {
  const img = document.getElementById("profileImg");
  const fallback = document.getElementById("avatarFallback");
  const input = document.getElementById("avatarInput");
  const reset = document.getElementById("avatarReset");

  if (!img || !fallback) return;

  const KEY = "portfolio_profile_photo";

  const showFallback = () => (fallback.style.display = "grid");
  const hideFallback = () => (fallback.style.display = "none");

  // Load saved image if exists
  const saved = localStorage.getItem(KEY);
  if (saved) {
    img.src = saved;
    hideFallback();
  }

  // Default image success/fail
  img.addEventListener("load", hideFallback);
  img.addEventListener("error", showFallback);

  // Upload new photo (browser-local)
  input?.addEventListener("change", (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Image file मात्र छान्नुहोस्।");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result || "");
      img.src = dataUrl;
      localStorage.setItem(KEY, dataUrl);
      hideFallback();
    };
    reader.readAsDataURL(file);
  });

  // Reset to default assets/profile.jpg
  reset?.addEventListener("click", () => {
    localStorage.removeItem(KEY);
    img.src = "assets/profile.jpg";
  });
})();
(() => {
  // ---------- Header brand photo fallback ----------
  const brandImg = document.getElementById("brandImg");
  const brandFallback = document.getElementById("brandFallback");

  const KEY = "portfolio_profile_photo";
  const saved = localStorage.getItem(KEY);

  const bindFallback = (imgEl, fallbackEl) => {
    if (!imgEl || !fallbackEl) return;
    const show = () => (fallbackEl.style.display = "grid");
    const hide = () => (fallbackEl.style.display = "none");

    imgEl.addEventListener("load", hide);
    imgEl.addEventListener("error", show);

    if (saved) imgEl.src = saved;
  };

  bindFallback(brandImg, brandFallback);

  // ---------- Education modal ----------
  const modal = document.getElementById("schoolModal");
  const titleEl = document.getElementById("modalTitle");
  const bodyEl = document.getElementById("modalBody");

  const openModal = (title, templateId) => {
    if (!modal || !titleEl || !bodyEl) return;
    titleEl.textContent = title;
    bodyEl.innerHTML = "";

    const tpl = document.getElementById(templateId);
    if (tpl && "content" in tpl) {
      bodyEl.appendChild(tpl.content.cloneNode(true));
    } else {
      bodyEl.textContent = "Details not found.";
    }

    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    if (!modal) return;
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  document.querySelectorAll(".school-open").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-school");
      if (key === "ttc") openModal(btn.textContent.trim(), "school-ttc");
      if (key === "nepal") openModal(btn.textContent.trim(), "school-nepal");
    });
  });

  modal?.addEventListener("click", (e) => {
    const t = e.target;
    if (t?.hasAttribute?.("data-close") || t?.classList?.contains("modal-backdrop")) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
})();
(() => {
  const KEY = "edu_lang";
  const getLang = () => localStorage.getItem(KEY) || "en";

  function applyEduLang(lang) {
    document.querySelectorAll("[data-edu-lang]").forEach((el) => {
      el.hidden = el.getAttribute("data-edu-lang") !== lang;
    });

    document.querySelectorAll(".edu-lang-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-edu-lang") === lang);
    });

    localStorage.setItem(KEY, lang);
  }

  // buttons
  document.querySelectorAll(".edu-lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => applyEduLang(btn.getAttribute("data-edu-lang")));
  });

  // init
  applyEduLang(getLang());

  // modal content inject भएपछि पनि apply होस्
  const modal = document.getElementById("schoolModal");
  if (modal) {
    new MutationObserver(() => applyEduLang(getLang()))
      .observe(modal, { childList: true, subtree: true });
  }
})();
(() => {
  // -----------------------------
  // Vault using IndexedDB (static site safe)
  // -----------------------------
  const DB_NAME = "portfolio_vault_db";
  const DB_VER = 1;
  const STORE = "items";

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));

  let currentRegion = "japan"; // japan | nepal
  let currentType = "photo";   // photo | doc
  let searchText = "";

  const vaultList = $("#vaultList");
  const form = $("#vaultForm");
  const titleEl = $("#vaultTitle");
  const noteEl = $("#vaultNote");
  const fileEl = $("#vaultFile");
  const searchEl = $("#vaultSearch");
  const clearSearchBtn = $("#vaultClearSearch");
  const noteLine = $("#vaultNoteLine");

  if (!vaultList || !form || !titleEl || !fileEl) return;

  function openDB() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VER);

      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(STORE)) {
          const store = db.createObjectStore(STORE, { keyPath: "id", autoIncrement: true });
          store.createIndex("region", "region", { unique: false });
          store.createIndex("type", "type", { unique: false });
          store.createIndex("createdAt", "createdAt", { unique: false });
        }
      };

      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  async function tx(storeMode, fn) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const t = db.transaction(STORE, storeMode);
      const store = t.objectStore(STORE);
      const res = fn(store);

      t.oncomplete = () => {
        db.close();
        resolve(res);
      };
      t.onerror = () => {
        db.close();
        reject(t.error);
      };
    });
  }

  async function addItem(item) {
    await tx("readwrite", (store) => store.add(item));
  }

  async function deleteItem(id) {
    await tx("readwrite", (store) => store.delete(id));
  }

  async function getAllItems() {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const t = db.transaction(STORE, "readonly");
      const store = t.objectStore(STORE);
      const req = store.getAll();
      req.onsuccess = () => {
        db.close();
        resolve(req.result || []);
      };
      req.onerror = () => {
        db.close();
        reject(req.error);
      };
    });
  }

  function fmtDate(ms) {
    const d = new Date(ms);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }

  function setSegActive(buttons, key, value) {
    buttons.forEach((b) => b.classList.toggle("active", b.getAttribute(key) === value));
  }

  async function render() {
    let items = await getAllItems();

    items = items
      .filter((x) => x.region === currentRegion && x.type === currentType)
      .sort((a, b) => b.createdAt - a.createdAt);

    const q = (searchText || "").trim().toLowerCase();
    if (q) {
      items = items.filter((x) =>
        (x.title || "").toLowerCase().includes(q) ||
        (x.note || "").toLowerCase().includes(q) ||
        (x.filename || "").toLowerCase().includes(q)
      );
    }

    if (items.length === 0) {
      vaultList.innerHTML = `<div class="card" style="padding:14px;opacity:.8;">
        No items yet. Add a file above (Region: ${currentRegion.toUpperCase()} • Type: ${currentType.toUpperCase()}).
      </div>`;
      return;
    }

    vaultList.innerHTML = items.map((x) => {
      const isPhoto = x.type === "photo" && x.mime?.startsWith("image/");
      return `
        <article class="vault-item">
          <div class="vault-thumb">
            ${isPhoto ? `<img src="${x._url}" alt="${escapeHtml(x.title)}" />` : `<div style="font-weight:800;opacity:.7">DOC</div>`}
          </div>
          <div class="vault-body">
            <h3 class="vault-title">${escapeHtml(x.title)}</h3>
            <div class="vault-meta">${escapeHtml(x.filename)} • ${fmtDate(x.createdAt)}</div>
            ${x.note ? `<p class="vault-note">${escapeHtml(x.note)}</p>` : `<p class="vault-note" style="opacity:.6">—</p>`}
            <div class="vault-item-actions">
              <button class="btn btn-small btn-secondary" data-action="view" data-id="${x.id}">View</button>
              <button class="btn btn-small btn-secondary" data-action="download" data-id="${x.id}">Download</button>
              <button class="btn btn-small btn-ghost" data-action="delete" data-id="${x.id}">Delete</button>
            </div>
          </div>
        </article>
      `;
    }).join("");

    // bind actions
    vaultList.querySelectorAll("[data-action]").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = Number(btn.getAttribute("data-id"));
        const action = btn.getAttribute("data-action");
        await handleAction(action, id);
      });
    });
  }

  function escapeHtml(s) {
    return String(s || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  async function withObjectUrls(items) {
    // Create object URLs for blobs (for preview/download)
    return items.map((x) => {
      try {
        const url = URL.createObjectURL(x.blob);
        return { ...x, _url: url };
      } catch {
        return { ...x, _url: "" };
      }
    });
  }

  async function handleAction(action, id) {
    const all = await getAllItems();
    const found = all.find((x) => x.id === id);
    if (!found) return;

    const url = URL.createObjectURL(found.blob);

    if (action === "view") {
      window.open(url, "_blank", "noopener");
      setTimeout(() => URL.revokeObjectURL(url), 15000);
      return;
    }

    if (action === "download") {
      const a = document.createElement("a");
      a.href = url;
      a.download = found.filename || "file";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 15000);
      return;
    }

    if (action === "delete") {
      const ok = confirm("Delete this item?");
      if (!ok) return;
      await deleteItem(id);
      await rerenderWithUrls();
      return;
    }
  }

  async function rerenderWithUrls() {
    // We need URLs only for currently displayed items.
    // To keep it simple, we rebuild URLs for all (small scale).
    const all = await getAllItems();
    const allWithUrls = await withObjectUrls(all);

    // Temporary: store as global for render (inject _url)
    // We'll render from allWithUrls by filtering.
    let items = allWithUrls
      .filter((x) => x.region === currentRegion && x.type === currentType)
      .sort((a, b) => b.createdAt - a.createdAt);

    const q = (searchText || "").trim().toLowerCase();
    if (q) {
      items = items.filter((x) =>
        (x.title || "").toLowerCase().includes(q) ||
        (x.note || "").toLowerCase().includes(q) ||
        (x.filename || "").toLowerCase().includes(q)
      );
    }

    // Clean old URLs after paint
    vaultList.innerHTML = items.length ? items.map((x) => {
      const isPhoto = x.type === "photo" && x.mime?.startsWith("image/");
      return `
        <article class="vault-item">
          <div class="vault-thumb">
            ${isPhoto ? `<img src="${x._url}" alt="${escapeHtml(x.title)}" />` : `<div style="font-weight:800;opacity:.7">DOC</div>`}
          </div>
          <div class="vault-body">
            <h3 class="vault-title">${escapeHtml(x.title)}</h3>
            <div class="vault-meta">${escapeHtml(x.filename)} • ${fmtDate(x.createdAt)}</div>
            ${x.note ? `<p class="vault-note">${escapeHtml(x.note)}</p>` : `<p class="vault-note" style="opacity:.6">—</p>`}
            <div class="vault-item-actions">
              <button class="btn btn-small btn-secondary" data-action="view" data-id="${x.id}">View</button>
              <button class="btn btn-small btn-secondary" data-action="download" data-id="${x.id}">Download</button>
              <button class="btn btn-small btn-ghost" data-action="delete" data-id="${x.id}">Delete</button>
            </div>
          </div>
        </article>
      `;
    }).join("") : `<div class="card" style="padding:14px;opacity:.8;">No items yet.</div>`;

    vaultList.querySelectorAll("[data-action]").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = Number(btn.getAttribute("data-id"));
        const action = btn.getAttribute("data-action");
        await handleAction(action, id);
      });
    });

    // revoke urls later (avoid memory leak)
    setTimeout(() => {
      allWithUrls.forEach((x) => x._url && URL.revokeObjectURL(x._url));
    }, 20000);
  }

  // Region/type switch
  const regionBtns = $$("[data-region]");
  const typeBtns = $$("[data-type]");

  regionBtns.forEach((b) => {
    b.addEventListener("click", async () => {
      currentRegion = b.getAttribute("data-region");
      setSegActive(regionBtns, "data-region", currentRegion);
      noteLine.textContent = `Saving to: ${currentRegion.toUpperCase()} • ${currentType.toUpperCase()}`;
      await rerenderWithUrls();
    });
  });

  typeBtns.forEach((b) => {
    b.addEventListener("click", async () => {
      currentType = b.getAttribute("data-type");
      setSegActive(typeBtns, "data-type", currentType);
      noteLine.textContent = `Saving to: ${currentRegion.toUpperCase()} • ${currentType.toUpperCase()}`;
      await rerenderWithUrls();
    });
  });

  // Search
  searchEl?.addEventListener("input", async (e) => {
    searchText = e.target.value || "";
    await rerenderWithUrls();
  });

  clearSearchBtn?.addEventListener("click", async () => {
    searchText = "";
    if (searchEl) searchEl.value = "";
    await rerenderWithUrls();
  });

  // Save new item
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = (titleEl.value || "").trim();
    const note = (noteEl?.value || "").trim();
    const file = fileEl.files?.[0];

    if (!title || !file) return;

    const isImage = file.type.startsWith("image/");
    if (currentType === "photo" && !isImage) {
      alert("Photos mode मा image file मात्र save हुन्छ।");
      return;
    }

    if (currentType === "doc" && isImage) {
      // allow images as docs if user wants, but warn
      // (keep it flexible)
    }

    const item = {
      region: currentRegion,       // japan | nepal
      type: currentType,           // photo | doc
      title,
      note,
      filename: file.name,
      mime: file.type || "application/octet-stream",
      createdAt: Date.now(),
      blob: file, // Blob stored in IndexedDB
    };

    try {
      await addItem(item);
      form.reset();
      noteLine.textContent = `Saved ✓ (${currentRegion.toUpperCase()} • ${currentType.toUpperCase()})`;
      await rerenderWithUrls();
    } catch (err) {
      console.error(err);
      alert("Save failed. Browser storage issue.");
    }
  });

  // init
  noteLine.textContent = `Saving to: ${currentRegion.toUpperCase()} • ${currentType.toUpperCase()}`;
  setSegActive(regionBtns, "data-region", currentRegion);
  setSegActive(typeBtns, "data-type", currentType);
  rerenderWithUrls();
})();

