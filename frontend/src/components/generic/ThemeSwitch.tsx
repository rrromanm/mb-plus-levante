"use client";

import { Sun, Moon } from "lucide-react";
import { Switch } from "../ui/switch";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
export function ThemeSwitch() {
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
         
          id="theme-toggle"
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
         
          id="theme-toggle"
          onClick={() => setTheme("light")}
        />
        <Moon className="ml-2" size={16} />
      </>
    );
  }
}
