import Image from "next/image";
import { ShieldCheck, Wrench, Star, Clock } from "lucide-react";
import SectionBox from "./generic/SectionBox";

const PILLARS = [
  {
    icon: <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5 text-foreground/70" />,
    title: "Garantía de hasta 12 meses",
    desc: "Todos nuestros vehículos se entregan con inspección técnica reciente y garantía de hasta 12 meses o 10.000 km.",
  },
  {
    icon: <Wrench className="w-5 h-5 shrink-0 mt-0.5 text-foreground/70" />,
    title: "Taller propio",
    desc: "Revisamos, preparamos y mantenemos cada coche en nuestras propias instalaciones.",
  },
  {
    icon: <Star className="w-5 h-5 shrink-0 mt-0.5 text-foreground/70" />,
    title: "Especialistas en Mercedes-Benz",
    desc: "Nuestro enfoque principal son los vehículos Mercedes-Benz, aunque también trabajamos con otras marcas reconocidas.",
  },
  {
    icon: <Clock className="w-5 h-5 shrink-0 mt-0.5 text-foreground/70" />,
    title: "Más de 10 años de experiencia",
    desc: "Una década ayudando a nuestros clientes a encontrar el coche que necesitan, al precio que buscan.",
  },
];

export function AboutUs() {
  return (
    <SectionBox>
      <h2 className="text-3xl font-bold text-center mb-8">Sobre nosotros</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden border border-border shadow-md">

        <div className="flex flex-col gap-8 p-8 sm:p-10 bg-card">

          <div className="space-y-2">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Concesionario MB Plus · Albir, Alicante</p>
            <h3 className="text-2xl font-bold leading-snug">
              Coches de segunda mano con garantía y respaldo profesional
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              En MB Plus somos un concesionario especializado en la venta de coches de ocasión. Más de 10 años de experiencia avalan nuestro compromiso con la calidad y la transparencia.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {PILLARS.map(({ icon, title, desc }) => (
              <div key={title} className="flex gap-3">
                {icon}
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold">{title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden sm:flex flex-wrap gap-6 border-t border-border pt-6">
            <div>
              <p className="text-2xl font-bold">+200</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Coches vendidos</p>
            </div>
            <div>
              <p className="text-2xl font-bold">ITV</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Pasada antes de la entrega</p>
            </div>
            <div>
              <p className="text-2xl font-bold flex items-center gap-1">
                3.9 <span className="text-yellow-400 text-xl">★</span>
              </p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Opiniones en Google</p>
            </div>
            <div>
              <p className="text-2xl font-bold">+10</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Años de experiencia</p>
            </div>
          </div>
        </div>

        <div className="relative min-h-70 lg:min-h-0">
          <Image
            src="/wheel.avif"
            alt="Detalle de rueda — MB Plus concesionario"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
      </div>
    </SectionBox>
  );
}