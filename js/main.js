(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const grid = $("#grid"), filters = $("#filters");
  let active = "all";

  // ---- filters ----
  const catName = k => window.t("cat." + k, window.CATEGORIES[k]);
  const tagName = g => window.t("tag." + g, g);

  function buildFilters() {
    filters.innerHTML = "";
    const cats = { all: window.t("all", "All"), ...Object.fromEntries(Object.keys(window.CATEGORIES).map(k => [k, catName(k)])) };
    Object.entries(cats).forEach(([key, label]) => {
      const b = document.createElement("button");
      b.textContent = label;
      b.dataset.cat = key;
      b.className = key === active ? "on" : "";
      b.addEventListener("click", () => {
        active = key;
        filters.querySelectorAll("button").forEach(x => x.classList.toggle("on", x === b));
        render();
      });
      filters.append(b);
    });
  }

  // ---- grid ----
  function render() {
    grid.innerHTML = "";
    window.PROJECTS.filter(p => active === "all" || p.category === active).forEach(p => {
      const card = document.createElement("button");
      card.className = "card reveal";
      card.type = "button";
      const n = p.images.length;
      card.innerHTML =
        `<img src="${p.images[0]}" alt="${p.name} — ${catName(p.category)}" loading="lazy">` +
        (n > 1 ? `<span class="count">${n} ${window.t("views", "views")}</span>` : "") +
        `<div class="cap"><h3>${p.name}</h3><p>${catName(p.category)}${p.tag ? " · " + tagName(p.tag) : ""}</p></div>`;
      card.addEventListener("click", () => openLightbox(p, 0));
      grid.append(card);
      io.observe(card);
    });
  }

  // ---- lightbox ----
  const lb = $("#lightbox"), lbImg = $("#lbImg"), lbCap = $("#lbCap");
  const prev = $(".lb-nav.prev"), next = $(".lb-nav.next");
  let cur = null, idx = 0, opener = null;

  function show() {
    lbImg.src = cur.images[idx];
    lbImg.alt = cur.name;
    lbCap.textContent = `${cur.name}${cur.images.length > 1 ? `  ·  ${idx + 1} / ${cur.images.length}` : ""}`;
    const multi = cur.images.length > 1;
    prev.hidden = next.hidden = !multi;
  }
  function openLightbox(p, i) {
    cur = p; idx = i; opener = document.activeElement;
    show(); lb.hidden = false; document.body.style.overflow = "hidden";
    $(".lb-close").focus();
  }
  function closeLightbox() {
    lb.hidden = true; document.body.style.overflow = "";
    opener && opener.focus();
  }
  const step = d => { idx = (idx + d + cur.images.length) % cur.images.length; show(); };
  $(".lb-close").addEventListener("click", closeLightbox);
  prev.addEventListener("click", () => step(-1));
  next.addEventListener("click", () => step(1));
  lb.addEventListener("click", e => { if (e.target === lb) closeLightbox(); });
  document.addEventListener("keydown", e => {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (cur.images.length > 1) {
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    }
  });

  // ---- reveal on scroll ----
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: .08 });
  document.querySelectorAll(".section h2, .services article, .prose").forEach(el => { el.classList.add("reveal"); io.observe(el); });

  // ---- nav ----
  const nav = $("#nav"), menu = $("#menu"), btn = $("#menuBtn");
  const onScroll = () => nav.classList.toggle("solid", scrollY > 60);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  btn.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    btn.setAttribute("aria-expanded", open);
  });
  menu.addEventListener("click", e => {
    if (e.target.tagName === "A") { menu.classList.remove("open"); btn.setAttribute("aria-expanded", false); }
  });

  $("#year").textContent = new Date().getFullYear();
  document.addEventListener("langchange", () => { buildFilters(); render(); });
  window.__applyLang(); // applies saved language, then builds filters + grid
})();
