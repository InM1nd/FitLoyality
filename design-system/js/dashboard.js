/* ============================================================
   FitLoyalty — Gym Dashboard screens (1–4)
   ============================================================ */
(function () {

  function sidebar(active) {
    const items = [
      ["Overview", "layout-dashboard", "overview"],
      ["Members", "users", "members", "347"],
      ["Rewards", "gift", "rewards"],
      ["Analytics", "bar-chart-3", "analytics"],
      ["Settings", "settings", "settings"],
    ];
    return '<aside class="dash-side">' +
      '<div class="side-brand"><span class="logo-mark">' + ic("zap") + '</span><span class="nm">Fit<b>Loyalty</b></span></div>' +
      '<div class="nav-cat">Workspace</div>' +
      '<nav class="nav-list">' +
        items.map(function (i) {
          const on = i[2] === active ? " active" : "";
          const count = i[3] ? '<span class="nav-count num">' + i[3] + '</span>' : "";
          return '<div class="nav-item' + on + '">' + ic(i[1]) + '<span>' + i[0] + '</span>' + count + '</div>';
        }).join("") +
      '</nav>' +
      '<div class="side-foot"><div class="gym-card">' +
        '<div class="gym-logo">CV</div>' +
        '<div style="flex:1;min-width:0"><div class="gym-nm">CrossFit Vienna Nord</div><div class="gym-sub">Floridsdorf, Wien</div></div>' +
        '<span class="badge badge-accent">Pro</span>' +
      '</div></div>' +
    '</aside>';
  }

  function header(crumbLast) {
    return '<div class="dash-header">' +
      '<div class="crumb">Workspace ' + ic("chevron-right") + ' <b>' + crumbLast + '</b></div>' +
      '<div class="search"><div class="input-icon">' + ic("search") + '<input class="input" placeholder="Search members, rewards…"/></div></div>' +
      '<button class="icon-btn">' + ic("bell") + '<span class="red-dot"></span></button>' +
      '<div class="av av-grad-1" style="width:34px;height:34px" title="Thomas Müller">TM</div>' +
    '</div>';
  }

  function statusBadge(s) {
    if (s === "active")  return '<span class="badge badge-success"><span class="dot"></span>Active</span>';
    if (s === "at-risk") return '<span class="badge badge-warning"><span class="dot"></span>At-Risk</span>';
    return '<span class="badge badge-neutral"><span class="dot"></span>Churned</span>';
  }

  /* ---------- Screen 1: Overview ---------- */
  function screenOverview() {
    const kpis =
      kpi("Active Members", "347", "up", "+12 this month", "users", "") +
      kpi("Retention Rate", "81.4%", "up", "3.2% vs last month", "trending-up", "accent") +
      kpi("At-Risk Members", "23", "down", "needs attention", "alert-triangle", "warn") +
      kpi("Rewards Redeemed", "89", "up", "this month", "gift", "");

    const risk = FL.atRisk.map(function (m) {
      return '<div class="risk-item">' +
        '<div class="av sm av-grad-' + m.grad + '">' + m.init + '</div>' +
        '<div class="ri-meta"><div class="ri-nm">' + m.name + '</div><div class="ri-sub">Last visit · ' + m.last + ' · ' + m.wpm + ' workouts/mo</div></div>' +
        '<button class="btn btn-secondary btn-sm">' + ic("send") + 'Nudge</button>' +
      '</div>';
    }).join("");

    const activity = FL.rewardActivity.map(function (r) {
      const st = r.status === "granted"
        ? '<span class="badge badge-info">Auto-granted</span>'
        : '<span class="badge badge-success"><span class="dot"></span>Redeemed</span>';
      return '<tr>' +
        '<td><div class="cell-user"><div class="av sm av-grad-' + r.grad + '">' + r.init + '</div><span class="nm">' + r.name + '</span></div></td>' +
        '<td><span style="margin-right:8px">' + r.emoji + '</span>' + r.reward + '</td>' +
        '<td class="num">' + (r.pts ? '−' + r.pts + ' pts' : '—') + '</td>' +
        '<td>' + st + '</td>' +
        '<td class="cell-sub">' + r.when + '</td>' +
      '</tr>';
    }).join("");

    return frame("01", "Overview Dashboard", "Gym admin — desktop 1280px",
      '<div class="dash">' + sidebar("overview") +
      '<div class="dash-main">' + header("Overview") +
        '<div class="dash-body">' +
          '<div class="kpi-row">' + kpis + '</div>' +
          '<div class="split-60-40">' +
            '<div class="panel"><div class="panel-head"><h3>Retention Rate</h3><span class="ph-sub">Last 6 months</span></div>' +
              '<div class="panel-body"><div class="chart-box"><canvas id="chart-retention"></canvas></div></div></div>' +
            '<div class="panel"><div class="panel-head"><h3>At-Risk Members</h3><span class="badge badge-warning num">5</span></div>' +
              '<div class="panel-body" style="padding-top:4px;padding-bottom:4px">' + risk + '</div></div>' +
          '</div>' +
          '<div class="panel flush"><div class="panel-head"><h3>Recent Reward Activity</h3><button class="btn btn-ghost btn-sm">View all ' + ic("arrow-right") + '</button></div>' +
            '<table class="tbl"><thead><tr><th>Member</th><th>Reward</th><th>Points</th><th>Status</th><th>When</th></tr></thead><tbody>' + activity + '</tbody></table>' +
          '</div>' +
        '</div>' +
      '</div></div>'
    );
  }

  function kpi(label, val, dir, sub, icon, mod) {
    const arrow = dir === "up" ? "arrow-up-right" : dir === "down" ? "arrow-down-right" : "minus";
    const trendCls = mod === "warn" ? "flat" : dir;
    return '<div class="card kpi ' + mod + '">' +
      '<div class="kpi-top"><span class="kpi-label">' + label + '</span><span class="kpi-ic">' + ic(icon) + '</span></div>' +
      '<div class="kpi-val num">' + val + '</div>' +
      '<div class="kpi-trend ' + trendCls + '">' + ic(arrow) + sub + '</div>' +
    '</div>';
  }

  /* ---------- Screen 2: Members table + detail panel ---------- */
  function screenMembers() {
    const selName = "Markus Köhler";
    const rows = FL.members.slice(0, 9).map(function (m) {
      const sel = m.name === selName ? " selected" : "";
      return '<tr class="' + (sel ? "selected" : "") + '">' +
        '<td><div class="cell-user"><div class="av sm av-grad-' + m.grad + '">' + m.init + '</div><div><div class="nm">' + m.name + '</div><div class="cell-sub">' + m.city + '</div></div></div></td>' +
        '<td class="cell-sub">' + m.since + '</td>' +
        '<td>' + m.last + '</td>' +
        '<td class="num">' + m.wpm + '</td>' +
        '<td class="num" style="font-weight:600">' + m.pts.toLocaleString("de-DE") + '</td>' +
        '<td>' + statusBadge(m.status) + '</td>' +
      '</tr>';
    }).join("");

    const detail =
      '<div class="detail-panel">' +
        '<div class="detail-head" style="display:flex;align-items:center;justify-content:space-between">' +
          '<div style="display:flex;align-items:center;gap:12px"><div class="av av-grad-1" style="width:46px;height:46px;font-size:16px">MK</div>' +
          '<div><div style="font-weight:600;font-size:15px">Markus Köhler</div><div class="cell-sub">Member since Mar 2021</div></div></div>' +
          '<button class="icon-btn" style="border:none">' + ic("x") + '</button>' +
        '</div>' +
        '<div class="detail-row"><span class="k">Status</span>' + statusBadge("active") + '</div>' +
        '<div class="detail-row"><span class="k">Points balance</span><b class="num">2,840</b></div>' +
        '<div class="detail-row"><span class="k">Current streak</span><b>14 days 🔥</b></div>' +
        '<div class="detail-row"><span class="k">Workouts / month</span><b class="num">18</b></div>' +
        '<div class="detail-sec"><div class="ds-title">30-Day Activity</div>' +
          '<div class="heat dash-heat">' + FL.detailHeat.map(function (l) { return '<div class="cell' + (l ? ' l' + l : '') + '"></div>'; }).join("") + '</div>' +
        '</div>' +
        '<div class="detail-sec"><div class="ds-title">Points — Last 6 Months</div><div style="height:120px"><canvas id="chart-member-detail"></canvas></div></div>' +
        '<div class="detail-sec"><div class="ds-title">Connected Device</div>' +
          '<div class="device-chip"><span class="dot" style="background:var(--success)"></span>' + ic("watch") + 'Apple Watch · synced 2 min ago</div>' +
        '</div>' +
        '<div style="padding:18px 20px;display:flex;gap:10px"><button class="btn btn-primary btn-sm btn-block">' + ic("send") + 'Send Nudge</button><button class="btn btn-secondary btn-sm">' + ic("gift") + '</button></div>' +
      '</div>';

    return frame("02", "Members", "Table with member detail panel open",
      '<div class="dash with-detail">' + sidebar("members") +
      '<div class="dash-main">' + header("Members") +
        '<div style="display:flex;flex:1;min-height:0">' +
          '<div class="dash-body" style="flex:1">' +
            '<div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">' +
              '<div class="search" style="max-width:280px"><div class="input-icon">' + ic("search") + '<input class="input" placeholder="Search members…"/></div></div>' +
              '<button class="btn btn-secondary btn-sm">' + ic("filter") + 'Status</button>' +
              '<button class="btn btn-secondary btn-sm">' + ic("arrow-up-down") + 'Sort</button>' +
              '<div style="flex:1"></div>' +
              '<button class="btn btn-primary btn-sm">' + ic("user-plus") + 'Invite</button>' +
            '</div>' +
            '<div class="panel flush"><table class="tbl"><thead><tr><th>Member</th><th>Since</th><th>Last Visit</th><th>Workouts/Mo</th><th>Points</th><th>Status</th></tr></thead><tbody>' + rows + '</tbody></table>' +
              '<div class="pagination"><span class="pg-info">Showing 1–9 of 347 members</span>' +
              '<div class="pg-btns"><button>' + ic("chevron-left") + '</button><button class="active">1</button><button>2</button><button>3</button><button>…</button><button>39</button><button>' + ic("chevron-right") + '</button></div></div>' +
            '</div>' +
          '</div>' +
          detail +
        '</div>' +
      '</div></div>'
    );
  }

  /* ---------- Screen 3: Rewards builder ---------- */
  function screenRewards() {
    const cards = FL.rewards.map(function (r) {
      return '<div class="card reward-card card-hover">' +
        '<div class="rc-top"><div style="display:flex;gap:13px"><div class="rc-emoji">' + r.emoji + '</div>' +
          '<div><div class="rc-nm">' + r.name + '</div><div style="margin-top:4px"><span class="badge badge-outline">' + r.trigger + '</span></div></div></div>' +
          '<label class="switch"><input type="checkbox"' + (r.on ? ' checked' : '') + '/><span class="track"></span><span class="thumb"></span></label></div>' +
        '<div class="rc-desc">' + r.desc + '</div>' +
        '<div class="rc-foot"><span>' + ic("users") + ' ' + r.claimed + ' redeemed</span><span class="num" style="font-weight:600;color:var(--text-2)">' + r.cost + '</span></div>' +
      '</div>';
    }).join("");

    return frame("03", "Rewards Builder", "Grid of active rewards + create modal",
      '<div class="dash">' + sidebar("rewards") +
      '<div class="dash-main">' + header("Rewards") +
        '<div class="dash-body">' +
          '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px">' +
            '<div><div style="font-size:18px;font-weight:600">Active Rewards</div><div class="cell-sub">4 of 8 rewards live · 263 redemptions this quarter</div></div>' +
            '<button class="btn btn-primary" id="openBuilder">' + ic("plus") + 'Create New Reward</button>' +
          '</div>' +
          '<div class="reward-grid">' + cards + '</div>' +
        '</div>' +
      '</div></div>'
    );
  }

  /* Builder modal markup (mounted into #builderOverlay) */
  window.builderModalHTML = function () {
    const triggers = [
      ["activity", "Workout Count", true],
      ["flame", "Calorie Goal", false],
      ["zap", "Streak", false],
      ["map-pin", "Check-ins", false],
      ["hand", "Manual", false],
    ];
    const opts = triggers.map(function (t) {
      return '<div class="dd-opt' + (t[2] ? ' sel' : '') + '">' + ic(t[0]) + '<span>' + t[1] + '</span>' + (t[2] ? ic("check") : "") + '</div>';
    }).join("");

    return '<div class="modal">' +
      '<div class="modal-head"><h3>Create New Reward</h3><button class="modal-x" id="closeBuilder">' + ic("x") + '</button></div>' +
      '<div class="builder">' +
        '<div class="builder-form">' +
          '<div class="field"><label>Reward name</label><input class="input" value="Birthday Free Month"/></div>' +
          '<div class="field"><label>Trigger type</label>' +
            '<div class="dd"><div class="select-wrap"><div class="select" style="display:flex;align-items:center;gap:8px">' + ic("activity") + 'Workout Count</div><svg class="chev" data-lucide="chevron-up"></svg></div>' +
            '<div class="dd-menu">' + opts + '</div></div>' +
          '</div>' +
          '<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">' +
            '<div class="field"><label>Trigger value</label><input class="input num" value="20"/></div>' +
            '<div class="field"><label>Points cost</label><input class="input num" value="200"/></div>' +
          '</div>' +
          '<div class="field"><label>Description</label><textarea class="textarea">Celebrate another year — one free membership month, automatically credited on the member\'s birthday.</textarea></div>' +
        '</div>' +
        '<div class="builder-preview"><div class="bp-label">Member app preview</div>' +
          '<div class="m-reward claimable" style="margin:0">' +
            '<div class="mr-emoji">🎂</div>' +
            '<div class="mr-meta"><div class="mr-nm">Birthday Free Month</div><div class="mr-sub">Auto-granted on your birthday</div><div class="mr-ready">Ready to claim</div></div>' +
          '</div>' +
          '<div style="margin-top:16px;font-size:11.5px;color:var(--text-3);line-height:1.5">This is how the reward appears in the member\'s Rewards tab once the trigger is met.</div>' +
        '</div>' +
      '</div>' +
      '<div class="modal-foot"><button class="btn btn-ghost" id="cancelBuilder">Cancel</button><button class="btn btn-primary">' + ic("check") + 'Create Reward</button></div>' +
    '</div>';
  };

  /* ---------- Screen 4: Analytics — cohort ---------- */
  function screenAnalytics() {
    // cohort cell color from value 0-100
    function cohortColor(v) {
      if (v === null) return null;
      // red(0) -> yellow(50) -> green(100)
      const t = v / 100;
      let r, g, b;
      if (t < 0.5) { const k = t / 0.5; r = 239; g = Math.round(68 + (197 - 68) * k); b = Math.round(68 - 68 * k + (11) * k); }
      else { const k = (t - 0.5) / 0.5; r = Math.round(239 - (239 - 34) * k); g = Math.round(197); b = Math.round(11 + (94 - 11) * k); }
      return 'rgb(' + r + ',' + g + ',' + b + ')';
    }
    const headcells = ["Cohort", "M0", "M1", "M2", "M3", "M4", "M5"].map(function (h, i) {
      return i === 0 ? '<th style="text-align:left">' + h + '</th>' : '<th>' + h + '</th>';
    }).join("");
    const cohortRows = FL.cohorts.map(function (c) {
      const cells = c.v.map(function (v) {
        if (v === null) return '<td class="c empty">—</td>';
        return '<td class="c" style="background:' + cohortColor(v) + '">' + v + '%</td>';
      }).join("");
      return '<tr><td class="lbl">' + c.label + '</td>' + cells + '</tr>';
    }).join("");

    const roi =
      '<div class="roi">' +
        '<div class="roi-h"><span class="roi-ic">' + ic("calculator") + '</span>ROI Calculator</div>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:18px 0">' +
          '<div class="roi-in"><label>Members retained / mo</label><div class="ri num">+19</div></div>' +
          '<div class="roi-in"><label>Avg. membership / mo</label><div class="ri num">€ 89</div></div>' +
          '<div class="roi-in"><label>Churn reduction</label><div class="ri num">−4.1%</div></div>' +
          '<div class="roi-in"><label>FitLoyalty plan</label><div class="ri num">€ 79</div></div>' +
        '</div>' +
        '<div class="roi-result"><div class="rr-val">€ 1,847</div><div class="rr-lbl">net saved per month</div></div>' +
      '</div>';

    return frame("04", "Analytics — Retention Cohort", "Cohort heatmap, ROI calculator, churn pattern",
      '<div class="dash">' + sidebar("analytics") +
      '<div class="dash-main">' + header("Analytics") +
        '<div class="dash-body">' +
          '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px">' +
            '<div><div style="font-size:18px;font-weight:600">Retention & Revenue Impact</div><div class="cell-sub">CrossFit Vienna Nord · Jan–Jun 2026</div></div>' +
            '<button class="btn btn-secondary btn-sm">' + ic("download") + 'Export</button>' +
          '</div>' +
          '<div style="display:grid;grid-template-columns:1.5fr 1fr;gap:16px;margin-bottom:16px">' +
            '<div class="panel"><div class="panel-head"><h3>Cohort Retention</h3><span class="ph-sub">% retained by months since signup</span></div>' +
              '<div class="panel-body"><table class="cohort"><thead><tr>' + headcells + '</tr></thead><tbody>' + cohortRows + '</tbody></table></div></div>' +
            roi +
          '</div>' +
          '<div class="panel"><div class="panel-head"><h3>Churn by Month</h3><span class="ph-sub">Members lost · seasonal pattern</span></div>' +
            '<div class="panel-body"><div class="chart-box" style="height:220px"><canvas id="chart-churn"></canvas></div></div></div>' +
        '</div>' +
      '</div></div>'
    );
  }

  /* ---- frame wrapper ---- */
  function frame(idx, title, desc, inner) {
    return '<div class="screen-wrap" data-screen-label="' + idx + '">' +
      '<div class="frame-label"><span class="idx num">' + idx + '</span><span class="t">' + title + '</span><span class="d">· ' + desc + '</span></div>' +
      inner +
    '</div>';
  }

  window.renderDashboard = function () {
    const el = document.getElementById("sec-dashboard");
    el.innerHTML =
      '<div class="page" style="max-width:1340px">' +
        '<div class="page-head"><div class="eyebrow">Surface 1</div><h1>Gym Dashboard</h1>' +
        '<p>Web app for gym owners and admins. Desktop-first, built around retention: see who\'s slipping, reward what works, prove the ROI.</p></div>' +
        screenOverview() +
        screenMembers() +
        screenRewards() +
        screenAnalytics() +
      '</div>';
    renderIcons();
  };
})();
