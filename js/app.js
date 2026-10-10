(function () {
  "use strict";

  const I18N = {
    en: {
      brand: "Hudhud",
      heroVerse: "“To Allah belong the most beautiful names, so call upon Him by them.” — Al-A'raf",
      title: "Call upon Him by His Names",
      subtitle: "Describe what you are going through, and find the Names of Allah to call upon in your dua.",
      askLabel: "What is on your heart?",
      placeholder: "Write in your own words… e.g. I did something wrong and I want Allah to forgive me",
      hint: "You can write in English, Urdu or Roman Urdu. Everything stays on your device.",
      find: "Find Names",
      clear: "Clear",
      tryLabel: "Try:",
      examples: [
        "I sinned and I want forgiveness",
        "I'm worried about money and debt",
        "My mother is ill",
        "I feel lonely and heartbroken",
        "I can't decide what to do",
        "Someone treated me unjustly",
      ],
      resultsTitle: "Names to call upon",
      understood: "Your words touched on:",
      noMatch: "I couldn't recognise a specific situation, so here are Names you can call upon in any situation. Try adding a few more words, or choose a situation below.",
      situationsTitle: "Or choose a situation",
      allTitle: "All 99 Names",
      filterPlaceholder: "Search a name or meaning…",
      callLabel: "Call upon Him",
      duaLabel: "Suggested dua",
      forLabel: "For:",
      quran: "Qur'an",
      related: "Related verse",
      hadithRef: "Hadith",
      copy: "Copy",
      copied: "Copied",
      noResults: "No names match that search.",
      crisis: "If you are thinking about harming yourself, please reach out right now to someone you trust or your local emergency number. You are not alone — and Allah's mercy is greater than any pain you feel.",
      hadith: "The Prophet ﷺ said: “Allah has ninety-nine names; whoever learns and lives by them will enter Paradise.” — Sahih al-Bukhari",
      disclaimer: "Suggestions come from a simple keyword map, not from a scholar. Please verify meanings and references with people of knowledge, and remember that Allah may be called upon by any of His Names for any need.",
    },
    ur: {
      brand: "ہُدہُد",
      heroVerse: "”اور اللہ ہی کے لیے اچھے اچھے نام ہیں، پس اسے انہی ناموں سے پکارو۔“ — الاعراف",
      title: "اسے اس کے ناموں سے پکاریں",
      subtitle: "اپنا حال بیان کریں اور اللہ کے وہ نام تلاش کریں جن سے آپ دعا میں اسے پکار سکیں۔",
      askLabel: "آپ کے دل میں کیا ہے؟",
      placeholder: "اپنے الفاظ میں لکھیں… مثلاً مجھ سے غلطی ہو گئی ہے، اللہ سے معافی چاہیے",
      hint: "آپ اردو، رومن اردو یا انگریزی میں لکھ سکتے ہیں۔ سب کچھ آپ کے آلے پر ہی رہتا ہے۔",
      find: "نام تلاش کریں",
      clear: "صاف کریں",
      tryLabel: "مثال:",
      examples: [
        "مجھ سے گناہ ہو گیا، معافی چاہیے",
        "قرض اور پیسوں کی فکر ہے",
        "میری امی بیمار ہیں",
        "دل ٹوٹ گیا ہے اور تنہائی ہے",
        "سمجھ نہیں آ رہا کیا فیصلہ کروں",
        "کسی نے مجھ پر ظلم کیا ہے",
      ],
      resultsTitle: "ان ناموں سے پکاریں",
      understood: "آپ کی بات میں یہ پہلو ہیں:",
      noMatch: "کوئی خاص حالت پہچانی نہیں جا سکی، اس لیے یہ نام پیش ہیں جن سے ہر حال میں پکارا جا سکتا ہے۔ مزید الفاظ لکھیں یا نیچے سے کوئی حالت چنیں۔",
      situationsTitle: "یا کوئی حالت منتخب کریں",
      allTitle: "اللہ کے ۹۹ نام",
      filterPlaceholder: "نام یا معنی تلاش کریں…",
      callLabel: "یوں پکاریں",
      duaLabel: "تجویز کردہ دعا",
      forLabel: "برائے:",
      quran: "قرآن",
      related: "متعلقہ آیت",
      hadithRef: "حدیث",
      copy: "کاپی",
      copied: "کاپی ہو گیا",
      noResults: "اس تلاش سے کوئی نام نہیں ملا۔",
      crisis: "اگر آپ خود کو نقصان پہنچانے کا سوچ رہے ہیں تو ابھی کسی قابلِ اعتماد شخص یا ہنگامی نمبر سے رابطہ کریں۔ آپ اکیلے نہیں ہیں — اور اللہ کی رحمت ہر درد سے بڑی ہے۔",
      hadith: "نبی ﷺ نے فرمایا: ”اللہ کے ننانوے نام ہیں، جو انہیں یاد کرے (اور ان پر عمل کرے) وہ جنت میں داخل ہوگا۔“ — صحیح بخاری",
      disclaimer: "یہ تجاویز ایک سادہ لفظی فہرست پر مبنی ہیں، کسی عالم کی رائے نہیں۔ معانی اور حوالوں کی تصدیق اہلِ علم سے کر لیں، اور یاد رکھیں کہ اللہ کو ہر ضرورت میں اس کے کسی بھی نام سے پکارا جا سکتا ہے۔",
    },
  };

  const NAME_BY_KEY = Object.fromEntries(NAMES.map((n) => [n.key, n]));
  const MAX_RESULTS = 7;

  const state = { lang: loadLang(), lastMatch: null };
  const $ = (id) => document.getElementById(id);
  const t = (key) => I18N[state.lang][key];

  function loadLang() {
    try { return localStorage.getItem("hudhud-lang") === "ur" ? "ur" : "en"; } catch { return "en"; }
  }
  function saveLang(lang) {
    try { localStorage.setItem("hudhud-lang", lang); } catch { /* storage unavailable */ }
  }

  // ---------- Matching ----------

  // Lower-case Latin text and unify the Arabic/Urdu letter variants different keyboards produce.
  function normalize(s) {
    return s
      .toLowerCase()
      .replace(/[’‘`]/g, "'")
      .replace(/[ً-ٰٟ]/g, "") // Arabic diacritics
      .replace(/‌/g, "")                 // zero-width non-joiner
      .replace(/[يى]/g, "ی")
      .replace(/ك/g, "ک")
      .replace(/[هۃة]/g, "ہ")
      .replace(/\s+/g, " ")
      .trim();
  }

  const BOUNDARY = "[\\s.,!?؟،۔:;\"()\\[\\]/-]";
  const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  function compileKeyword(kw) {
    const prefix = kw.endsWith("*");
    const body = escapeRe(normalize(prefix ? kw.slice(0, -1) : kw));
    return new RegExp(`(?:^|${BOUNDARY})${body}${prefix ? "" : `(?=$|${BOUNDARY})`}`, "u");
  }

  const COMPILED = THEMES.map((th) => ({ theme: th, res: th.kw.map(compileKeyword) }));
  const CRISIS_RES = CRISIS_KW.map(compileKeyword);

  function match(text) {
    const input = normalize(text);
    const themeHits = [];
    for (const { theme, res } of COMPILED) {
      const hits = res.reduce((sum, re) => sum + (re.test(input) ? 1 : 0), 0);
      if (hits) themeHits.push({ theme, hits });
    }
    themeHits.sort((a, b) => b.hits * (b.theme.w || 1) - a.hits * (a.theme.w || 1));

    const scores = new Map();
    for (const { theme, hits } of themeHits) {
      const weight = hits * (theme.w || 1);
      theme.names.forEach((key, idx) => {
        const entry = scores.get(key) || { score: 0, themes: [] };
        entry.score += weight * Math.max(0.4, 1 - idx * 0.07);
        entry.themes.push(theme);
        scores.set(key, entry);
      });
    }
    const ranked = [...scores.entries()]
      .sort((a, b) => b[1].score - a[1].score)
      .slice(0, MAX_RESULTS)
      .map(([key, v]) => ({ name: NAME_BY_KEY[key], themes: v.themes }));

    return {
      themes: themeHits.map((h) => h.theme),
      results: ranked,
      crisis: CRISIS_RES.some((re) => re.test(input)),
    };
  }

  function matchTheme(theme) {
    return {
      themes: [theme],
      results: theme.names.slice(0, MAX_RESULTS + 1).map((key) => ({ name: NAME_BY_KEY[key], themes: [theme] })),
      crisis: false,
    };
  }

  // ---------- Rendering ----------

  const SOURCES_UR = { "Sahih al-Bukhari": "صحیح بخاری", "Jami' at-Tirmidhi": "جامع ترمذی" };
  const source = (s) => (state.lang === "ur" && SOURCES_UR[s]) || s;

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const themeLabel = (th) => (state.lang === "ur" ? th.ur : th.en);

  function refHtml(ref) {
    const [kind, ...rest] = ref.split(":");
    if (kind === "h") return `<span class="ref">${t("hadithRef")}: ${esc(source(rest.join(":")))}</span>`;
    const [s, a] = rest;
    const label = kind === "qr" ? t("related") : t("quran");
    return `<a class="ref" href="https://quran.com/${s}/${a}" target="_blank" rel="noopener">${label} ${s}:${a}</a>`;
  }

  function nameCard(name, themes) {
    const ur = state.lang === "ur";
    const meaning = ur ? name.ur : name.en;
    const dua = ur ? name.duaUr : name.duaEn;
    const note = ur ? name.noteUr : name.noteEn;
    const forThemes = themes && themes.length
      ? `<p class="for"><span>${t("forLabel")}</span> ${themes.map((th) => `<span class="tag">${esc(themeLabel(th))}</span>`).join("")}</p>`
      : "";
    return `
      <article class="name-card">
        <header>
          <span class="num">${name.n}</span>
          <p class="tr" dir="ltr">${esc(name.tr)}</p>
          <p class="ar" lang="ar" dir="rtl">${name.ar}</p>
        </header>
        <p class="meaning">${esc(meaning)}</p>
        ${forThemes}
        <div class="call">
          <p class="label">${t("callLabel")}</p>
          <p class="call-ar" lang="ar" dir="rtl">${name.call}</p>
          <p class="call-tr" dir="ltr">${esc(name.callTr)}</p>
        </div>
        <div class="dua">
          <p class="label">${t("duaLabel")}</p>
          <p class="dua-text">${esc(dua)}</p>
        </div>
        ${note ? `<p class="name-note">${esc(note)}</p>` : ""}
        <footer>
          ${refHtml(name.ref)}
          <button type="button" class="copy" data-copy="${name.key}">${t("copy")}</button>
        </footer>
      </article>`;
  }

  function renderResults(m) {
    state.lastMatch = m;
    const section = $("results");
    section.hidden = false;

    $("crisis").hidden = !m.crisis;
    $("crisis").textContent = m.crisis ? t("crisis") : "";

    let results = m.results;
    if (!results.length) {
      $("understood").textContent = t("noMatch");
      results = GENERAL_NAMES.map((key) => ({ name: NAME_BY_KEY[key], themes: [] }));
    } else {
      $("understood").innerHTML = `${t("understood")} ${m.themes.map((th) => `<span class="tag">${esc(themeLabel(th))}</span>`).join("")}`;
    }

    const noteTheme = m.themes.find((th) => th.noteAr);
    $("note").innerHTML = noteTheme
      ? `<div class="theme-note">
           <p>${esc(state.lang === "ur" ? noteTheme.noteUr : noteTheme.noteEn)}</p>
           <p class="ar" lang="ar" dir="rtl">${noteTheme.noteAr}</p>
           <p class="src">${esc(source(noteTheme.noteSrc))}</p>
         </div>`
      : "";

    $("result-list").innerHTML = results.map((r) => nameCard(r.name, r.themes)).join("");
  }

  function renderExamples() {
    $("examples").innerHTML = t("examples")
      .map((ex) => `<button type="button" class="chip">${esc(ex)}</button>`)
      .join("");
  }

  function renderThemeChips() {
    $("theme-chips").innerHTML = THEMES
      .map((th) => `<button type="button" class="chip" data-theme="${th.id}">${esc(themeLabel(th))}</button>`)
      .join("");
  }

  function renderGrid() {
    const q = normalize($("filter").value);
    const list = NAMES.filter((n) =>
      !q || [n.tr, n.en, n.ur, n.ar, String(n.n)].some((f) => normalize(f).includes(q)));
    $("grid").innerHTML = list.length
      ? list.map((n) => `
          <button type="button" class="tile" data-name="${n.key}">
            <span class="num">${n.n}</span>
            <span class="ar" lang="ar" dir="rtl">${n.ar}</span>
            <span class="tr" dir="ltr">${esc(n.tr)}</span>
            <span class="meaning">${esc(state.lang === "ur" ? n.ur : n.en)}</span>
          </button>`).join("")
      : `<p class="empty">${t("noResults")}</p>`;
  }

  function applyLang() {
    const ur = state.lang === "ur";
    document.documentElement.lang = ur ? "ur" : "en";
    document.documentElement.dir = ur ? "rtl" : "ltr";
    document.body.classList.toggle("is-ur", ur);
    document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => { el.placeholder = t(el.dataset.i18nPlaceholder); });
    document.querySelectorAll("[data-lang]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === state.lang)));
    renderExamples();
    renderThemeChips();
    renderGrid();
    if (state.lastMatch) renderResults(state.lastMatch);
  }

  // ---------- Events ----------

  function runSearch() {
    const text = $("problem").value.trim();
    if (!text) { $("problem").focus(); return; }
    renderResults(match(text));
    $("results").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function copyName(key, button) {
    const n = NAME_BY_KEY[key];
    const text = `${n.ar} — ${n.tr}\n${n.call} (${n.callTr})\n${state.lang === "ur" ? n.duaUr : n.duaEn}`;
    const done = () => {
      button.textContent = t("copied");
      setTimeout(() => { button.textContent = t("copy"); }, 1500);
    };
    if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, () => {});
  }

  $("find").addEventListener("click", runSearch);
  $("problem").addEventListener("keydown", (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) runSearch();
  });
  $("clear").addEventListener("click", () => {
    $("problem").value = "";
    $("results").hidden = true;
    state.lastMatch = null;
    $("problem").focus();
  });
  $("examples").addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    $("problem").value = chip.textContent;
    runSearch();
  });
  $("theme-chips").addEventListener("click", (e) => {
    const chip = e.target.closest("[data-theme]");
    if (!chip) return;
    renderResults(matchTheme(THEMES.find((th) => th.id === chip.dataset.theme)));
    $("results").scrollIntoView({ behavior: "smooth", block: "start" });
  });
  $("filter").addEventListener("input", renderGrid);
  $("grid").addEventListener("click", (e) => {
    const tile = e.target.closest("[data-name]");
    if (!tile) return;
    $("detail-body").innerHTML = nameCard(NAME_BY_KEY[tile.dataset.name]);
    $("detail").showModal();
  });
  $("detail-close").addEventListener("click", () => $("detail").close());
  $("detail").addEventListener("click", (e) => { if (e.target === $("detail")) $("detail").close(); });
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-copy]");
    if (btn) copyName(btn.dataset.copy, btn);
  });
  document.querySelectorAll("[data-lang]").forEach((b) =>
    b.addEventListener("click", () => {
      state.lang = b.dataset.lang;
      saveLang(state.lang);
      applyLang();
    }));

  applyLang();
})();
