const links = [
  ["Hunting basics", "#basics"],
  ["Field guide", "#guides"],
  ["Gear", "#gear"],
  ["Plan a trip", "#trips"],
];

export default function Navbar() {
  return (
    <header className="site-header sticky top-0 z-50">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <a href="#" className="brand-lockup flex items-center gap-3" aria-label="Apex Hunter home">
          <span className="brand-mark grid h-10 w-10 place-items-center rounded-xl font-black">
            <svg viewBox="0 0 40 40" aria-hidden="true">
              <path d="M20 5 35 33H5L20 5Z" />
              <path d="M20 16 26 29H14L20 16Z" />
            </svg>
          </span>
          <span className="text-sm font-black tracking-[0.2em] text-stone-100">APEX HUNTER</span>
        </a>
        <div className="nav-links flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold uppercase tracking-[0.13em] text-stone-300">
          {links.map(([label, href]) => (
            <a className="transition hover:text-lime-200" href={href} key={href}>
              {label}
            </a>
          ))}
        </div>
        <a className="nav-cta hidden lg:inline-flex" href="#trips">
          Start learning <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}
