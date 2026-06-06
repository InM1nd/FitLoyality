/* ============================================================
   FitLoyalty — App orchestration: nav, theme, modal, charts
   ============================================================ */
(function () {
  const html = document.documentElement;
  let activeSection = "tokens";

  function setSection(sec) {
    activeSection = sec;
    document.querySelectorAll("#sectionNav button").forEach(function (b) {
      b.classList.toggle("active", b.dataset.sec === sec);
    });
    document.querySelectorAll(".section").forEach(function (s) {
      s.classList.toggle("active", s.id === "sec-" + sec);
    });
    window.scrollTo({ top: 0, behavior: "auto" });
    if (sec === "dashboard" || sec === "mobile") initChartsFor(sec);
  }

  function setTheme(mode) {
    html.setAttribute("data-theme", mode);
    document.querySelectorAll("#themeToggle button").forEach(function (b) {
      b.classList.toggle("on", b.dataset.mode === mode);
    });
    try { localStorage.setItem("fl-theme", mode); } catch (e) {}
    // give CSS vars a tick to settle, then rebuild charts with new palette
    setTimeout(function () { refreshChartsTheme(activeSection); }, 80);
  }

  function wire() {
    document.getElementById("sectionNav").addEventListener("click", function (e) {
      const b = e.target.closest("button[data-sec]"); if (b) setSection(b.dataset.sec);
    });
    document.getElementById("themeToggle").addEventListener("click", function (e) {
      const b = e.target.closest("button[data-mode]"); if (b) setTheme(b.dataset.mode);
    });

    // Rewards builder modal
    const ov = document.getElementById("builderOverlay");
    document.addEventListener("click", function (e) {
      if (e.target.closest("#openBuilder")) {
        ov.innerHTML = builderModalHTML();
        ov.classList.add("open");
        renderIcons();
      }
      if (e.target.closest("#closeBuilder") || e.target.closest("#cancelBuilder") || e.target === ov) {
        ov.classList.remove("open");
      }
    });

    // demo: toggle switches & seg controls visually
    document.addEventListener("click", function (e) {
      const segBtn = e.target.closest(".seg button");
      if (segBtn) {
        segBtn.parentElement.querySelectorAll("button").forEach(function (x) { x.classList.remove("active"); });
        segBtn.classList.add("active");
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") ov.classList.remove("open");
    });
  }

  function boot() {
    // theme from storage
    let saved = "dark";
    try { saved = localStorage.getItem("fl-theme") || "dark"; } catch (e) {}
    html.setAttribute("data-theme", saved);
    document.querySelectorAll("#themeToggle button").forEach(function (b) {
      b.classList.toggle("on", b.dataset.mode === saved);
    });

    renderTokens();
    renderDashboard();
    renderMobile();
    renderIcons();
    wire();
    setSection("tokens");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
