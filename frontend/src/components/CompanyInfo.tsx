import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import SectionBox from "./generic/SectionBox";
import { CONTACT } from "@/lib/contactInfo";

export function CompanyInfo() {
  return (
    <SectionBox>
      <h2 className="text-3xl font-bold text-center mb-10">
        Dónde encontrarnos
      </h2>

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
            title="MB Plus Levante ubicación"
          />
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <h3 className="text-xl font-semibold">Información de contacto</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Estamos disponibles para ayudarte con cualquier consulta.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="flex items-start gap-3 group">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-foreground">
                <Phone className="w-4 h-4" />
              </span>
              <div>
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground">Teléfono</p>
                <p className="text-sm font-medium mt-0.5 group-hover:text-primary transition-colors">{CONTACT.phone}</p>
              </div>
            </a>

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
