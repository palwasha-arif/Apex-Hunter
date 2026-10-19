const links = [
  ["Gear", "#gear"],
  ["Plan a trip", "#trips"],
  ["Field guides", "#guides"],
  ["Cart", "#cart"],
];

export default function Navbar() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/90">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <a href="#" className="flex items-center gap-3" aria-label="Apex Hunter home">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-300 font-black text-slate-950">
            A
          </span>
          <span className="font-bold tracking-wide text-white">APEX HUNTER</span>
        </a>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-300">
          {links.map(([label, href]) => (
            <a className="transition hover:text-amber-300" href={href} key={href}>
              {label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
