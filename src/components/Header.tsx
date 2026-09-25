import React, { useState } from 'react';
import { Calendar, Bell, Search, X, Sparkles } from 'lucide-react';
import { format } from 'date-fns';
import { CozyDeskIllustration } from '../utils/illustrations';

interface HeaderProps {
  currentDate?: Date;
  onOpenNotifications?: () => void;
  onOpenSearch?: () => void;
  searchQuery?: string;
  setSearchQuery?: (q: string) => void;
  userName?: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentDate = new Date(2026, 8, 25), // Defaults to Thu, Sep 25, 2026 as in mockup
  onOpenNotifications,
  searchQuery = '',
  setSearchQuery,
  userName = 'Sai'
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning,';
    if (hour < 17) return 'Good Afternoon,';
    return 'Good Evening,';
  };

  return (
    <header className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
              {getGreeting()}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-1.5">
              {userName} <span className="inline-block animate-bounce origin-bottom-right">👋</span>
            </h2>
          </div>
          <p className="text-slate-500 text-sm font-medium mt-0.5">
            A better you, one day at a time.
          </p>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2.5 self-end sm:self-auto">
          {/* Search Box / Toggle */}
          <div className="relative">
            {isSearchOpen ? (
              <div className="flex items-center bg-white border border-indigo-100 rounded-2xl px-3 py-1.5 shadow-xs animate-in fade-in duration-200">
                <Search size={16} className="text-indigo-500 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Search routine or tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
                  autoFocus
                  className="text-xs text-slate-800 bg-transparent focus:outline-none w-36 sm:w-48 font-medium"
                />
                <button 
                  onClick={() => {
                    setIsSearchOpen(false);
                    if (setSearchQuery) setSearchQuery('');
                  }}
                  className="text-slate-400 hover:text-slate-600 ml-1"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2.5 bg-white border border-slate-100 hover:border-indigo-200 rounded-2xl text-slate-500 hover:text-indigo-600 transition-colors shadow-xs"
                title="Search tasks and routines"
              >
                <Search size={18} />
              </button>
            )}
          </div>

          {/* Notification Bell */}
          <button 
            onClick={onOpenNotifications}
            className="relative p-2.5 bg-white border border-slate-100 hover:border-indigo-200 rounded-2xl text-slate-500 hover:text-indigo-600 transition-colors shadow-xs"
            title="Notifications"
          >
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-600 rounded-full ring-2 ring-white" />
          </button>

          {/* Date Indicator Pill */}
          <div className="bg-white border border-slate-100 px-3.5 py-2 rounded-2xl flex items-center gap-2 shadow-xs">
            <Calendar size={17} className="text-indigo-600" />
            <span className="text-xs sm:text-sm font-bold text-slate-800 tracking-tight">
              {format(currentDate, 'EEE, MMM d, yyyy')}
            </span>
          </div>
        </div>
      </div>

      {/* Cozy Hero Banner (from top center of image) */}
      <div className="relative w-full rounded-[32px] bg-gradient-to-r from-amber-50/70 via-indigo-50/50 to-purple-50/70 border border-indigo-50/80 p-5 sm:p-7 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
        {/* Quote & Motivation Bubble */}
        <div className="z-10 max-w-sm sm:max-w-md space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/90 backdrop-blur-xs rounded-full border border-amber-200/60 shadow-xs">
            <Sparkles size={14} className="text-amber-500" />
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-700">
              Daily Inspiration
            </span>
          </div>

          {/* Cozy Quote Box */}
          <div className="bg-white/90 backdrop-blur-xs p-4 rounded-2xl border border-white/80 shadow-xs relative">
            <p className="text-sm sm:text-base font-bold text-slate-800 italic leading-snug">
              “Stay consistent. Small steps create big results.”
            </p>
            <p className="text-xs text-indigo-600 font-semibold mt-1">
              Focus on today’s 2h Video Editing block & 8h work shift.
            </p>
            {/* Little quote speech tail */}
            <div className="absolute -bottom-2 left-6 w-3 h-3 bg-white rotate-45 border-r border-b border-white/80" />
          </div>
        </div>

        {/* Cozy Desk Scene Art */}
        <div className="w-full md:w-[380px] h-[140px] sm:h-[155px] shrink-0">
          <CozyDeskIllustration className="w-full h-full" />
        </div>
      </div>
    </header>
  );
};
