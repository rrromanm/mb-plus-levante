import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import SectionBox from "./generic/SectionBox";
import { CONTACT } from "@/lib/contactInfo";

export function CompanyInfo() {
  return (
    <SectionBox id="contacto">

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-10">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">L'Albir, Alicante</p>
          <h2 className="text-3xl sm:text-4xl font-semibold leading-tight">
            Visítanos o contáctanos
          </h2>
        </div>
        <p className="text-sm text-muted-foreground max-w-xs">
          Estamos en L'Albir — fácil acceso desde Benidorm, Altea y Calpe.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        <div className="rounded-2xl overflow-hidden border border-border shadow-sm min-h-72 lg:min-h-0">
          <iframe
            src={CONTACT.mapsEmbed}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            className="min-h-75 lg:min-h-125"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="MB Plus Levante ubicación en L'Albir, Alicante"
          />
        </div>

        <div className="flex flex-col gap-6">
          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Hola, me gustaría obtener información sobre los vehículos disponibles.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-500 text-white px-5 py-3 rounded-xl font-medium hover:bg-green-600 transition text-sm"
            >
              <FaWhatsapp className="w-4 h-4" />
              Escribir por WhatsApp
            </a>
            <a
              href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center justify-center gap-2 border border-border px-5 py-3 rounded-xl font-medium hover:bg-muted transition text-sm"
            >
              <Phone className="w-4 h-4" />
              {CONTACT.phone}
            </a>
          </div>

          <p className="text-xs text-muted-foreground -mt-2">
            Respondemos en menos de 1 hora en horario de apertura
          </p>

          <div className="flex flex-col gap-4 pt-2 border-t border-border">
            <a href={`mailto:${CONTACT.email}`} className="flex items-start gap-3 group">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-foreground">
                <Mail className="w-4 h-4" />
              </span>
              <div>
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground">Email</p>
                <p className="text-sm font-medium mt-0.5 group-hover:text-primary transition-colors">{CONTACT.email}</p>
              </div>
            </a>

            <a href={`https://maps.google.com/?q=${encodeURIComponent(CONTACT.address)}`} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-foreground">
                <MapPin className="w-4 h-4" />
              </span>
              <div>
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground">Dirección</p>
                <p className="text-sm font-medium mt-0.5 group-hover:text-primary transition-colors">{CONTACT.address}</p>
              </div>
            </a>

            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-foreground">
                <Clock className="w-4 h-4" />
              </span>
              <div>
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground">Horario</p>
                <p className="text-sm font-medium mt-0.5">{CONTACT.hours}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionBox>
  );
}
