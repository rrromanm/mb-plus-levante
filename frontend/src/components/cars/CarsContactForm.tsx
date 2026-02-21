"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone as PhoneIcon, User, MessageSquare, CheckCircle2 } from "lucide-react";

interface CarsContactFormProps {
  carTitle: string;
  brand: string;
  model: string;
}

export default function CarsContactForm({ carTitle, brand, model }: CarsContactFormProps) {
  return (
    <div className="grid lg:grid-cols-2 gap-12 bg-card border border-border/50 rounded-3xl p-10 shadow-sm">
      <div className="flex flex-col justify-center gap-5">
        <h2 className="text-3xl font-semibold leading-snug">
          ¿Te interesa el<br />
          <span className="text-muted-foreground">{brand} {model}?</span>
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Rellena el formulario y te contactamos en menos de 24h. Sin compromiso.
        </p>
        <ul className="space-y-3 text-sm">
          {[
            "Respuesta en menos de 24 horas",
            "Asesoramiento personalizado",
            "Sin compromiso de compra",
          ].map((item) => (
            <li key={item} className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <ContactForm carTitle={carTitle} />
    </div>
  );
}

function ContactForm({ carTitle }: { carTitle: string }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: `Hola, estoy interesado en el ${carTitle}. ¿Podríais darme más información?`,
    privacy: false,
  });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // TODO: replace with real API call
    await new Promise((r) => setTimeout(r, 1000));
    setSending(false);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
        <CheckCircle2 className="w-12 h-12 text-green-500" />
        <p className="text-xl font-semibold">Mensaje enviado</p>
        <p className="text-muted-foreground text-sm">Nos pondremos en contacto contigo pronto.</p>
      </div>
    );
  }

  const inputClass =
    "w-full bg-background border border-border rounded-xl px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="relative">
          <User className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
          <input
            name="name"
            required
            placeholder="Nombre *"
            value={form.name}
            onChange={handleChange}
            className={`${inputClass} pl-9`}
          />
        </div>
        <div className="relative">
          <Mail className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
          <input
            name="email"
            type="email"
            required
            placeholder="Email *"
            value={form.email}
            onChange={handleChange}
            className={`${inputClass} pl-9`}
          />
        </div>
        <div className="relative">
          <PhoneIcon className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
          <input
            name="phone"
            type="tel"
            placeholder="Teléfono"
            value={form.phone}
            onChange={handleChange}
            className={`${inputClass} pl-9`}
          />
        </div>
      </div>
      <div className="relative">
        <MessageSquare className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
        <textarea
          name="message"
          required
          rows={4}
          placeholder="Mensaje *"
          value={form.message}
          onChange={handleChange}
          className={`${inputClass} pl-9 resize-none`}
        />
      </div>
      <div className="flex items-center justify-between flex-wrap gap-4 pt-2">
        <div className="flex items-start gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            name="privacy"
            id="privacy"
            required
            checked={form.privacy}
            onChange={handleChange}
            className="mt-0.5 accent-foreground"
          />
          <label htmlFor="privacy">
            Acepto la{" "}
            <Link href="/privacidad" className="underline hover:text-foreground transition">
              política de privacidad
            </Link>
          </label>
        </div>
        <button
          type="submit"
          disabled={sending}
          className="bg-foreground text-background px-8 py-3 rounded-full font-medium hover:opacity-90 transition disabled:opacity-50"
        >
          {sending ? "Enviando..." : "Enviar datos"}
        </button>
      </div>
    </form>
  );
}
