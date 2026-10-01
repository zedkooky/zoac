const WORDS = ["Scuba diving", "Snorkelling", "Freediving", "Kayaking", "Trekking", "Off-road safari", "Rescue training", "Lake Tanganyika"];

export default function Marquee() {
  const row = WORDS.map((w) => <span className="marquee__item" key={w}>{w}</span>);
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">{row}{row}</div>
    </div>
  );
}
