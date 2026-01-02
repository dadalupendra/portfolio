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

  // i18n labels
  const I18N = {
    en: {
      navOverview: "Overview",
      navTodo: "Things to do",
      navTravel: "How to go",
      navStay: "Stay & budget",
      backNepal: "← Back",
      backPortfolio: "Portfolio",
      loadWiki: "Load Wikipedia summary",
      wikiTitle: "Wikipedia Summary",
      wikiNote: "Optional. Needs internet.",
      copyLink: "Copy share link",
      dataTip: "Tip: Edit real info in js/district.js.",
      overviewTitle: "Overview",
      overviewSub: "Short explanation + what this district is known for.",
      quickTitle: "Quick intro",
      ruleTitle: "Old-school rule:",
      ruleBody: "Keep it simple, verify locally, and respect culture.",
      highlightsTitle: "Top highlights",
      todoTitle: "Things to do",
      todoSub: "Classic activities + local culture.",
      todo1: "Visit main spots",
      todo2: "Food to try",
      todo3: "Local manners",
      travelTitle: "How to go",
      travelSub: "Template routes — update with real details later.",
      routeTitle: "Common routes",
      tipsTitle: "Practical tips",
      stayTitle: "Stay & budget",
      staySub: "Example only — update later.",
      budgetTitle: "Example budget (per day)",
      safetyTitle: "Safety",
      bestSeason: "Best season",
      tripStyle: "Trip style",
      budgetTag: "Budget",
      provinceLabel: "Province"
    },
    ne: {
      navOverview: "परिचय",
      navTodo: "के गर्ने",
      navTravel: "कसरी जाने",
      navStay: "बसाइ/बजेट",
      backNepal: "← फर्क",
      backPortfolio: "Portfolio",
      loadWiki: "Wikipedia summary",
      wikiTitle: "Wikipedia Summary",
      wikiNote: "Internet चाहिन्छ।",
      copyLink: "लिङ्क कपी",
      dataTip: "Tip: Real info js/district.js मा edit गर।",
      overviewTitle: "परिचय",
      overviewSub: "छोटो कुरा + केका लागि चिनिन्छ।",
      quickTitle: "छोटो परिचय",
      ruleTitle: "पुरानो नियम:",
      ruleBody: "Simple राख, locally verify गर, culture respect गर।",
      highlightsTitle: "मुख्य highlight",
      todoTitle: "के गर्ने",
      todoSub: "Classic activity + culture.",
      todo1: "ठाउँ घुम्ने",
      todo2: "खानेकुरा",
      todo3: "शिष्टाचार",
      travelTitle: "कसरी जाने",
      travelSub: "Template route — पछि update।",
      routeTitle: "Route",
      tipsTitle: "Tips",
      stayTitle: "बसाइ/बजेट",
      staySub: "Example मात्र।",
      budgetTitle: "Budget (example/day)",
      safetyTitle: "सुरक्षा",
      bestSeason: "उत्तम सिजन",
      tripStyle: "Trip type",
      budgetTag: "Budget",
      provinceLabel: "प्रदेश"
    },
    ja: {
      navOverview: "概要",
      navTodo: "やること",
      navTravel: "行き方",
      navStay: "宿/予算",
      backNepal: "← 戻る",
      backPortfolio: "Portfolio",
      loadWiki: "Wikipedia要約",
      wikiTitle: "Wikipedia Summary",
      wikiNote: "ネット必須。",
      copyLink: "リンクコピー",
      dataTip: "Tip: 実データは js/district.js で編集。",
      overviewTitle: "概要",
      overviewSub: "短い説明＋特徴。",
      quickTitle: "短い紹介",
      ruleTitle: "昔ながらのルール：",
      ruleBody: "シンプルに。現地で確認。文化を尊重。",
      highlightsTitle: "ハイライト",
      todoTitle: "やること",
      todoSub: "定番＋文化。",
      todo1: "スポット巡り",
      todo2: "食べ物",
      todo3: "マナー",
      travelTitle: "行き方",
      travelSub: "テンプレート（後で更新）。",
      routeTitle: "ルート例",
      tipsTitle: "コツ",
      stayTitle: "宿/予算",
      staySub: "例のみ。",
      budgetTitle: "予算例(1日)",
      safetyTitle: "安全",
      bestSeason: "おすすめ季節",
      tripStyle: "旅行タイプ",
      budgetTag: "予算",
      provinceLabel: "州"
    },
    hi: {
      navOverview: "Overview",
      navTodo: "क्या करें",
      navTravel: "कैसे जाएँ",
      navStay: "रहना/बजट",
      backNepal: "← Back",
      backPortfolio: "Portfolio",
      loadWiki: "Wikipedia summary",
      wikiTitle: "Wikipedia Summary",
      wikiNote: "Internet चाहिए।",
      copyLink: "Link copy",
      dataTip: "Tip: Real info js/district.js में edit करो।",
      overviewTitle: "Overview",
      overviewSub: "Short + famous for what.",
      quickTitle: "Quick intro",
      ruleTitle: "Old rule:",
      ruleBody: "Simple रखो, locally verify करो, culture respect करो।",
      highlightsTitle: "Highlights",
      todoTitle: "Things to do",
      todoSub: "Classic activities + culture.",
      todo1: "Main spots",
      todo2: "Food",
      todo3: "Manners",
      travelTitle: "How to go",
      travelSub: "Template routes — बाद में update.",
      routeTitle: "Routes",
      tipsTitle: "Tips",
      stayTitle: "Stay & budget",
      staySub: "Example only.",
      budgetTitle: "Budget (example/day)",
      safetyTitle: "Safety",
      bestSeason: "Best season",
      tripStyle: "Trip type",
      budgetTag: "Budget",
      provinceLabel: "Province"
    }
  };

  function getLang() { return localStorage.getItem("lang") || "en"; }
  function setLang(lang) { localStorage.setItem("lang", lang); }
  function applyI18n(lang) {
    const dict = I18N[lang] || I18N.en;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const v = dict[key];
      if (typeof v === "string") el.textContent = v;
    });
  }

  // helpers for multi-language content
  function pickText(value, lang) {
    if (typeof value === "string") return value;
    if (value && typeof value === "object") return value[lang] || value.en || "";
    return "";
  }
  function pickList(value, lang) {
    if (Array.isArray(value)) return value;
    if (value && typeof value === "object") return value[lang] || value.en || [];
    return [];
  }

  // Multi-language district content (add more districts later)
  // ------------------------------
// ALL 77 Districts (auto generated, 4 languages) + Overrides
// ------------------------------

const ALL_DISTRICTS = [
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

// Rough terrain classification (best-effort template)
const MOUNTAIN_DISTRICTS = new Set([
  "Taplejung","Sankhuwasabha","Solukhumbu",
  "Dolakha","Rasuwa","Sindhupalchok",
  "Manang","Mustang",
  "Dolpa","Humla","Mugu","Jumla",
  "Darchula","Bajhang","Bajura",
  "Rukum East","Rukum West"
]);

const TERAI_DISTRICTS = new Set([
  // Koshi Terai / inner terai
  "Jhapa","Morang","Sunsari","Udayapur",
  // Bagmati
  "Chitwan","Makwanpur",
  // Gandaki
  "Nawalpur",
  // Lumbini
  "Banke","Bardiya","Dang","Kapilvastu","Rupandehi","Parasi (Nawalparasi West)",
  // Sudurpashchim
  "Kailali","Kanchanpur"
]);

function districtType(name, province) {
  if (province === "Madhesh") return "terai";
  if (TERAI_DISTRICTS.has(name)) return "terai";
  if (MOUNTAIN_DISTRICTS.has(name)) return "mountain";
  return "hill";
}

function labelsByType(type) {
  if (type === "mountain") {
    return {
      bestSeason: { en:"Spring / Autumn", ne:"वसन्त / शरद", ja:"春 / 秋", hi:"Spring / Autumn" },
      tripStyle:  { en:"Trekking + Nature", ne:"ट्रेकिङ + प्रकृति", ja:"トレッキング + 自然", hi:"Trekking + Nature" },
      budgetTag:  { en:"Medium–High", ne:"मध्यम–महँगो", ja:"中〜高", hi:"Medium–High" },
      budget:     { Food:"$3–$10", Stay:"$15–$50", LocalTravel:"$5–$25", Activities:"Permits/guide: varies" }
    };
  }
  if (type === "terai") {
    return {
      bestSeason: { en:"Winter / Autumn", ne:"जाडो / शरद", ja:"冬 / 秋", hi:"Winter / Autumn" },
      tripStyle:  { en:"Culture + Easy Travel", ne:"संस्कृति + सजिलो यात्रा", ja:"文化 + 移動しやすい", hi:"Culture + Easy Travel" },
      budgetTag:  { en:"Low–Medium", ne:"कम–मध्यम", ja:"低〜中", hi:"Low–Medium" },
      budget:     { Food:"$2–$7", Stay:"$10–$28", LocalTravel:"$2–$12", Activities:"Park/entry: varies" }
    };
  }
  // hill
  return {
    bestSeason: { en:"Autumn / Spring", ne:"शरद / वसन्त", ja:"秋 / 春", hi:"Autumn / Spring" },
    tripStyle:  { en:"Culture + Nature", ne:"संस्कृति + प्रकृति", ja:"文化 + 自然", hi:"Culture + Nature" },
    budgetTag:  { en:"Low–Medium", ne:"कम–मध्यम", ja:"低〜中", hi:"Low–Medium" },
    budget:     { Food:"$2–$8", Stay:"$10–$30", LocalTravel:"$2–$15", Activities:"Entry fees: varies" }
  };
}

function makeGenericDistrict(name, province) {
  const type = districtType(name, province);
  const labels = labelsByType(type);

  const oneLiner =
    type === "mountain" ? {
      en: `${name}: highland district—mountain views and trekking routes.`,
      ne: `${name}: उच्च हिमाली/पहाडी जिल्ला—हिमालको दृश्य र ट्रेकिङ।`,
      ja: `${name}：山岳エリア。眺望とトレッキングが魅力。`,
      hi: `${name}: पहाड़ी/हिमालयी जिला—mountain views और trekking।`
    } :
    type === "terai" ? {
      en: `${name}: Terai district—warm plains, bazaars, and easy road travel.`,
      ne: `${name}: तराई जिल्ला—समथर भूभाग, बजार, सडक यात्रा सजिलो।`,
      ja: `${name}：タライ平野。市場と移動しやすさ。`,
      hi: `${name}: तराई जिला—गरम plains, बाजार और easy road travel।`
    } : {
      en: `${name}: hill district—culture, villages, and scenic nature.`,
      ne: `${name}: पहाडी जिल्ला—संस्कृति, गाउँबस्ती, र प्राकृतिक दृश्य।`,
      ja: `${name}：丘陵地。文化と自然が楽しめます。`,
      hi: `${name}: पहाड़ी जिला—culture, गाँव और scenic nature।`
    };

  const overview =
    type === "mountain" ? {
      en: `${name} is in ${province} Province. Expect cooler weather, hills/mountains, and slower travel. Use this as a clean template and add verified local details later.`,
      ne: `${name} ${province} प्रदेशमा पर्छ। यहाँ मौसम चिसो हुन सक्छ र यात्रा ढिलो हुन सक्छ। यो template हो—पछाडि research गरेर detail थप।`,
      ja: `${name}は${province}州。寒暖差や移動時間に注意。テンプレとして使い、調べた内容を追記してください。`,
      hi: `${name} ${province} Province में है। मौसम cooler हो सकता है और travel slow हो सकता है। बाद में verified details add करो।`
    } :
    type === "terai" ? {
      en: `${name} is in ${province} Province. Expect warmer climate, markets, and easier road routes. Keep the info simple and update after research.`,
      ne: `${name} ${province} प्रदेशमा पर्छ। यहाँ गर्मी बढी हुन्छ, बजार र सडक route सजिलो हुन्छ। Research गरेपछि update गर।`,
      ja: `${name}は${province}州。暑い季節と市場、道路移動が中心。調べながら更新してください。`,
      hi: `${name} ${province} Province में है। मौसम गर्म हो सकता है, markets और road travel आसान। research के बाद update करो।`
    } : {
      en: `${name} is in ${province} Province. You’ll usually find hill culture, local bazaars, and short nature walks. Add your own researched highlights for accuracy.`,
      ne: `${name} ${province} प्रदेशमा पर्छ। पहाडी संस्कृति, बजार, र साना hike/walk भेटिन्छ। accuracy का लागि research गरेर थप।`,
      ja: `${name}は${province}州。丘陵の文化や市場、軽い散策が楽しめます。調査して追記しましょう。`,
      hi: `${name} ${province} Province में है। hill culture, local bazaar और short nature walks मिलते हैं। research करके add करो।`
    };

  const highlights =
    type === "mountain" ? {
      en: ["Viewpoints & ridgelines", "Trekking trails & villages", "Rivers/waterfalls", "Local temples/monasteries"],
      ne: ["भ्यू–पोइन्ट/डाँडाकाँडा", "ट्रेल/गाउँबस्ती", "नदी/झरना", "मन्दिर/गुम्बा"],
      ja: ["展望ポイント", "トレッキング道と村", "川・滝", "寺院・僧院"],
      hi: ["viewpoints", "trekking trails", "rivers/waterfalls", "temples/monasteries"]
    } :
    type === "terai" ? {
      en: ["Main bazaar & food streets", "Nearby rivers/parks", "Local culture & festivals", "Easy day trips to nearby towns"],
      ne: ["मुख्य बजार/खाना", "नदी/पार्क नजिक", "स्थानीय संस्कृति/पर्व", "नजिकका सहरतिर day trip"],
      ja: ["中心街と食", "川や公園", "文化と祭り", "近隣への日帰り"],
      hi: ["main bazaar/food", "rivers/parks", "culture/festivals", "nearby day trips"]
    } : {
      en: ["Old bazaar & town center", "Temples/stupas", "Short hikes/viewpoints", "Local homestays & culture"],
      ne: ["पुरानो बजार/टाउन", "मन्दिर/स्तूप", "सानो hike/भ्यू", "होमस्टे/संस्कृति"],
      ja: ["旧市街/中心部", "寺院・ストゥーパ", "軽いハイク", "ホームステイ文化"],
      hi: ["old bazaar/town", "temples/stupas", "short hike/viewpoints", "homestay/culture"]
    };

  const visit =
    type === "mountain" ? {
      en: "Start early, keep the plan simple, and leave buffer time for weather/road conditions.",
      ne: "बिहानै सुरु गर, plan simple राख, मौसम/सडकका लागि समय buffer राख।",
      ja: "早めに行動し、天候・道路状況に余裕を持たせましょう。",
      hi: "सुबह early start करो, plan simple रखो, weather/road के लिए buffer time रखो।"
    } :
    type === "terai" ? {
      en: "Plan for heat, visit markets, and keep afternoons light. Evening walks are usually nicer.",
      ne: "गर्मी ध्यान देऊ, बजार घुम, दिउँसो हल्का राख। साँझ घुम्न सजिलो हुन्छ।",
      ja: "暑さ対策をして市場へ。午後は無理せず、夕方散策が快適です。",
      hi: "heat का ध्यान रखो, market देखो, afternoon light रखो, evening walk best।"
    } : {
      en: "Walk through the town/bazaar, visit key temples, and take a short viewpoint hike if possible.",
      ne: "टाउन/बजार घुम, मुख्य मन्दिर हेर्नु, सके view point hike गर।",
      ja: "街歩き＋主要寺院。可能なら展望スポットへ軽くハイク。",
      hi: "town/bazaar घूमो, main temples देखो, possible हो तो viewpoint hike।"
    };

  const food =
    type === "terai" ? {
      en: "Try dal-bhat, momo, local snacks, and seasonal fruits. Keep it simple and hygienic.",
      ne: "दाल-भात, म:मो, स्थानीय snack, मौसमी फल। सफा ठाउँ रोज।",
      ja: "ダルバート、モモ、ローカル軽食、季節の果物。衛生に注意。",
      hi: "dal-bhat, momo, local snacks, seasonal fruits। hygienic जगह चुनो।"
    } : {
      en: "Try dal-bhat, momo, local pickles/snacks, and tea. Ask locals for simple recommendations.",
      ne: "दाल-भात, म:मो, अचार/स्थानीय snack, चिया। स्थानीयसँग सोध।",
      ja: "ダルバート、モモ、漬物/軽食、お茶。地元に聞くのが早い。",
      hi: "dal-bhat, momo, achar/snacks, tea। locals से पूछो।"
    };

  const manners = {
    en: ["Dress modestly in temples", "Remove shoes in sacred places", "Ask before taking photos", "Keep places clean"],
    ne: ["मन्दिरमा सभ्य पोशाक", "पवित्र ठाउँमा जुत्ता खोल्ने", "फोटो अघि सोध्ने", "फोहर नगर्ने"],
    ja: ["寺院では控えめな服装", "聖地では靴を脱ぐ", "写真は許可を取る", "清潔を守る"],
    hi: ["मंदिर में modest dress", "shoes off", "photo से पहले पूछो", "clean रखो"]
  };

  const routes = {
    en: [
      "From Kathmandu: bus/hiace/private vehicle (time depends on route)",
      "From province HQ/nearby city: local bus/taxi",
      "Last-mile: local jeep/taxi (confirm price)"
    ],
    ne: [
      "काठमाडौंबाट: bus/hiace/private (समय route अनुसार)",
      "प्रदेश HQ/नजिकको सहरबाट: local bus/taxi",
      "Last-mile: local jeep/taxi (price confirm)"
    ],
    ja: [
      "カトマンズ発：バス/ハイエース/車（所要は路線次第）",
      "州都・近隣都市から：ローカルバス/タクシー",
      "最後の移動：ジープ/タクシー（料金確認）"
    ],
    hi: [
      "Kathmandu से: bus/hiace/private (time route पर depend)",
      "Province HQ/nearby city से: local bus/taxi",
      "Last-mile: jeep/taxi (price confirm)"
    ]
  };

  const tips =
    type === "mountain" ? {
      en: ["Carry warm layer & rain cover", "Start early", "Check road/weather before leaving"],
      ne: ["न्यानो कपडा/रेन कभर", "बिहानै सुरु", "सडक/मौसम जाँच"],
      ja: ["防寒・雨具", "朝早く出発", "道路・天候を確認"],
      hi: ["warm layer/rain cover", "early start", "road/weather check"]
    } :
    type === "terai" ? {
      en: ["Carry water", "Sun protection", "Mosquito repellent in warm months"],
      ne: ["पानी बोकेर", "घामबाट बच्ने", "गर्मीमा mosquito repellent"],
      ja: ["水分補給", "日差し対策", "季節によって虫よけ"],
      hi: ["water", "sun protection", "mosquito repellent"]
    } : {
      en: ["Comfortable shoes", "Keep small cash", "Ask locals for the safest route"],
      ne: ["आरामदायी जुत्ता", "सानो cash", "सुरक्षित route स्थानीयसँग सोध"],
      ja: ["歩きやすい靴", "小銭", "安全な道は地元に確認"],
      hi: ["comfortable shoes", "small cash", "safe route locals से पूछो"]
    };

  const safety =
    type === "mountain" ? {
      en: ["Weather changes fast—carry basic gear", "Use trusted transport", "If trekking: inform someone and follow local rules"],
      ne: ["मौसम छिटो बदलिन सक्छ—basic gear", "trusted transport", "trekking भए: जानकारी दिएर नियम पालना"],
      ja: ["天候変化に注意", "信頼できる移動手段", "トレッキングはルール遵守・連絡"],
      hi: ["weather change fast", "trusted transport", "trekking में rules follow + inform someone"]
    } :
    type === "terai" ? {
      en: ["Stay hydrated", "Avoid isolated areas late night", "Keep documents safe"],
      ne: ["पानी/ORS", "राति एक्लै सुनसान ठाउँ नजानु", "कागजात सुरक्षित"],
      ja: ["脱水に注意", "深夜の人通り少ない場所は避ける", "書類を安全に"],
      hi: ["hydration", "late night isolated area avoid", "documents safe"]
    } : {
      en: ["Basic caution in crowded markets", "Use trusted transport at night", "Keep emergency contacts"],
      ne: ["भीडमा सावधानी", "राति trusted transport", "emergency contact राख"],
      ja: ["市場では注意", "夜は信頼できる移動", "緊急連絡先を控える"],
      hi: ["crowd caution", "night trusted transport", "emergency contacts"]
    };

  return {
    oneLiner,
    overview,
    bestSeason: labels.bestSeason,
    tripStyle: labels.tripStyle,
    budgetTag: labels.budgetTag,
    highlights,
    visit,
    food,
    manners,
    routes,
    tips,
    budget: labels.budget,
    safety
  };
}

// OVERRIDES: more detailed pages (keep adding later if you want)
const DISTRICT_OVERRIDES = {
  Kathmandu: {
    oneLiner: {
      en: "Capital district: heritage squares, temples, and city life.",
      ne: "राजधानी जिल्ला: दरबार स्क्वायर, मन्दिर, र सहर जीवन।",
      ja: "首都圏：歴史広場と寺院、街歩きが魅力。",
      hi: "राजधानी जिला: heritage squares, मंदिर और city life।"
    },
    overview: {
      en: "Kathmandu is Nepal’s capital district. It’s known for heritage areas, temples, old streets, and busy markets. Use this page as a base and update details as you research.",
      ne: "काठमाडौं नेपालकै राजधानी जिल्ला हो। यहाँ मन्दिर, बजार, र heritage क्षेत्रहरू प्रसिद्ध छन्। Research गर्दै detail थप्दै जानु।",
      ja: "カトマンズはネパールの首都エリア。寺院、市場、遺産エリアが有名です。調べながら更新しましょう。",
      hi: "काठमांडू नेपाल की राजधानी का जिला है। मंदिर, बाजार और heritage sites के लिए famous है।"
    },
    bestSeason: { en:"Autumn / Spring", ne:"शरद / वसन्त", ja:"秋 / 春", hi:"Autumn / Spring" },
    tripStyle:  { en:"City + Culture", ne:"सहर + संस्कृति", ja:"街 + 文化", hi:"City + Culture" },
    budgetTag:  { en:"Medium", ne:"मध्यम", ja:"中", hi:"Medium" },
    highlights: {
      en: ["Thamel", "Kathmandu Durbar Square", "Pashupatinath", "Boudhanath", "Swayambhunath"],
      ne: ["ठमेल", "काठमाडौं दरबार स्क्वायर", "पशुपतिनाथ", "बौद्धनाथ", "स्वयम्भूनाथ"],
      ja: ["タメル", "ダルバール広場", "パシュパティナート", "ボダナート", "スワヤンブナート"],
      hi: ["थमेल", "दरबार स्क्वायर", "पशुपतिनाथ", "बौद्धनाथ", "स्वयम्भूनाथ"]
    },
    visit: {
      en: "Do a heritage walk, explore local markets, and keep one day for slow city exploration (don’t rush).",
      ne: "Heritage walk, बजार, अनि एक दिन बिस्तारै city explore (हतार नगर्नु)।",
      ja: "予定を詰めすぎず、ゆっくり散策がコツ。",
      hi: "Heritage walk + market, और आराम से city explore करो।"
    },
    food: {
      en: "Try momo, dal-bhat, and Newari food (start simple).",
      ne: "म:मो, दाल-भात, नेवारी खाना ट्राइ गर।",
      ja: "モモ、ダルバート、ネワール料理がおすすめ。",
      hi: "मोमो, दाल-भात, नेवारी खाना try करो।"
    },
    manners: {
      en: ["Dress modestly in temples", "Remove shoes in religious places", "Ask before photos"],
      ne: ["मन्दिरमा सभ्य पोशाक", "धार्मिक ठाउँमा जुत्ता खोल्ने", "फोटो अघि अनुमति"],
      ja: ["寺院では控えめな服装", "宗教施設は靴を脱ぐ", "写真は一声かける"],
      hi: ["मंदिर में modest dress", "shoes off", "photo से पहले पूछो"]
    },
    routes: {
      en: ["International → TIA (Kathmandu)", "Domestic: bus/hiace/private vehicle", "Taxi: confirm price first"],
      ne: ["International → TIA", "Domestic: bus/hiace/private", "Taxi: price confirm"],
      ja: ["国際線：TIA", "国内：バス/車", "タクシー：料金確認"],
      hi: ["International: TIA", "Domestic: bus/vehicle", "Taxi: price confirm"]
    },
    tips: {
      en: ["Keep small cash", "Start early to avoid crowds", "Carry light jacket in cool months"],
      ne: ["सानो cash राख", "भीड कम गर्न बिहानै", "चिसो महिनामा jacket"],
      ja: ["小銭を用意", "朝早く行動", "季節で上着"],
      hi: ["छोटा cash", "सुबह early", "हल्का jacket"]
    },
    budget: { Food:"$2–$8", Stay:"$12–$35", LocalTravel:"$1–$12", Activities:"Entry fees: varies" },
    safety: {
      en: ["Watch belongings in crowds", "Use trusted transport at night", "Keep document copies"],
      ne: ["भीडमा सामान ध्यान", "राति trusted transport", "कागजातको copy"],
      ja: ["混雑では貴重品注意", "夜は信頼できる移動", "書類コピー"],
      hi: ["crowd में सामान ध्यान", "night trusted transport", "documents copy"]
    }
  },

  Rupandehi: {
    oneLiner: {
      en: "Terai district: Lumbini, Bhairahawa (Siddharthanagar), and easy routes.",
      ne: "तराई जिल्ला: लुम्बिनी, भैरहवा (सिद्धार्थनगर), र सजिलो route।",
      ja: "タライ地方：ルンビニとバイラワ周辺。",
      hi: "तराई जिला: लुंबिनी, भैरहवा और easy routes।"
    },
    overview: {
      en: "Rupandehi is in Lumbini Province, known for Lumbini (birthplace of Gautama Buddha) and Bhairahawa. Add verified details as you research.",
      ne: "रुपन्देही लुम्बिनी प्रदेशमा पर्छ। लुम्बिनी र भैरहवा क्षेत्रका कारण प्रसिद्ध छ। Research गरेर detail थप।",
      ja: "ルパンデヒはルンビニ州。ルンビニとバイラワ周辺で知られます。調べて追記しましょう。",
      hi: "रुपंदेही लुंबिनी प्रदेश में है। लुंबिनी और भैरहवा के लिए जाना जाता है।"
    },
    bestSeason: { en:"Autumn / Winter", ne:"शरद / जाडो", ja:"秋 / 冬", hi:"Autumn / Winter" },
    tripStyle:  { en:"Peace + Culture", ne:"शान्ति + संस्कृति", ja:"平和 + 文化", hi:"Peace + Culture" },
    budgetTag:  { en:"Low–Medium", ne:"कम–मध्यम", ja:"低〜中", hi:"Low–Medium" },
    highlights: {
      en: ["Lumbini (Maya Devi)", "Monastic Zone", "Peaceful cycling/walk", "Bhairahawa markets"],
      ne: ["लुम्बिनी/मायादेवी", "Monastic Zone", "साइकल/हिँडेर घुम्ने", "भैरहवा बजार"],
      ja: ["ルンビニ", "僧院地区", "散歩/自転車", "市場"],
      hi: ["लुंबिनी", "Monastic Zone", "walk/cycle", "market"]
    },
    visit: {
      en: "Start early at Lumbini, walk calmly, and keep a simple route plan.",
      ne: "बिहानै पुग, शान्त रूपमा हिँड, simple route राख।",
      ja: "朝早く、静かに散策。シンプルなルートで。",
      hi: "सुबह early, शांत walk, simple route।"
    },
    food: {
      en: "Simple Nepali meals are easy to find. Add real recommendations later.",
      ne: "साधारण नेपाली खाना पाइन्छ। पछि recommendation थप।",
      ja: "定番の食事が探しやすい。後でおすすめを追加。",
      hi: "simple Nepali meals मिलेंगे। बाद में add करो।"
    },
    manners: {
      en: ["Keep voice low in sacred areas", "Dress modestly", "Do not litter", "Follow photo rules"],
      ne: ["पवित्र क्षेत्रमा आवाज कम", "सभ्य पोशाक", "फोहर नगर्ने", "फोटो नियम पालना"],
      ja: ["聖地では静かに", "控えめな服装", "ゴミを捨てない", "撮影ルール遵守"],
      hi: ["आवाज कम", "modest dress", "litter मत करो", "photo rules follow"]
    },
    routes: {
      en: ["Kathmandu → Bhairahawa (bus/flight)", "Pokhara → Bhairahawa (bus/vehicle)", "Local: confirm price first"],
      ne: ["काठमाडौं → भैरहवा (bus/flight)", "पोखरा → भैरहवा", "Local: price confirm"],
      ja: ["カトマンズ→バイラワ（バス/航空）", "ポカラ→バイラワ", "料金確認"],
      hi: ["Kathmandu → Bhairahawa", "Pokhara → Bhairahawa", "price confirm"]
    },
    tips: {
      en: ["Carry water in hot months", "Sun protection helps", "Keep a calm schedule"],
      ne: ["गर्मीमा पानी", "घामबाट बच्ने", "calm schedule"],
      ja: ["水分補給", "日差し対策", "ゆったり計画"],
      hi: ["water", "sun protection", "calm schedule"]
    },
    budget: { Food:"$2–$6", Stay:"$10–$25", LocalTravel:"$1–$10", Activities:"Entry fees: varies" },
    safety: {
      en: ["Stay hydrated", "Use trusted transport", "Keep emergency contacts"],
      ne: ["पानी/ORS", "trusted transport", "emergency contact"],
      ja: ["脱水注意", "信頼できる移動", "緊急連絡先"],
      hi: ["hydration", "trusted transport", "emergency contacts"]
    }
},
       Lalitpur: {
    oneLiner: {
      en: "Heritage district: Patan crafts, old courtyards, and calm city walks.",
      ne: "heritage जिल्ला: पाटनका कला–हस्तकला, बहाल/चोक, र शान्त walk।",
      ja: "歴史地区：パタンの工芸と中庭、落ち着いた街歩き。",
      hi: "heritage जिला: Patan crafts, old courtyards और calm walk।"
    },
    overview: {
      en: "Lalitpur (Patan) is part of the Kathmandu Valley, famous for art, temples, and traditional neighborhoods—great for slow cultural exploration.",
      ne: "ललितपुर (पाटन) काठमाडौं उपत्यकाको हिस्सा हो। कला, मन्दिर, र पुराना बस्तीका लागि प्रसिद्ध—slow घुम्न राम्रो।",
      ja: "ラリトプル（パタン）は寺院と工芸の街。ゆっくり文化散策が向きます。",
      hi: "ललितपुर (Patan) valley का हिस्सा है—art, temples और traditional areas के लिए famous।"
    },
    bestSeason: { en:"Autumn / Spring", ne:"शरद / वसन्त", ja:"秋 / 春", hi:"Autumn / Spring" },
    tripStyle:  { en:"Heritage + Walk", ne:"heritage + walk", ja:"遺産 + 散策", hi:"Heritage + Walk" },
    budgetTag:  { en:"Medium", ne:"मध्यम", ja:"中", hi:"Medium" },
    highlights: {
      en: ["Patan Durbar Square", "Local craft shops", "Old courtyards (bahal)", "Museums & cafes"],
      ne: ["पाटन दरबार स्क्वायर", "हस्तकला पसल", "बहाल/चोक", "संग्रहालय/क्याफे"],
      ja: ["パタン・ダルバール広場", "工芸店", "中庭", "博物館/カフェ"],
      hi: ["Patan Durbar Square", "craft shops", "courtyards", "museum/cafe"]
    },
    visit: {
      en: "Walk the old lanes, visit key temples, then relax at a local cafe—don’t rush this district.",
      ne: "पुराना गल्ली हिँड, मुख्य मन्दिर हेर्नु, अनि क्याफेमा बस—यो ठाउँ हतार नगरी घुम।",
      ja: "路地散策→寺院→休憩。詰め込みすぎないのがコツ。",
      hi: "old lanes walk, temples देखो, cafe में आराम—rush मत करो।"
    },
    food: {
      en: "Try local momo/dal-bhat and simple Newari snacks.",
      ne: "म:मो/दाल-भात र साधारण नेवारी snack ट्राइ गर।",
      ja: "モモ、ダルバート、軽めのネワール軽食。",
      hi: "momo/dal-bhat और simple Newari snacks।"
    },
    manners: {
      en: ["Be respectful in temples", "Shoes off where required", "Ask before photos"],
      ne: ["मन्दिरमा आदर", "जहाँ चाहिन्छ जुत्ता खोल्ने", "फोटो अघि सोध्ने"],
      ja: ["寺院では敬意", "必要なら靴を脱ぐ", "写真は確認"],
      hi: ["temples में respect", "shoes off", "photo से पहले पूछो"]
    },
    routes: {
      en: ["From Kathmandu: taxi/ride apps/local bus", "Best explored on foot"],
      ne: ["काठमाडौंबाट: taxi/ride apps/local bus", "हिँडेर घुम्न सबैभन्दा राम्रो"],
      ja: ["カトマンズから近い。徒歩散策が最適。"],
      hi: ["Kathmandu से taxi/bus", "best on foot"]
    },
    tips: {
      en: ["Carry small cash", "Wear comfortable shoes", "Morning is quieter"],
      ne: ["सानो cash", "comfortable जुत्ता", "बिहान शान्त हुन्छ"],
      ja: ["小銭", "歩きやすい靴", "朝が静か"],
      hi: ["small cash", "comfortable shoes", "morning best"]
    },
    budget: { Food:"$2–$8", Stay:"$12–$40", LocalTravel:"$1–$10", Activities:"Entry fees: varies" },
    safety: {
      en: ["Crowds: watch belongings", "Use trusted transport at night"],
      ne: ["भीडमा सामान ध्यान", "राति trusted transport"],
      ja: ["混雑で貴重品注意", "夜は信頼できる移動"],
      hi: ["crowd में सामान ध्यान", "night trusted transport"]
    }
  },

  Bhaktapur: {
    oneLiner: {
      en: "Medieval city district: heritage squares, pottery, and classic architecture.",
      ne: "पुरानो सहर: heritage स्क्वायर, माटोका भाँडा, र पुरानो वास्तुकला।",
      ja: "中世の街：遺産広場と陶芸、伝統建築。",
      hi: "पुरानो city: heritage squares, pottery और classic architecture।"
    },
    overview: {
      en: "Bhaktapur is best for a full-day heritage walk—old squares, temples, and traditional lanes. Keep time for slow exploration.",
      ne: "भक्तपुर एक दिनभर heritage walk का लागि best हो—स्क्वायर, मन्दिर, पुराना गल्ली। बिस्तारै घुम्ने समय राख।",
      ja: "バクタプルは一日散策向き。広場と寺院、路地をゆっくり。",
      hi: "भक्तपुर full-day heritage walk के लिए best है—squares, temples, old lanes।"
    },
    bestSeason: { en:"Autumn / Spring", ne:"शरद / वसन्त", ja:"秋 / 春", hi:"Autumn / Spring" },
    tripStyle:  { en:"Heritage + Photo Walk", ne:"heritage + photo walk", ja:"遺産 + 写真散策", hi:"Heritage + Photo Walk" },
    budgetTag:  { en:"Medium", ne:"मध्यम", ja:"中", hi:"Medium" },
    highlights: {
      en: ["Bhaktapur Durbar Square", "Nyatapola area", "Pottery Square", "Traditional alleys"],
      ne: ["भक्तपुर दरबार स्क्वायर", "न्यातापोला वरिपरि", "पोटरी स्क्वायर", "पुराना गल्ली"],
      ja: ["ダルバール広場", "ニャタポラ周辺", "陶芸広場", "伝統の路地"],
      hi: ["Durbar Square", "Nyatapola area", "Pottery Square", "old alleys"]
    },
    visit: {
      en: "Go early, do one long walking loop, and take breaks—this place is best enjoyed slowly.",
      ne: "बिहानै पुग, लामो walking loop गर, बीचमा break राख—यो ठाउँ बिस्तारै मजा आउँछ।",
      ja: "朝早く→一周散策→休憩。ゆっくりが正解。",
      hi: "सुबह early, long walking loop, breaks लो—slow enjoy करो।"
    },
    food: {
      en: "Try local sweets/yogurt and simple Nepali meals.",
      ne: "स्थानीय मिठाइ/दही र साधारण नेपाली खाना ट्राइ गर।",
      ja: "ローカルの甘味やヨーグルト、定番の食事。",
      hi: "local sweets/yogurt और simple Nepali meals।"
    },
    manners: {
      en: ["Respect temple rules", "Don’t climb restricted areas", "Ask before photos of people"],
      ne: ["मन्दिरका नियम पालना", "restricted ठाउँमा नचढ्ने", "मानिसको फोटो अघि अनुमति"],
      ja: ["寺院のルール遵守", "立入禁止は入らない", "人物撮影は確認"],
      hi: ["temple rules follow", "restricted जगह मत जाओ", "photo से पहले पूछो"]
    },
    routes: {
      en: ["From Kathmandu: bus/hiace/taxi", "Inside city: mostly on foot"],
      ne: ["काठमाडौंबाट: bus/hiace/taxi", "सहरभित्र: हिँडेरै"],
      ja: ["カトマンズから近い。市内は徒歩中心。"],
      hi: ["Kathmandu से bus/taxi", "city अंदर walking best"]
    },
    tips: {
      en: ["Comfortable shoes", "Carry small cash", "Keep some time buffer for photos"],
      ne: ["comfortable जुत्ता", "सानो cash", "photo का लागि time buffer"],
      ja: ["歩きやすい靴", "小銭", "写真の時間を確保"],
      hi: ["comfortable shoes", "small cash", "photo time buffer"]
    },
    budget: { Food:"$2–$8", Stay:"$12–$35", LocalTravel:"$1–$10", Activities:"Entry fees: varies" },
    safety: {
      en: ["Watch belongings in crowds", "Evenings: use trusted transport"],
      ne: ["भीडमा सामान ध्यान", "साँझ: trusted transport"],
      ja: ["混雑で貴重品注意", "夜は信頼できる移動"],
      hi: ["crowd caution", "evening trusted transport"]
    }
  },

  Kaski: {
    oneLiner: {
      en: "Gateway district: Pokhara lakes, mountain views, and Annapurna access.",
      ne: "गेटवे जिल्ला: पोखराका ताल, हिमाल दृश्य, र अन्नपूर्णा access।",
      ja: "玄関口：ポカラの湖と山岳景観、アンナプルナへ。",
      hi: "gateway district: Pokhara lakes, mountain views और Annapurna access।"
    },
    overview: {
      en: "Kaski is known for Pokhara—easy lakeside walks, viewpoints, and the starting point for many treks.",
      ne: "कास्की पोखराका कारण प्रसिद्ध छ—ताल वरिपरि walk, भ्यू–पोइन्ट, र धेरै trek को सुरुवात।",
      ja: "カスキーはポカラで有名。湖畔散歩と展望、トレッキングの拠点です。",
      hi: "कास्की Pokhara के लिए famous है—lakeside walk, viewpoints और treks का base।"
    },
    bestSeason: { en:"Autumn / Spring", ne:"शरद / वसन्त", ja:"秋 / 春", hi:"Autumn / Spring" },
    tripStyle:  { en:"Lake + Views + Trek Base", ne:"ताल + दृश्य + trek base", ja:"湖 + 展望 + トレック拠点", hi:"Lake + Views + Trek Base" },
    budgetTag:  { en:"Medium", ne:"मध्यम", ja:"中", hi:"Medium" },
    highlights: {
      en: ["Lakeside", "Phewa Lake", "Sarangkot viewpoint", "Waterfalls & caves", "Peace Pagoda"],
      ne: ["लेकसाइड", "फेवा ताल", "साराङकोट भ्यू", "झरना/गुफा", "Peace Pagoda"],
      ja: ["レイクサイド", "フェワ湖", "サランコット展望", "滝/洞窟", "平和の塔"],
      hi: ["Lakeside", "Phewa Lake", "Sarangkot", "falls/caves", "Peace Pagoda"]
    },
    visit: {
      en: "Do sunrise viewpoint early, relax at the lake in daytime, and keep one slow day for strolling.",
      ne: "भ्यू–पोइन्ट sunrise बिहानै, दिउँसो ताल वरिपरि आराम, अनि एक दिन slow strolling राख।",
      ja: "早朝の展望→昼は湖畔→一日はのんびり散策。",
      hi: "sunrise early, daytime lake relax, और एक slow day strolling रखो।"
    },
    food: {
      en: "Plenty of simple Nepali food and cafes—don’t overthink it.",
      ne: "साधारण नेपाली खाना र क्याफे धेरै—simple राख।",
      ja: "定番の食事とカフェが多い。気楽に。",
      hi: "simple Nepali food + cafes plenty।"
    },
    manners: {
      en: ["Respect local neighborhoods", "Keep lakeside clean", "Ask before photos"],
      ne: ["स्थानीय बस्ती सम्मान", "ताल सफा राख", "फोटो अघि सोध"],
      ja: ["地域を尊重", "湖畔を綺麗に", "撮影は確認"],
      hi: ["local respect", "cleanliness", "photo ask"]
    },
    routes: {
      en: ["Kathmandu → Pokhara: tourist bus/flight", "Inside: walking/taxi"],
      ne: ["काठमाडौं → पोखरा: tourist bus/flight", "भित्र: हिँडेर/ट्याक्सी"],
      ja: ["カトマンズ→ポカラ：バス/航空", "市内：徒歩/タクシー"],
      hi: ["Kathmandu → Pokhara bus/flight", "inside walking/taxi"]
    },
    tips: {
      en: ["Morning is best for views", "Carry light rain cover", "Book trek logistics with trusted operators"],
      ne: ["दृश्यका लागि बिहान best", "हल्का rain cover", "trek trusted ठाउँबाट"],
      ja: ["景色は朝", "雨具", "トレックは信頼できる手配で"],
      hi: ["morning best", "rain cover", "trusted trek operator"]
    },
    budget: { Food:"$3–$10", Stay:"$15–$50", LocalTravel:"$2–$15", Activities:"Boating/entry: varies" },
    safety: {
      en: ["Boating: wear life jacket", "Night travel: trusted transport"],
      ne: ["डुंगा: life jacket", "राति: trusted transport"],
      ja: ["ボートは救命具", "夜は信頼できる移動"],
      hi: ["boating life jacket", "night trusted transport"]
    }
  },

  Chitwan: {
    oneLiner: {
      en: "Wildlife district: national park, river walks, and Tharu culture.",
      ne: "वन्यजन्तु जिल्ला: राष्ट्रिय निकुञ्ज, नदी किनार walk, थारु संस्कृति।",
      ja: "野生動物：国立公園と川沿い、タルー文化。",
      hi: "wildlife district: national park, river walks और Tharu culture।"
    },
    overview: {
      en: "Chitwan is popular for wildlife activities and easy nature travel. Plan around seasons and follow park rules.",
      ne: "चितवन वन्यजन्तु र nature travel का लागि popular छ। season अनुसार plan गर र park नियम पालना गर।",
      ja: "チトワンは野生動物体験が人気。季節とルールを守るのが大事。",
      hi: "चितवन wildlife experience के लिए famous है। season के हिसाब से plan करो और rules follow करो।"
    },
    bestSeason: { en:"Winter / Autumn", ne:"जाडो / शरद", ja:"冬 / 秋", hi:"Winter / Autumn" },
    tripStyle:  { en:"Wildlife + Nature", ne:"वन्यजन्तु + प्रकृति", ja:"野生動物 + 自然", hi:"Wildlife + Nature" },
    budgetTag:  { en:"Medium", ne:"मध्यम", ja:"中", hi:"Medium" },
    highlights: {
      en: ["National Park area", "River sunset", "Canoe/boat ride (where allowed)", "Tharu culture programs"],
      ne: ["निकुञ्ज क्षेत्र", "नदी किनार sunset", "क्यानो/बोट (जहाँ अनुमति)", "थारु संस्कृति कार्यक्रम"],
      ja: ["国立公園周辺", "川沿いの夕日", "カヌー（許可範囲）", "タルー文化"],
      hi: ["park area", "river sunset", "canoe (allowed)", "Tharu culture"]
    },
    visit: {
      en: "Do wildlife activities with licensed guides, keep noise low, and don’t rush schedules.",
      ne: "licensed guide संग wildlife activity गर, आवाज कम राख, schedule हतार नगर्नु।",
      ja: "ガイド同行で静かに行動。予定は詰めすぎない。",
      hi: "licensed guide के साथ, noise कम, schedule rush मत करो।"
    },
    food: {
      en: "Simple Nepali meals are easy—carry water in warm months.",
      ne: "साधारण नेपाली खाना सजिलै पाइन्छ—गर्मीमा पानी बोकेर।",
      ja: "定番の食事で十分。暑い時期は水分補給。",
      hi: "simple meals मिलेंगे— गर्मी में water carry करो।"
    },
    manners: {
      en: ["Follow park rules", "Don’t feed animals", "Respect local culture"],
      ne: ["park नियम पालना", "जनावरलाई खाना नखुवाउने", "स्थानीय संस्कृति सम्मान"],
      ja: ["公園ルール遵守", "動物に餌を与えない", "文化を尊重"],
      hi: ["rules follow", "animals को feed मत करो", "culture respect"]
    },
    routes: {
      en: ["Kathmandu/Pokhara → Chitwan: bus/hiace/private", "Local: taxi/jeep (confirm price)"],
      ne: ["काठमाडौं/पोखरा → चितवन: bus/hiace/private", "Local: taxi/jeep (price confirm)"],
      ja: ["カトマンズ/ポカラ→チトワン：バス等", "現地：料金確認"],
      hi: ["Kathmandu/Pokhara से bus", "local taxi price confirm"]
    },
    tips: {
      en: ["Mosquito repellent", "Light long sleeves", "Early morning is best for nature"],
      ne: ["mosquito repellent", "हल्का लामो sleeve", "nature का लागि बिहान best"],
      ja: ["虫よけ", "薄手の長袖", "朝が最適"],
      hi: ["repellent", "long sleeves", "morning best"]
    },
    budget: { Food:"$2–$7", Stay:"$12–$40", LocalTravel:"$2–$15", Activities:"Safari/entry: varies" },
    safety: {
      en: ["Use guides for wildlife areas", "Keep safe distance from animals"],
      ne: ["wildlife क्षेत्रमा guide प्रयोग", "जनावरबाट दूरी राख"],
      ja: ["野生動物はガイド同行", "距離を保つ"],
      hi: ["guide use करो", "animals से distance रखो"]
    }
  },

  Ilam: {
    oneLiner: {
      en: "Hill district: tea gardens, cool air, and quiet viewpoints.",
      ne: "पहाडी जिल्ला: चिया बगान, चिसो हावा, शान्त भ्यू–पोइन्ट।",
      ja: "丘陵地：茶畑と涼しい空気、静かな展望。",
      hi: "hill district: tea gardens, cool air और viewpoints।"
    },
    overview: {
      en: "Ilam is popular for tea landscapes and relaxed hill travel. Best enjoyed with homestays and slow mornings.",
      ne: "ईलाम चिया landscape र आरामदायी पहाडी यात्रा लागि popular छ। homestay र slow morning मा मजा आउँछ।",
      ja: "イラムは茶畑の景観が魅力。ゆっくり滞在が向きます。",
      hi: "Ilam tea landscape के लिए famous है—homestay और slow travel best।"
    },
    bestSeason: { en:"Spring / Autumn", ne:"वसन्त / शरद", ja:"春 / 秋", hi:"Spring / Autumn" },
    tripStyle:  { en:"Tea + Nature", ne:"चिया + प्रकृति", ja:"茶畑 + 自然", hi:"Tea + Nature" },
    budgetTag:  { en:"Low–Medium", ne:"कम–मध्यम", ja:"低〜中", hi:"Low–Medium" },
    highlights: {
      en: ["Tea gardens", "Viewpoints", "Local markets", "Homestay culture"],
      ne: ["चिया बगान", "भ्यू–पोइन्ट", "स्थानीय बजार", "होमस्टे संस्कृति"],
      ja: ["茶畑", "展望スポット", "市場", "ホームステイ"],
      hi: ["tea gardens", "viewpoints", "local market", "homestay"]
    },
    visit: {
      en: "Do tea-garden walks in the morning, viewpoint in late afternoon, and keep evenings quiet.",
      ne: "बिहान चिया-बगान walk, बेलुका तिर viewpoint, राति शान्त राख।",
      ja: "朝は茶畑散歩、夕方に展望。夜は静かに。",
      hi: "morning tea walk, शाम viewpoint, evening calm रखो।"
    },
    food: {
      en: "Simple Nepali meals + warm tea—easy and comforting.",
      ne: "साधारण नेपाली खाना + तातो चिया—simple र राम्रो।",
      ja: "定番の食事と温かいお茶。",
      hi: "simple meals + tea best।"
    },
    manners: {
      en: ["Respect farms and private areas", "Don’t litter", "Ask before photos"],
      ne: ["खेत/निजी क्षेत्र सम्मान", "फोहर नगर्ने", "फोटो अघि सोध्ने"],
      ja: ["農地と私有地を尊重", "ゴミは持ち帰る", "撮影は確認"],
      hi: ["farms respect", "litter मत करो", "photo पूछो"]
    },
    routes: {
      en: ["Reach eastern hubs by bus/flight, then road to Ilam", "Local: jeep/taxi (confirm price)"],
      ne: ["पहिला पूर्वतिर hub, अनि road बाट ईलाम", "Local: jeep/taxi (price confirm)"],
      ja: ["東部の拠点→車でイラムへ。料金確認。"],
      hi: ["eastern hub से road", "local jeep/taxi price confirm"]
    },
    tips: {
      en: ["Carry light jacket", "Road travel takes time—buffer it", "Best photos in morning light"],
      ne: ["हल्का jacket", "सडक यात्रा ढिलो—buffer राख", "बिहान फोटो राम्रो"],
      ja: ["上着", "移動時間に余裕", "朝の光が綺麗"],
      hi: ["light jacket", "travel time buffer", "morning photos"]
    },
    budget: { Food:"$2–$7", Stay:"$10–$28", LocalTravel:"$3–$15", Activities:"Mostly free/low" },
    safety: {
      en: ["Roads can be foggy—travel in daylight", "Use trusted vehicles"],
      ne: ["कुहिरो हुन सक्छ—दिनमै यात्रा", "trusted गाडी प्रयोग"],
      ja: ["霧に注意。日中移動が安心。"],
      hi: ["fog possible—day travel", "trusted vehicle"]
    }
  },

  Jhapa: {
    oneLiner: {
      en: "Eastern Terai district: transport hub, bazaars, and border access.",
      ne: "पूर्वी तराई: transport hub, बजार, र सिमाना access।",
      ja: "東部タライ：交通拠点と市場、国境アクセス。",
      hi: "eastern Terai: transport hub, bazaars और border access।"
    },
    overview: {
      en: "Jhapa is a key eastern entry district—good for transit, shopping, and as a base to reach nearby hill areas.",
      ne: "झापा पूर्वतिरको मुख्य entry जिल्ला हो—ट्रान्जिट, बजार, र नजिकका पहाडी ठाउँतिर जान base।",
      ja: "ジャパは東部の玄関口。移動や市場、周辺への拠点に便利。",
      hi: "Jhapa eastern entry district है—transit, markets और nearby hill areas के लिए base।"
    },
    bestSeason: { en:"Winter / Autumn", ne:"जाडो / शरद", ja:"冬 / 秋", hi:"Winter / Autumn" },
    tripStyle:  { en:"Easy Travel + Markets", ne:"सजिलो यात्रा + बजार", ja:"移動しやすい + 市場", hi:"Easy Travel + Markets" },
    budgetTag:  { en:"Low–Medium", ne:"कम–मध्यम", ja:"低〜中", hi:"Low–Medium" },
    highlights: {
      en: ["Main bazaars", "Transit towns", "Local food streets", "Gateway to nearby destinations"],
      ne: ["मुख्य बजार", "ट्रान्जिट टाउन", "खाना street", "नजिकका गन्तव्यतिर gate"],
      ja: ["中心市場", "交通の町", "食の通り", "周辺への入口"],
      hi: ["main bazaar", "transit towns", "food streets", "gateway"]
    },
    visit: {
      en: "Keep it simple: markets + food + rest. Use it as a practical stop on a longer trip.",
      ne: "simple राख: बजार + खाना + आराम। लामो यात्रामा practical stop बनाउ।",
      ja: "市場と食事、休憩中心。長旅の途中に便利。",
      hi: "simple रखो: market + food + rest। practical stop बनाओ।"
    },
    food: {
      en: "Street snacks and simple Nepali meals—choose clean shops.",
      ne: "street snack र नेपाली खाना—सफा पसल छान।",
      ja: "軽食と定番の食事。清潔なお店を選ぶ。",
      hi: "street snacks + simple meals—clean shop चुनो।"
    },
    manners: {
      en: ["Be polite in crowded markets", "Keep cash secure", "Ask before photos"],
      ne: ["भीडमा शिष्ट", "cash सुरक्षित", "फोटो अघि सोध"],
      ja: ["混雑では丁寧に", "現金管理", "撮影は確認"],
      hi: ["crowd manners", "cash secure", "photo पूछो"]
    },
    routes: {
      en: ["By road from major cities", "If flying: nearby regional airport + road connection"],
      ne: ["सडकबाट", "flight भए: regional airport + road"],
      ja: ["陸路中心。航空＋陸路の組み合わせも。"],
      hi: ["road routes", "flight + road possible"]
    },
    tips: {
      en: ["Heat can be strong—carry water", "Plan daytime travel", "Use it as a base for eastern trips"],
      ne: ["गर्मी—पानी", "दिनमै यात्रा", "पूर्वतिर घुम्न base बनाउ"],
      ja: ["暑さ対策", "日中移動", "東部旅行の拠点に"],
      hi: ["heat—water", "day travel", "eastern base"]
    },
    budget: { Food:"$2–$7", Stay:"$10–$25", LocalTravel:"$2–$12", Activities:"Low" },
    safety: {
      en: ["Crowds: watch belongings", "Night: trusted transport"],
      ne: ["भीडमा सामान ध्यान", "राति trusted transport"],
      ja: ["混雑注意", "夜は信頼できる移動"],
      hi: ["crowd caution", "night trusted transport"]
    }
  },

  Sunsari: {
    oneLiner: {
      en: "Terai district: Dharan/Itahari area—markets, temples, and easy routes.",
      ne: "तराई जिल्ला: धरान/इटहरी क्षेत्र—बजार, मन्दिर, सजिलो route।",
      ja: "タライ：ダラン/イタハリ周辺。市場と寺院。",
      hi: "Terai district: Dharan/Itahari—markets, temples, easy routes।"
    },
    overview: {
      en: "Sunsari is a lively Terai district with city energy and nearby nature spots. Good for short stays and transit.",
      ne: "सुनसरी चलायमान तराई जिल्ला हो—city energy र नजिकका nature spot। छोटो stay र ट्रान्जिटका लागि राम्रो।",
      ja: "スンサリは活気あるタライ。短期滞在や移動拠点に便利。",
      hi: "Sunsari lively district है—city energy + nearby nature spots।"
    },
    bestSeason: { en:"Winter / Autumn", ne:"जाडो / शरद", ja:"冬 / 秋", hi:"Winter / Autumn" },
    tripStyle:  { en:"City + Local Culture", ne:"सहर + स्थानीय संस्कृति", ja:"街 + ローカル文化", hi:"City + Local Culture" },
    budgetTag:  { en:"Low–Medium", ne:"कम–मध्यम", ja:"低〜中", hi:"Low–Medium" },
    highlights: {
      en: ["Local markets", "Temple visits", "City walks", "Nearby nature areas (day trips)"],
      ne: ["स्थानीय बजार", "मन्दिर भ्रमण", "city walk", "नजिकका nature area (day trip)"],
      ja: ["市場", "寺院", "街歩き", "近郊の自然（日帰り）"],
      hi: ["markets", "temples", "city walk", "nearby day trips"]
    },
    visit: {
      en: "Walk the town center, eat local food, and keep one day for a nearby day-trip if you have time.",
      ne: "टाउन सेन्टर घुम, स्थानीय खाना खानु, समय भए नजिक day-trip राख।",
      ja: "中心街→食事→時間があれば近郊へ日帰り。",
      hi: "town center घूमो, local food, और time हो तो nearby day-trip।"
    },
    food: {
      en: "Simple meals and snacks are easy—drink safe water.",
      ne: "साधारण खाना/snack सजिलै—safe पानी पिउ।",
      ja: "食事は探しやすい。飲料水に注意。",
      hi: "simple meals/snacks—safe water ध्यान।"
    },
    manners: {
      en: ["Be patient in traffic", "Respect temple rules", "Ask before photos"],
      ne: ["traffic मा धैर्य", "मन्दिर नियम पालना", "फोटो अघि सोध"],
      ja: ["渋滞は余裕", "寺院ルール遵守", "撮影確認"],
      hi: ["traffic patience", "temple rules", "photo पूछो"]
    },
    routes: {
      en: ["Road hub connections", "Local taxi/jeep (confirm price)"],
      ne: ["road hub connection", "local taxi/jeep (price confirm)"],
      ja: ["道路の要所。料金は事前確認。"],
      hi: ["road hub", "local taxi price confirm"]
    },
    tips: {
      en: ["Carry water in hot months", "Keep small cash", "Daytime travel is easier"],
      ne: ["गर्मीमा पानी", "सानो cash", "दिनमै यात्रा सजिलो"],
      ja: ["水分補給", "小銭", "日中移動が楽"],
      hi: ["water", "small cash", "day travel"]
    },
    budget: { Food:"$2–$7", Stay:"$10–$25", LocalTravel:"$2–$12", Activities:"Low" },
    safety: {
      en: ["Crowds: watch belongings", "Night: use trusted transport"],
      ne: ["भीडमा सामान ध्यान", "राति trusted transport"],
      ja: ["混雑注意", "夜は信頼できる移動"],
      hi: ["crowd caution", "night trusted transport"]
    }
  },

  Solukhumbu: {
    oneLiner: {
      en: "Mountain district: Everest region trekking and Sherpa culture.",
      ne: "हिमाली जिल्ला: एभरेस्ट क्षेत्र ट्रेकिङ र शेर्पा संस्कृति।",
      ja: "山岳地帯：エベレスト方面のトレックとシェルパ文化。",
      hi: "mountain district: Everest trekking और Sherpa culture।"
    },
    overview: {
      en: "Solukhumbu is famous worldwide for Everest-region routes. Travel can be slower—plan buffers and follow local rules.",
      ne: "सोलुखुम्बु एभरेस्ट क्षेत्रका कारण विश्वभर प्रसिद्ध छ। यात्रा ढिलो हुन सक्छ—buffer राख र नियम पालना गर।",
      ja: "ソルクンブはエベレスト方面で有名。移動に余裕を持ち、ルール遵守。",
      hi: "Solukhumbu Everest region के लिए world-famous है। travel slow हो सकता है—buffer रखो।"
    },
    bestSeason: { en:"Spring / Autumn", ne:"वसन्त / शरद", ja:"春 / 秋", hi:"Spring / Autumn" },
    tripStyle:  { en:"Trekking + Culture", ne:"ट्रेकिङ + संस्कृति", ja:"トレッキング + 文化", hi:"Trekking + Culture" },
    budgetTag:  { en:"Medium–High", ne:"मध्यम–महँगो", ja:"中〜高", hi:"Medium–High" },
    highlights: {
      en: ["Trekking trails", "Mountain viewpoints", "Monasteries", "Village stays"],
      ne: ["ट्रेल", "भ्यू–पोइन्ट", "गुम्बा", "गाउँमा बसाइ"],
      ja: ["トレイル", "展望", "僧院", "村滞在"],
      hi: ["trails", "viewpoints", "monasteries", "village stays"]
    },
    visit: {
      en: "Acclimatize properly, keep the pace slow, and don’t ignore weather/flight risks.",
      ne: "acclimatize राम्ररी, pace slow राख, मौसम/flight risk बेवास्ता नगर।",
      ja: "高度順応を優先。ペースはゆっくり、天候リスクに注意。",
      hi: "acclimatize सही से, pace slow, weather/flight risk ignore मत करो।"
    },
    food: {
      en: "Simple meals and hot drinks—eat clean and stay hydrated.",
      ne: "simple खाना र तातो drink—सफा खाने, hydration राख।",
      ja: "温かい食事と飲み物。衛生と水分補給。",
      hi: "simple food + hot drinks—clean + hydrated रहो।"
    },
    manners: {
      en: ["Respect local culture", "Keep trails clean", "Ask before photos in villages"],
      ne: ["स्थानीय संस्कृति सम्मान", "ट्रेल सफा", "गाउँमा फोटो अघि सोध"],
      ja: ["文化を尊重", "トレイルを綺麗に", "撮影確認"],
      hi: ["culture respect", "trail clean", "photo ask"]
    },
    routes: {
      en: ["Access via air/road routes depending on plan", "Local guides/permits may apply"],
      ne: ["plan अनुसार air/road access", "guide/permit लाग्न सक्छ"],
      ja: ["計画により航空/陸路。ガイドや許可が必要な場合あり。"],
      hi: ["plan पर air/road", "guide/permit may apply"]
    },
    tips: {
      en: ["Warm layers", "Rain cover", "Keep extra days in itinerary"],
      ne: ["न्यानो कपडा", "rain cover", "itinerary मा extra day"],
      ja: ["防寒", "雨具", "予備日を確保"],
      hi: ["warm layers", "rain cover", "extra days"]
    },
    budget: { Food:"$3–$10", Stay:"$15–$60", LocalTravel:"$5–$25", Activities:"Permits/guide: varies" },
    safety: {
      en: ["Altitude and weather are real—don’t push", "Use trusted operators"],
      ne: ["उचाइ/मौसम गम्भीर—दबाब नदिनु", "trusted operator"],
      ja: ["高度と天候に注意。無理しない。"],
      hi: ["altitude/weather serious—push मत करो", "trusted operator"]
    }
  },

  Mustang: {
    oneLiner: {
      en: "Trans-Himalayan district: dry valleys, strong culture, and dramatic landscapes.",
      ne: "ट्रान्स-हिमाली: सुख्खा उपत्यका, गहिरो संस्कृति, र दमदार दृश्य।",
      ja: "トランス・ヒマラヤ：乾いた谷と文化、圧倒的景観。",
      hi: "trans-Himalayan: dry valleys, culture और dramatic landscapes।"
    },
    overview: {
      en: "Mustang is known for its unique landscapes and mountain culture. Conditions can be windy/cold—plan properly.",
      ne: "मुस्ताङ unique दृश्य र हिमाली संस्कृतिका लागि प्रसिद्ध छ। हावा/चिसो हुन सक्छ—plan राम्रो गर।",
      ja: "ムスタンは独特の景観と文化。風と寒さに備える。",
      hi: "Mustang unique landscape और culture के लिए famous है। wind/cold हो सकता है।"
    },
    bestSeason: { en:"Spring / Autumn", ne:"वसन्त / शरद", ja:"春 / 秋", hi:"Spring / Autumn" },
    tripStyle:  { en:"Culture + Trek", ne:"संस्कृति + trek", ja:"文化 + トレック", hi:"Culture + Trek" },
    budgetTag:  { en:"Medium–High", ne:"मध्यम–महँगो", ja:"中〜高", hi:"Medium–High" },
    highlights: {
      en: ["Mountain valleys", "Cultural sites", "Viewpoints", "Scenic drives"],
      ne: ["उपत्यका", "सांस्कृतिक स्थल", "भ्यू–पोइन्ट", "scenic drive"],
      ja: ["谷の景観", "文化スポット", "展望", "景観ドライブ"],
      hi: ["valleys", "culture sites", "viewpoints", "scenic drive"]
    },
    visit: {
      en: "Keep days flexible, start early, and don’t underestimate road/weather delays.",
      ne: "दिन flexible राख, बिहानै सुरु गर, सडक/मौसम delay underestimate नगर।",
      ja: "日程に余裕。早出、道路・天候の遅れを想定。",
      hi: "days flexible रखो, early start, road/weather delays मानकर चलो।"
    },
    food: {
      en: "Warm, simple meals help in cold weather—keep it clean.",
      ne: "चिसोमा तातो simple खाना राम्रो—सफा राख।",
      ja: "寒い時は温かい食事。衛生重視。",
      hi: "cold में warm simple food best।"
    },
    manners: {
      en: ["Respect monasteries and local customs", "Ask before photos"],
      ne: ["गुम्बा/रितिरिवाज सम्मान", "फोटो अघि सोध"],
      ja: ["僧院と習慣を尊重", "撮影確認"],
      hi: ["customs respect", "photo पूछो"]
    },
    routes: {
      en: ["Via Pokhara and mountain road routes (plan buffers)", "Local permits/route rules may apply"],
      ne: ["पोखरा हुँदै पहाडी route (buffer राख)", "permit/नियम लाग्न सक्छ"],
      ja: ["ポカラ経由の山岳ルート。予備日確保。"],
      hi: ["Pokhara via mountain routes", "buffers रखो"]
    },
    tips: {
      en: ["Windproof jacket", "Sunscreen", "Carry cash—ATMs may be limited"],
      ne: ["windproof jacket", "sunscreen", "cash बोकेर (ATM कम हुन सक्छ)"],
      ja: ["防風", "日焼け止め", "現金を用意"],
      hi: ["windproof", "sunscreen", "cash carry"]
    },
    budget: { Food:"$3–$10", Stay:"$15–$60", LocalTravel:"$5–$30", Activities:"Permits: varies" },
    safety: {
      en: ["Don’t rush at altitude", "Trusted transport only"],
      ne: ["उचाइमा हतार नगर्नु", "trusted transport मात्र"],
      ja: ["高度で無理しない", "信頼できる移動のみ"],
      hi: ["altitude में rush मत करो", "trusted transport"]
    }
  },

  Manang: {
    oneLiner: {
      en: "High-altitude district: trekking routes, lakes, and mountain villages.",
      ne: "उचाइको जिल्ला: ट्रेकिङ route, ताल, र हिमाली गाउँ।",
      ja: "高地：トレイル、湖、山の村。",
      hi: "high-altitude district: trekking routes, lakes और mountain villages।"
    },
    overview: {
      en: "Manang is a classic high-altitude trekking region. Acclimatization and weather planning are essential.",
      ne: "मनाङ उचाइको trekking क्षेत्र हो। acclimatization र मौसम planning अनिवार्य छ।",
      ja: "マナンは高地トレックの定番。高度順応と天候計画が必須。",
      hi: "Manang high-altitude trekking region है। acclimatization + weather planning जरूरी।"
    },
    bestSeason: { en:"Spring / Autumn", ne:"वसन्त / शरद", ja:"春 / 秋", hi:"Spring / Autumn" },
    tripStyle:  { en:"Trekking + High Altitude", ne:"ट्रेकिङ + उचाइ", ja:"トレック + 高地", hi:"Trekking + High Altitude" },
    budgetTag:  { en:"Medium–High", ne:"मध्यम–महँगो", ja:"中〜高", hi:"Medium–High" },
    highlights: {
      en: ["High-altitude villages", "Viewpoints", "Lakes (season/route dependent)", "Mountain trails"],
      ne: ["हिमाली गाउँ", "भ्यू–पोइन्ट", "ताल (route अनुसार)", "ट्रेल"],
      ja: ["高地の村", "展望", "湖（ルート次第）", "山道"],
      hi: ["villages", "viewpoints", "lakes (route)", "trails"]
    },
    visit: {
      en: "Add rest days, drink water, and keep the pace slow—health first.",
      ne: "rest day राख, पानी धेरै, pace slow—पहिले स्वास्थ्य।",
      ja: "休養日を入れて水分。無理しない。",
      hi: "rest days रखो, water, pace slow—health first।"
    },
    food: {
      en: "Warm meals and soups help—eat clean and consistent.",
      ne: "तातो खाना/सूप राम्रो—सफा र consistent।",
      ja: "温かい食事やスープ。衛生重視。",
      hi: "warm meals/soup best।"
    },
    manners: {
      en: ["Respect local culture", "Keep trails clean", "Ask before photos"],
      ne: ["संस्कृति सम्मान", "ट्रेल सफा", "फोटो अघि सोध"],
      ja: ["文化尊重", "清掃", "撮影確認"],
      hi: ["culture respect", "trail clean", "photo ask"]
    },
    routes: {
      en: ["Access via mountain roads and trekking routes (season dependent)"],
      ne: ["season अनुसार पहाडी सडक/ट्रेलबाट access"],
      ja: ["季節により道路/トレイルでアクセス"],
      hi: ["season dependent road/trek access"]
    },
    tips: {
      en: ["Warm layers", "Rain cover", "Extra days in itinerary"],
      ne: ["न्यानो कपडा", "rain cover", "extra days"],
      ja: ["防寒", "雨具", "予備日"],
      hi: ["warm layers", "rain cover", "extra days"]
    },
    budget: { Food:"$3–$10", Stay:"$15–$60", LocalTravel:"$5–$25", Activities:"Permits/guide: varies" },
    safety: {
      en: ["Altitude sickness is real—don’t push", "Use trusted guides if trekking"],
      ne: ["उचाइको समस्या गम्भीर—दबाब नदिनु", "trek गर्दा trusted guide"],
      ja: ["高山病に注意", "必要ならガイド"],
      hi: ["altitude sickness real", "trusted guide"]
    }
  },

  Dolakha: {
    oneLiner: {
      en: "Hill/mountain district near the capital: temples, trails, and scenic drives.",
      ne: "राजधानी नजिक पहाडी/हिमाली जिल्ला: मन्दिर, ट्रेल, scenic drive।",
      ja: "首都近郊の山岳：寺院と景観ドライブ。",
      hi: "hill/mountain district: temples, trails और scenic drives।"
    },
    overview: {
      en: "Dolakha is a practical mountain-facing district for short trips from Kathmandu—good if you want hills and cooler air.",
      ne: "दोलखा काठमाडौंबाट छोटो trips का लागि practical छ—हावा चिसो, डाँडा/हिमालको feel।",
      ja: "ドーラカは首都からの短旅に便利。涼しく山の雰囲気。",
      hi: "Dolakha Kathmandu से short trip के लिए practical है—cool air और hills।"
    },
    bestSeason: { en:"Autumn / Spring", ne:"शरद / वसन्त", ja:"秋 / 春", hi:"Autumn / Spring" },
    tripStyle:  { en:"Nature + Temples", ne:"प्रकृति + मन्दिर", ja:"自然 + 寺院", hi:"Nature + Temples" },
    budgetTag:  { en:"Low–Medium", ne:"कम–मध्यम", ja:"低〜中", hi:"Low–Medium" },
    highlights: {
      en: ["Temple visits", "Hill viewpoints", "Local towns", "Short hikes"],
      ne: ["मन्दिर भ्रमण", "डाँडाको भ्यू", "स्थानीय बजार/टाउन", "सानो hike"],
      ja: ["寺院", "展望", "町歩き", "軽いハイク"],
      hi: ["temples", "viewpoints", "towns", "short hikes"]
    },
    visit: {
      en: "Go early from Kathmandu, keep the road day light, and do one simple hike/viewpoint.",
      ne: "काठमाडौंबाट बिहानै, दिनमै road travel, अनि एक simple hike/viewpoint।",
      ja: "朝出発→日中移動→軽い散策が安心。",
      hi: "morning start, day travel, और simple hike/viewpoint।"
    },
    food: {
      en: "Simple Nepali meals—carry snacks if you’re on the road long.",
      ne: "साधारण नेपाली खाना—road लामो भए snack बोकेर।",
      ja: "定番の食事。移動が長いなら軽食も。",
      hi: "simple meals—long road में snacks रखो।"
    },
    manners: {
      en: ["Respect temple rules", "Keep nature clean"],
      ne: ["मन्दिर नियम", "प्रकृति सफा"],
      ja: ["寺院ルール", "自然を綺麗に"],
      hi: ["temple rules", "nature clean"]
    },
    routes: {
      en: ["From Kathmandu: road travel (time depends on route/condition)"],
      ne: ["काठमाडौंबाट: road travel (route/सडक अनुसार समय)"],
      ja: ["カトマンズから陸路（道路状況で変動）"],
      hi: ["Kathmandu से road (time varies)"]
    },
    tips: {
      en: ["Buffer time for roads", "Carry light jacket", "Start early"],
      ne: ["सडकका लागि buffer", "हल्का jacket", "बिहानै सुरु"],
      ja: ["予備時間", "上着", "早出"],
      hi: ["buffer time", "jacket", "early start"]
    },
    budget: { Food:"$2–$8", Stay:"$10–$30", LocalTravel:"$3–$15", Activities:"Low/varies" },
    safety: {
      en: ["Road conditions change—avoid late-night travel"],
      ne: ["सडक बदलिन सक्छ—राति ढिलो यात्रा नगर्नु"],
      ja: ["道路状況に注意。夜遅くは避ける。"],
      hi: ["road condition changes—late night avoid"]
    }
  },

  Sindhupalchok: {
    oneLiner: {
      en: "Hill district close to Kathmandu: rivers, hot-spring areas, and valley hikes.",
      ne: "काठमाडौं नजिक: नदी, तातोपानी क्षेत्र, र valley hike।",
      ja: "首都近郊：川と温泉エリア、谷の散策。",
      hi: "Kathmandu near: rivers, hot-spring areas और valley hikes।"
    },
    overview: {
      en: "Sindhupalchok is often chosen for quick nature escapes from the capital—roads can be rough, so plan wisely.",
      ne: "सिन्धुपाल्चोक राजधानीबाट छिटो nature escape का लागि popular छ—सडक rough हुन सक्छ, plan राम्रो गर।",
      ja: "シンドゥパルチョークは首都からの自然旅。道路状況に注意。",
      hi: "Sindhupalchok capital से quick nature escape के लिए popular है—roads rough हो सकती हैं।"
    },
    bestSeason: { en:"Autumn / Spring", ne:"शरद / वसन्त", ja:"秋 / 春", hi:"Autumn / Spring" },
    tripStyle:  { en:"Nature + Short Hikes", ne:"प्रकृति + छोटो hike", ja:"自然 + 軽いハイク", hi:"Nature + Short Hikes" },
    budgetTag:  { en:"Low–Medium", ne:"कम–मध्यम", ja:"低〜中", hi:"Low–Medium" },
    highlights: {
      en: ["River viewpoints", "Hill villages", "Short hikes", "Local culture"],
      ne: ["नदी किनार दृश्य", "पहाडी गाउँ", "सानो hike", "स्थानीय संस्कृति"],
      ja: ["川の景色", "山村", "軽いハイク", "文化"],
      hi: ["river views", "villages", "short hikes", "culture"]
    },
    visit: {
      en: "Do a simple route: one viewpoint + one village walk, then return before dark.",
      ne: "simple route: एक viewpoint + एक गाउँ walk, अनि अँध्यारो अघि फर्क।",
      ja: "展望＋村散策のシンプル計画で、暗くなる前に戻る。",
      hi: "simple route: viewpoint + village walk, और dark से पहले वापस।"
    },
    food: {
      en: "Basic meals on the road—choose clean stops.",
      ne: "सडकमा basic खाना—सफा ठाउँ छान।",
      ja: "道中の食事は清潔な店を。",
      hi: "basic meals—clean stop चुनो।"
    },
    manners: {
      en: ["Respect local homes", "Keep nature clean"],
      ne: ["घरबास/स्थानीय सम्मान", "फोहर नगर्ने"],
      ja: ["地域を尊重", "自然を綺麗に"],
      hi: ["local respect", "litter मत करो"]
    },
    routes: {
      en: ["From Kathmandu: road travel (time varies by route)"],
      ne: ["काठमाडौंबाट: road travel (route अनुसार)"],
      ja: ["カトマンズから陸路（変動あり）"],
      hi: ["Kathmandu से road (varies)"]
    },
    tips: {
      en: ["Start early", "Buffer time for roads", "Carry water"],
      ne: ["बिहानै", "road buffer", "पानी"],
      ja: ["早出", "予備時間", "水分"],
      hi: ["early start", "buffer time", "water"]
    },
    budget: { Food:"$2–$8", Stay:"$10–$30", LocalTravel:"$3–$15", Activities:"Low/varies" },
    safety: {
      en: ["Avoid late-night road travel", "Use trusted transport"],
      ne: ["राति ढिलो यात्रा नगर्नु", "trusted transport"],
      ja: ["夜遅い移動は避ける", "信頼できる移動"],
      hi: ["late night avoid", "trusted transport"]
    }
  },

  Kavrepalanchok: {
    oneLiner: {
      en: "Valley-edge district: viewpoints, monasteries, and easy day trips from Kathmandu.",
      ne: "उपत्यका किनार: भ्यू–पोइन्ट, गुम्बा/मन्दिर, र काठमाडौंबाट सजिलो day trip।",
      ja: "谷の縁：展望と僧院、首都から日帰りしやすい。",
      hi: "valley-edge: viewpoints, monasteries और Kathmandu से easy day trips।"
    },
    overview: {
      en: "Kavrepalanchok is ideal for short peaceful trips—sunrise viewpoints, monastery visits, and relaxed hill towns.",
      ne: "काभ्रे छोटो शान्त यात्राका लागि ideal—sunrise viewpoint, गुम्बा/मन्दिर, र आरामदायी टाउन।",
      ja: "カブレは短い癒し旅に最適。展望と寺院、静かな町。",
      hi: "Kavre short peaceful trips के लिए ideal है—viewpoints और monastery visits।"
    },
    bestSeason: { en:"Autumn / Spring", ne:"शरद / वसन्त", ja:"秋 / 春", hi:"Autumn / Spring" },
    tripStyle:  { en:"Viewpoints + Culture", ne:"भ्यू–पोइन्ट + संस्कृति", ja:"展望 + 文化", hi:"Viewpoints + Culture" },
    budgetTag:  { en:"Low–Medium", ne:"कम–मध्यम", ja:"低〜中", hi:"Low–Medium" },
    highlights: {
      en: ["Sunrise viewpoints", "Monastery/temple areas", "Hill town walks", "Local markets"],
      ne: ["sunrise viewpoint", "गुम्बा/मन्दिर", "टाउन walk", "स्थानीय बजार"],
      ja: ["日の出展望", "寺院/僧院", "町歩き", "市場"],
      hi: ["sunrise viewpoints", "monastery/temples", "town walks", "markets"]
    },
    visit: {
      en: "Start early, do one viewpoint, then a calm cultural stop—perfect as a day trip.",
      ne: "बिहानै सुरु, एक viewpoint, अनि शान्त सांस्कृतिक stop—day trip का लागि perfect।",
      ja: "早朝出発→展望→文化スポット。日帰りに最適。",
      hi: "early start, viewpoint, फिर cultural stop—day trip perfect।"
    },
    food: {
      en: "Simple local meals—tea and snacks are common on routes.",
      ne: "साधारण स्थानीय खाना—route मा चिया/snack धेरै पाइन्छ।",
      ja: "定番の食事。道中はお茶と軽食が多い。",
      hi: "simple local meals—tea/snacks easy।"
    },
    manners: {
      en: ["Respect religious sites", "Keep places clean"],
      ne: ["धार्मिक स्थल सम्मान", "सफा राख"],
      ja: ["宗教施設を尊重", "清潔を守る"],
      hi: ["religious sites respect", "cleanliness"]
    },
    routes: {
      en: ["From Kathmandu: short road trip by bus/hiace/taxi"],
      ne: ["काठमाडौंबाट: छोटो road trip bus/hiace/taxi"],
      ja: ["カトマンズから短距離の陸路"],
      hi: ["Kathmandu से short road trip"]
    },
    tips: {
      en: ["Morning light is best", "Comfortable shoes", "Keep buffer for traffic"],
      ne: ["बिहानको light राम्रो", "comfortable जुत्ता", "traffic buffer"],
      ja: ["朝の光", "歩きやすい靴", "渋滞に余裕"],
      hi: ["morning light", "comfortable shoes", "traffic buffer"]
    },
    budget: { Food:"$2–$8", Stay:"$10–$30", LocalTravel:"$2–$12", Activities:"Low/varies" },
    safety: {
      en: ["Daytime travel is easier", "Use trusted transport"],
      ne: ["दिनमै यात्रा सजिलो", "trusted transport"],
      ja: ["日中移動が安心", "信頼できる移動"],
      hi: ["day travel", "trusted transport"]
    }
  },

  Rupandehi: {
    oneLiner: {
      en: "Terai district: peaceful Lumbini area and easy routes.",
      ne: "तराई जिल्ला: शान्त लुम्बिनी क्षेत्र र सजिलो route।",
      ja: "タライ：ルンビニ周辺の静けさと移動しやすさ。",
      hi: "Terai district: Lumbini area और easy routes।"
    },
    overview: {
      en: "Rupandehi is in Lumbini Province and is widely visited for Lumbini-area peace sites and nearby towns.",
      ne: "रुपन्देही लुम्बिनी प्रदेशमा पर्छ—लुम्बिनी क्षेत्रको शान्त वातावरण र नजिकका सहरका कारण धेरैले जान्छन्।",
      ja: "ルパンデヒはルンビニ州。ルンビニ周辺で知られます。",
      hi: "रुपंदेही लुंबिनी प्रदेश में है—Lumbini area के लिए जाना जाता है।"
    },
    bestSeason: { en:"Autumn / Winter", ne:"शरद / जाडो", ja:"秋 / 冬", hi:"Autumn / Winter" },
    tripStyle:  { en:"Peace + Culture", ne:"शान्ति + संस्कृति", ja:"平和 + 文化", hi:"Peace + Culture" },
    budgetTag:  { en:"Low–Medium", ne:"कम–मध्यम", ja:"低〜中", hi:"Low–Medium" },
    highlights: {
      en: ["Peaceful walks", "Monastic areas", "Local markets", "Easy day trips"],
      ne: ["शान्त walk", "मठ/गुम्बा क्षेत्र", "स्थानीय बजार", "easy day trip"],
      ja: ["静かな散策", "僧院エリア", "市場", "日帰り"],
      hi: ["peace walks", "monastic areas", "markets", "day trips"]
    },
    visit: {
      en: "Start early, walk calmly, and keep a simple route plan (don’t overpack the day).",
      ne: "बिहानै, शान्त रूपमा हिँड, route simple राख (दिन भरि overpack नगर्नु)।",
      ja: "早めに行動し、静かに散策。予定はシンプルに。",
      hi: "early start, calm walk, route simple रखो।"
    },
    food: {
      en: "Simple Nepali meals are easy to find—keep it hygienic.",
      ne: "साधारण नेपाली खाना सजिलै—सफा ठाउँ रोज।",
      ja: "食事は探しやすい。衛生に注意。",
      hi: "simple meals मिलेंगे—hygienic जगह चुनो।"
    },
    manners: {
      en: ["Keep voice low in sacred areas", "Dress modestly", "Follow photo rules"],
      ne: ["पवित्र क्षेत्रमा आवाज कम", "सभ्य पोशाक", "फोटो नियम पालना"],
      ja: ["聖地では静かに", "控えめな服装", "撮影ルール遵守"],
      hi: ["voice low", "modest dress", "photo rules follow"]
    },
    routes: {
      en: ["From Kathmandu/Pokhara: bus/flight + road", "Local: confirm price first"],
      ne: ["काठमाडौं/पोखरा: bus/flight + road", "Local: price confirm"],
      ja: ["バス/航空＋陸路。料金確認。"],
      hi: ["bus/flight + road", "price confirm"]
    },
    tips: {
      en: ["Carry water in hot months", "Sun protection helps", "Keep a calm schedule"],
      ne: ["गर्मीमा पानी", "घामबाट बच्ने", "calm schedule"],
      ja: ["水分補給", "日差し対策", "ゆったり計画"],
      hi: ["water", "sun protection", "calm schedule"]
    },
    budget: { Food:"$2–$6", Stay:"$10–$25", LocalTravel:"$1–$10", Activities:"Entry fees: varies" },
    safety: {
      en: ["Stay hydrated", "Use trusted transport", "Keep emergency contacts"],
      ne: ["पानी/ORS", "trusted transport", "emergency contact"],
      ja: ["脱水注意", "信頼できる移動", "緊急連絡先"],
      hi: ["hydration", "trusted transport", "emergency contacts"]
    }
  },

  Kapilvastu: {
    oneLiner: {
      en: "Terai district: history-focused, calm travel, and cultural heritage.",
      ne: "तराई जिल्ला: इतिहास/heritage केन्द्रित, शान्त यात्रा, सांस्कृतिक सम्पदा।",
      ja: "タライ：歴史と文化遺産の落ち着いた旅。",
      hi: "Terai district: history-focused, calm travel और cultural heritage।"
    },
    overview: {
      en: "Kapilvastu is known for cultural and historical interest points. Best for calm visits and short local loops.",
      ne: "कपिलवस्तु सांस्कृतिक/ऐतिहासिक रुचिका ठाउँका लागि चिनिन्छ। शान्त भ्रमण र छोटो local loop का लागि राम्रो।",
      ja: "カピルバストゥは歴史・文化に関心がある人向き。静かに回れます。",
      hi: "Kapilvastu history/culture interest के लिए जाना जाता है। calm visit के लिए best।"
    },
    bestSeason: { en:"Winter / Autumn", ne:"जाडो / शरद", ja:"冬 / 秋", hi:"Winter / Autumn" },
    tripStyle:  { en:"History + Culture", ne:"इतिहास + संस्कृति", ja:"歴史 + 文化", hi:"History + Culture" },
    budgetTag:  { en:"Low–Medium", ne:"कम–मध्यम", ja:"低〜中", hi:"Low–Medium" },
    highlights: {
      en: ["Heritage sites (route-dependent)", "Local markets", "Quiet town walks", "Cultural spots"],
      ne: ["heritage site (route अनुसार)", "स्थानीय बजार", "शान्त town walk", "cultural spot"],
      ja: ["遺産スポット（ルート次第）", "市場", "街歩き", "文化スポット"],
      hi: ["heritage sites", "markets", "town walks", "cultural spots"]
    },
    visit: {
      en: "Keep it simple: 1–2 heritage stops + local food + rest.",
      ne: "simple राख: 1–2 heritage stop + स्थानीय खाना + आराम।",
      ja: "遺産スポット1〜2箇所＋食事＋休憩のシンプル計画。",
      hi: "simple रखो: 1–2 heritage stops + food + rest।"
    },
    food: {
      en: "Try simple local meals—choose clean places.",
      ne: "simple local meal—सफा ठाउँ छान।",
      ja: "清潔なお店で定番の食事を。",
      hi: "simple meals—clean place चुनो।"
    },
    manners: {
      en: ["Respect local customs", "Dress modestly at heritage sites"],
      ne: ["स्थानीय रीतिरिवाज सम्मान", "heritage ठाउँमा सभ्य पोशाक"],
      ja: ["習慣を尊重", "控えめな服装"],
      hi: ["customs respect", "modest dress"]
    },
    routes: {
      en: ["Reach via major towns in Lumbini Province, then local road travel"],
      ne: ["लुम्बिनी प्रदेशका मुख्य टाउन हुँदै, अनि local road"],
      ja: ["州内の主要都市→陸路で移動"],
      hi: ["major towns via, then road"]
    },
    tips: {
      en: ["Carry water", "Avoid peak heat in midday", "Small cash helps"],
      ne: ["पानी", "मध्यान्हको गर्मी avoid", "सानो cash"],
      ja: ["水分", "真昼の暑さ回避", "小銭"],
      hi: ["water", "midday heat avoid", "small cash"]
    },
    budget: { Food:"$2–$6", Stay:"$10–$25", LocalTravel:"$2–$10", Activities:"Low/varies" },
    safety: {
      en: ["Heat management in warm months", "Trusted transport at night"],
      ne: ["गर्मीमा सावधानी", "राति trusted transport"],
      ja: ["暑さ対策", "夜は信頼できる移動"],
      hi: ["heat management", "night trusted transport"]
    }
  },

  Banke: {
    oneLiner: {
      en: "Terai district: major town hub, practical travel, and western gateway.",
      ne: "तराई जिल्ला: ठूलो टाउन hub, practical travel, पश्चिमतिरको gateway।",
      ja: "タライ：都市拠点で実用的な移動、 غربの玄関口。",
      hi: "Terai district: town hub, practical travel और western gateway।"
    },
    overview: {
      en: "Banke is a major transport and town hub in western Nepal—useful for transit and simple city exploration.",
      ne: "बाँके पश्चिम नेपालतिरको मुख्य transport/टाउन hub हो—ट्रान्जिट र साधारण सहर घुम्न उपयोगी।",
      ja: "バンケは西部の交通拠点。移動の途中や短い市内観光に便利。",
      hi: "Banke western Nepal का major transport/town hub है—transit के लिए useful।"
    },
    bestSeason: { en:"Winter / Autumn", ne:"जाडो / शरद", ja:"冬 / 秋", hi:"Winter / Autumn" },
    tripStyle:  { en:"City + Transit", ne:"सहर + ट्रान्जिट", ja:"街 + 移動拠点", hi:"City + Transit" },
    budgetTag:  { en:"Low–Medium", ne:"कम–मध्यम", ja:"低〜中", hi:"Low–Medium" },
    highlights: {
      en: ["Main bazaar", "Food streets", "Town walks", "Transport connections"],
      ne: ["मुख्य बजार", "खाना street", "town walk", "transport connection"],
      ja: ["中心市場", "食の通り", "街歩き", "交通接続"],
      hi: ["main bazaar", "food streets", "town walks", "connections"]
    },
    visit: {
      en: "Keep it practical: markets + food + rest. Use as a base for nearby destinations.",
      ne: "practical: बजार + खाना + आराम। नजिकका गन्तव्यका लागि base बनाउ।",
      ja: "市場と食事、休憩中心。周辺への拠点に。",
      hi: "practical रखो: market + food + rest। base की तरह use करो।"
    },
    food: {
      en: "Simple meals and snacks—choose clean places, drink safe water.",
      ne: "simple खाना/snack—सफा ठाउँ, safe पानी।",
      ja: "清潔なお店と安全な飲料水。",
      hi: "simple meals/snacks—clean place, safe water।"
    },
    manners: {
      en: ["Be polite in crowds", "Keep cash secure"],
      ne: ["भीडमा शिष्ट", "cash सुरक्षित"],
      ja: ["混雑では丁寧に", "現金管理"],
      hi: ["crowd manners", "cash secure"]
    },
    routes: {
      en: ["By road from major cities", "Regional flights + road connections (where applicable)"],
      ne: ["सडकबाट", "flight + road (जहाँ सम्भव)"],
      ja: ["陸路中心。航空＋陸路も場合による。"],
      hi: ["road routes", "flight+road possible"]
    },
    tips: {
      en: ["Heat can be strong—carry water", "Daytime travel is easier"],
      ne: ["गर्मी—पानी बोकेर", "दिनमै यात्रा सजिलो"],
      ja: ["暑さ対策", "日中移動が楽"],
      hi: ["heat—water", "day travel"]
    },
    budget: { Food:"$2–$6", Stay:"$10–$25", LocalTravel:"$2–$12", Activities:"Low" },
    safety: {
      en: ["Crowds: watch belongings", "Night: trusted transport"],
      ne: ["भीडमा सामान ध्यान", "राति trusted transport"],
      ja: ["混雑注意", "夜は信頼できる移動"],
      hi: ["crowd caution", "night trusted transport"]
    }
  },

  Bardiya: {
    oneLiner: {
      en: "Terai district: jungle-focused travel and quiet wildlife experiences.",
      ne: "तराई जिल्ला: जंगल–केन्द्रित यात्रा र शान्त wildlife अनुभव।",
      ja: "タライ：ジャングル体験と落ち着いた野生動物旅。",
      hi: "Terai district: jungle-focused travel और quiet wildlife experiences।"
    },
    overview: {
      en: "Bardiya is best known for its national-park style nature travel. Keep plans flexible and follow guide/park rules.",
      ne: "बर्दिया nature/park travel का लागि चिनिन्छ। plan flexible राख र guide/park नियम पालना गर।",
      ja: "バルディヤは自然・公園旅で有名。ガイドとルールが重要。",
      hi: "Bardiya nature/park travel के लिए जाना जाता है। guide/rules follow करो।"
    },
    bestSeason: { en:"Winter / Autumn", ne:"जाडो / शरद", ja:"冬 / 秋", hi:"Winter / Autumn" },
    tripStyle:  { en:"Wildlife + Nature", ne:"वन्यजन्तु + प्रकृति", ja:"野生動物 + 自然", hi:"Wildlife + Nature" },
    budgetTag:  { en:"Medium", ne:"मध्यम", ja:"中", hi:"Medium" },
    highlights: {
      en: ["Jungle activities (where allowed)", "River areas", "Local village culture", "Quiet nature walks"],
      ne: ["जंगल गतिविधि (जहाँ अनुमति)", "नदी क्षेत्र", "स्थानीय संस्कृति", "शान्त nature walk"],
      ja: ["ジャングル体験（許可範囲）", "川沿い", "村の文化", "自然散策"],
      hi: ["jungle activities", "river areas", "village culture", "nature walks"]
    },
    visit: {
      en: "Do wildlife activities with guides, keep noise low, and prioritize safety over photos.",
      ne: "guide संग activity गर, आवाज कम, फोटो भन्दा safety पहिलो।",
      ja: "ガイド同行で静かに。写真より安全優先。",
      hi: "guide के साथ, noise कम, photos से पहले safety।"
    },
    food: {
      en: "Simple meals are enough—stay hydrated in warm months.",
      ne: "simple खाना पर्याप्त—गर्मीमा hydration।",
      ja: "定番の食事で十分。暑い時期は水分補給。",
      hi: "simple meals enough— गर्मी में hydration।"
    },
    manners: {
      en: ["Follow park rules", "Don’t feed animals", "Respect local culture"],
      ne: ["park नियम", "जनावरलाई खाना नखुवाउने", "स्थानीय सम्मान"],
      ja: ["公園ルール", "餌やり禁止", "文化尊重"],
      hi: ["rules follow", "animals को feed मत करो", "culture respect"]
    },
    routes: {
      en: ["Reach via nearby major towns by road", "Local: jeep/taxi (confirm price)"],
      ne: ["नजिकको major town हुँदै road", "Local: jeep/taxi (price confirm)"],
      ja: ["近隣都市→陸路。料金確認。"],
      hi: ["nearby towns via road", "price confirm"]
    },
    tips: {
      en: ["Mosquito repellent", "Light long sleeves", "Early morning is best"],
      ne: ["repellent", "लामो sleeve", "बिहान best"],
      ja: ["虫よけ", "長袖", "朝が最適"],
      hi: ["repellent", "long sleeves", "morning best"]
    },
    budget: { Food:"$2–$7", Stay:"$12–$40", LocalTravel:"$3–$15", Activities:"Park/guide: varies" },
    safety: {
      en: ["Keep distance from animals", "Use guides", "Don’t walk alone in restricted areas"],
      ne: ["जनावरबाट दूरी", "guide प्रयोग", "restricted क्षेत्रमा एक्लै नहिँड"],
      ja: ["動物と距離", "ガイド必須", "立入制限に注意"],
      hi: ["distance रखो", "guide use", "alone मत जाओ"]
    }
  },

  Kailali: {
    oneLiner: {
      en: "Far-west Terai district: town hub, easy travel, and warm plains.",
      ne: "सुदूरपश्चिम तराई: टाउन hub, सजिलो यात्रा, र न्यानो समथर भूभाग।",
      ja: "西部タライ：都市拠点で移動しやすい平野。",
      hi: "far-west Terai: town hub, easy travel और warm plains।"
    },
    overview: {
      en: "Kailali is a major far-west district with strong road connections and practical city life—best for transit and short local trips.",
      ne: "कैलाली सुदूरपश्चिमतिर ठूलो जिल्ला हो—सडक connection राम्रो, practical city life। ट्रान्जिट/छोटो trip का लागि राम्रो।",
      ja: "カイラリは西部の主要地区。移動拠点と短い旅に便利。",
      hi: "Kailali far-west का major district है—road connections और practical city life।"
    },
    bestSeason: { en:"Winter / Autumn", ne:"जाडो / शरद", ja:"冬 / 秋", hi:"Winter / Autumn" },
    tripStyle:  { en:"City + Easy Travel", ne:"सहर + सजिलो यात्रा", ja:"街 + 移動しやすい", hi:"City + Easy Travel" },
    budgetTag:  { en:"Low–Medium", ne:"कम–मध्यम", ja:"低〜中", hi:"Low–Medium" },
    highlights: {
      en: ["Main town markets", "Food streets", "Short nearby day trips", "Local culture"],
      ne: ["मुख्य बजार", "खाना street", "नजिक day trip", "स्थानीय संस्कृति"],
      ja: ["市場", "食の通り", "近郊日帰り", "文化"],
      hi: ["markets", "food streets", "day trips", "culture"]
    },
    visit: {
      en: "Keep it simple: explore the town, eat local, and use as a base for nearby spots.",
      ne: "simple: टाउन घुम, स्थानीय खाना, अनि नजिकका spot का लागि base।",
      ja: "街歩き＋食事中心。周辺の拠点に。",
      hi: "simple: town explore, local food, base for nearby spots।"
    },
    food: {
      en: "Simple meals and snacks—carry water in warm months.",
      ne: "simple खाना/snack—गर्मीमा पानी।",
      ja: "定番の食事。暑い時期は水分補給。",
      hi: "simple meals— गर्मी में water।"
    },
    manners: {
      en: ["Crowded markets: be polite", "Keep cash secure"],
      ne: ["भीडमा शिष्ट", "cash सुरक्षित"],
      ja: ["混雑では丁寧に", "現金管理"],
      hi: ["crowd manners", "cash secure"]
    },
    routes: {
      en: ["By road from major western routes", "Regional flights + road connections (where applicable)"],
      ne: ["सडकबाट", "flight + road (जहाँ सम्भव)"],
      ja: ["陸路中心。航空＋陸路も場合による。"],
      hi: ["road routes", "flight+road possible"]
    },
    tips: {
      en: ["Heat management", "Daytime travel", "Small cash helps"],
      ne: ["गर्मी ध्यान", "दिनमै यात्रा", "सानो cash"],
      ja: ["暑さ対策", "日中移動", "小銭"],
      hi: ["heat management", "day travel", "small cash"]
    },
    budget: { Food:"$2–$6", Stay:"$10–$25", LocalTravel:"$2–$12", Activities:"Low" },
    safety: {
      en: ["Stay hydrated", "Night: trusted transport"],
      ne: ["hydration", "राति trusted transport"],
      ja: ["水分補給", "夜は信頼できる移動"],
      hi: ["hydration", "night trusted transport"]
    }
  },

  Kanchanpur: {
    oneLiner: {
      en: "Far-west district: plains, border-side routes, and nature-focused trips.",
      ne: "सुदूरपश्चिम: समथर भूभाग, सिमाना route, र nature यात्रा।",
      ja: "最西部：平野と国境ルート、自然旅。",
      hi: "far-west district: plains, border routes और nature trips।"
    },
    overview: {
      en: "Kanchanpur is one of the far-west districts—good for practical travel and nature-focused stops if you plan routes carefully.",
      ne: "कञ्चनपुर सुदूरपश्चिमको जिल्ला हो—route राम्ररी plan गरे practical यात्रा र nature stop राम्रो हुन्छ।",
      ja: "カンチャンプルは最西部の地区。ルート計画が大事。",
      hi: "Kanchanpur far-west का district है—route planning के साथ practical travel + nature stops।"
    },
    bestSeason: { en:"Winter / Autumn", ne:"जाडो / शरद", ja:"冬 / 秋", hi:"Winter / Autumn" },
    tripStyle:  { en:"Nature + Easy Travel", ne:"प्रकृति + सजिलो यात्रा", ja:"自然 + 移動しやすい", hi:"Nature + Easy Travel" },
    budgetTag:  { en:"Low–Medium", ne:"कम–मध्यम", ja:"低〜中", hi:"Low–Medium" },
    highlights: {
      en: ["Town markets", "Nature areas (route-dependent)", "River/border-side views", "Local culture"],
      ne: ["टाउन बजार", "nature area (route अनुसार)", "नदी/सिमाना दृश्य", "स्थानीय संस्कृति"],
      ja: ["市場", "自然スポット（ルート次第）", "川/国境の景色", "文化"],
      hi: ["markets", "nature areas", "river/border views", "culture"]
    },
    visit: {
      en: "Plan one clear loop, avoid peak heat, and return before late evening.",
      ne: "एक स्पष्ट loop plan गर, मध्यान्हको गर्मी avoid गर, साँझ ढिलो हुनु अघि फर्क।",
      ja: "シンプルな周回計画。暑さ回避、夜遅くは避ける。",
      hi: "clear loop plan, midday heat avoid, देर रात से पहले वापस।"
    },
    food: {
      en: "Simple meals are easy—drink safe water.",
      ne: "simple खाना सजिलो—safe पानी।",
      ja: "定番の食事。飲料水に注意。",
      hi: "simple meals—safe water।"
    },
    manners: {
      en: ["Be respectful and polite", "Keep places clean"],
      ne: ["सम्मान/शिष्ट", "सफा राख"],
      ja: ["丁寧に", "清潔を守る"],
      hi: ["respect", "cleanliness"]
    },
    routes: {
      en: ["By road from far-west routes; plan buffers for long travel time"],
      ne: ["सुदूरपश्चिम road route; लामो यात्रा—buffer राख"],
      ja: ["西部ルートで陸路。長距離なので余裕を。"],
      hi: ["far-west road routes; long travel—buffers रखो"]
    },
    tips: {
      en: ["Carry water", "Sun protection", "Keep small cash"],
      ne: ["पानी", "घामबाट बच्ने", "सानो cash"],
      ja: ["水分", "日差し対策", "小銭"],
      hi: ["water", "sun protection", "small cash"]
    },
    budget: { Food:"$2–$6", Stay:"$10–$25", LocalTravel:"$2–$12", Activities:"Low/varies" },
    safety: {
      en: ["Long road travel—avoid late night", "Trusted transport"],
      ne: ["लामो road—राति ढिलो avoid", "trusted transport"],
      ja: ["長距離は夜遅くを避ける", "信頼できる移動"],
      hi: ["late night avoid", "trusted transport"]
    }
  }
};

// Build ALL districts
const DISTRICT_DATA = Object.fromEntries(
  ALL_DISTRICTS.map((d) => [d.name, makeGenericDistrict(d.name, d.province)])
);

// Apply overrides
Object.assign(DISTRICT_DATA, DISTRICT_OVERRIDES);


  // URL params
  const params = new URLSearchParams(window.location.search);
  const name = params.get("name") || "District";
  const province = params.get("province") || "—";

  // Elements
  const districtNameEl = document.getElementById("districtName");
  const pillProvince = document.getElementById("pillProvince");
  const oneLinerEl = document.getElementById("districtOneLiner");
  const bestSeasonEl = document.getElementById("bestSeason");
  const tripStyleEl = document.getElementById("tripStyle");
  const budgetTagEl = document.getElementById("budgetTag");
  const overviewTextEl = document.getElementById("overviewText");
  const highlightsList = document.getElementById("highlightsList");
  const todoVisit = document.getElementById("todoVisit");
  const todoFood = document.getElementById("todoFood");
  const mannersList = document.getElementById("mannersList");
  const routesList = document.getElementById("routesList");
  const tipsList = document.getElementById("tipsList");
  const budgetGrid = document.getElementById("budgetGrid");
  const safetyList = document.getElementById("safetyList");

  const openMapBtn = document.getElementById("openMapBtn");
  const openWikiPage = document.getElementById("openWikiPage");
  const wikiBox = document.getElementById("wikiBox");
  const loadWikiBtn = document.getElementById("loadWikiBtn");
  const copyShareLink = document.getElementById("copyShareLink");

  function mapsUrl(q) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q + ", Nepal")}`;
  }

  function fillList(ul, items) {
    if (!ul) return;
    ul.innerHTML = "";
    items.forEach((x) => {
      const li = document.createElement("li");
      li.textContent = x;
      ul.appendChild(li);
    });
  }

  function renderDistrict(lang) {
    const dict = I18N[lang] || I18N.en;
    applyI18n(lang);

    if (districtNameEl) districtNameEl.textContent = name;
    if (pillProvince) pillProvince.textContent = `${dict.provinceLabel || "Province"}: ${province}`;

    const data = DISTRICT_DATA[name] || {
      oneLiner: { en: "Template district page. Add real data later." },
      overview: { en: "This is a placeholder overview. Update later with real information." },
      bestSeason: "Update later",
      tripStyle: "Update later",
      budgetTag: "Update later",
      highlights: { en: ["Update later", "Update later", "Update later"] },
      visit: { en: "Write what to do here." },
      food: { en: "Write local foods." },
      manners: { en: ["Respect culture", "Ask before photos", "Keep places clean"] },
      routes: { en: ["From Kathmandu: update later", "From nearby cities: update later"] },
      tips: { en: ["Confirm transport", "Carry water", "Keep simple plan"] },
      budget: { Food: "Update later", Stay: "Update later", LocalTravel: "Update later", Activities: "Update later" },
      safety: { en: ["Check weather", "Use trusted transport", "Keep emergency contact"] }
    };

    if (oneLinerEl) oneLinerEl.textContent = pickText(data.oneLiner, lang);
    if (bestSeasonEl) bestSeasonEl.textContent = pickText(data.bestSeason, lang);
    if (tripStyleEl) tripStyleEl.textContent = pickText(data.tripStyle, lang);
    if (budgetTagEl) budgetTagEl.textContent = pickText(data.budgetTag, lang);

    if (overviewTextEl) overviewTextEl.textContent = pickText(data.overview, lang);
    if (todoVisit) todoVisit.textContent = pickText(data.visit, lang);
    if (todoFood) todoFood.textContent = pickText(data.food, lang);

    fillList(highlightsList, pickList(data.highlights, lang));
    fillList(mannersList, pickList(data.manners, lang));
    fillList(routesList, pickList(data.routes, lang));
    fillList(tipsList, pickList(data.tips, lang));
    fillList(safetyList, pickList(data.safety, lang));

    if (budgetGrid) {
      budgetGrid.innerHTML = "";
      Object.entries(data.budget).forEach(([k, v]) => {
        const row = document.createElement("div");
        row.className = "budget-item";
        row.innerHTML = `<span>${k}</span><strong>${v}</strong>`;
        budgetGrid.appendChild(row);
      });
    }

    if (openMapBtn) openMapBtn.href = mapsUrl(name);
    if (openWikiPage) openWikiPage.href = `https://en.wikipedia.org/wiki/${encodeURIComponent(name)}`;
  }

  // Wikipedia summary
  async function loadWiki() {
    if (!wikiBox) return;
    wikiBox.textContent = "Loading…";
    try {
      const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Fetch failed");
      const data = await res.json();
      wikiBox.textContent = data.extract || "No summary found.";
    } catch {
      wikiBox.textContent = "Could not load Wikipedia summary (maybe offline).";
    }
  }
  loadWikiBtn?.addEventListener("click", loadWiki);

  // Copy share link
  copyShareLink?.addEventListener("click", async () => {
    const lang = getLang();
    const dict = I18N[lang] || I18N.en;
    try {
      await navigator.clipboard.writeText(window.location.href);
      copyShareLink.textContent = "Copied ✅";
      setTimeout(() => (copyShareLink.textContent = dict.copyLink), 1200);
    } catch {
      copyShareLink.textContent = "Copy failed ❌";
      setTimeout(() => (copyShareLink.textContent = dict.copyLink), 1200);
    }
  });

  // Language switch
  const langBtns = Array.from(document.querySelectorAll(".lang-btn"));
  function setLangUI(lang) {
    setLang(lang);
    langBtns.forEach((b) => b.classList.toggle("is-active", b.getAttribute("data-lang") === lang));
    renderDistrict(lang);
  }
  langBtns.forEach((btn) => {
    btn.addEventListener("click", () => setLangUI(btn.getAttribute("data-lang") || "en"));
  });

  // Init
  setLangUI(getLang());
})();
