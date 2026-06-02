import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-5rem)] bg-linear-to-b from-background to-muted/30 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full text-center space-y-8">
        <div className="relative flex flex-col items-center gap-8">
          <div className="absolute inset-0 -z-10 flex items-center justify-center">
            <div className="w-120 h-60 rounded-full bg-[#e23b3b]/70 blur-3xl" />
          </div>
          <p className="text-sm font-medium uppercase tracking-widest text-[#e23b3b]">
            Error 404
          </p>
          <Image
            src="/plate.svg"
            alt="License plate"
            width={1220}
            height={320}
            className="w-full max-w-lg sm:max-w-xl -rotate-2"
          />
        </div>

        <div className="space-y-3 mt-12">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
            Esta página se ha salido de la carretera
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed">
            La dirección que buscabas no existe o el coche ya no está en el catálogo. Te llevamos de vuelta a terreno conocido.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-[#e23b3b] text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition"
          >
            Volver al inicio
          </a>
          <a
            href="/coches"
            className="inline-flex items-center justify-center gap-2 border border-border px-6 py-3 rounded-xl font-medium text-muted-foreground hover:text-foreground hover:border-foreground transition"
          >
            Ver catálogo completo
          </a>
        </div>

        {/* TODO: Implement in case more pages appear */}
        {/* <p className="text-sm text-muted-foreground">
          ¿Buscabas algo en concreto?{" "}
          <a href="/" className="underline hover:text-foreground transition">Inicio</a>
          {" · "}
          <a href="/coches" className="underline hover:text-foreground transition">Catálogo</a>
        </p> */}
      </div>
    </div>
  );
}
