import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { InputArea } from "@/components/InputArea";
import { UserMessage, AIMessage, TypingIndicator, MessageList } from "@/components/MessageFlow";
import { useChat } from "@/hooks/use-chat";
import { useI18n } from "@/i18n/context";

export const Route = createFileRoute("/")({
  component: Index,
});

const initialConversations = [
  { id: "today-1", titleKey: "conv1", active: true },
  { id: "today-2", titleKey: "conv2" },
  { id: "today-3", titleKey: "conv3" },
  { id: "week-1", titleKey: "conv4" },
  { id: "week-2", titleKey: "conv5" },
];

// 每个对话的初始消息（模拟历史数据）
const conversationData: Record<string, { userQuery: string; aiReply: string }> = {
  "today-1": { userQuery: "conv1UserQuery", aiReply: "conv1AiReply" },
  "today-2": { userQuery: "conv2UserQuery", aiReply: "conv2AiReply" },
  "today-3": { userQuery: "conv3UserQuery", aiReply: "conv3AiReply" },
  "week-1": { userQuery: "conv4UserQuery", aiReply: "conv4AiReply" },
  "week-2": { userQuery: "conv5UserQuery", aiReply: "conv5AiReply" },
};

function Index() {
  const { t } = useI18n();
  const [activeConvId, setActiveConvId] = useState("today-1");
  const [conversations, setConversations] = useState(initialConversations);
  const { messages, isTyping, sendMessage, scrollRef } = useChat();

  // 切换对话时，更新活跃状态并清空消息
  const handleSelectConversation = (id: string) => {
    setActiveConvId(id);
  };

  // 新建对话
  const handleNewChat = () => {
    const newId = `today-${Date.now()}`;
    const newConv = { id: newId, titleKey: "newConversation", active: true };
    setConversations((prev) => [newConv, ...prev]);
    setActiveConvId(newId);
  };

  // 根据当前选中的对话，更新 conversations 的 active 状态
  const conversationsWithActive = conversations.map((c) => ({
    ...c,
    active: c.id === activeConvId,
  }));

  // 获取当前对话的标题 key
  const activeTitleKey = conversations.find((c) => c.id === activeConvId)?.titleKey || "conv1";

  return (
    <div
      className="h-screen overflow-hidden"
      style={{
        background: "linear-gradient(135deg,#F0F4F8 0%,#E8EEF5 45%,#F5F0F8 100%)",
        backgroundSize: "200% 200%",
        animation: "flow 25s ease-in-out infinite",
      }}
    >
      {/* 暗黑模式背景覆盖 */}
      <div
        className="hidden dark:block fixed inset-0 -z-10"
        style={{
          background: "linear-gradient(135deg,#0F172A 0%,#1E293B 45%,#1a1a2e 100%)",
          backgroundSize: "200% 200%",
          animation: "flow 25s ease-in-out infinite",
        }}
      ></div>

      {/* Background Blobs */}
      <div
        className="fixed top-[-6%] left-[8%] w-[380px] h-[380px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle,rgba(56,189,248,0.12),transparent 70%)",
          filter: "blur(50px)",
        }}
      ></div>
      <div
        className="fixed bottom-[-6%] right-[5%] w-[340px] h-[340px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle,rgba(16,185,129,0.08),transparent 70%)",
          filter: "blur(55px)",
        }}
      ></div>

      {/* Main Layout */}
      <div className="flex h-screen p-3 md:p-5 gap-3 md:gap-5 relative">
        {/* Sidebar */}
        <Sidebar
          conversations={conversationsWithActive}
          activeId={activeConvId}
          onSelect={handleSelectConversation}
          onNewChat={handleNewChat}
        />

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col min-w-0 glass rounded-[24px] shadow-[0_8px_32px_rgba(51,65,85,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] overflow-hidden">
          {/* Header */}
          <Header titleKey={activeTitleKey as never} statusKey="online" />

          {/* Message Flow */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto scroll-thin px-4 md:px-7 py-6">
            <div className="max-w-[720px] mx-auto w-full space-y-5">
              {/* 初始示例对话（仅已有数据的对话显示） */}
              {conversationData[activeConvId] && (
                <>
                  <UserMessage text={t(conversationData[activeConvId]?.userQuery || "conv1UserQuery")} delay=".05s" />
                  <AIMessage
                    text={t(conversationData[activeConvId]?.aiReply || "conv1AiReply")}
                    delay=".15s"
                    showData={activeConvId === "today-1"}
                  />
                </>
              )}

              {/* 动态消息列表 */}
              <MessageList messages={messages} isTyping={isTyping} />

              {/* 初始打字指示器（仅已有数据的对话且无消息时显示） */}
              {conversationData[activeConvId] && messages.length === 0 && !isTyping && <TypingIndicator delay=".3s" />}
            </div>
          </div>

          {/* Input Area */}
          <InputArea onSend={sendMessage} />
        </main>
      </div>
    </div>
  );
}
