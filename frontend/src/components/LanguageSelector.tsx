"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

type Language = {
  code: string;
  flag: string;
  label: string;
};

const languages: Language[] = [

  { code: "es", flag: "/flags/es.svg", label: "Español" },
  { code: "en", flag: "/flags/gb.svg", label: "English" },
  { code: "de", flag: "/flags/de.svg", label: "Deutsch" },
  { code: "fr", flag: "/flags/fr.svg", label: "Français" },
  { code: "ru", flag: "/flags/ru.svg", label: "Русский" },
];

export default function LanguageSelector() {
  const [current, setCurrent] = useState(languages[0]);
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Select language"
        className="flex items-center gap-1 px-2 py-1"
      >
        <ChevronDown size={14} />
        <Image
          src={current.flag}
          alt={current.label}
          width={20}
          height={15}
          priority
        />
      </button>

      {open && (
        <ul className="absolute right-0 mt-2">
          {languages.map((lang) => (
            <li
              key={lang.code}
              onClick={() => {
                setCurrent(lang);
                setOpen(false);
              }}
              className="flex cursor-pointer items-center gap-2 px-3 py-2"
            >
              <Image
                src={lang.flag}
                alt={lang.label}
                width={20}
                height={15}
              />
              <span className="sr-only">{lang.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
