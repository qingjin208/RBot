import { useI18n } from "@/i18n/context";

interface HeaderProps {
  titleKey?: string;
  statusKey?: string;
}

export function Header({ titleKey = "title", statusKey = "online" }: HeaderProps) {
  const { t } = useI18n();

  return (
    <header className="flex items-center justify-between px-5 md:px-7 py-4 border-b border-white/60 dark:border-[#38BDF8]/10">
      <div className="flex items-center gap-3">
        {/* Mobile Logo */}
        <div
          className="w-8 h-8 rounded-full md:hidden flex items-center justify-center"
          style={{ background: "linear-gradient(135deg,#38BDF8,#7DD3FC)" }}
        >
          <span className="font-['Space_Grotesk'] font-bold text-xs text-white">M</span>
        </div>
        <div>
          <h2 className="font-['Space_Grotesk'] text-[16px] md:text-[18px] font-semibold leading-none text-[var(--color-text)]">
            {t(titleKey as never)}
          </h2>
          <p className="text-[10px] text-[#38BDF8]/60 mt-1.5 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span> {t(statusKey as never)}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="glass-soft rounded-full px-3 py-1.5 text-[11px] font-medium hover:scale-105 transition text-[var(--color-text)]">
          {t("export")}
        </button>
        <button className="glass-soft rounded-full w-8 h-8 flex items-center justify-center hover:scale-105 transition text-[var(--color-text)]/50">
          ⋯
        </button>
      </div>
    </header>
  );
}
