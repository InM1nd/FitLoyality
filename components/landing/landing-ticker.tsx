const EVENTS = [
  "ANNA M. · 14-DAY STREAK · +200 PTS",
  "LUKAS F. · STREAK BROKEN · 16 DAYS OUT",
  "SARAH K. · REDEEMED FREE PT SESSION",
  "RETENTION 81.4% ▲ 3.2%",
  "THOMAS G. · 20 WORKOUTS THIS MONTH",
  "LISA B. · GUEST PASS CLAIMED",
  "MARIA S. · NUDGE SENT",
  "DAVID L. · +500 PTS · MERCH UNLOCK",
  "€1,847 SAVED THIS MONTH",
];

function Row() {
  return (
    <div className="flex shrink-0 items-center">
      {EVENTS.map((e) => (
        <span key={e} className="mono flex items-center text-[12px] t-mut">
          <span className="mx-5 size-2 rounded-[2px] bg-[var(--lime)]" />
          {e}
        </span>
      ))}
    </div>
  );
}

export function LandingTicker() {
  return (
    <div className="relative overflow-hidden border-y border-[var(--line)] bg-paper2 py-3">
      <div className="flex w-max animate-marquee">
        <Row />
        <Row />
      </div>
    </div>
  );
}
