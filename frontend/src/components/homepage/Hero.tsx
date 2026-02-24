export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-neutral-950 text-white">
      <div className="absolute inset-0">
        <img
          src="/wheel.avif"
          alt="Mercedes-Benz de ocasion en Alicante"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black via-black/75 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_20%_20%,rgba(255,255,255,0.12),transparent_60%)]" />
      </div>

      <div className="relative z-10 grid min-h-screen w-full items-start gap-10 px-5 pb-16 pt-10 sm:gap-12 sm:px-8 sm:pt-14 md:px-12 md:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-16">
        <div className="space-y-10">
          <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white/80 sm:text-xs">
            <span className="inline-flex h-2 w-2 rounded-full bg-[#910c00]" />
            El Albir, Alicante
          </div>

          <div className="space-y-6">
            <h1 className="font-sans text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Excelencia en{" "}
              <span className="block font-serif text-5xl italic font-medium text-[#910c00] sm:text-6xl lg:text-7xl">
                cada detalle.
              </span>
            </h1>

            <p className="max-w-xl text-base text-white/70 leading-relaxed sm:text-lg">
              Selección exclusiva de vehículos de ocasión. Solo 20 unidades
              cuidadosamente seleccionadas y revisadas en nuestro taller para
              garantizar la máxima calidad.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <a
              href="/coches"
              className="inline-flex w-full items-center justify-center rounded-full bg-[#910c00] px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#7d0b00] sm:w-auto sm:text-sm"
            >
              Ver coleccion actual
            </a>
            <a
              href="tel:+34623622557"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:border-white hover:bg-white/10 sm:w-auto sm:text-sm"
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
              Contactar
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
