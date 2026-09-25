import React, { useState } from 'react';
import { 
  BarChart2, 
  Play, 
  Dumbbell, 
  Moon, 
  Flame, 
  Target, 
  TrendingUp, 
  ChevronDown,
  Clock,
  Sparkles
} from 'lucide-react';

export const InsightsView: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'This Week' | 'Today' | 'This Month'>('This Week');
  const [showRangeDropdown, setShowRangeDropdown] = useState(false);

  // Weekly Activity Bar Chart Data (Mon to Sun)
  const weeklyData = [
    { day: 'Mon', hours: 6.5, percent: 70 },
    { day: 'Tue', hours: 7.2, percent: 80 },
    { day: 'Wed', hours: 5.8, percent: 65 },
    { day: 'Thu', hours: 8.5, percent: 92, isToday: true },
    { day: 'Fri', hours: 7.0, percent: 78 },
    { day: 'Sat', hours: 8.0, percent: 88 },
    { day: 'Sun', hours: 7.5, percent: 82 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header with Time Range selector */}
      <div className="bg-white p-6 sm:p-7 rounded-[32px] border border-indigo-50 shadow-xs flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            Insights
          </h2>
          <p className="text-slate-400 text-xs font-semibold mt-0.5">
            Consistency, hours tracked, and productivity trends
          </p>
        </div>

        {/* Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowRangeDropdown(prev => !prev)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200 text-xs font-bold text-slate-700 transition-colors"
          >
            <span>{timeRange}</span>
            <ChevronDown size={14} className="text-slate-400" />
          </button>

          {showRangeDropdown && (
            <div className="absolute right-0 mt-2 w-36 bg-white border border-slate-100 rounded-2xl shadow-xl p-1.5 z-20">
              {(['Today', 'This Week', 'This Month'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => {
                    setTimeRange(range);
                    setShowRangeDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs font-bold rounded-xl ${
                    timeRange === range ? 'bg-indigo-50 text-indigo-600' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 4 Metric Cards (Matching screenshot top row) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        
        {/* Metric 1: 82% Task Completion */}
        <div className="bg-white p-5 rounded-[28px] border border-indigo-50 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">82%</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <BarChart2 size={18} />
            </div>
          </div>
          <p className="text-xs font-bold text-slate-600">Task Completion</p>
          <span className="text-[11px] font-semibold text-emerald-600 mt-1 flex items-center gap-1">
            <TrendingUp size={12} /> +5% vs last week
          </span>
        </div>

        {/* Metric 2: 7h 30m Editing Practice */}
        <div className="bg-white p-5 rounded-[28px] border border-indigo-50 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">7h 30m</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Play size={18} fill="currentColor" />
            </div>
          </div>
          <p className="text-xs font-bold text-slate-600">Editing Practice</p>
          <span className="text-[11px] font-semibold text-purple-600 mt-1 block">
            On track for weekly goal
          </span>
        </div>

        {/* Metric 3: 3h Exercise */}
        <div className="bg-white p-5 rounded-[28px] border border-indigo-50 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">3h</span>
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Dumbbell size={18} />
            </div>
          </div>
          <p className="text-xs font-bold text-slate-600">Exercise</p>
          <span className="text-[11px] font-semibold text-sky-600 mt-1 block">
            3 of 4 sessions done
          </span>
        </div>

        {/* Metric 4: 91% Sleep Consistency */}
        <div className="bg-white p-5 rounded-[28px] border border-indigo-50 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">91%</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Moon size={18} fill="currentColor" />
            </div>
          </div>
          <p className="text-xs font-bold text-slate-600">Sleep Consistency</p>
          <span className="text-[11px] font-semibold text-indigo-600 mt-1 block">
            Avg 7h 30m per night
          </span>
        </div>
      </div>

      {/* Middle Row: Weekly Activity & Task Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Weekly Activity Bar Chart */}
        <div className="bg-white p-6 sm:p-7 rounded-[32px] border border-indigo-50 shadow-xs">
          <h4 className="text-base font-black text-slate-900 tracking-tight mb-6">
            Weekly Activity
          </h4>

          {/* Bar Chart Area */}
          <div className="h-48 flex items-end justify-between gap-2 sm:gap-4 px-2 pt-6">
            {weeklyData.map((item) => (
              <div key={item.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                {/* Tooltip on hover */}
                <span className="text-[10px] font-bold text-slate-400 group-hover:text-indigo-600 transition-colors">
                  {item.hours}h
                </span>

                {/* Animated Bar */}
                <div className="w-full bg-slate-100 rounded-2xl h-full flex items-end overflow-hidden p-0.5">
                  <div
                    style={{ height: `${item.percent}%` }}
                    className={`w-full rounded-xl transition-all duration-500 ${
                      item.isToday
                        ? 'bg-gradient-to-t from-indigo-600 to-purple-600 shadow-md shadow-indigo-200'
                        : 'bg-indigo-400/80 group-hover:bg-indigo-500'
                    }`}
                  />
                </div>

                <span className={`text-xs font-bold ${item.isToday ? 'text-indigo-600 font-black' : 'text-slate-500'}`}>
                  {item.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Task Breakdown (Donut Chart matching screenshot) */}
        <div className="bg-white p-6 sm:p-7 rounded-[32px] border border-indigo-50 shadow-xs flex flex-col justify-between">
          <h4 className="text-base font-black text-slate-900 tracking-tight mb-4">
            Task Breakdown
          </h4>

          <div className="flex flex-col sm:flex-row items-center justify-around gap-6 my-auto">
            {/* Circular Donut SVG */}
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                {/* Work 40% (coral) */}
                <circle cx="50" cy="50" r="38" fill="transparent" stroke="#FB7185" strokeWidth="14" strokeDasharray="95.5 238.7" strokeDashoffset="0" />
                {/* Editing 25% (purple) */}
                <circle cx="50" cy="50" r="38" fill="transparent" stroke="#8B5CF6" strokeWidth="14" strokeDasharray="59.7 238.7" strokeDashoffset="-95.5" />
                {/* Personal 15% (light purple/blue) */}
                <circle cx="50" cy="50" r="38" fill="transparent" stroke="#38BDF8" strokeWidth="14" strokeDasharray="35.8 238.7" strokeDashoffset="-155.2" />
                {/* Exercise 10% (green) */}
                <circle cx="50" cy="50" r="38" fill="transparent" stroke="#34D399" strokeWidth="14" strokeDasharray="23.9 238.7" strokeDashoffset="-191" />
                {/* Others 10% (amber) */}
                <circle cx="50" cy="50" r="38" fill="transparent" stroke="#FBBF24" strokeWidth="14" strokeDasharray="23.9 238.7" strokeDashoffset="-214.9" />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center select-none">
                <span className="text-xl font-black text-slate-900 tracking-tight">28h</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total</span>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-2 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-rose-400 shrink-0" />
                <span>Work</span>
                <span className="font-bold text-slate-900 ml-auto">40%</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-purple-500 shrink-0" />
                <span>Editing</span>
                <span className="font-bold text-slate-900 ml-auto">25%</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-emerald-400 shrink-0" />
                <span>Exercise</span>
                <span className="font-bold text-slate-900 ml-auto">10%</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-sky-400 shrink-0" />
                <span>Personal</span>
                <span className="font-bold text-slate-900 ml-auto">15%</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-amber-400 shrink-0" />
                <span>Others</span>
                <span className="font-bold text-slate-900 ml-auto">10%</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Row: Streaks & Most Productive Time (Matching screenshot bottom row) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        
        {/* Streak 1: 6 Days Routine Streak */}
        <div className="bg-white p-5 rounded-[28px] border border-indigo-50 shadow-xs flex items-center gap-4">
          <div className="w-13 h-13 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
            <Flame size={26} fill="currentColor" />
          </div>
          <div>
            <h5 className="text-xl font-black text-slate-900 tracking-tight">6 Days</h5>
            <p className="text-xs font-semibold text-slate-500">Routine Streak 🔥</p>
          </div>
        </div>

        {/* Streak 2: 4 Weeks Editing Streak */}
        <div className="bg-white p-5 rounded-[28px] border border-indigo-50 shadow-xs flex items-center gap-4">
          <div className="w-13 h-13 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Target size={26} />
          </div>
          <div>
            <h5 className="text-xl font-black text-slate-900 tracking-tight">4 Weeks</h5>
            <p className="text-xs font-semibold text-slate-500">Editing Practice 🎯</p>
          </div>
        </div>

        {/* Most Productive Time Card */}
        <div className="bg-gradient-to-br from-indigo-50/90 to-purple-50/90 p-5 rounded-[28px] border border-indigo-100 shadow-xs flex items-center gap-4 sm:col-span-2 lg:col-span-1">
          <div className="w-13 h-13 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-200">
            <BarChart2 size={24} />
          </div>
          <div>
            <h5 className="text-sm font-black text-indigo-950 tracking-tight">10:00 PM – 12:00 AM</h5>
            <p className="text-xs font-semibold text-indigo-700/80">Most Productive Time</p>
            <span className="text-[10px] text-slate-500 block mt-0.5">You get most work done at this time.</span>
          </div>
        </div>

      </div>
    </div>
  );
};
