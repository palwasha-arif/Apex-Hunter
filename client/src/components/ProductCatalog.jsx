const products = [
  { name: "All-Weather Shell", category: "Apparel", price: "$189", mark: "01" },
  { name: "Ridgeway Day Pack", category: "Packs", price: "$145", mark: "02" },
  { name: "Trail Optic 10×42", category: "Optics", price: "$279", mark: "03" },
];

export default function ProductCatalog() {
  return (
    <div>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow">The essentials</p>
          <h2 className="section-title">Field-tested gear</h2>
        </div>
        <p className="text-sm text-slate-500">Sample catalog items for the starter build</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <article className="surface-card overflow-hidden" key={product.name}>
            <div className="grid h-40 place-items-center bg-gradient-to-br from-emerald-950 via-slate-800 to-slate-900">
              <span className="text-5xl font-black text-white/10">{product.mark}</span>
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-300">
                {product.category}
              </p>
              <div className="mt-2 flex items-center justify-between gap-3">
                <h3 className="font-semibold text-white">{product.name}</h3>
                <span className="text-sm font-semibold text-slate-200">{product.price}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
