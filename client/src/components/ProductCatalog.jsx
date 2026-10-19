const products = [
  {
    name: "All-Weather Shell",
    category: "01 / Apparel",
    use: "Dress for changing weather",
    detail: "Quiet, weather-ready layers for long days in the timber.",
    image: "photo-1511497584788-876760111969",
    alt: "Sunlight falling through a deep green forest",
  },
  {
    name: "Ridgeway Day Pack",
    category: "02 / Packs",
    use: "Carry the essentials",
    detail: "A trail companion with room for the day's essentials.",
    image: "photo-1551632811-561732d1e306",
    alt: "Hikers following a wooded mountain trail",
  },
  {
    name: "Trail Optic 10×42",
    category: "03 / Optics",
    use: "Observe wildlife at a distance",
    detail: "Bring the far ridge a little closer, from first light on.",
    image: "photo-1472396961693-142e6e269027",
    alt: "Wild deer standing in a sunlit forest",
  },
];

export default function ProductCatalog() {
  return (
    <div>
      <div className="section-heading mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Simple, useful essentials</p>
          <h2 className="section-title">A thoughtful starter kit.</h2>
        </div>
        <p className="max-w-sm text-sm leading-6 text-stone-400">
          Start with clothing, navigation, water, and first aid. Choose gear
          suited to your local conditions and learn how to use it before heading
          out.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {products.map((product) => (
          <article className="gear-card group overflow-hidden" key={product.name}>
            <div className="gear-image-wrap">
              <img
                alt={product.alt}
                className="gear-image transition duration-700 group-hover:scale-105"
                loading="lazy"
                src={`https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=900&q=85`}
              />
              <span className="gear-badge">{product.category.split(" / ")[0]}</span>
              <span className="gear-image-caption">STARTER ESSENTIAL</span>
            </div>
            <div className="p-5">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-lime-300">
                {product.category}
              </p>
              <div className="mt-2 flex items-start justify-between gap-3">
                <h3 className="text-lg font-bold text-stone-100">{product.name}</h3>
                <span className="shrink-0 text-right text-xs font-bold uppercase text-lime-200">{product.use}</span>
              </div>
              <p className="mt-2 text-sm leading-6 text-stone-400">{product.detail}</p>
              <a className="text-link mt-4 inline-flex" href="#trips">
                Plan what to bring <span aria-hidden="true">→</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
