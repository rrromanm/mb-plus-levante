import Image from "next/image";
import { ShieldCheck, Wrench, Star, Clock } from "lucide-react";

const PILLARS = [
  {
    icon: ShieldCheck,
    title: "Garantía de hasta 12 meses",
    desc: "Todos nuestros vehículos se entregan con inspección técnica reciente y garantía de hasta 12 meses o 10.000 km.",
  },
  {
    icon: Wrench,
    title: "Taller propio",
    desc: "Revisamos, preparamos y mantenemos cada coche en nuestras propias instalaciones antes de la entrega.",
  },
  {
    icon: Star,
    title: "Especialistas en Mercedes-Benz",
    desc: "Nuestro enfoque principal son los vehículos Mercedes-Benz, aunque también trabajamos con otras marcas reconocidas.",
  },
  {
    icon: Clock,
    title: "Más de 10 años de experiencia",
    desc: "Una década ayudando a nuestros clientes a encontrar el coche que necesitan, al precio que buscan.",
  },
];

export function AboutUs() {
  return (
    <section id="sobre-nosotros" className="scroll-mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* Dark left panel — invariant dark, not bg-foreground which flips in dark mode */}
        <div className="bg-zinc-900 dark:bg-zinc-800 text-white flex flex-col justify-between gap-10 px-8 sm:px-12 lg:px-16 py-16 lg:py-24">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest opacity-50">
              Coches de segunda mano en Alicante · MB Plus Levante
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold leading-snug">
              Respaldo profesional desde L'Albir
            </h2>
            <p className="text-sm opacity-60 leading-relaxed max-w-md">
              En MB Plus Levante somos un concesionario especializado en la venta de coches de ocasión. Más de 10 años de experiencia avalan nuestro compromiso con la calidad y la transparencia.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PILLARS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-3">
                <Icon className="w-5 h-5 shrink-0 mt-0.5 opacity-50" />
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold">{title}</p>
                  <p className="text-xs opacity-50 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-8 border-t border-white/15 pt-8">
            <div>
              <p className="text-3xl font-bold tabular-nums">+200</p>
              <p className="text-xs opacity-50 uppercase tracking-wider mt-0.5">Coches vendidos</p>
            </div>
            <div>
              <p className="text-3xl font-bold">ITV ✓</p>
              <p className="text-xs opacity-50 uppercase tracking-wider mt-0.5">Revisión técnica pasada</p>
            </div>
            <div>
              <p className="text-3xl font-bold flex items-center gap-1">
                3.9 <span className="text-yellow-400 text-2xl">★</span>
              </p>
              <p className="text-xs opacity-50 uppercase tracking-wider mt-0.5">Opiniones en Google</p>
            </div>
            <div>
              <p className="text-3xl font-bold tabular-nums">+10</p>
              <p className="text-xs opacity-50 uppercase tracking-wider mt-0.5">Años de experiencia</p>
            </div>
          </div>
        </div>

        {/* Image right panel */}
        <div className="relative min-h-80 lg:min-h-0">
          <Image
            src="/wheel.avif"
            alt="Detalle de rueda — MB Plus Levante concesionario Alicante"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
      </div>
    </section>
  );
}