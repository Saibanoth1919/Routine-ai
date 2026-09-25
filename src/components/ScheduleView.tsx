import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Plus, 
  Music, 
  MoreHorizontal, 
  Clock, 
  Check, 
  Play,
  Filter
} from 'lucide-react';
import { Task, ScheduleViewMode } from '../types';
import { playAmbientSound, stopAmbientSound } from '../utils/audio';

interface ScheduleViewProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onOpenAddTask: () => void;
  onStartFocus: (task: Task) => void;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({
  tasks,
  onToggleTask,
  onOpenAddTask,
  onStartFocus
}) => {
  const [viewMode, setViewMode] = useState<ScheduleViewMode>('today');
  const [selectedDayIndex, setSelectedDayIndex] = useState(3); // Thu 25 is index 3 (Mon=0, Tue=1, Wed=2, Thu=3, Fri=4, Sat=5, Sun=6)
  const [isPlayingLofi, setIsPlayingLofi] = useState(false);

  const days = [
    { day: 'Mon', date: 22 },
    { day: 'Tue', date: 23 },
    { day: 'Wed', date: 24 },
    { day: 'Thu', date: 25, isToday: true },
    { day: 'Fri', date: 26 },
    { day: 'Sat', date: 27 },
    { day: 'Sun', date: 28 },
  ];

  const toggleSound = () => {
    if (isPlayingLofi) {
      stopAmbientSound();
      setIsPlayingLofi(false);
    } else {
      playAmbientSound('lofi', 0.25);
      setIsPlayingLofi(true);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* View Switcher Header */}
      <div className="bg-white p-6 sm:p-7 rounded-[32px] border border-indigo-50 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            Schedule
          </h2>
          <p className="text-slate-400 text-xs font-semibold mt-0.5">
            Organize and synchronize your time blocks
          </p>
        </div>

        {/* View Mode Tabs & Add Task */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-slate-100 p-1 rounded-2xl flex items-center">
            <button
              onClick={() => setViewMode('today')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'today'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'week'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'calendar'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Calendar
            </button>
          </div>

          <button
            onClick={toggleSound}
            className={`p-2.5 rounded-2xl border transition-all ${
              isPlayingLofi 
                ? 'bg-indigo-50 border-indigo-300 text-indigo-600 shadow-xs' 
                : 'bg-white border-slate-200 text-slate-400 hover:text-slate-700'
            }`}
            title={isPlayingLofi ? "Pause Focus Ambience" : "Play Lo-Fi Ambience"}
          >
            <Music size={18} className={isPlayingLofi ? 'animate-bounce' : ''} />
          </button>

          <button
            onClick={onOpenAddTask}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-indigo-200 transition-all hover:scale-105"
          >
            <Plus size={16} strokeWidth={3} />
            <span>Add Routine</span>
          </button>
        </div>
      </div>

      {/* Week View Mode (as seen in bottom left of image) */}
      {viewMode === 'week' && (
        <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-indigo-50 shadow-xs overflow-x-auto">
          {/* Week Nav header */}
          <div className="flex justify-between items-center mb-6 min-w-[700px]">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Week View</h3>
              <div className="flex items-center gap-1 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                <button className="text-slate-400 hover:text-slate-700 p-0.5">
                  <ChevronLeft size={16} />
                </button>
                <span className="text-xs font-bold text-slate-700 px-2">
                  Sep 22 – Sep 28, 2026
                </span>
                <button className="text-slate-400 hover:text-slate-700 p-0.5">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={toggleSound}
                className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"
                title="Lo-Fi audio"
              >
                <Music size={18} />
              </button>
              <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                <MoreHorizontal size={18} />
              </button>
            </div>
          </div>

          {/* Grid Layout (7 columns + left hour labels) */}
          <div className="min-w-[750px]">
            {/* Days Header */}
            <div className="grid grid-cols-8 gap-3 mb-4 text-center">
              <div className="text-xs font-bold text-slate-400 py-2">Time</div>
              {days.map((item, idx) => {
                const isSelected = selectedDayIndex === idx;
                return (
                  <button
                    key={item.day}
                    onClick={() => setSelectedDayIndex(idx)}
                    className={`py-3 px-2 rounded-2xl flex flex-col items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-indigo-50 border-2 border-indigo-600 text-indigo-700 shadow-sm'
                        : 'hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <span className="text-xs font-bold">{item.day}</span>
                    <span className={`text-base font-black mt-0.5 ${isSelected ? 'text-indigo-700' : 'text-slate-800'}`}>
                      {item.date}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Timetable Grid */}
            <div className="space-y-3">
              {/* 8 AM - Wake Up */}
              <div className="grid grid-cols-8 gap-3 items-center">
                <div className="text-xs font-bold text-slate-400 text-center">8 AM</div>
                {days.map((_, i) => (
                  <div key={i} className="bg-emerald-100/70 border border-emerald-200/80 text-emerald-800 text-xs font-bold py-2 px-2 rounded-xl text-center shadow-xs">
                    Wake Up
                  </div>
                ))}
              </div>

              {/* 10 AM - Exercise */}
              <div className="grid grid-cols-8 gap-3 items-center">
                <div className="text-xs font-bold text-slate-400 text-center">10 AM</div>
                {days.map((_, i) => (
                  <div key={i} className="bg-cyan-100/70 border border-cyan-200/80 text-cyan-800 text-xs font-bold py-2 px-2 rounded-xl text-center shadow-xs">
                    Exercise
                  </div>
                ))}
              </div>

              {/* 12 PM - Lunch */}
              <div className="grid grid-cols-8 gap-3 items-center">
                <div className="text-xs font-bold text-slate-400 text-center">12 PM</div>
                {days.map((_, i) => (
                  <div key={i} className="bg-amber-100/70 border border-amber-200/80 text-amber-800 text-xs font-bold py-2 px-2 rounded-xl text-center shadow-xs">
                    Lunch
                  </div>
                ))}
              </div>

              {/* 2 PM - 10 PM Work Block */}
              <div className="grid grid-cols-8 gap-3 items-stretch">
                <div className="flex flex-col justify-between py-4 text-xs font-bold text-slate-400 text-center">
                  <span>2 PM</span>
                  <span>4 PM</span>
                  <span>6 PM</span>
                  <span>8 PM</span>
                </div>
                {days.map((_, i) => (
                  <div 
                    key={i} 
                    className="bg-rose-100/70 border border-rose-200/80 text-rose-800 text-xs font-bold py-16 px-2 rounded-2xl flex flex-col items-center justify-center shadow-xs transition-transform hover:scale-[1.02] cursor-pointer"
                  >
                    <span className="font-extrabold text-sm mb-1">Work</span>
                    <span className="text-[10px] text-rose-600 opacity-90">2:00 - 10:00 PM</span>
                  </div>
                ))}
              </div>

              {/* 10 PM - 12 AM Editing Block */}
              <div className="grid grid-cols-8 gap-3 items-stretch">
                <div className="flex flex-col justify-between py-2 text-xs font-bold text-slate-400 text-center">
                  <span>10 PM</span>
                  <span>12 AM</span>
                </div>
                {days.map((_, i) => (
                  <div 
                    key={i} 
                    onClick={() => {
                      const editTask = tasks.find(t => t.title.toLowerCase().includes('video editing'));
                      if (editTask) onStartFocus(editTask);
                    }}
                    className={`border text-xs font-bold py-6 px-2 rounded-2xl flex flex-col items-center justify-center shadow-xs transition-transform hover:scale-[1.02] cursor-pointer ${
                      i === 3 
                        ? 'bg-purple-200/80 border-purple-400 text-purple-900 ring-2 ring-purple-300' 
                        : 'bg-purple-100/70 border-purple-200/80 text-purple-800'
                    }`}
                  >
                    <span className="font-black">Editing</span>
                    <span className="text-[10px] text-purple-700 opacity-90">Practice</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Today View Mode (Detailed card schedule list) */}
      {viewMode === 'today' && (
        <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-indigo-50 shadow-xs">
          {/* Day Navigator */}
          <div className="flex justify-between items-center mb-7">
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100">
                <ChevronLeft size={18} />
              </button>
              <h3 className="text-lg font-black text-slate-900 tracking-tight">
                Thu, Sep 25, 2026
              </h3>
              <button className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100">
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">
                {tasks.filter(t => t.completed).length} of {tasks.length} done
              </span>
            </div>
          </div>

          {/* Timeline Cards */}
          <div className="relative pl-6 sm:pl-8 space-y-4">
            <div className="absolute left-[13px] sm:left-[17px] top-3 bottom-5 w-0.5 bg-slate-100" />

            {tasks.map((task) => {
              const isNow = task.id === '4' || task.title.toLowerCase().includes('video editing');
              return (
                <div
                  key={task.id}
                  className={`relative flex items-center justify-between p-4 rounded-2xl transition-all ${
                    isNow 
                      ? 'bg-indigo-50/80 ring-2 ring-indigo-200' 
                      : 'hover:bg-slate-50'
                  }`}
                >
                  {/* Status Circle */}
                  <div className="absolute -left-[27px] sm:-left-[31px]">
                    <button
                      onClick={() => onToggleTask(task.id)}
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${
                        task.completed
                          ? 'bg-emerald-500 text-white shadow-md'
                          : isNow
                          ? 'bg-indigo-600 text-white ring-4 ring-indigo-100'
                          : 'bg-white border-2 border-slate-200 text-slate-300'
                      }`}
                    >
                      {task.completed ? <Check size={16} strokeWidth={3} /> : null}
                    </button>
                  </div>

                  <div className="flex-1 pr-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-slate-400 w-24">
                        {task.start} – {task.end}
                      </span>
                      <h4 className={`text-sm sm:text-base font-bold ${task.completed ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
                        {task.icon && <span className="mr-2">{task.icon}</span>}
                        {task.title}
                      </h4>
                      {isNow && (
                        <span className="px-2 py-0.5 bg-indigo-600 text-white text-[10px] font-extrabold rounded-md uppercase">
                          Active Now
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onStartFocus(task)}
                      className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-xl transition-colors"
                      title="Focus on this task"
                    >
                      <Play size={16} fill="currentColor" />
                    </button>
                    <button
                      onClick={() => onToggleTask(task.id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        task.completed 
                          ? 'border-emerald-500 bg-emerald-500 text-white' 
                          : 'border-slate-300'
                      }`}
                    >
                      {task.completed && <Check size={12} strokeWidth={3} />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Calendar Month View */}
      {viewMode === 'calendar' && (
        <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-indigo-50 shadow-xs">
          <div className="text-center mb-6">
            <h3 className="text-xl font-black text-slate-900">September 2026</h3>
            <p className="text-xs text-slate-400 font-semibold mt-1">Consistency Calendar</p>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 mb-2">
            <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 30 }).map((_, i) => {
              const dayNum = i + 1;
              const isToday = dayNum === 25;
              const isPast = dayNum < 25;
              return (
                <div
                  key={i}
                  className={`p-3 sm:p-4 rounded-2xl flex flex-col items-center justify-between min-h-[70px] border transition-all ${
                    isToday
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100 scale-105'
                      : isPast
                      ? 'bg-emerald-50/60 border-emerald-100 text-slate-800'
                      : 'bg-slate-50 border-slate-100 text-slate-500'
                  }`}
                >
                  <span className={`text-xs font-black ${isToday ? 'text-white' : 'text-slate-800'}`}>
                    {dayNum}
                  </span>
                  {isPast && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  )}
                  {isToday && (
                    <span className="text-[9px] font-black uppercase tracking-wider bg-white/20 px-1 rounded">
                      Today
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
