"use client";

import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";
import { Copy, Image as ImageIcon } from "lucide-react";

export default function AssistantPage() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<any[]>([]);
  const [image, setImage] = useState<string | null>(null);

  const userId = "demo-user";
  const [sessionId, setSessionId] = useState(() => crypto.randomUUID());

  const ai = trpc.ai.chat.useMutation();

  const { data: sessions } = trpc.ai.getSessions.useQuery({ userId });

  const { data: messages } = trpc.ai.getMessages.useQuery(
    { sessionId },
    { enabled: !!sessionId }
  );

  // Load messages
  useEffect(() => {
    if (messages) {
      setChat(
        messages.map((m: any) => ({
          role: m.role,
          text: m.message,
        }))
      );
    }
  }, [messages]);

  // Send
  const send = async (msg?: string) => {
    const finalMsg = msg || message;
    if (!finalMsg.trim() && !image) return;

    setChat((prev) => [
      ...prev,
      { role: "user", text: finalMsg, image },
    ]);

    const res = await ai.mutateAsync({
      message: finalMsg,
      userId,
      sessionId,
    });

    setChat((prev) => [
      ...prev,
      { role: "assistant", text: res },
    ]);

    setMessage("");
    setImage(null);
  };

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex min-h-screen bg-black text-white">

      {/* Sidebar */}
      <div className="w-60 border-r border-white/10 p-3 hidden md:block">

        <button
          onClick={() => {
            setSessionId(crypto.randomUUID());
            setChat([]);
          }}
          className="w-full mb-3 bg-white text-black py-2 rounded"
        >
          + New Chat
        </button>

        <div className="space-y-2">
          {sessions?.map((id: string) => (
            <div
              key={id}
              onClick={() => setSessionId(id)}
              className="p-2 text-sm bg-[#1a1a1a] rounded cursor-pointer"
            >
              Chat {id.slice(0, 5)}
            </div>
          ))}
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">

        {/* Title */}
        {chat.length === 0 && (
          <div className="text-center mb-10">
            <p className="text-gray-400 text-sm">✨ Hi User</p>
            <h1 className="text-3xl md:text-5xl font-semibold mt-2">
              Where should we start?
            </h1>
          </div>
        )}

        {/* Chat */}
        <div className="w-full max-w-2xl space-y-4 mb-6">
          {chat.map((msg, i) => (
            <div key={i} className="relative">

              <div
                className={`p-3 rounded-xl ${
                  msg.role === "user"
                    ? "bg-white text-black ml-auto"
                    : "bg-[#1a1a1a]"
                }`}
              >
                {msg.text}

                {msg.image && (
                  <img
                    src={msg.image}
                    className="mt-2 rounded-lg max-h-40"
                  />
                )}
              </div>

              {msg.role === "assistant" && (
                <button
                  onClick={() => copyText(msg.text)}
                  className="absolute top-2 right-2 text-xs bg-white/10 px-2 py-1 rounded hover:bg-white/20"
                >
                  <Copy size={14} />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="w-full max-w-2xl">
          <div className="flex items-center gap-2 bg-[#1a1a1a] rounded-full px-4 py-3 border border-white/10">

            <label className="cursor-pointer">
              <ImageIcon size={18} />
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const url = URL.createObjectURL(file);
                    setImage(url);
                  }
                }}
              />
            </label>

            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask DevSpace AI..."
              className="flex-1 bg-transparent outline-none text-sm"
            />

            <button
              onClick={() => send()}
              className="bg-white text-black px-4 py-1.5 rounded-full text-sm"
            >
              Send
            </button>
          </div>

          {image && (
            <img
              src={image}
              className="mt-3 max-h-32 rounded-lg"
            />
          )}

          {chat.length === 0 && (
            <div className="flex flex-wrap gap-2 mt-4 justify-center">

              <button
                onClick={() => send("Generate a login page in React")}
                className="px-4 py-2 rounded-full bg-[#1a1a1a] hover:bg-[#2a2a2a] text-sm"
              >
                💻 Generate code
              </button>

              <button
                onClick={() => send("Fix this error in Node.js")}
                className="px-4 py-2 rounded-full bg-[#1a1a1a] hover:bg-[#2a2a2a] text-sm"
              >
                🐛 Debug error
              </button>

              <button
                onClick={() => send("Explain React hooks simply")}
                className="px-4 py-2 rounded-full bg-[#1a1a1a] hover:bg-[#2a2a2a] text-sm"
              >
                📘 Explain code
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}