const EVENTS = [
  "ANNA M. · 9-WEEK STREAK · +200 PTS",
  "JULIA H. · CHURN WINDOW · NOTICE DEADLINE 5D",
  "SARAH K. · REDEEMED FREE PT SESSION",
  "RETENTION 81.4% ▲ 3.2%",
  "LUKAS F. · USC REGULAR · OFFER SENT",
  "WELLPASS PAYOUTS €1,208 THIS MONTH",
  "MARIA S. · WIN-BACK NUDGE SENT",
  "LISA B. · GOOGLE REVIEW · +500 PTS",
  "€2,340 SAVED THIS MONTH",
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
