import { useState, useRef, useEffect } from "react";
import { Globe, Moon, Sun, Check } from "lucide-react";
import { useI18n } from "@/i18n/context";
import { useTheme } from "@/theme/context";
import { languages, type Language } from "@/i18n/translations";

export function SettingsPanel() {
  const { lang, setLang, t } = useI18n();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  return (
    <div className="relative" ref={panelRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="glass-soft rounded-xl p-3 flex items-center gap-3 w-full hover:scale-[1.02] transition cursor-pointer"
      >
        <div
          className="w-8 h-8 rounded-full shrink-0"
          style={{ background: "linear-gradient(135deg,#38BDF8,#10B981)" }}
        ></div>
        <div className="flex-1 min-w-0 text-left">
          <p className="text-[12px] font-medium truncate text-[var(--color-text)]">Nick</p>
          <p className="text-[10px] text-[#38BDF8]/60">{t("proMember")}</p>
        </div>
        <Globe className="w-4 h-4 text-[var(--color-text)]/40 shrink-0" />
      </button>

      {/* Dropdown Panel */}
      {open && (
        <div className="absolute bottom-full left-0 right-0 mb-2 glass-strong rounded-2xl p-3 shadow-[0_8px_32px_rgba(0,0,0,0.12)] space-y-3 z-50 msg-in">
          {/* Language Section */}
          <div>
            <p className="text-[9px] uppercase tracking-[0.18em] text-[#38BDF8]/50 px-1 mb-2 flex items-center gap-1.5">
              <Globe className="w-3 h-3" /> {t("language")}
            </p>
            <div className="space-y-0.5">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code as Language)}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-[12px] transition cursor-pointer ${
                    lang === l.code
                      ? "glass-soft text-[var(--color-text)]"
                      : "hover:bg-white/30 dark:hover:bg-white/5 text-[var(--color-text)]/60"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-sm">{l.flag}</span>
                    {l.label}
                  </span>
                  {lang === l.code && <Check className="w-3.5 h-3.5 text-[#38BDF8]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-[var(--color-text)]/8"></div>

          {/* Theme Section */}
          <div>
            <p className="text-[9px] uppercase tracking-[0.18em] text-[#38BDF8]/50 px-1 mb-2 flex items-center gap-1.5">
              {theme === "dark" ? <Moon className="w-3 h-3" /> : <Sun className="w-3 h-3" />} {t("theme")}
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => setTheme("light")}
                className={`flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-lg text-[12px] transition cursor-pointer ${
                  theme === "light"
                    ? "glass-soft text-[var(--color-text)]"
                    : "hover:bg-white/30 dark:hover:bg-white/5 text-[var(--color-text)]/60"
                }`}
              >
                <Sun className="w-3.5 h-3.5" /> {t("lightMode")}
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={`flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-lg text-[12px] transition cursor-pointer ${
                  theme === "dark"
                    ? "glass-soft text-[var(--color-text)]"
                    : "hover:bg-white/30 dark:hover:bg-white/5 text-[var(--color-text)]/60"
                }`}
              >
                <Moon className="w-3.5 h-3.5" /> {t("darkMode")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
