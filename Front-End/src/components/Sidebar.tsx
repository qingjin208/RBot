import { Plus } from "lucide-react";
import { useI18n } from "@/i18n/context";
import { SettingsPanel } from "./SettingsPanel";

interface Conversation {
  id: string;
  titleKey: string;
  active?: boolean;
}

interface SidebarProps {
  conversations: Conversation[];
  activeId?: string;
  onSelect?: (id: string) => void;
  onNewChat?: () => void;
}

export function Sidebar({ conversations, activeId, onSelect, onNewChat }: SidebarProps) {
  const { t } = useI18n();

  const todayConversations = conversations.filter((c) => c.id.startsWith("today"));
  const weekConversations = conversations.filter((c) => c.id.startsWith("week"));

  return (
    <aside className="glass rounded-[24px] w-[260px] shrink-0 hidden md:flex flex-col p-5 shadow-[0_8px_32px_rgba(51,65,85,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg,#38BDF8,#7DD3FC)",
            boxShadow: "0 4px 12px rgba(56,189,248,0.25)",
          }}
        >
          <span className="font-['Space_Grotesk'] font-bold text-sm text-white">M</span>
        </div>
        <div>
          <h1 className="font-['Space_Grotesk'] text-[17px] font-semibold leading-none text-[var(--color-text)]">
            {t("appName")}
          </h1>
          <p className="text-[10px] text-[#38BDF8]/70 mt-1 tracking-wide">{t("appTagline")}</p>
        </div>
      </div>

      {/* New Chat Button */}
      <button
        onClick={onNewChat}
        className="glass-strong rounded-xl py-2.5 px-4 text-[13px] font-medium flex items-center gap-2 mb-5 hover:scale-[1.02] transition-transform text-[var(--color-text)]"
      >
        <Plus className="text-[#38BDF8] w-4 h-4" /> {t("newChat")}
      </button>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto scroll-thin space-y-1 -mr-2 pr-2">
        {todayConversations.length > 0 && (
          <>
            <p className="text-[9px] uppercase tracking-[0.18em] text-[#38BDF8]/50 px-2 mb-2">
              {t("today")}
            </p>
            {todayConversations.map((conv) => (
              <a
                key={conv.id}
                className={`rounded-lg px-3 py-2 text-[12px] flex items-center justify-between cursor-pointer ${
                  conv.active
                    ? "glass-soft text-[var(--color-text)]"
                    : "hover:bg-white/40 dark:hover:bg-white/5 transition text-[var(--color-text)]/60"
                }`}
                onClick={() => onSelect?.(conv.id)}
              >
                <span className="truncate">{t(conv.titleKey as never)}</span>
                {conv.active && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]"></span>
                )}
              </a>
            ))}
          </>
        )}

        {weekConversations.length > 0 && (
          <>
            <p className="text-[9px] uppercase tracking-[0.18em] text-[#38BDF8]/50 px-2 mb-2 mt-4">
              {t("thisWeek")}
            </p>
            {weekConversations.map((conv) => (
              <a
                key={conv.id}
                className={`rounded-lg px-3 py-2 text-[12px] flex items-center justify-between cursor-pointer ${
                  conv.active
                    ? "glass-soft text-[var(--color-text)]"
                    : "hover:bg-white/40 dark:hover:bg-white/5 transition text-[var(--color-text)]/60"
                }`}
                onClick={() => onSelect?.(conv.id)}
              >
                <span className="truncate">{t(conv.titleKey as never)}</span>
                {conv.active && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]"></span>
                )}
              </a>
            ))}
          </>
        )}
      </div>

      {/* Settings Panel (Language + Theme) */}
      <div className="mt-3">
        <SettingsPanel />
      </div>
    </aside>
  );
}
