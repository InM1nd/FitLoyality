/* ============================================================
   FitLoyalty — Charts (Chart.js) + QR placeholder
   Charts are created lazily per section (canvas needs layout).
   ============================================================ */
(function () {
  const charts = {};

  function css(v) { return getComputedStyle(document.documentElement).getPropertyValue(v).trim(); }

  function baseOpts(extra) {
    const grid = css("--grid-line");
    const tick = css("--text-3");
    return Object.assign({
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: {
        backgroundColor: css("--surface-3"), borderColor: css("--border-default"), borderWidth: 1,
        titleColor: css("--text-1"), bodyColor: css("--text-2"), padding: 10, cornerRadius: 8, displayColors: false,
      } },
      scales: {
        x: { grid: { display: false }, border: { display: false }, ticks: { color: tick, font: { family: "Satoshi", size: 11 } } },
        y: { grid: { color: grid }, border: { display: false }, ticks: { color: tick, font: { family: "Satoshi", size: 11 } } },
      },
    }, extra || {});
  }

  function destroy(id) { if (charts[id]) { charts[id].destroy(); delete charts[id]; } }

  function lineGradient(ctx, area, color) {
    const g = ctx.createLinearGradient(0, area.top, 0, area.bottom);
    g.addColorStop(0, color.replace(")", ",0.28)").replace("rgb", "rgba"));
    g.addColorStop(1, color.replace(")", ",0)").replace("rgb", "rgba"));
    return g;
  }

  function makeRetention() {
    const c = document.getElementById("chart-retention"); if (!c) return;
    destroy("chart-retention");
    const accent = "rgb(34,197,94)";
    charts["chart-retention"] = new Chart(c, {
      type: "line",
      data: { labels: FL.retentionMonths, datasets: [{
        data: FL.retentionData, borderColor: accent, borderWidth: 2.5,
        tension: 0.4, pointRadius: 4, pointBackgroundColor: accent, pointBorderColor: css("--surface-1"), pointBorderWidth: 2,
        fill: true, backgroundColor: function (ctx) { const {chart} = ctx; return chart.chartArea ? lineGradient(chart.ctx, chart.chartArea, accent) : "transparent"; },
      }] },
      options: baseOpts({ scales: { x: { grid: { display: false }, border: { display: false }, ticks: { color: css("--text-3"), font: { family: "Satoshi", size: 11 } } },
        y: { min: 65, max: 90, grid: { color: css("--grid-line") }, border: { display: false }, ticks: { color: css("--text-3"), font: { family: "Satoshi", size: 11 }, callback: function (v) { return v + "%"; } } } } }),
    });
  }

  function makeChurn() {
    const c = document.getElementById("chart-churn"); if (!c) return;
    destroy("chart-churn");
    const accent = css("--accent");
    charts["chart-churn"] = new Chart(c, {
      type: "bar",
      data: { labels: FL.churnMonths, datasets: [{
        data: FL.churnData,
        backgroundColor: FL.churnData.map(function (v) { return v >= 13 ? css("--warning") : accent; }),
        borderRadius: 5, maxBarThickness: 26,
      }] },
      options: baseOpts(),
    });
  }

  function makeMemberDetail() {
    const c = document.getElementById("chart-member-detail"); if (!c) return;
    destroy("chart-member-detail");
    const accent = "rgb(34,197,94)";
    charts["chart-member-detail"] = new Chart(c, {
      type: "line",
      data: { labels: FL.retentionMonths, datasets: [{
        data: FL.memberPts, borderColor: accent, borderWidth: 2, tension: 0.4, pointRadius: 0,
        fill: true, backgroundColor: function (ctx) { const {chart} = ctx; return chart.chartArea ? lineGradient(chart.ctx, chart.chartArea, accent) : "transparent"; },
      }] },
      options: baseOpts({ scales: { x: { display: false }, y: { display: false } }, plugins: { legend: { display: false }, tooltip: { enabled: false } } }),
    });
  }

  function makeMemberPts() {
    const c = document.getElementById("chart-member-pts"); if (!c) return;
    destroy("chart-member-pts");
    const accent = "rgb(34,197,94)";
    charts["chart-member-pts"] = new Chart(c, {
      type: "line",
      data: { labels: FL.retentionMonths, datasets: [{
        data: FL.memberPts, borderColor: accent, borderWidth: 2.5, tension: 0.4,
        pointRadius: 3, pointBackgroundColor: accent,
        fill: true, backgroundColor: function (ctx) { const {chart} = ctx; return chart.chartArea ? lineGradient(chart.ctx, chart.chartArea, accent) : "transparent"; },
      }] },
      options: baseOpts({ scales: { x: { grid: { display: false }, border: { display: false }, ticks: { color: css("--text-3"), font: { family: "Satoshi", size: 10 } } }, y: { display: false } } }),
    });
  }

  /* Fake QR code — deterministic pattern, looks like a real QR */
  function drawQR() {
    const c = document.getElementById("qr-canvas"); if (!c) return;
    const ctx = c.getContext("2d"); const N = 25, s = c.width / N;
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillStyle = "#0a0a0a";
    let seed = 7;
    function rnd() { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; }
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
      if (rnd() > 0.52) ctx.fillRect(x * s, y * s, s, s);
    }
    // finder patterns
    function finder(fx, fy) {
      ctx.fillStyle = "#0a0a0a"; ctx.fillRect(fx * s, fy * s, 7 * s, 7 * s);
      ctx.fillStyle = "#fff"; ctx.fillRect((fx + 1) * s, (fy + 1) * s, 5 * s, 5 * s);
      ctx.fillStyle = "#0a0a0a"; ctx.fillRect((fx + 2) * s, (fy + 2) * s, 3 * s, 3 * s);
    }
    ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, 8 * s, 8 * s); finder(0, 0);
    ctx.fillStyle = "#fff"; ctx.fillRect(18 * s, 0, 8 * s, 8 * s); finder(18, 0);
    ctx.fillStyle = "#fff"; ctx.fillRect(0, 18 * s, 8 * s, 8 * s); finder(0, 18);
  }

  window.initChartsFor = function (section) {
    setTimeout(function () {
      if (section === "dashboard") { makeRetention(); makeChurn(); makeMemberDetail(); }
      if (section === "mobile") { makeMemberPts(); drawQR(); }
    }, 60);
  };

  window.refreshChartsTheme = function (activeSection) {
    // destroy all and rebuild visible ones with new theme colors
    Object.keys(charts).forEach(destroy);
    initChartsFor(activeSection);
    drawQR();
  };
})();
