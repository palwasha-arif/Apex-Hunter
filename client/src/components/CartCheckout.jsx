export default function CartCheckout() {
  return (
    <div className="surface-card flex flex-wrap items-center justify-between gap-5 p-6 sm:p-7">
      <div>
        <p className="eyebrow">Your kit</p>
        <h2 className="section-title">Cart & checkout</h2>
        <p className="mt-2 text-sm text-slate-400">
          Shopping cart and payment processing are not connected in this starter build.
        </p>
      </div>
      <button
        className="button-secondary cursor-not-allowed opacity-60"
        disabled
        type="button"
      >
        Cart coming soon
      </button>
    </div>
  );
}
