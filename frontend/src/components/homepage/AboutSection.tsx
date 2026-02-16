import { ShieldCheck, MapPin, BadgeCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function AboutSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4">

        {/* Title */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold">
            Compra tu coche de segunda mano en Albir con total confianza
          </h2>

          <p className="mt-6 text-muted-foreground leading-relaxed">
            En MB Plus somos especialistas en la venta de coches de segunda mano
            en Albir. Ofrecemos vehículos revisados y listos para entregar al
            mejor precio.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">

          <Card className="rounded-2xl">
            <CardContent className="p-6 text-center">
              <ShieldCheck className="mx-auto mb-4 h-8 w-8 text-primary" />
              <h3 className="font-semibold">Vehículos revisados</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Cada coche pasa una revisión para garantizar calidad y fiabilidad.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardContent className="p-6 text-center">
              <BadgeCheck className="mx-auto mb-4 h-8 w-8 text-primary" />
              <h3 className="font-semibold">Precios claros</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Ofrecemos precios competitivos sin costes ocultos.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardContent className="p-6 text-center">
              <MapPin className="mx-auto mb-4 h-8 w-8 text-primary" />
              <h3 className="font-semibold">Cerca de ti</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Atendemos clientes de Albir, Benidorm, Altea y Alfaz del Pi.
              </p>
            </CardContent>
          </Card>

        </div>

      </div>
    </section>
  );
}
