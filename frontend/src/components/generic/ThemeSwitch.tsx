"use client";

import { Sun, Moon } from "lucide-react";
import { Switch } from "../ui/switch";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
export function ThemeSwitch() {
  const t = useTranslations("Header");
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (resolvedTheme === "light") {
    return (
      <>
        <Switch
          className="cursor-pointer"
          id="theme-toggle"
          aria-label={t("themeToggle")}
          defaultChecked
          onClick={() => setTheme("dark")}
        />
        <Sun className="ml-2" size={16} />
      </>
    );
  } else {
    return (
      <>
        <Switch
          className="cursor-pointer"
          id="theme-toggle"
          aria-label={t("themeToggle")}
          onClick={() => setTheme("light")}
        />
        <Moon className="ml-2" size={16} />
      </>
    );
  }
}
