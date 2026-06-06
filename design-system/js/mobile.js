/* ============================================================
   FitLoyalty — Member App screens (5–8) in phone frames
   ============================================================ */
(function () {

  function statusBar() {
    return '<div class="status-bar"><span class="num">9:41</span>' +
      '<div class="sb-right">' + ic("signal") + ic("wifi") + ic("battery-full") + '</div></div>';
  }
  function island() { return '<div class="island"></div>'; }

  function tabbar(active) {
    const tabs = [
      ["Home", "home"], ["Progress", "trending-up"], ["Rewards", "gift"],
      ["Challenges", "swords"], ["Profile", "user"],
    ];
    return '<div class="tabbar">' + tabs.map(function (t) {
      const on = t[0] === active ? " active" : "";
      return '<div class="tab' + on + '">' + ic(t[1]) + '<span>' + t[0] + '</span></div>';
    }).join("") + '</div>';
  }

  function mHead() {
    return '<div class="m-head"><div class="gym-id"><div class="gym-logo">CV</div>' +
      '<div><div class="gym-nm">CrossFit Vienna Nord</div><div class="gym-sub">Your gym</div></div></div>' +
      '<button class="icon-btn" style="border:none;width:32px;height:32px">' + ic("settings") + '</button></div>';
  }

  /* ---------- Screen 5: Home ---------- */
  function home() {
    const chals =
      chal("🏃", "December Distance", "62 / 100 km this month", 62) +
      chal("🔥", "Streak Master", "14 / 21 days — keep it alive!", 67);

    const feed = [
      ["dumbbell", "var(--accent)", "Completed <b>Murph WOD</b>", "+120 pts", "Today, 07:42"],
      ["flame", "var(--warning)", "Hit your <b>calorie goal</b>", "+40 pts", "Today, 07:42"],
      ["zap", "var(--info)", "Reached a <b>14-day streak</b>", "+200 pts", "Yesterday"],
      ["trophy", "var(--accent)", "Earned <b>PR Crusher</b> badge", "+150 pts", "2 days ago"],
      ["map-pin", "var(--text-2)", "Checked in at <b>Vienna Nord</b>", "+20 pts", "2 days ago"],
    ].map(function (f) {
      return '<div class="feed-item"><div class="fi-ic" style="background:color-mix(in srgb,' + f[1] + ' 14%,transparent);color:' + f[1] + '">' + ic(f[0]) + '</div>' +
        '<div class="fi-meta"><div class="fi-t">' + f[2] + '</div><div class="fi-time">' + f[4] + '</div></div>' +
        '<div class="fi-pts">' + f[3] + '</div></div>';
    }).join("");

    return phone("05", "Home", "Member landing — points, streak, feed",
      statusBar() +
      '<div class="m-scroll">' + mHead() +
        '<div class="m-greet"><h2>Hey, Markus 👋</h2><div class="streak">' + ic("flame") + '14-day streak · top 8% at your gym</div></div>' +
        '<div class="hero-pts"><div class="hp-label">POINTS THIS MONTH</div>' +
          '<div class="hp-val num">2,840 <span>pts</span></div>' +
          '<div class="hp-next"><span>Next reward · Free Protein Shake</span><span class="num">160 pts to go</span></div>' +
          '<div class="hp-bar"><i style="width:82%"></i></div></div>' +
        '<div class="sync-chip"><span class="dot"></span>' + ic("watch") + 'Synced · Apple Watch · 2 min ago</div>' +
        '<div class="m-sec-title"><h3>Active Challenges</h3><a href="#">See all</a></div>' + chals +
        '<div class="m-sec-title"><h3>Activity</h3></div>' + feed +
      '</div>' + tabbar("Home")
    );
  }

  function chal(emoji, name, sub, pct) {
    return '<div class="chal"><div class="chal-ic">' + emoji + '</div>' +
      '<div class="chal-meta"><div class="chal-nm">' + name + '</div><div class="chal-sub">' + sub + '</div>' +
      '<div class="progress thin"><i style="width:' + pct + '%"></i></div></div></div>';
  }

  /* ---------- Screen 6: Rewards (with redeem overlay) ---------- */
  function rewards() {
    const list =
      mReward("claimable", "🥤", "Free Protein Shake", "Redeem at the bar", "2 ready!", null) +
      mReward("progress", "🎽", "Merch 10% Off", null, null, 64) +
      mReward("locked", "💪", "PT Session 50% Off", "Reach 900 pts", null, null, true) +
      mReward("locked", "🎟️", "Guest Day Pass", "Hit a 14-day streak", null, null, true);

    const overlay =
      '<div class="redeem-ov">' +
        '<div class="qr-card"><canvas class="qr" id="qr-canvas" width="180" height="180"></canvas></div>' +
        '<div class="ro-title">Free Protein Shake</div>' +
        '<div class="ro-sub">Show this code at the bar. It expires once scanned by staff.</div>' +
        '<div class="ro-timer-lbl" style="margin-top:18px">Expires in</div>' +
        '<div class="ro-timer num">04:38</div>' +
        '<button class="btn btn-secondary" style="margin-top:22px">Cancel</button>' +
      '</div>';

    return phone("06", "Rewards", "Reward list + redeem (QR) overlay",
      statusBar() +
      '<div class="m-scroll">' +
        '<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0 6px">' +
          '<h2 style="font-size:22px;font-weight:700;margin:0">Your Rewards</h2>' +
          '<span class="badge badge-accent num" style="font-size:12px">2,840 pts</span></div>' +
        '<div class="seg"><button class="active">Available</button><button>Redeemed</button></div>' +
        list +
      '</div>' + tabbar("Rewards") + overlay
    );
  }

  function mReward(state, emoji, name, sub, ready, pct, locked) {
    let right = "";
    if (state === "claimable") right = '<button class="btn btn-primary btn-sm">Redeem</button>';
    let body = '<div class="mr-nm">' + name + '</div>';
    if (sub) body += '<div class="mr-sub">' + sub + '</div>';
    if (state === "progress") body += '<div class="mr-sub">340 pts to go</div><div class="progress thin" style="margin-top:6px"><i style="width:' + pct + '%"></i></div>';
    if (ready) body = '<div class="mr-nm">' + name + '</div><div class="mr-sub">' + sub + '</div><div class="mr-ready">' + ready + '</div>';
    const lock = locked ? '<div class="mr-lock">' + ic("lock") + '</div>' : "";
    return '<div class="m-reward ' + state + '"><div class="mr-emoji">' + emoji + lock + '</div>' +
      '<div class="mr-meta">' + body + '</div>' + right + '</div>';
  }

  /* ---------- Screen 7: Progress ---------- */
  function progress() {
    const heat = FL.memberHeat.map(function (l) { return '<div class="cell' + (l ? ' l' + l : '') + '"></div>'; }).join("");
    const badges = FL.badges.map(function (b) {
      return '<div class="bdg' + (b.earned ? '' : ' locked') + '"><div class="ring">' + b.emoji + '</div><div class="bl">' + b.name + '</div></div>';
    }).join("");

    return phone("07", "Progress", "Heatmap, weekly stats, points, badges",
      statusBar() +
      '<div class="m-scroll">' +
        '<h2 style="font-size:22px;font-weight:700;margin:10px 0 16px">Your Progress</h2>' +
        '<div class="card card-pad" style="box-shadow:none">' +
          '<div style="font-size:12px;color:var(--text-3);margin-bottom:12px">Last 8 weeks · workout consistency</div>' +
          '<div class="heat m-heat">' + heat + '</div>' +
          '<div class="heat-legend">Less <span class="cell"></span><span class="cell l1"></span><span class="cell l2"></span><span class="cell l3"></span><span class="cell l4"></span> More</div>' +
        '</div>' +
        '<div class="m-sec-title"><h3>This Week</h3></div>' +
        '<div class="stat-3"><div class="st"><div class="v num">3</div><div class="l">Workouts</div></div>' +
          '<div class="st"><div class="v num">1,840<small></small></div><div class="l">kcal burned</div></div>' +
          '<div class="st"><div class="v num">127<small> min</small></div><div class="l">Active time</div></div></div>' +
        '<div class="m-sec-title"><h3>Points · 6 Months</h3><span class="num" style="font-size:12px;color:var(--accent);font-weight:700">+73%</span></div>' +
        '<div class="card card-pad" style="box-shadow:none;height:130px"><canvas id="chart-member-pts"></canvas></div>' +
        '<div class="m-sec-title"><h3>Badges</h3><a href="#">5 of 8</a></div>' +
        '<div class="badge-scroll">' + badges + '</div>' +
      '</div>' + tabbar("Progress")
    );
  }

  /* ---------- Screen 8: Profile + settings ---------- */
  function profile() {
    const settings = [
      ["bell", "Notifications"],
      ["palette", "App appearance"],
      ["globe", "Language · Deutsch"],
      ["shield", "Privacy & data"],
      ["circle-help", "Help & support"],
    ].map(function (s) {
      return '<div class="set-item"><div class="si-ic">' + ic(s[0]) + '</div><div class="si-t">' + s[1] + '</div>' + ic("chevron-right", "chev") + '</div>';
    }).join("");

    return phone("08", "Profile & Settings", "Stats, devices, GDPR notice, settings",
      statusBar() +
      '<div class="m-scroll">' +
        '<div class="prof-head"><div class="av lg av-grad-1">MK</div><div class="pn">Markus Köhler</div><div class="pm">Pro Membership · Vienna Nord</div></div>' +
        '<div class="card" style="box-shadow:none"><div class="prof-stats">' +
          '<div class="ps"><div class="v num">847</div><div class="l">Workouts</div></div>' +
          '<div class="ps"><div class="v num">156</div><div class="l">Rewards</div></div>' +
          '<div class="ps"><div class="v num">41</div><div class="l">Badges</div></div>' +
        '</div></div>' +
        '<div class="m-sec-title"><h3>Connected Devices</h3></div>' +
        '<div class="card card-pad" style="box-shadow:none;padding-top:4px;padding-bottom:4px">' +
          '<div class="device-row"><div class="dr-ic">' + ic("watch") + '</div><div class="dr-meta"><div class="dr-nm">Apple Watch Series 9</div><div class="dr-st">Synced 2 min ago</div></div><span class="dr-dot" style="background:var(--success)"></span></div>' +
          '<div class="device-row"><div class="dr-ic">' + ic("activity") + '</div><div class="dr-meta"><div class="dr-nm">Garmin Connect</div><div class="dr-st">Not connected</div></div><span class="dr-dot" style="background:var(--text-3)"></span></div>' +
        '</div>' +
        '<div style="margin:16px 0"><div class="gdpr"><div class="g-ic">' + ic("lock") + '</div>' +
          '<div class="g-t"><b>Your data stays private</b>Your health data stays on your device. We only process achievement events — never raw biometrics. GDPR &amp; DSG compliant.</div></div></div>' +
        '<div class="m-sec-title"><h3>Settings</h3></div>' +
        '<div class="set-list">' + settings + '</div>' +
        '<button class="btn btn-ghost btn-block" style="margin-top:16px;color:var(--error)">' + ic("log-out") + 'Sign out</button>' +
      '</div>' + tabbar("Profile")
    );
  }

  /* ---- phone frame wrapper ---- */
  function phone(idx, title, desc, inner) {
    return '<div class="screen-wrap" data-screen-label="' + idx + '" style="display:inline-block;margin:0">' +
      '<div class="frame-label"><span class="idx num">' + idx + '</span><span class="t">' + title + '</span><span class="d">· ' + desc + '</span></div>' +
      '<div class="phone">' + island() + '<div class="screen-inner">' + inner + '</div></div>' +
    '</div>';
  }

  window.renderMobile = function () {
    const el = document.getElementById("sec-mobile");
    el.innerHTML =
      '<div class="page">' +
        '<div class="page-head"><div class="eyebrow">Surface 2</div><h1>Member App</h1>' +
        '<p>Mobile PWA for gym members. White-labelled per gym, built to make progress feel rewarding — streaks, points, challenges and frictionless reward redemption.</p></div>' +
        '<div class="phone-row">' + home() + rewards() + '</div>' +
        '<div class="phone-row" style="margin-top:48px">' + progress() + profile() + '</div>' +
      '</div>';
    renderIcons();
  };
})();
