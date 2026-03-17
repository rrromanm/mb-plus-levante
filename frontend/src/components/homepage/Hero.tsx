

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-neutral-950 text-white">
      <div className="absolute inset-0">
        <img
          src="/wheel.avif"
          alt="Mercedes-Benz de ocasion en Alicante"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/55 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_20%_20%,rgba(255,255,255,0.12),transparent_60%)]" />
      </div>

      <div className="relative z-10 grid min-h-screen w-full items-center gap-10 px-5 py-16 sm:gap-12 sm:px-8 md:px-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14 lg:px-16">
        <div className="space-y-8">
          <div className="inline-flex flex-wrap items-center gap-2 border border-white/15 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/80 sm:text-xs">
            ALICANTE · BENIDORM · COCHES DE OCASIÓN Y SEGUNDA MANO
          </div>

          <div className="space-y-5">
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Coches de ocasión en Benidorm
            </h1>
            <p className="max-w-2xl text-sm text-white/85 sm:text-lg">
              Descubre nuestra selección de coches de ocasión en Benidorm. Vehículos revisados, garantía incluida y precios justos.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <a
              href="/coches"
              className="inline-flex w-full items-center justify-center bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-950 transition hover:bg-white/90 sm:w-auto sm:text-sm"
            >
              Ver catálogo
            </a>
            <a
              href="tel:+34623622557"
              className="inline-flex w-full items-center justify-center gap-2 border border-white/60 px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:border-white hover:bg-white/10 sm:w-auto sm:text-sm"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4.5 5.5c0 7.18 6.82 14 14 14l2-3.5-3.5-2-2 2c-2.76-1.24-5.26-3.74-6.5-6.5l2-2-2-3.5-3.5 2z" />
              </svg>
              Llamar ahora
            </a>
          </div>
        </div>

        
      </div>
    </section>
  );
}
