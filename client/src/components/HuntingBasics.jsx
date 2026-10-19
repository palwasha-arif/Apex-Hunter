const lessons = [
  {
    number: "01",
    title: "Start with safety",
    image: "photo-1500530855697-b586d89ba3ee",
    alt: "Open mountain landscape in warm evening light",
    text: "Take a certified hunter education course. Know how to handle and transport equipment safely, identify your target, and keep other people clear of your plan.",
    tag: "SAFETY FIRST",
  },
  {
    number: "02",
    title: "Know the rules",
    image: "photo-1473448912268-2022ce9509d8",
    alt: "Sunlight on a quiet woodland trail",
    text: "Before every outing, check current local seasons, licenses, species rules, access permissions, and any area-specific restrictions. Rules vary by place and date.",
    tag: "CHECK LOCALLY",
  },
  {
    number: "03",
    title: "Learn to observe",
    image: "photo-1511497584788-876760111969",
    alt: "Tall evergreen trees in a dense forest",
    text: "Spend time learning the habitat and reading maps. Notice wind, weather, terrain, and animal sign without disturbing wildlife or entering land without permission.",
    tag: "FIELDCRAFT",
  },
  {
    number: "04",
    title: "Hunt with respect",
    image: "photo-1472396961693-142e6e269027",
    alt: "Wild deer moving through a forest clearing",
    text: "Identify the species and confirm it is legal before taking any action. Make ethical decisions, recover game responsibly, and follow local meat-care guidance.",
    tag: "ETHICS & CARE",
  },
];

export default function HuntingBasics() {
  return (
    <div>
      <div className="section-heading mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">A good first step</p>
          <h2 className="section-title">Hunting basics, rooted in respect.</h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-stone-300">
          New to hunting? Start with safety, local knowledge, and a respect for
          wildlife. Build experience with qualified mentors and approved training.
        </p>
      </div>
      <div className="basics-grid grid gap-4 sm:grid-cols-2">
        {lessons.map((lesson) => (
          <article className="basics-card" key={lesson.number}>
            <div className="basics-image">
              <img
                src={`https://images.unsplash.com/${lesson.image}?auto=format&fit=crop&w=900&q=85`}
                alt={lesson.alt}
                loading="lazy"
              />
              <span className="basics-number">{lesson.number}</span>
              <span className="basics-tag">{lesson.tag}</span>
            </div>
            <div className="p-5 sm:p-6">
              <h3 className="text-xl font-extrabold text-stone-100">{lesson.title}</h3>
              <p className="mt-2 text-sm leading-6 text-stone-300">{lesson.text}</p>
            </div>
          </article>
        ))}
      </div>
      <p className="mt-4 text-xs leading-5 text-stone-500">
        This is a general introduction, not a substitute for certified training
        or current local regulations. Always follow the laws where you hunt.
      </p>
    </div>
  );
}
