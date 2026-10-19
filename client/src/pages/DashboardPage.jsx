import { useEffect, useState } from "react";
import AIGuideGenerator from "../components/AIGuideGenerator";
import CartCheckout from "../components/CartCheckout";
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
      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <section className="hero-panel rounded-3xl px-7 py-10 sm:px-12 sm:py-14">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">
            Built for the backcountry
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-white sm:text-6xl">
            Plan well. Head out ready.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
            Your starting point for hunting gear, trip planning, and field
            guides—all in one place.
          </p>
          <a className="button-primary mt-8 inline-flex" href="#gear">
            Explore the platform
          </a>
        </section>

        <div className="my-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 px-5 py-4">
          <div>
            <p className="text-sm font-semibold text-white">Development status</p>
            <p className="mt-1 text-sm text-slate-400">{apiStatus}</p>
          </div>
          <span className="rounded-full bg-amber-300/10 px-3 py-1 text-xs font-semibold text-amber-200">
            Starter build
          </span>
        </div>

        <div className="grid gap-10">
          <section id="gear" className="scroll-mt-24">
            <ProductCatalog />
          </section>
          <div className="grid gap-8 lg:grid-cols-2">
            <section id="trips" className="scroll-mt-24">
              <TripPlanner />
            </section>
            <section id="guides" className="scroll-mt-24">
              <AIGuideGenerator />
            </section>
          </div>
          <section id="cart" className="scroll-mt-24">
            <CartCheckout />
          </section>
        </div>
        <footer className="mt-14 border-t border-slate-800 py-7 text-sm text-slate-500">
          Apex Hunter Platform · Development starter
        </footer>
      </main>
    </div>
  );
}
