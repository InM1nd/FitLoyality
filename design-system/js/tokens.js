/* ============================================================
   FitLoyalty — Design Tokens section
   ============================================================ */
(function () {

  const colorGroups = [
    { title: "Surfaces", items: [
      ["Background", "var(--bg)", "#0a0a0a"],
      ["Surface 1", "var(--surface-1)", "#111111"],
      ["Surface 2", "var(--surface-2)", "#1a1a1a"],
      ["Surface 3", "var(--surface-3)", "#222222"],
    ]},
    { title: "Accent — Electric Green", items: [
      ["Primary", "var(--accent)", "#22c55e"],
      ["Hover", "var(--accent-hover)", "#16a34a"],
      ["Subtle bg", "var(--accent-subtle)", "rgba(34,197,94,.08)"],
      ["Glow", "var(--accent-glow)", "rgba(34,197,94,.15)"],
    ]},
    { title: "Text", items: [
      ["Primary", "var(--text-1)", "#ffffff"],
      ["Secondary", "var(--text-2)", "#a1a1aa"],
      ["Tertiary", "var(--text-3)", "#52525b"],
      ["Inverse", "var(--text-inverse)", "#0a0a0a"],
    ]},
    { title: "Semantic", items: [
      ["Success", "var(--success)", "#22c55e"],
      ["Warning", "var(--warning)", "#f59e0b"],
      ["Error", "var(--error)", "#ef4444"],
      ["Info", "var(--info)", "#3b82f6"],
    ]},
  ];

  function swatches(group) {
    return group.items.map(function (i) {
      return '<div class="swatch">' +
        '<div class="chip" style="background:' + i[1] + '"></div>' +
        '<div class="meta"><div class="nm">' + i[0] + '</div><div class="val">' + i[2] + '</div></div>' +
      '</div>';
    }).join("");
  }

  const typeSpecs = [
    ["Display / Hero", "Satoshi 700 · 40px", "Turn every workout into loyalty", 'font-size:40px;font-weight:700;letter-spacing:-0.02em'],
    ["Heading 1", "Satoshi 600 · 24px", "Retention is the new acquisition", 'font-size:24px;font-weight:600;letter-spacing:-0.01em'],
    ["Heading 2", "Satoshi 600 · 18px", "At-risk members this week", 'font-size:18px;font-weight:600'],
    ["Body", "Satoshi 400 · 14px", "Members earn points for every check-in, streak and personal record.", 'font-size:14px;font-weight:400'],
    ["Small / Label", "Satoshi 500 · 12px", "LAST VISIT · 2 DAYS AGO", 'font-size:12px;font-weight:500;letter-spacing:.04em'],
    ["Numeric · tabular", "Satoshi 700 · tnum", "2,840 · 81.4% · €1,847", 'font-size:24px;font-weight:700;font-variant-numeric:tabular-nums'],
  ];

  function typeSpecimen() {
    return typeSpecs.map(function (t) {
      return '<div class="spec-row">' +
        '<div class="spec-meta"><b>' + t[0] + '</b>' + t[1] + '</div>' +
        '<div style="' + t[3] + ';flex:1">' + t[2] + '</div>' +
      '</div>';
    }).join("");
  }

  const spacingScale = [4,8,12,16,20,24,32,40,48,64];
  function spacing() {
    return spacingScale.map(function (s) {
      return '<div style="display:flex;align-items:center;gap:14px">' +
        '<span class="num" style="width:42px;font-size:12px;color:var(--text-3)">' + s + 'px</span>' +
        '<span style="height:14px;width:' + s + 'px;background:var(--accent);border-radius:3px;box-shadow:var(--shadow-glow)"></span>' +
      '</div>';
    }).join("");
  }

  const radii = [["sm · 6px",6],["md · 8px",8],["lg · 12px",12],["xl · 16px",16],["full",26]];
  function radiusBoxes() {
    return radii.map(function (r) {
      return '<div style="text-align:center"><div style="width:72px;height:60px;background:var(--surface-3);border:1px solid var(--border-default);border-radius:' + r[1] + 'px;margin:0 auto 8px"></div>' +
        '<div style="font-size:11px;color:var(--text-3)">' + r[0] + '</div></div>';
    }).join("");
  }

  const shadows = [
    ["Subtle", "var(--shadow-subtle)"],
    ["Card", "var(--shadow-card)"],
    ["Elevated", "var(--shadow-elevated)"],
    ["Glow", "var(--shadow-glow)"],
  ];
  function shadowBoxes() {
    return shadows.map(function (s) {
      return '<div style="text-align:center"><div style="width:100%;height:64px;background:var(--surface-1);border:1px solid var(--border-subtle);border-radius:12px;box-shadow:' + s[1] + ';margin-bottom:10px"></div>' +
        '<div style="font-size:11px;color:var(--text-3)">' + s[0] + '</div></div>';
    }).join("");
  }

  /* ---- Component gallery ---- */
  function chev() { return '<svg class="chev" data-lucide="chevron-down"></svg>'; }

  function components() {
    return (
    '<div class="demo-grid" style="grid-template-columns:repeat(2,1fr)">' +

      // Buttons
      '<div class="demo-card"><div class="dc-title">Buttons</div>' +
        '<div class="demo-col">' +
          '<div class="demo-row">' +
            '<button class="btn btn-primary">' + ic("plus") + 'Primary</button>' +
            '<button class="btn btn-secondary">Secondary</button>' +
            '<button class="btn btn-ghost">Ghost</button>' +
            '<button class="btn btn-destructive">' + ic("trash-2") + 'Delete</button>' +
          '</div>' +
          '<div class="demo-row">' +
            '<button class="btn btn-primary btn-sm">Small</button>' +
            '<button class="btn btn-primary" disabled>Disabled</button>' +
            '<button class="btn btn-secondary btn-sm">' + ic("send") + 'Send Nudge</button>' +
          '</div>' +
        '</div></div>' +

      // Inputs
      '<div class="demo-card"><div class="dc-title">Inputs</div>' +
        '<div class="demo-col">' +
          '<div class="field"><div class="input-icon">' + ic("search") + '<input class="input" placeholder="Search members…"/></div></div>' +
          '<div class="demo-row" style="gap:10px">' +
            '<div class="field" style="flex:1"><input class="input" value="Focused" style="border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-subtle)"/></div>' +
            '<div class="field error" style="flex:1"><input class="input" value="Invalid"/><span class="msg">Required field</span></div>' +
          '</div>' +
          '<div class="select-wrap"><select class="select"><option>Trigger: Workout count</option></select>' + chev() + '</div>' +
        '</div></div>' +

      // Badges
      '<div class="demo-card"><div class="dc-title">Badges & Tags</div>' +
        '<div class="demo-col">' +
          '<div class="demo-row">' +
            '<span class="badge badge-success"><span class="dot"></span>Active</span>' +
            '<span class="badge badge-warning"><span class="dot"></span>At-Risk</span>' +
            '<span class="badge badge-error"><span class="dot"></span>Churned</span>' +
            '<span class="badge badge-info"><span class="dot"></span>New</span>' +
            '<span class="badge badge-neutral">Neutral</span>' +
          '</div>' +
          '<div class="demo-row">' +
            '<span class="badge badge-accent">Pro Plan</span>' +
            '<span class="badge badge-outline">Outline</span>' +
            '<span class="badge badge-outline">14-day streak</span>' +
          '</div>' +
        '</div></div>' +

      // Progress
      '<div class="demo-card"><div class="dc-title">Progress</div>' +
        '<div class="demo-col">' +
          '<div><div style="font-size:11px;color:var(--text-3);margin-bottom:6px">Default · 72%</div><div class="progress"><i style="width:72%"></i></div></div>' +
          '<div><div style="font-size:11px;color:var(--text-3);margin-bottom:6px">Thin · 40%</div><div class="progress thin"><i style="width:40%"></i></div></div>' +
          '<div><div style="font-size:11px;color:var(--text-3);margin-bottom:6px">Segmented · 4/7</div><div class="progress-seg"><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i></i><i></i><i></i></div></div>' +
        '</div></div>' +

      // Avatars
      '<div class="demo-card"><div class="dc-title">Avatars</div>' +
        '<div class="demo-row" style="gap:18px">' +
          '<div class="av av-grad-1">MK</div>' +
          '<div class="av av-grad-2">LH<span class="av-badge online"></span></div>' +
          '<div class="av lg av-grad-4">SG</div>' +
          '<div class="av-stack">' +
            '<div class="av sm av-grad-1">CB</div>' +
            '<div class="av sm av-grad-3">FM</div>' +
            '<div class="av sm av-grad-5">AP</div>' +
            '<div class="av sm" style="background:var(--surface-3);color:var(--text-2)">+9</div>' +
          '</div>' +
        '</div></div>' +

      // Toggle + KPI
      '<div class="demo-card"><div class="dc-title">Switch & KPI</div>' +
        '<div class="demo-row" style="gap:24px;align-items:flex-start">' +
          '<div class="demo-col" style="gap:14px"><label class="switch"><input type="checkbox" checked/><span class="track"></span><span class="thumb"></span></label>' +
          '<label class="switch"><input type="checkbox"/><span class="track"></span><span class="thumb"></span></label></div>' +
          '<div class="card kpi accent" style="flex:1;box-shadow:none">' +
            '<div class="kpi-top"><span class="kpi-label">Retention Rate</span><span class="kpi-ic">' + ic("trending-up") + '</span></div>' +
            '<div class="kpi-val num">81.4%</div>' +
            '<div class="kpi-trend up">' + ic("arrow-up-right") + '3.2% vs last month</div>' +
          '</div>' +
        '</div></div>' +

      // Cards row (full width)
      '<div class="demo-card" style="grid-column:1/-1"><div class="dc-title">Cards</div>' +
        '<div class="demo-row" style="gap:16px;align-items:stretch">' +
          cardSample("Default", "card", "A standard surface card used for panels and content blocks.") +
          cardSample("Hoverable", "card card-hover", "Lifts on hover — used for clickable list and grid items.") +
          cardSample("Selected", "card card-selected", "Highlighted with the accent ring when chosen.") +
          cardSample("Featured", "card card-featured", "Accent-tinted card for premium or claimable items.") +
        '</div></div>' +

      // Toasts (full width)
      '<div class="demo-card" style="grid-column:1/-1"><div class="dc-title">Toast notifications</div>' +
        '<div class="demo-row" style="gap:14px">' +
          toast("success","check","Reward created","“Birthday Free Month” is now live.") +
          toast("error","x","Sync failed","Couldn\'t reach Garmin Connect.") +
          toast("info","info","23 members at risk","Send a nudge to re-engage them.") +
        '</div></div>' +

    '</div>'
    );
  }

  function cardSample(name, cls, desc) {
    return '<div class="' + cls + '" style="flex:1;min-width:180px;padding:16px">' +
      '<div style="font-weight:600;margin-bottom:6px">' + name + '</div>' +
      '<div style="font-size:12px;color:var(--text-2)">' + desc + '</div></div>';
  }
  function toast(type, icon, title, desc) {
    return '<div class="toast ' + type + '"><span class="t-ic">' + ic(icon) + '</span>' +
      '<div><div class="t-title">' + title + '</div><div class="t-desc">' + desc + '</div></div></div>';
  }

  /* ---- Render ---- */
  window.renderTokens = function () {
    const el = document.getElementById("sec-tokens");
    el.innerHTML =
      '<div class="page">' +
        '<div class="page-head">' +
          '<div class="eyebrow">Foundations</div>' +
          '<h1>Design System</h1>' +
          '<p>The visual language behind FitLoyalty — built for performance, simplicity and trust. Dark by default, fully white-labelable for each gym. Toggle the theme in the top-right.</p>' +
        '</div>' +

        // Colors
        '<div class="block"><div class="block-title"><h2>Color</h2><span class="hint">Token-driven · light + dark</span></div><hr class="rule"/>' +
          colorGroups.map(function (g) {
            return '<div style="margin-bottom:22px"><div style="font-size:12px;font-weight:600;color:var(--text-2);margin-bottom:10px">' + g.title + '</div><div class="swatch-grid">' + swatches(g) + '</div></div>';
          }).join("") +
        '</div>' +

        // Type
        '<div class="block"><div class="block-title"><h2>Typography</h2><span class="hint">Satoshi · Fontshare</span></div><hr class="rule"/>' +
          '<div class="card card-pad">' + typeSpecimen() + '</div>' +
        '</div>' +

        // Spacing / radius / shadow
        '<div class="block"><div class="block-title"><h2>Spacing, Radius & Elevation</h2><span class="hint">4px base grid</span></div><hr class="rule"/>' +
          '<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">' +
            '<div class="card card-pad"><div class="dc-title" style="font-size:11px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--text-3);margin-bottom:16px">Spacing scale</div><div class="demo-col" style="gap:8px">' + spacing() + '</div></div>' +
            '<div class="demo-col" style="gap:16px">' +
              '<div class="card card-pad"><div class="dc-title" style="font-size:11px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--text-3);margin-bottom:16px">Border radius</div><div class="demo-row" style="gap:20px;justify-content:space-between">' + radiusBoxes() + '</div></div>' +
              '<div class="card card-pad"><div class="dc-title" style="font-size:11px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--text-3);margin-bottom:16px">Shadows</div><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px">' + shadowBoxes() + '</div></div>' +
            '</div>' +
          '</div>' +
        '</div>' +

        // Components
        '<div class="block"><div class="block-title"><h2>Components</h2><span class="hint">Interactive states included</span></div><hr class="rule"/>' +
          components() +
        '</div>' +

      '</div>';
    renderIcons();
  };
})();
