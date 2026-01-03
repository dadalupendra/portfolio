(function () {
  // Year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Theme
  const root = document.documentElement;
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

  // i18n
  const I18N = {
    en: {
      backBtn: "← Back to Portfolio",
      navFacts: "Quick Facts",
      navDistricts: "Provinces & Districts",
      navPlaces: "Famous Places",
      navTravel: "Travel",
      pill: "Nepal • Culture • Nature • People",
      heroTitle: "Nepal: A small country with a big heart.",
      heroSub: "This page helps you explore Nepal’s 7 provinces, 77 districts, famous places, and basic travel planning.",
      ctaExplore: "Explore Districts",
      ctaPlaces: "See Places",
      statProvinces: "Provinces",
      statDistricts: "Districts",
      statPlan: "Plan",
      mapTitle: "Nepal Map (OpenStreetMap)",
      mapNote: "Embedded preview. Use “Open full map” for details.",
      openFullMap: "Open full map",
      loadWiki: "Load Wikipedia summary",
      wikiTip: "Note: Wikipedia needs internet.",
      factsTitle: "Quick Facts",
      factsSub: "Short, simple, useful info (edit later).",
      fact1Title: "Capital",
      fact1Body: "Kathmandu",
      fact2Title: "Nature",
      fact2Body: "Mountains, hills, and Terai.",
      fact3Title: "Best seasons",
      fact3Body: "Spring and Autumn.",
      fact4Title: "Culture",
      fact4Body: "Many groups, languages, festivals.",
      calloutTitle: "Traditional travel rule:",
      calloutBody: "Respect culture. Dress modestly in temples. Ask before photos.",
      distTitle: "Provinces & 77 Districts",
      distSub: "Search districts, filter by province, and explore.",
      clearBtn: "Clear",
      districtListTitle: "District List",
      districtListSub: "Click a district to open details page.",
      districtNote: "Tip: District click -> district.html details.",
      placesTitle: "Famous Places",
      placesSub: "Classic destinations to start with.",
      travelTitle: "Travel Basics",
      travelSub: "Simple checklist (edit prices later).",
      howToGoTitle: "How to go",
      how1: "International flight → Kathmandu (TIA).",
      how2: "Inside Nepal: plane (fast), bus (cheap), jeep (mountain).",
      how3: "For trekking: plan permits, guide/porter if needed.",
      budgetTitle: "Budget idea (example)",
      b1: "Local meals",
      b2: "Budget hotel",
      b3: "Local bus",
      b4: "Domestic flight",
      budgetNote: "Example only. Update later.",
      searchPlaceholder: "Search district...",
      provinceAll: "All Provinces",
      results: (n) => `${n} results`,
      provinceHint: "Tap to filter districts",
      openMaps: "Open Map",
      wiki: "Wiki"
    },
    ne: {
      backBtn: "← Portfolio मा फर्क",
      navFacts: "छोटो जानकारी",
      navDistricts: "प्रदेश/जिल्ला",
      navPlaces: "प्रमुख ठाउँ",
      navTravel: "यात्रा",
      pill: "नेपाल • संस्कृति • प्रकृति • मान्छे",
      heroTitle: "नेपाल: सानो देश, ठूलो मन।",
      heroSub: "७ प्रदेश, ७७ जिल्ला, प्रमुख गन्तव्य र यात्रा plan हेर्न सकिन्छ।",
      ctaExplore: "जिल्ला हेर्नुहोस्",
      ctaPlaces: "ठाउँ हेर्नुहोस्",
      statProvinces: "प्रदेश",
      statDistricts: "जिल्ला",
      statPlan: "योजना",
      mapTitle: "नेपाल नक्सा (OpenStreetMap)",
      mapNote: "Preview हो। पूरा हेर्न Open full map।",
      openFullMap: "पूरा नक्सा",
      loadWiki: "Wikipedia summary",
      wikiTip: "Wikipedia internet चाहिन्छ।",
      factsTitle: "छोटो जानकारी",
      factsSub: "सजिलो info (पछि edit)।",
      fact1Title: "राजधानी",
      fact1Body: "काठमाडौं",
      fact2Title: "प्रकृति",
      fact2Body: "हिमाल, पहाड, तराई।",
      fact3Title: "राम्रो सिजन",
      fact3Body: "वसन्त र शरद।",
      fact4Title: "संस्कृति",
      fact4Body: "धेरै भाषा/पर्व/परम्परा।",
      calloutTitle: "पुरानो नियम:",
      calloutBody: "संस्कृति सम्मान। मन्दिरमा सभ्य पोशाक। फोटो अघि सोध।",
      distTitle: "प्रदेश र ७७ जिल्ला",
      distSub: "Search / filter गरेर हेर्नुहोस्।",
      clearBtn: "Clear",
      districtListTitle: "जिल्ला सूची",
      districtListSub: "जिल्ला क्लिक गर्दा details खुल्छ।",
      districtNote: "Tip: district.html मा details।",
      placesTitle: "प्रमुख ठाउँ",
      placesSub: "Classic destination हरू।",
      travelTitle: "यात्रा आधार",
      travelSub: "Simple checklist।",
      howToGoTitle: "कसरी जाने",
      how1: "उडान → Kathmandu (TIA)।",
      how2: "नेपालभित्र: plane/bus/jeep।",
      how3: "Trekking: permits/guide plan।",
      budgetTitle: "Budget (example)",
      b1: "खाना",
      b2: "होटल",
      b3: "बस",
      b4: "Domestic flight",
      budgetNote: "Example मात्र।",
      searchPlaceholder: "जिल्ला खोज्नुहोस्...",
      provinceAll: "सबै प्रदेश",
      results: (n) => `${n} वटा`,
      provinceHint: "क्लिक गरेर filter",
      openMaps: "नक्सा",
      wiki: "Wiki"
    },
    ja: {
      backBtn: "← ポートフォリオへ",
      navFacts: "基本情報",
      navDistricts: "州・郡",
      navPlaces: "観光地",
      navTravel: "旅行",
      pill: "ネパール • 文化 • 自然 • 人々",
      heroTitle: "ネパール：小さな国、大きな心。",
      heroSub: "7州・77郡、有名な場所、旅行の基本をまとめています。",
      ctaExplore: "郡を探す",
      ctaPlaces: "場所を見る",
      statProvinces: "州",
      statDistricts: "郡",
      statPlan: "計画",
      mapTitle: "ネパール地図 (OpenStreetMap)",
      mapNote: "プレビューです。詳細はOpen full map。",
      openFullMap: "地図を開く",
      loadWiki: "Wikipedia要約",
      wikiTip: "ネットが必要です。",
      factsTitle: "基本情報",
      factsSub: "短い情報（後で編集可）。",
      fact1Title: "首都",
      fact1Body: "カトマンズ",
      fact2Title: "自然",
      fact2Body: "山・丘・タライ。",
      fact3Title: "おすすめ季節",
      fact3Body: "春と秋。",
      fact4Title: "文化",
      fact4Body: "多様な文化と祭り。",
      calloutTitle: "昔ながらのルール：",
      calloutBody: "文化を尊重。寺院では控えめな服装。写真は許可。",
      distTitle: "7州と77郡",
      distSub: "検索・州フィルター。",
      clearBtn: "クリア",
      districtListTitle: "郡リスト",
      districtListSub: "クリックで詳細ページ。",
      districtNote: "Tip: district.html に詳細。",
      placesTitle: "有名な場所",
      placesSub: "定番から。",
      travelTitle: "旅行の基本",
      travelSub: "シンプルなチェック。",
      howToGoTitle: "行き方",
      how1: "国際便 → カトマンズ(TIA)。",
      how2: "国内：飛行機/バス/ジープ。",
      how3: "トレッキング：許可/ガイド計画。",
      budgetTitle: "予算例",
      b1: "食事",
      b2: "宿",
      b3: "バス",
      b4: "国内線",
      budgetNote: "例のみ。",
      searchPlaceholder: "郡を検索…",
      provinceAll: "すべての州",
      results: (n) => `${n} 件`,
      provinceHint: "タップで絞り込み",
      openMaps: "地図",
      wiki: "Wiki"
    },
    hi: {
      backBtn: "← पोर्टफोलियो",
      navFacts: "जानकारी",
      navDistricts: "प्रदेश/जिला",
      navPlaces: "मुख्य जगह",
      navTravel: "यात्रा",
      pill: "नेपाल • संस्कृति • प्रकृति • लोग",
      heroTitle: "नेपाल: छोटा देश, बड़ा दिल।",
      heroSub: "7 प्रदेश, 77 जिले, famous places और basic travel planning।",
      ctaExplore: "जिले देखें",
      ctaPlaces: "जगह देखें",
      statProvinces: "प्रदेश",
      statDistricts: "जिले",
      statPlan: "प्लान",
      mapTitle: "नेपाल मैप (OpenStreetMap)",
      mapNote: "Preview है।",
      openFullMap: "Full map",
      loadWiki: "Wikipedia summary",
      wikiTip: "Internet चाहिए।",
      factsTitle: "छोटी जानकारी",
      factsSub: "Simple info।",
      fact1Title: "राजधानी",
      fact1Body: "काठमांडू",
      fact2Title: "प्रकृति",
      fact2Body: "हिमाल, पहाड़, तराई।",
      fact3Title: "Best season",
      fact3Body: "Spring/Autumn",
      fact4Title: "Culture",
      fact4Body: "Many festivals and traditions।",
      calloutTitle: "पुराना नियम:",
      calloutBody: "Culture respect करो। मंदिर में modest dress।",
      distTitle: "प्रदेश और 77 जिले",
      distSub: "Search / filter।",
      clearBtn: "Clear",
      districtListTitle: "District List",
      districtListSub: "Click करने पर details page।",
      districtNote: "Tip: district.html details।",
      placesTitle: "मुख्य जगहें",
      placesSub: "Classic destinations।",
      travelTitle: "Travel Basics",
      travelSub: "Simple checklist।",
      howToGoTitle: "कैसे जाएँ",
      how1: "International → Kathmandu (TIA)।",
      how2: "Inside Nepal: plane/bus/jeep।",
      how3: "Trekking: permits/guide।",
      budgetTitle: "Budget (example)",
      b1: "Food",
      b2: "Hotel",
      b3: "Bus",
      b4: "Domestic flight",
      budgetNote: "Example only।",
      searchPlaceholder: "जिला खोजें...",
      provinceAll: "All provinces",
      results: (n) => `${n} results`,
      provinceHint: "Tap to filter",
      openMaps: "Map",
      wiki: "Wiki"
    }
  };

  function getLang() { return localStorage.getItem("lang") || "en"; }
  function setLang(lang) { localStorage.setItem("lang", lang); }

  function applyI18n(lang) {
    const dict = I18N[lang] || I18N.en;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const val = dict[key];
      if (typeof val === "string") el.textContent = val;
    });

    const search = document.getElementById("districtSearch");
    if (search) search.placeholder = dict.searchPlaceholder || "Search district...";

    const first = document.querySelector('#provinceSelect option[value="all"]');
    if (first) first.textContent = dict.provinceAll || "All Provinces";
  }

  // Provinces
  const PROVINCES = [
    { id: "Koshi" },
    { id: "Madhesh" },
    { id: "Bagmati" },
    { id: "Gandaki" },
    { id: "Lumbini" },
    { id: "Karnali" },
    { id: "Sudurpashchim" },
  ];

  // 77 districts
  const DISTRICTS = [
    // Koshi (14)
    { name: "Bhojpur", province: "Koshi" },
    { name: "Dhankuta", province: "Koshi" },
    { name: "Ilam", province: "Koshi" },
    { name: "Jhapa", province: "Koshi" },
    { name: "Khotang", province: "Koshi" },
    { name: "Morang", province: "Koshi" },
    { name: "Okhaldhunga", province: "Koshi" },
    { name: "Panchthar", province: "Koshi" },
    { name: "Sankhuwasabha", province: "Koshi" },
    { name: "Solukhumbu", province: "Koshi" },
    { name: "Sunsari", province: "Koshi" },
    { name: "Taplejung", province: "Koshi" },
    { name: "Terhathum", province: "Koshi" },
    { name: "Udayapur", province: "Koshi" },

    // Madhesh (8)
    { name: "Bara", province: "Madhesh" },
    { name: "Dhanusha", province: "Madhesh" },
    { name: "Mahottari", province: "Madhesh" },
    { name: "Parsa", province: "Madhesh" },
    { name: "Rautahat", province: "Madhesh" },
    { name: "Saptari", province: "Madhesh" },
    { name: "Sarlahi", province: "Madhesh" },
    { name: "Siraha", province: "Madhesh" },

    // Bagmati (13)
    { name: "Bhaktapur", province: "Bagmati" },
    { name: "Chitwan", province: "Bagmati" },
    { name: "Dhading", province: "Bagmati" },
    { name: "Dolakha", province: "Bagmati" },
    { name: "Kathmandu", province: "Bagmati" },
    { name: "Kavrepalanchok", province: "Bagmati" },
    { name: "Lalitpur", province: "Bagmati" },
    { name: "Makwanpur", province: "Bagmati" },
    { name: "Nuwakot", province: "Bagmati" },
    { name: "Ramechhap", province: "Bagmati" },
    { name: "Rasuwa", province: "Bagmati" },
    { name: "Sindhuli", province: "Bagmati" },
    { name: "Sindhupalchok", province: "Bagmati" },

    // Gandaki (11)
    { name: "Baglung", province: "Gandaki" },
    { name: "Gorkha", province: "Gandaki" },
    { name: "Kaski", province: "Gandaki" },
    { name: "Lamjung", province: "Gandaki" },
    { name: "Manang", province: "Gandaki" },
    { name: "Mustang", province: "Gandaki" },
    { name: "Myagdi", province: "Gandaki" },
    { name: "Nawalpur", province: "Gandaki" },
    { name: "Parbat", province: "Gandaki" },
    { name: "Syangja", province: "Gandaki" },
    { name: "Tanahun", province: "Gandaki" },

    // Lumbini (12)
    { name: "Arghakhanchi", province: "Lumbini" },
    { name: "Banke", province: "Lumbini" },
    { name: "Bardiya", province: "Lumbini" },
    { name: "Dang", province: "Lumbini" },
    { name: "Gulmi", province: "Lumbini" },
    { name: "Kapilvastu", province: "Lumbini" },
    { name: "Parasi (Nawalparasi West)", province: "Lumbini" },
    { name: "Palpa", province: "Lumbini" },
    { name: "Pyuthan", province: "Lumbini" },
    { name: "Rolpa", province: "Lumbini" },
    { name: "Rupandehi", province: "Lumbini" },
    { name: "Rukum East", province: "Lumbini" },

    // Karnali (10)
    { name: "Dailekh", province: "Karnali" },
    { name: "Dolpa", province: "Karnali" },
    { name: "Humla", province: "Karnali" },
    { name: "Jajarkot", province: "Karnali" },
    { name: "Jumla", province: "Karnali" },
    { name: "Kalikot", province: "Karnali" },
    { name: "Mugu", province: "Karnali" },
    { name: "Rukum West", province: "Karnali" },
    { name: "Salyan", province: "Karnali" },
    { name: "Surkhet", province: "Karnali" },

    // Sudurpashchim (9)
    { name: "Achham", province: "Sudurpashchim" },
    { name: "Baitadi", province: "Sudurpashchim" },
    { name: "Bajhang", province: "Sudurpashchim" },
    { name: "Bajura", province: "Sudurpashchim" },
    { name: "Dadeldhura", province: "Sudurpashchim" },
    { name: "Darchula", province: "Sudurpashchim" },
    { name: "Doti", province: "Sudurpashchim" },
    { name: "Kailali", province: "Sudurpashchim" },
    { name: "Kanchanpur", province: "Sudurpashchim" },
  ];

  const PLACES = [
    { name: "Kathmandu Durbar Square", tag: "Heritage", map: "Kathmandu Durbar Square", wiki: "Kathmandu_Durbar_Square" },
    { name: "Pashupatinath Temple", tag: "Temple", map: "Pashupatinath Temple", wiki: "Pashupatinath_Temple" },
    { name: "Swayambhunath (Monkey Temple)", tag: "Temple", map: "Swayambhunath", wiki: "Swayambhunath" },
    { name: "Pokhara (Phewa Lake)", tag: "Lake", map: "Phewa Lake", wiki: "Phewa_Lake" },
    { name: "Chitwan National Park", tag: "Wildlife", map: "Chitwan National Park", wiki: "Chitwan_National_Park" },
    { name: "Lumbini", tag: "Peace", map: "Lumbini", wiki: "Lumbini" },
    { name: "Everest Region (Khumbu)", tag: "Trekking", map: "Khumbu", wiki: "Khumbu" },
    { name: "Annapurna Base Camp", tag: "Trekking", map: "Annapurna Base Camp", wiki: "Annapurna_Sanctuary" },
    { name: "Mustang", tag: "Mountains", map: "Mustang Nepal", wiki: "Mustang_District" },
  ];

  const provinceSelect = document.getElementById("provinceSelect");
  const districtSearch = document.getElementById("districtSearch");
  const districtList = document.getElementById("districtList");
  const provinceCards = document.getElementById("provinceCards");
  const resultCount = document.getElementById("resultCount");
  const clearBtn = document.getElementById("clearFilter");
  const placesGrid = document.getElementById("placesGrid");

  let currentProvince = "all";
  let query = "";
  let currentLang = getLang();

  function initProvinceSelect() {
    if (!provinceSelect) return;
    PROVINCES.forEach((p) => {
      const opt = document.createElement("option");
      opt.value = p.id;
      opt.textContent = p.id;
      provinceSelect.appendChild(opt);
    });
  }

  function mapsUrl(q) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q + ", Nepal")}`;
  }

  function renderProvinceCards() {
    if (!provinceCards) return;
    const dict = I18N[currentLang] || I18N.en;

    const counts = {};
    DISTRICTS.forEach((d) => { counts[d.province] = (counts[d.province] || 0) + 1; });

    provinceCards.innerHTML = "";
    PROVINCES.forEach((p) => {
      const card = document.createElement("div");
      card.className = "province-card";
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");

      card.innerHTML = `
        <div class="top">
          <div class="name">${p.id}</div>
          <div class="count">${counts[p.id] || 0}</div>
        </div>
        <div class="hint">${dict.provinceHint || "Tap to filter districts"}</div>
      `;

      card.addEventListener("click", () => {
        currentProvince = p.id;
        if (provinceSelect) provinceSelect.value = p.id;
        applyFilters();
        window.location.hash = "#districts";
      });
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); card.click(); }
      });

      provinceCards.appendChild(card);
    });
  }

  function filteredDistricts() {
    const q = query.trim().toLowerCase();
    return DISTRICTS.filter((d) => {
      const matchProvince = currentProvince === "all" ? true : d.province === currentProvince;
      const matchQuery = q.length === 0 ? true : (d.name.toLowerCase().includes(q) || d.province.toLowerCase().includes(q));
      return matchProvince && matchQuery;
    });
  }

  function renderDistricts(list) {
    if (!districtList) return;
    districtList.innerHTML = "";

    list.forEach((d) => {
      const chip = document.createElement("div");
      chip.className = "district-chip";
      chip.innerHTML = `<span>${d.name}</span><span class="prov">${d.province}</span>`;

      // IMPORTANT: open district detail page
      chip.addEventListener("click", () => {
        const url = `district.html?name=${encodeURIComponent(d.name)}&province=${encodeURIComponent(d.province)}`;
        window.location.href = url;
      });

      districtList.appendChild(chip);
    });

    const dict = I18N[currentLang] || I18N.en;
    if (resultCount) resultCount.textContent = (dict.results ? dict.results(list.length) : `${list.length} results`);
  }

  function applyFilters() {
    renderDistricts(filteredDistricts());
  }

  function renderPlaces() {
    if (!placesGrid) return;
    const dict = I18N[currentLang] || I18N.en;

    placesGrid.innerHTML = "";
    PLACES.forEach((p) => {
      const card = document.createElement("article");
      card.className = "card place-card";

      const openMap = mapsUrl(p.map);
      const wikiUrl = `https://en.wikipedia.org/wiki/${p.wiki}`;

      card.innerHTML = `
        <h3>${p.name}</h3>
        <p class="muted">${p.tag}</p>
        <div class="meta"><span class="tag">${p.tag}</span></div>
        <div class="place-actions">
          <a class="btn btn-small btn-secondary" target="_blank" rel="noreferrer" href="${openMap}">${dict.openMaps || "Open Map"}</a>
          <a class="btn btn-small btn-secondary" target="_blank" rel="noreferrer" href="${wikiUrl}">${dict.wiki || "Wiki"}</a>
        </div>
      `;
      placesGrid.appendChild(card);
    });
  }

  // Wikipedia summary (Nepal)
  const loadWikiBtn = document.getElementById("loadWikiNepal");
  const wikiBox = document.getElementById("wikiNepal");
  async function loadNepalWiki() {
    if (!wikiBox) return;
    wikiBox.textContent = "Loading…";
    try {
      const res = await fetch("https://en.wikipedia.org/api/rest_v1/page/summary/Nepal");
      if (!res.ok) throw new Error("Fetch failed");
      const data = await res.json();
      wikiBox.textContent = data.extract || "No summary found.";
    } catch {
      wikiBox.textContent = "Could not load Wikipedia summary (maybe offline).";
    }
  }
  loadWikiBtn?.addEventListener("click", loadNepalWiki);

  // Language switch
  const langBtns = Array.from(document.querySelectorAll(".lang-btn"));
  function setLangUI(lang) {
    currentLang = lang;
    setLang(lang);
    langBtns.forEach((b) => b.classList.toggle("is-active", b.getAttribute("data-lang") === lang));
    applyI18n(lang);
    renderProvinceCards();
    renderPlaces();
    applyFilters();
  }
  langBtns.forEach((btn) => {
    btn.addEventListener("click", () => setLangUI(btn.getAttribute("data-lang") || "en"));
  });

  // Inputs
  provinceSelect?.addEventListener("change", (e) => {
    currentProvince = e.target.value || "all";
    applyFilters();
  });
  districtSearch?.addEventListener("input", (e) => {
    query = e.target.value || "";
    applyFilters();
  });
  clearBtn?.addEventListener("click", () => {
    currentProvince = "all";
    query = "";
    if (provinceSelect) provinceSelect.value = "all";
    if (districtSearch) districtSearch.value = "";
    applyFilters();
  });

  // Init
  initProvinceSelect();
  setLangUI(currentLang);
})();
