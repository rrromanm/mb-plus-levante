"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Car, Wrench, Star, Clock } from "lucide-react";

export function StatsSection() {
  return (
    <section className="relative -mt-16 px-4">
      <div className="mx-auto max-w-6xl">
        <Card className="rounded-2xl shadow-xl border border-border">
          <CardContent className="p-8 md:p-12">
            <div className="grid grid-cols-2 gap-10 text-center md:grid-cols-4">

              {/* 1 */}
              <div className="flex flex-col items-center">
                <Car className="mb-3 h-6 w-6 text-primary" />
                <p className="text-3xl font-bold md:text-4xl text-foreground">
                  +200
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Coches vendidos
                </p>
              </div>

              {/* 2 */}
              <div className="flex flex-col items-center">
                <Wrench className="mb-3 h-6 w-6 text-primary" />
                <p className="text-3xl font-bold md:text-4xl text-foreground">
                  100%
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Vehículos revisados
                </p>
              </div>

              {/* 3 */}
              <div className="flex flex-col items-center">
                <Star className="mb-3 h-6 w-6 text-primary" />
                <p className="text-3xl font-bold md:text-4xl text-foreground">
                  5★
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Opiniones de clientes
                </p>
              </div>

              {/* 4 */}
              <div className="flex flex-col items-center">
                <Clock className="mb-3 h-6 w-6 text-primary" />
                <p className="text-3xl font-bold md:text-4xl text-foreground">
                  +10
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Años de experiencia
                </p>
              </div>

            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
