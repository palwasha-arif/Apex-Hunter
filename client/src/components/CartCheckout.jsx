export default function CartCheckout() {
  return (
    <div className="surface-card cart-card flex flex-wrap items-center justify-between gap-5 p-6 sm:p-8">
      <div>
        <p className="eyebrow">Your kit</p>
        <h2 className="section-title">Pack light. Go far.</h2>
        <p className="mt-2 max-w-lg text-sm leading-6 text-stone-300">
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
