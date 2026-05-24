"use client";
import { Bell } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl"; 

export const NavNotifications = () => {
  const t = useTranslations("Notifications");
  const [showNotif, setShowNotif] = useState(false);

  const notifications = [
    { id: 1, text: "New Movie: Interstellar now streaming", time: "2h ago" },
    { id: 2, text: "Finish watching: Wednesday", time: "1d ago" },
  ];

  return (
    <div 
      className="relative flex items-center h-full" 
      onMouseEnter={() => setShowNotif(true)} 
      onMouseLeave={() => setShowNotif(false)}
    >
      <div className="relative cursor-pointer">
        <Bell size={20} className="hover:text-zinc-400 transition-colors" />
        <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center text-white">
          2
        </span>
      </div>

      {showNotif && (
        <div className="absolute top-full right-0 w-80 bg-black/95 border-t-2 border-t-white border border-zinc-800 shadow-2xl z-100 animate-in fade-in slide-in-from-top-1 duration-200">
          
          <div className="absolute -top-2.25 right-2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-white" />

          <div className="px-4 py-2 text-xs font-medium border-b border-zinc-800 text-zinc-400 bg-zinc-900/50">
             Recent Notifications
          </div>

          <div className="max-h-100 overflow-y-auto no-scrollbar">
            {notifications.map((n) => (
              <div 
                key={n.id} 
                className="px-4 py-4 hover:bg-zinc-800/40 cursor-pointer transition-colors border-b border-zinc-800/50 last:border-0 flex flex-col gap-1"
              >
                <p className="text-[13px] text-zinc-200 leading-tight">{n.text}</p>
                <span className="text-[11px] text-zinc-500">{n.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};