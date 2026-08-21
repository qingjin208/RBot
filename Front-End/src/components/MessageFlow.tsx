import { useI18n } from "@/i18n/context";
import { KPICard, LineChart, ProgressBarGroup, DataTable, sampleKPIs, sampleProgressBars, sampleTableRows } from "./DataVisualization";
import type { ChatMessage } from "@/hooks/use-chat";

interface UserMessageProps {
  text: string;
  delay?: string;
}

function UserMessage({ text, delay }: UserMessageProps) {
  return (
    <div className="msg-in flex justify-end" style={{ animationDelay: delay }}>
      <div
        className="rounded-2xl rounded-br-md px-4 py-3 max-w-[80%] shadow-[0_4px_16px_rgba(56,189,248,0.12)]"
        style={{ background: "linear-gradient(135deg,#38BDF8,#7DD3FC)" }}
      >
        <p className="text-[13px] leading-relaxed text-white">{text}</p>
      </div>
    </div>
  );
}

interface AIMessageProps {
  text?: string;
  delay?: string;
  showData?: boolean;
}

function AIMessage({ text, delay, showData = true }: AIMessageProps) {
  const { t } = useI18n();
  const highlightValue = "¥2,847K";
  const highlightChange = 12.3;
  const changeColor = highlightChange >= 0 ? "#10B981" : "#FB7185";

  return (
    <div className="msg-in flex gap-3 items-start" style={{ animationDelay: delay }}>
      {/* AI Avatar */}
      <div
        className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg,#38BDF8,#7DD3FC)",
          boxShadow: "0 4px 12px rgba(56,189,248,0.2)",
        }}
      >
        <span className="font-['Space_Grotesk'] font-bold text-xs text-white">M</span>
      </div>

      {/* Message Content */}
      <div className="flex-1 min-w-0 space-y-3">
        <div className="glass-strong rounded-2xl rounded-tl-md p-4 shadow-[0_4px_20px_rgba(51,65,85,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] space-y-4">
          {/* Text */}
          {text && (
            <p className="text-[13px] leading-relaxed text-[var(--color-text)]">
              {showData ? (
                <>
                  {text.split("¥2,847K")[0]}
                  <span className="font-['JetBrains_Mono'] font-semibold" style={{ color: changeColor }}>
                    {highlightValue}
                  </span>
                  {text.split("¥2,847K")[1]}
                </>
              ) : (
                text
              )}
            </p>
          )}

          {/* Data visualizations only when showData */}
          {showData && (
            <>
              {/* KPI Cards 2x2 */}
              <div className="grid grid-cols-2 gap-2.5">
                {sampleKPIs.map((kpi, index) => (
                  <KPICard
                    key={kpi.labelKey}
                    labelKey={kpi.labelKey}
                    value={kpi.value}
                    change={kpi.change}
                    delay={`${0.25 + index * 0.05}s`}
                  />
                ))}
              </div>

              {/* Line Chart */}
              <LineChart titleKey="chartTitle" subtitle={t("chartAvg")} delay="0.45s" />

              {/* Progress Bars */}
              <ProgressBarGroup titleKey="progressTitle" items={sampleProgressBars} delay="0.5s" />

              {/* Data Table */}
              <DataTable titleKey="tableTitle" rows={sampleTableRows} delay="0.55s" />

              {/* Summary */}
              <p className="text-[12px] leading-relaxed text-[var(--color-text)]/70">{t("aiSummary")}</p>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-1">
                <button className="glass-soft rounded-lg px-3 py-1.5 text-[10px] text-[#38BDF8] hover:scale-105 transition">
                  {t("deepAnalysis")}
                </button>
                <button className="glass-soft rounded-lg px-3 py-1.5 text-[10px] text-[var(--color-text)]/60 hover:scale-105 transition">
                  {t("exportPdf")}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

interface TypingIndicatorProps {
  delay?: string;
}

function TypingIndicator({ delay }: TypingIndicatorProps) {
  return (
    <div className="msg-in flex gap-3 items-end" style={{ animationDelay: delay }}>
      <div
        className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
        style={{ background: "linear-gradient(135deg,#38BDF8,#7DD3FC)" }}
      >
        <span className="font-['Space_Grotesk'] font-bold text-xs text-white">M</span>
      </div>
      <div className="glass-strong rounded-2xl rounded-tl-md px-4 py-3.5 flex gap-1.5">
        <span
          className="w-2 h-2 rounded-full bg-[#38BDF8]/50 animate-bounce"
          style={{ animationDelay: "0s" }}
        ></span>
        <span
          className="w-2 h-2 rounded-full bg-[#38BDF8]/50 animate-bounce"
          style={{ animationDelay: ".15s" }}
        ></span>
        <span
          className="w-2 h-2 rounded-full bg-[#38BDF8]/50 animate-bounce"
          style={{ animationDelay: ".3s" }}
        ></span>
      </div>
    </div>
  );
}

// 动态消息列表渲染
interface MessageListProps {
  messages: ChatMessage[];
  isTyping: boolean;
}

function MessageList({ messages, isTyping }: MessageListProps) {
  return (
    <>
      {messages.map((msg, index) => {
        const delay = `${Math.min(index * 0.05, 0.3)}s`;
        if (msg.role === "user") {
          return <UserMessage key={msg.id} text={msg.text} delay={delay} />;
        }
        // 第一条 AI 消息带数据可视化，后续纯文字
        const isFirstAI = messages.findIndex((m) => m.role === "ai") === index;
        return <AIMessage key={msg.id} text={msg.text} delay={delay} showData={isFirstAI} />;
      })}
      {isTyping && <TypingIndicator delay=".1s" />}
    </>
  );
}

export { UserMessage, AIMessage, TypingIndicator, MessageList };
