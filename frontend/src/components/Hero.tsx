import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-255 overflow-hidden -mt-25">
      <Image
        src="/mercedes-hero.jpg"
        alt="Premium Mercedes vehicle"
        fill
        priority
        className="object-cover -scale-x-100"
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex h-full flex-col justify-center px-16 text-white">
        <div className="max-w-4xl">
          <h1 className="text-7xl font-bold leading-tight md:text-8xl">
            THE RIGHT CAR.
            <br />
            THE RIGHT DEAL.
          </h1>

          <p className="text-xl">
            Find the car that suits you.
          </p>

          <a
            href="/catalog"
            className="mt-16 inline-flex w-fit items-center gap-2 rounded-md
            bg-[#C0C0C0] px-6 py-3 text-base font-semibold text-black
            transition hover:bg-white"
          >
            Catalog
            <span aria-hidden>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
