import { Send, Plus } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/i18n/context";

interface InputAreaProps {
  onSend?: (message: string) => void;
}

export function InputArea({ onSend }: InputAreaProps) {
  const [value, setValue] = useState("");
  const { t } = useI18n();

  const handleSend = () => {
    if (value.trim()) {
      onSend?.(value.trim());
      setValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="px-4 md:px-7 pb-5 pt-2">
      <div className="max-w-[720px] mx-auto">
        <div className="glass-strong rounded-full flex items-center gap-2 pl-5 pr-2 py-2 shadow-[0_4px_20px_rgba(51,65,85,0.06)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
          <Plus className="text-[#38BDF8]/40 w-5 h-5" />
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t("inputPlaceholder")}
            className="flex-1 bg-transparent outline-none text-[13px] placeholder:text-[var(--color-text)]/30 py-1.5 text-[var(--color-text)]"
          />
          <button
            onClick={handleSend}
            className="w-9 h-9 rounded-full flex items-center justify-center text-white shrink-0 hover:scale-110 transition"
            style={{
              background: "linear-gradient(135deg,#38BDF8,#7DD3FC)",
              boxShadow: "0 4px 12px rgba(56,189,248,0.25)",
            }}
          >
            <Send width={15} height={15} strokeWidth={2.5} />
          </button>
        </div>
        <p className="text-center text-[10px] text-[var(--color-text)]/30 mt-2.5">
          {t("inputHint")}
        </p>
      </div>
    </div>
  );
}
