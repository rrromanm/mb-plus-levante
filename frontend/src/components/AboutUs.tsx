import Image from "next/image";
import { ShieldCheck, Wrench, Star, Clock } from "lucide-react";
import { useTranslations } from "next-intl";

const PILLARS = [
  { icon: ShieldCheck, titleKey: "pillarWarrantyTitle", descKey: "pillarWarrantyDesc" },
  { icon: Wrench, titleKey: "pillarWorkshopTitle", descKey: "pillarWorkshopDesc" },
  { icon: Star, titleKey: "pillarSpecialistsTitle", descKey: "pillarSpecialistsDesc" },
  { icon: Clock, titleKey: "pillarExperienceTitle", descKey: "pillarExperienceDesc" },
] as const;

export function AboutUs() {
  const t = useTranslations("About");
  return (
    <section id="sobre-nosotros" className="scroll-mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-2">

        <div className="bg-zinc-900 dark:bg-zinc-800 text-white flex flex-col justify-between gap-10 px-8 sm:px-12 lg:px-16 py-16 lg:py-24">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest opacity-50">
              {t("eyebrow")}
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold leading-snug">
              {t("title")}
            </h2>
            <p className="text-sm opacity-60 leading-relaxed max-w-lg">
              {t("intro")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PILLARS.map(({ icon: Icon, titleKey, descKey }) => (
              <div key={titleKey} className="flex gap-3">
                <Icon className="w-5 h-5 shrink-0 mt-0.5 opacity-50" />
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold">{t(titleKey)}</p>
                  <p className="text-xs opacity-50 leading-relaxed">{t(descKey)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-8 border-t border-white/15 pt-8 justify-center">
            <div>
              <p className="text-3xl font-bold tabular-nums">+2000</p>
              <p className="text-xs opacity-50 uppercase tracking-wider mt-0.5">{t("statSoldLabel")}</p>
            </div>
            <div>
              <p className="text-3xl font-bold">{t("statItvValue")}</p>
              <p className="text-xs opacity-50 uppercase tracking-wider mt-0.5">{t("statItvLabel")}</p>
            </div>
            <div>
              <p className="text-3xl font-bold tabular-nums">+10</p>
              <p className="text-xs opacity-50 uppercase tracking-wider mt-0.5">{t("statYearsLabel")}</p>
            </div>
          </div>
        </div>
        
        <div className="relative min-h-80 lg:min-h-0">
          <Image
            src="/mb-emblema.avif"
            alt={t("imageAlt")}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
      </div>
    </section>
  );
}