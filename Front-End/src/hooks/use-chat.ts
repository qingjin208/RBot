import { useState, useRef, useEffect, useCallback } from "react";

export interface ChatMessage {
  id: string;
  role: "user" | "ai";
  text: string;
  timestamp: number;
}

// 模拟 AI 回复（根据用户输入关键词匹配不同回复模板）
function generateAIReply(userText: string): string {
  const lower = userText.toLowerCase();

  if (lower.includes("销售") || lower.includes("revenue") || lower.includes("vente") || lower.includes("umsatz")) {
    return "已从销售库拉取数据。总营收 ¥2,847K，环比 ↑12.3%。核心指标已在上方卡片中展示，整体增长稳健。";
  }
  if (lower.includes("用户") || lower.includes("user") || lower.includes("utilisateur") || lower.includes("nutzer")) {
    return "用户增长趋势已拉取。本月新增用户 12,840，环比 ↑15.2%。活跃用户达 89.3K，留存率 76.8%。";
  }
  if (lower.includes("转化") || lower.includes("conversion") || lower.includes("konvers")) {
    return "转化漏斗分析完成。整体转化率 4.82%，环比 ↓0.3%。主要流失在支付环节，建议优化结算流程。";
  }
  if (lower.includes("库存") || lower.includes("inventory") || lower.includes("stock") || lower.includes("bestand")) {
    return "库存周转分析完成。平均周转天数 23.5 天，环比 ↓2.1 天。TOP 3 商品库存充足，无断货风险。";
  }
  if (lower.includes("趋势") || lower.includes("trend") || lower.includes("tendance") || lower.includes("trend")) {
    return "趋势分析完成。近 30 天数据呈上升态势，日均增长 3.2%。预计下月将继续保持增长。";
  }

  return `已收到您的查询：「${userText}」。正在分析相关数据…`;
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 自动滚动到底部
  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  // 清理定时器
  useEffect(() => {
    return () => {
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
      }
    };
  }, []);

  const sendMessage = useCallback((text: string) => {
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);

    // 模拟 AI 打字 + 回复
    setIsTyping(true);

    typingTimerRef.current = setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: `msg-${Date.now()}-ai`,
        role: "ai",
        text: generateAIReply(text),
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  }, []);

  return { messages, isTyping, sendMessage, scrollRef };
}
