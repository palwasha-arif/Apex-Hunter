import { useEffect, useState } from "react";
import AIGuideGenerator from "../components/AIGuideGenerator";
import HuntingBasics from "../components/HuntingBasics";
import Navbar from "../components/Navbar";
import ProductCatalog from "../components/ProductCatalog";
import TripPlanner from "../components/TripPlanner";
import { getHealth } from "../services/api";

export default function DashboardPage() {
  const [apiStatus, setApiStatus] = useState("Checking API...");

  useEffect(() => {
    let active = true;

    getHealth()
      .then((health) => {
        if (active) setApiStatus(`API online · database ${health.database}`);
      })
      .catch(() => {
        if (active) setApiStatus("API unavailable · start the server to connect");
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-7xl px-5 pb-12 sm:px-8">
        <section className="hero-panel relative isolate mt-6 overflow-hidden rounded-[2rem] px-7 py-14 sm:mt-8 sm:px-12 sm:py-20 lg:px-16">
          <div className="hero-copy relative z-10 max-w-2xl">
            <p className="eyebrow text-lime-200">A beginner's guide to hunting</p>
            <h1 className="mt-5 text-5xl font-black leading-[0.98] tracking-tight text-white sm:text-7xl">
              Learn the land.
              <br />
              <span className="text-lime-200">Hunt with respect.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-stone-200 sm:text-lg">
              Start with the essentials: safety, local rules, fieldcraft, and
              responsible choices in the outdoors.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="button-primary inline-flex" href="#basics">
                Learn the basics <span aria-hidden="true">↓</span>
              </a>
              <a className="button-glass inline-flex" href="#basics">
                Safety comes first
              </a>
            </div>
          </div>
          <div className="hero-stamp" aria-hidden="true">
            <span>FIELD</span>
            <span>NOTES</span>
            <b>45° 31′ N</b>
          </div>
          <div className="hero-caption">
            <span className="live-dot" />
            <span>Find your quiet out there</span>
          </div>
        </section>

        <div className="status-strip my-7 flex flex-wrap items-center justify-between gap-4 px-1 py-2">
          <div className="flex items-center gap-3">
            <span className="status-mark" aria-hidden="true">AH</span>
            <div>
              <p className="text-sm font-bold text-stone-100">Your basecamp</p>
              <p className="mt-0.5 text-xs text-stone-400">{apiStatus}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-lime-200">
            <span className="live-dot" />
            Learn well · Leave no trace
          </div>
        </div>

        <div className="grid gap-12 sm:gap-16">
          <section id="basics" className="scroll-mt-28">
            <HuntingBasics />
          </section>
          <section id="gear" className="scroll-mt-28">
            <ProductCatalog />
          </section>
          <section className="story-band">
            <div className="story-photo" role="img" aria-label="Misty evergreen forest at dawn">
              <span className="photo-tag">THE LONG WAY IS THE RIGHT WAY</span>
            </div>
            <div className="story-copy">
              <p className="eyebrow">The good kind of lost</p>
              <h2 className="mt-3 text-3xl font-black leading-tight text-stone-100 sm:text-4xl">
                Make room for
                <br />a little wonder.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-stone-300">
                Early light through the timber. A trail that keeps unfolding.
                Build a kit that works hard, plan with care, and make every mile
                count.
              </p>
              <a className="text-link mt-6 inline-flex" href="#trips">
                Start planning <span aria-hidden="true">→</span>
              </a>
            </div>
          </section>
          <div className="grid gap-6 lg:grid-cols-2">
            <section id="trips" className="scroll-mt-28">
              <TripPlanner />
            </section>
            <section id="guides" className="scroll-mt-28">
              <AIGuideGenerator />
            </section>
          </div>
        </div>
        <footer className="site-footer mt-16 flex flex-col gap-4 border-t border-white/10 py-7 text-sm text-stone-500 sm:flex-row sm:items-center sm:justify-between">
          <a href="#" className="font-bold tracking-[0.16em] text-stone-300">
            APEX <span className="text-lime-300">/</span> HUNTER
          </a>
          <span>Go farther. Tread lighter. Come back with a story.</span>
          <span>© {new Date().getFullYear()} Apex Hunter</span>
        </footer>
      </main>
    </div>
  );
}
