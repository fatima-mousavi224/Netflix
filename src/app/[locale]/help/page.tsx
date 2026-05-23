"use client";
import React, { useState, useEffect, useRef } from "react";
import { Send, Bot } from "lucide-react";
import { useLocale } from "next-intl";
import HomePageHeader from "@/src/ui/header/HomePageHeader";

interface Message {
  id: number;
  text: string;
  sender: "ai" | "user";
}

export default function AIHelpPage() {
  const locale = useLocale();
  const scrollRef = useRef<HTMLDivElement>(null);

  // ۱. تعریف پیام‌های خوش‌آمدگویی در خارج از استیت
  const welcomeData: Record<string, string> = {
    en: "Hi! I'm your Netflix AI. Ask me about login, pricing, or account deletion.",
    tr: "Merhaba! Ben Netflix Yapay Zekası. Giriş, fiyatlandırma veya hesap silme hakkında soru sorabilirsiniz.",
    ar: "مرحباً! أنا ذكاء نتفليكس الاصطناعي. اسألني عن الدخول أو الأسعار أو حذف الحساب.",
  };

  const [messages, setMessages] = useState<Message[]>(() => [
    {
      id: 1,
      text: welcomeData[locale as keyof typeof welcomeData] || welcomeData.en,
      sender: "ai",
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const knowledgeBase: Record<string, Record<string, string>> = {
    en: {
      hello: "Hello! How can I help you?",
      login: "To login, click the 'Sign In' button at the top right.",
      price: "Netflix plans range from $9.99 to $19.99 per month.",
      delete:
        "To delete your account, go to Account settings and select 'Cancel Membership'.",
      default:
        "I recommend checking our official help articles for this specific issue.",
    },
    tr: {
      merhaba: "Merhaba! Nasıl yardımcı olabilirim?",
      giris: "Giriş yapmak için sağ üstteki 'Oturum Aç' butonuna tıklayın.",
      fiyat: "Netflix planları aylık 9.99$ ile 19.99$ arasındadır.",
      sil: "Hesabınızı silmek için 'Üyeliği İptal Et' seçeneğini seçin.",
      default: "Bu konu için resmi yardım sayfamıza göz atmanızı öneririm.",
    },
    ar: {
      مرحبا: "أهلاً بك! كيف يمكنني مساعدتك؟",
      دخول: "لتسجيل الدخول، انقر فوق زر 'تسجيل الدخول' في الأعلى.",
      سعر: "الأسعار بين 9.99 و 19.99 دولاراً شهرياً.",
      حذف: "لحذف حسابك، حدد 'إلغاء العضوية' من الإعدادات.",
      default: "أنصحك بمراجعة مقالات المساعدة الرسمية لدينا.",
    },
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userText = input.toLowerCase();
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: input, sender: "user" },
    ]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const langData = knowledgeBase[locale] || knowledgeBase.en;
      let response = langData.default;

      if (
        userText.includes("login") ||
        userText.includes("دخول") ||
        userText.includes("giris")
      )
        response = langData.login;
      if (
        userText.includes("price") ||
        userText.includes("سعر") ||
        userText.includes("fiyat")
      )
        response = langData.price;
      if (
        userText.includes("delete") ||
        userText.includes("حذف") ||
        userText.includes("sil")
      )
        response = langData.delete;
      if (
        userText.includes("hello") ||
        userText.includes("مرحبا") ||
        userText.includes("merhaba")
      )
        response = langData.hello;

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: response, sender: "ai" },
      ]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div>
      <HomePageHeader />
      <div
        key={locale}
        className="min-h-screen bg-grey-900 text-white flex flex-col items-center p-4 md:p-10"
        dir={locale === "ar" ? "rtl" : "ltr"}
      >
        <div className="w-full max-w-3xl flex flex-col h-[80vh] bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-zinc-800 bg-zinc-900 flex items-center gap-4">
            <div className="p-2 bg-red-600 rounded-lg shadow-lg shadow-red-600/20">
              <Bot size={24} />
            </div>
            <div>
              <h1 className="font-bold text-lg">Netflix Support Bot</h1>
              <p className="text-[10px] text-emerald-500 flex items-center gap-1 font-mono uppercase tracking-widest">
                System Online • {locale}
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`p-4 rounded-2xl text-sm max-w-[80%] ${msg.sender === "user" ? "bg-red-600 text-white rounded-tr-none shadow-lg shadow-red-600/10" : "bg-zinc-800 text-zinc-300 rounded-tl-none border border-zinc-700 shadow-xl"}`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="text-zinc-600 text-[10px] animate-pulse ml-4 italic">
                Bot is thinking...
              </div>
            )}
            <div ref={scrollRef} />
          </div>

          <form
            onSubmit={handleSendMessage}
            className="p-4 bg-zinc-900 border-t border-zinc-800 flex gap-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="..."
              className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-5 py-3.5 focus:outline-none focus:border-red-600 text-sm transition-all"
            />
            <button
              type="submit"
              className="p-3.5 bg-red-600 rounded-xl hover:bg-red-700 transition-all active:scale-95 shadow-lg shadow-red-600/20"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
