// PROTOTYPE — throwaway. Question: "What should the Skelta Design portfolio look like?"
// Four variants on the existing index.html, switched with ?variant=A|B|C|D. Read-only, no persistence.
//   A — Editorial masonry (the current page, untouched)
//   B — Split screen: fixed sidebar + endless full-bleed image feed
//   C — Immersive slideshow: full-screen image, thumbnail strip, keyboard driven
//   D — Typographic index: project list, hover-follow image preview
(() => {
  const NAMES = { A: "Editorial masonry", B: "Split screen", C: "Immersive slideshow", D: "Typographic index" };
  const KEYS = Object.keys(NAMES);
  const qs = new URLSearchParams(location.search);
  let v = (qs.get("variant") || "A").toUpperCase();
  if (!KEYS.includes(v)) v = "A";

  const P = window.PROJECTS, C = window.CATEGORIES;
  const pad = n => String(n).padStart(2, "0");
  const el = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstChild; };
  const CONTACT = `<a href="mailto:hello@skeltadesign.com">hello@skeltadesign.com</a> · <a href="tel:+910000000000">+91 00000 00000</a>`;

  // ---------- switcher ----------
  const dev = ["localhost", "127.0.0.1", ""].includes(location.hostname);
  if (dev) {
    const go = (k) => { const u = new URL(location); u.searchParams.set("variant", k); location.href = u; };
    const step = d => go(KEYS[(KEYS.indexOf(v) + d + KEYS.length) % KEYS.length]);
    const bar = el(`<div class="pv-switch"><button data-d="-1" aria-label="Previous variant">←</button><span><b>${v}</b> — ${NAMES[v]}</span><button data-d="1" aria-label="Next variant">→</button></div>`);
    bar.addEventListener("click", e => { const b = e.target.closest("button"); if (b) step(+b.dataset.d); });
    document.body.append(bar);
    addEventListener("keydown", e => {
      if (e.target.closest && e.target.closest("input,textarea,[contenteditable]")) return;
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    });
  }

  if (v === "A") return;
  document.body.classList.add("pv-on");
  const root = el(`<div class="pv pv-${v}"></div>`);
  document.body.append(root);
  ({ B, C: Cv, D }[v] || (() => {}))(root);

  // ================= B — split screen =================
  function B(root) {
    root.innerHTML = `
      <aside>
        <a href="#" class="pv-logo">SKELTA<span>DESIGN</span></a>
        <p class="tagline">Homes shaped by light, landscape and craft.</p>
        <ul class="cats"></ul>
        <div class="studio">
          <h4>Studio</h4>
          <p>An architecture firm focused on residential work — contemporary volumes, tropical tiled roofs and gable forms.</p>
          <h4>Contact</h4>
          <p>${CONTACT.replace(" · ", "<br>")}</p>
        </div>
      </aside>
      <section class="feed"></section>`;
    const cats = root.querySelector(".cats"), feed = root.querySelector(".feed");
    let cur = "all";
    const draw = () => {
      cats.innerHTML = Object.entries({ all: "All work", ...C }).map(([k, l]) =>
        `<li><button data-k="${k}" class="${k === cur ? "on" : ""}">${l}<em>${k === "all" ? P.length : P.filter(p => p.category === k).length}</em></button></li>`).join("");
      feed.innerHTML = P.filter(p => cur === "all" || p.category === cur).map((p, i) =>
        `<figure><img src="${p.images[0]}" loading="lazy" alt="${p.name}"><figcaption><span>${pad(i + 1)}</span><b>${p.name}</b><i>${C[p.category]}${p.images.length > 1 ? " · " + p.images.length + " views" : ""}</i></figcaption></figure>`).join("");
      feed.scrollTop = 0; scrollTo(0, 0);
    };
    cats.addEventListener("click", e => { const b = e.target.closest("button"); if (b) { cur = b.dataset.k; draw(); } });
    draw();
  }

  // ================= C — immersive slideshow =================
  function Cv(root) {
    const slides = P.flatMap(p => p.images.map((src, j) => ({ src, p, j })));
    let i = 0, cat = "all", list = slides;
    root.innerHTML = `
      <header><a href="#" class="pv-logo">SKELTA<span>DESIGN</span></a><nav class="tabs"></nav><a class="ct" href="mailto:hello@skeltadesign.com">Contact</a></header>
      <div class="stage"><img class="a on"><img class="b"></div>
      <div class="meta"><small class="cnt"></small><h1 class="nm"></h1><p class="ct2"></p></div>
      <div class="strip"></div>
      <p class="hint">Click image or ↑ ↓ to browse</p>`;
    const [a, b] = root.querySelectorAll(".stage img"), strip = root.querySelector(".strip"), tabs = root.querySelector(".tabs");
    let front = a;
    const show = n => {
      i = (n + list.length) % list.length; const s = list[i];
      const back = front === a ? b : a; back.src = s.src; back.alt = s.p.name;
      back.onload = () => { back.classList.add("on"); front.classList.remove("on"); front = back; };
      root.querySelector(".cnt").textContent = `${pad(i + 1)} / ${pad(list.length)}`;
      root.querySelector(".nm").textContent = s.p.name;
      root.querySelector(".ct2").textContent = `${C[s.p.category]}${s.p.images.length > 1 ? ` · view ${s.j + 1} of ${s.p.images.length}` : ""}${s.p.tag ? " · " + s.p.tag : ""}`;
      strip.querySelectorAll("img").forEach((t, k) => t.classList.toggle("on", k === i));
      strip.querySelector("img.on")?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
    };
    const build = () => {
      list = slides.filter(s => cat === "all" || s.p.category === cat);
      strip.innerHTML = list.map((s, k) => `<img data-k="${k}" src="${s.src}" alt="">`).join("");
      tabs.innerHTML = Object.entries({ all: "All", ...C }).map(([k, l]) => `<button data-k="${k}" class="${k === cat ? "on" : ""}">${l}</button>`).join("");
      show(0);
    };
    tabs.addEventListener("click", e => { const t = e.target.closest("button"); if (t) { cat = t.dataset.k; build(); } });
    strip.addEventListener("click", e => { const t = e.target.closest("img"); if (t) show(+t.dataset.k); });
    root.querySelector(".stage").addEventListener("click", () => show(i + 1));
    addEventListener("keydown", e => { if (e.key === "ArrowDown") { e.preventDefault(); show(i + 1); } if (e.key === "ArrowUp") { e.preventDefault(); show(i - 1); } });
    build();
  }

  // ================= D — typographic index =================
  function D(root) {
    root.innerHTML = `
      <header><a href="#" class="pv-logo">SKELTA<span>DESIGN</span></a><span>Architecture · Residential</span><a href="#contact">Contact ↓</a></header>
      <h1>We design homes<br>that belong to<br>their <em>place.</em></h1>
      <div class="filt"></div>
      <ol class="rows"></ol>
      <footer id="contact"><h2>Let's design your home.</h2><p>${CONTACT}</p></footer>
      <img class="peek" alt="">
      <div class="sheet" hidden><button class="x" aria-label="Close">×</button><div class="body"></div></div>`;
    const rows = root.querySelector(".rows"), filt = root.querySelector(".filt"), peek = root.querySelector(".peek"), sheet = root.querySelector(".sheet");
    let cat = "all";
    const draw = () => {
      filt.innerHTML = Object.entries({ all: "All", ...C }).map(([k, l]) => `<button data-k="${k}" class="${k === cat ? "on" : ""}">${l}</button>`).join("");
      const ps = P.filter(p => cat === "all" || p.category === cat);
      rows.innerHTML = ps.map((p, i) => `<li data-i="${P.indexOf(p)}"><span class="n">${pad(i + 1)}</span><b>${p.name}</b><span class="c">${C[p.category]}</span><span class="v">${p.images.length > 1 ? p.images.length + " views" : p.tag || ""}</span><img class="th" src="${p.images[0]}" alt=""></li>`).join("");
    };
    filt.addEventListener("click", e => { const b = e.target.closest("button"); if (b) { cat = b.dataset.k; draw(); } });
    rows.addEventListener("mouseover", e => { const li = e.target.closest("li"); if (li) { peek.src = P[li.dataset.i].images[0]; peek.classList.add("on"); } });
    rows.addEventListener("mouseleave", () => peek.classList.remove("on"));
    addEventListener("mousemove", e => { peek.style.transform = `translate(${e.clientX + 30}px, ${e.clientY - 120}px)`; });
    rows.addEventListener("click", e => {
      const li = e.target.closest("li"); if (!li) return;
      const p = P[li.dataset.i];
      sheet.querySelector(".body").innerHTML = `<h2>${p.name}</h2><p>${C[p.category]}${p.tag ? " · " + p.tag : ""}</p>` + p.images.map(s => `<img src="${s}" alt="${p.name}">`).join("");
      sheet.hidden = false; sheet.scrollTop = 0; document.body.style.overflow = "hidden";
    });
    const close = () => { sheet.hidden = true; document.body.style.overflow = ""; };
    sheet.querySelector(".x").addEventListener("click", close);
    addEventListener("keydown", e => { if (e.key === "Escape") close(); });
    draw();
  }
})();
