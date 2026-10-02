// English / Malayalam switching. English text lives in the HTML; Malayalam lives here.
// Malayalam copy should be reviewed by a native speaker before launch.
(() => {
  const ML = {
    "hero.eyebrow": "ആർക്കിടെക്ചർ · റെസിഡൻഷ്യൽ ഡിസൈൻ",
    "hero.h1": "വെളിച്ചവും പ്രകൃതിയും കരവിരുതും ചേർന്ന് രൂപപ്പെടുന്ന വീടുകൾ.",
    "work.eyebrow": "തിരഞ്ഞെടുത്ത പ്രോജക്ടുകൾ", "work.h2": "പോർട്ട്ഫോളിയോ",
    "walk.eyebrow": "വാക്ക്‌ത്രൂ", "walk.h2": "രൂപകൽപ്പന ചലനത്തിൽ കാണാം",
    "studio.eyebrow": "സ്റ്റുഡിയോ", "studio.h2": "സ്ഥലത്തോട് ഇണങ്ങുന്ന രൂപകൽപ്പന.",
    "studio.p1": "പാർപ്പിട രൂപകൽപ്പനയിൽ ശ്രദ്ധയൂന്നുന്ന ആർക്കിടെക്ചർ സ്ഥാപനമാണ് സ്കെൽറ്റ ഡിസൈൻ. ഓരോ വീടും തുടങ്ങുന്നത് സ്ഥലത്തുനിന്നാണ് — അവിടത്തെ കാലാവസ്ഥ, മരങ്ങൾ, വെളിച്ചം. അതിൽനിന്ന് സമകാലികവും മണ്ണിനോട് ചേർന്നുനിൽക്കുന്നതുമായ ഒരു വീട് രൂപപ്പെടുന്നു.",
    "studio.p2": "ലളിതമായ ആധുനിക രൂപങ്ങൾ, ഓട് മേഞ്ഞ ട്രോപ്പിക്കൽ മേൽക്കൂരകൾ, ശ്രദ്ധേയമായ ഗേബിൾ രൂപങ്ങൾ — ഏത് ശൈലിയിലും തുറസ്സും തണലും പച്ചപ്പും സന്തുലിതമാക്കാൻ ഞങ്ങൾ ശ്രദ്ധിക്കുന്നു.",
    "studio.p3": "ഹുദൈഫ കുന്നെക്കാടൻ ആണ് സ്ഥാപനത്തിന്റെ ഉടമയും പ്രിൻസിപ്പൽ ആർക്കിടെക്ടും.",
    "services.eyebrow": "ഞങ്ങൾ ചെയ്യുന്നത്", "services.h2": "സേവനങ്ങൾ",
    "s1.t": "ആർക്കിടെക്ചറൽ ഡിസൈൻ", "s1.d": "വീടുകൾക്കും റെസിഡൻഷ്യൽ പദ്ധതികൾക്കും ആശയം മുതൽ വിശദമായ ഡ്രോയിംഗുകൾ വരെ.",
    "s2.t": "3D വിഷ്വലൈസേഷൻ", "s2.d": "നിർമ്മാണം തുടങ്ങുംമുമ്പ് വീടിന്റെ യഥാർത്ഥ രൂപം കാണാവുന്ന 3D റെൻഡറുകളും വാക്ക്‌ത്രൂകളും.",
    "s3.t": "ഇന്റീരിയർ & ലാൻഡ്സ്കേപ്പ്", "s3.d": "വാസ്തുശിൽപ്പത്തിന്റെ ആശയങ്ങൾ തുടരുന്ന ഇന്റീരിയറും ലാൻഡ്സ്കേപ്പും.",
    "s4.t": "പ്രോജക്ട് മാർഗനിർദേശം", "s4.d": "കൈമാറ്റം വരെ ഏകോപനവും സൈറ്റ് പിന്തുണയും.",
    "contact.eyebrow": "ബന്ധപ്പെടുക", "contact.h2": "നിങ്ങളുടെ വീട് നമുക്ക് ഒരുമിച്ച് രൂപകൽപ്പന ചെയ്യാം.",
    "contact.lead": "നിങ്ങളുടെ പ്ലോട്ടിനെക്കുറിച്ചും ആശയങ്ങളെക്കുറിച്ചും ഞങ്ങളോട് പറയൂ.",
    "views": "കാഴ്ചകൾ",
    "all": "എല്ലാം",
    "cat.modern-contemporary": "ആധുനിക സമകാലിക ശൈലി",
    "cat.tropical-sloped-roof": "ട്രോപ്പിക്കൽ · ചരിഞ്ഞ മേൽക്കൂര",
    "cat.gable-contemporary": "ഗേബിൾ സമകാലിക ശൈലി",
    "tag.Dusk view": "സന്ധ്യാ ദൃശ്യം", "tag.Night view": "രാത്രി ദൃശ്യം", "tag.Concept model": "കൺസെപ്റ്റ് മോഡൽ",
  };
  const nodes = [...document.querySelectorAll("[data-i18n]")];
  nodes.forEach(n => (n.dataset.en = n.textContent));
  const enH1 = document.querySelector(".hero h1").textContent;

  let lang = "en";
  try { lang = localStorage.getItem("lang") || "en"; } catch (e) {}

  // helper for main.js: translate a key with an English fallback
  window.t = (key, en) => (lang === "ml" && ML[key]) || en;
  window.getLang = () => lang;

  function apply() {
    document.documentElement.lang = lang;
    nodes.forEach(n => (n.textContent = lang === "ml" ? ML[n.dataset.i18n] : n.dataset.en));
    // hero shows the other language as a quiet secondary line
    document.getElementById("heroAlt").textContent = lang === "ml" ? enH1 : ML["hero.h1"];
    document.getElementById("heroAlt").lang = lang === "ml" ? "en" : "ml";
    document.title = lang === "ml" ? "സ്കെൽറ്റ ഡിസൈൻ — ആർക്കിടെക്ചർ & റെസിഡൻഷ്യൽ ഡിസൈൻ" : "Skelta Design — Architecture & Residential Design";
    document.getElementById("langBtn").dataset.now = lang;
    document.dispatchEvent(new Event("langchange"));
  }

  document.getElementById("langBtn").addEventListener("click", () => {
    lang = lang === "ml" ? "en" : "ml";
    try { localStorage.setItem("lang", lang); } catch (e) {}
    apply();
  });
  window.__applyLang = apply;
})();
