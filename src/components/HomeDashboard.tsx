import React, { useState } from 'react';
import { 
  Play, 
  Check, 
  Clock, 
  Plus, 
  Focus, 
  Sparkles, 
  Calendar as CalendarIcon, 
  FileText, 
  ChevronRight,
  MoreVertical,
  CheckCircle2
} from 'lucide-react';
import { Task, NavTab } from '../types';
import { CuteMascotIllustration } from '../utils/illustrations';
import confetti from 'canvas-confetti';

interface HomeDashboardProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onOpenAddTask: () => void;
  onStartFocus: (task?: Task) => void;
  setActiveTab: (tab: NavTab) => void;
  onQuickAction: (action: string) => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  tasks,
  onToggleTask,
  onOpenAddTask,
  onStartFocus,
  setActiveTab,
  onQuickAction
}) => {
  // Focus items checklist
  const [focusList, setFocusList] = useState([
    { id: 'f1', text: 'Stay consistent with routine', done: true },
    { id: 'f2', text: 'Complete editing practice', done: true },
    { id: 'f3', text: 'Be productive at work', done: false },
    { id: 'f4', text: 'Take breaks and stay healthy', done: false },
  ]);
  const [newFocusText, setNewFocusText] = useState('');
  const [showAddFocusInput, setShowAddFocusInput] = useState(false);

  // Calculate metrics
  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Find Current active task (or default to Video Editing Practice)
  const currentTask = tasks.find(t => t.id === '4' || t.title.toLowerCase().includes('video editing')) || tasks[3] || tasks[0];

  const handleToggleFocusItem = (id: string) => {
    setFocusList(prev => prev.map(item => {
      if (item.id === id) {
        const nextState = !item.done;
        if (nextState) {
          confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
        }
        return { ...item, done: nextState };
      }
      return item;
    }));
  };

  const handleAddFocusItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFocusText.trim()) return;
    setFocusList(prev => [...prev, { id: 'f-' + Date.now(), text: newFocusText.trim(), done: false }]);
    setNewFocusText('');
    setShowAddFocusInput(false);
  };

  const handleTaskCheckbox = (task: Task) => {
    onToggleTask(task.id);
    if (!task.completed) {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left / Main Column (Timeline & Progress) */}
        <div className="lg:col-span-7 space-y-7">
          
          {/* Today's Progress Card */}
          <div className="bg-white p-6 sm:p-7 rounded-[32px] border border-indigo-50 shadow-xs">
            <div className="flex justify-between items-end mb-3.5">
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                  Today's Progress
                </p>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="text-3xl font-black text-slate-900">{completedCount}</span>
                  <span className="text-slate-400 text-lg font-bold">/ {totalCount}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-indigo-600 font-black text-2xl tracking-tight">
                  {percentage}%
                </span>
                <p className="text-[11px] font-semibold text-slate-400">
                  {completedCount >= 5 ? 'Great momentum! 🚀' : 'Keep pushing forward'}
                </p>
              </div>
            </div>
            {/* Progress Track */}
            <div className="h-3.5 w-full bg-indigo-50/80 rounded-full overflow-hidden p-0.5">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 rounded-full transition-all duration-500 ease-out shadow-xs"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Today's Routine Card (matches mockup exactly) */}
          <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-indigo-50 shadow-xs relative">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2.5">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">
                  Today's Routine
                </h3>
                <span className="px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider rounded-full bg-indigo-100/70 text-indigo-700">
                  {tasks.length} tasks
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-xl flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" /> Now
                </span>
                <button 
                  onClick={() => setActiveTab('schedule')}
                  className="text-slate-400 hover:text-indigo-600 text-xs font-bold p-1 transition-colors"
                  title="View full schedule"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Timeline Stream */}
            <div className="relative pl-6 sm:pl-8 space-y-4">
              {/* Vertical Connecting Line */}
              <div className="absolute left-[13px] sm:left-[17px] top-3 bottom-5 w-0.5 bg-slate-100" />

              {tasks.map((task) => {
                const isNow = task.id === '4' || task.title.toLowerCase().includes('video editing');
                const isWork = task.category === 'Work';

                return (
                  <div
                    key={task.id}
                    className={`relative flex items-center justify-between p-3.5 sm:p-4 rounded-2xl transition-all duration-200 group ${
                      isNow 
                        ? 'bg-indigo-50/70 ring-1 ring-indigo-200/80 shadow-xs' 
                        : 'hover:bg-slate-50/80'
                    }`}
                  >
                    {/* Node Dot / Status on Timeline */}
                    <div className="absolute -left-[27px] sm:-left-[31px] z-10">
                      <button
                        onClick={() => handleTaskCheckbox(task)}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${
                          task.completed
                            ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200 scale-105'
                            : isNow
                            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 ring-4 ring-indigo-100 animate-pulse'
                            : 'bg-white border-2 border-slate-200 text-slate-300 hover:border-indigo-400'
                        }`}
                        title={task.completed ? "Mark incomplete" : "Mark completed"}
                      >
                        {task.completed ? (
                          <Check size={16} strokeWidth={3} />
                        ) : isNow ? (
                          <Clock size={15} strokeWidth={2.5} />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-slate-300" />
                        )}
                      </button>
                    </div>

                    {/* Task Content */}
                    <div className="flex-1 min-w-0 pr-3">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Time range */}
                        <span className="text-xs font-bold text-slate-400 tracking-tight shrink-0">
                          {task.start} – {task.end}
                        </span>

                        {/* Title with emoji icon */}
                        <h4 className={`text-sm sm:text-base font-bold truncate transition-colors ${
                          task.completed 
                            ? 'text-slate-400 line-through' 
                            : isNow 
                            ? 'text-indigo-950 font-black' 
                            : 'text-slate-800'
                        }`}>
                          {task.icon && <span className="mr-1.5">{task.icon}</span>}
                          {task.title}
                        </h4>

                        {/* "Now" and "1h 15m left" badges */}
                        {isNow && (
                          <div className="flex items-center gap-1.5">
                            <span className="px-2 py-0.5 rounded-md bg-indigo-600 text-white text-[10px] font-extrabold uppercase tracking-wider">
                              Now
                            </span>
                            <span className="text-[11px] font-semibold text-indigo-500">
                              1h 15m left
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Category & Details */}
                      <div className="flex items-center gap-2.5 mt-1">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider ${
                          task.category === 'Work' 
                            ? 'bg-rose-50 text-rose-600'
                            : task.category === 'Exercise'
                            ? 'bg-amber-50 text-amber-600'
                            : task.category === 'Health'
                            ? 'bg-teal-50 text-teal-600'
                            : task.category === 'Video Editing'
                            ? 'bg-purple-50 text-purple-600'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {task.category}
                        </span>

                        {task.priority === 'High' && (
                          <span className="text-[10px] font-bold text-rose-500 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> High Priority
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right Action / Radio Indicator */}
                    <div className="flex items-center gap-2 shrink-0">
                      {isNow && (
                        <button
                          onClick={() => onStartFocus(task)}
                          className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all hover:scale-105"
                        >
                          <Play size={13} fill="currentColor" /> Focus
                        </button>
                      )}

                      <button
                        onClick={() => handleTaskCheckbox(task)}
                        className={`w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center ${
                          task.completed
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-600'
                            : isNow
                            ? 'border-indigo-400 text-transparent hover:border-indigo-600'
                            : 'border-slate-200 text-transparent hover:border-indigo-300'
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
        </div>

        {/* Right Column (Current Task + Quick Actions + Today's Focus + Mascot) */}
        <div className="lg:col-span-5 space-y-7">
          
          {/* Current Task Highlight Card (Top Right in image) */}
          <div className="bg-white p-6 sm:p-7 rounded-[32px] border border-indigo-50 shadow-xs relative overflow-hidden group">
            {/* Top label */}
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-4">
              Current Task
            </p>

            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-md shadow-indigo-100">
                  <Play size={20} fill="currentColor" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight leading-snug">
                    {currentTask.title}
                  </h3>
                  <p className="text-slate-500 text-xs font-semibold mt-0.5">
                    10:00 AM – 12:00 PM
                  </p>
                </div>
              </div>

              {/* Big Purple Play Button */}
              <button
                onClick={() => onStartFocus(currentTask)}
                className="w-13 h-13 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-lg shadow-indigo-200 hover:scale-105 active:scale-95 transition-all shrink-0"
                title="Enter Focus Mode"
              >
                <Play size={22} fill="white" className="ml-0.5" />
              </button>
            </div>

            {/* Time progress bar */}
            <div className="space-y-1.5 mb-5">
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full w-2/3" />
              </div>
              <div className="flex justify-end">
                <span className="text-xs font-bold text-slate-500">1h 15m left</span>
              </div>
            </div>

            {/* Tags (Skill Development & High Priority) */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700">
                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                Skill Development
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                High Priority
              </span>
            </div>
          </div>

          {/* Quick Actions (5 buttons as in screenshot) */}
          <div className="bg-white p-6 sm:p-7 rounded-[32px] border border-indigo-50 shadow-xs">
            <h4 className="text-base font-black text-slate-900 tracking-tight mb-4">
              Quick Actions
            </h4>
            
            <div className="grid grid-cols-5 gap-2.5 sm:gap-3">
              {/* Add Task */}
              <button 
                onClick={onOpenAddTask}
                className="flex flex-col items-center justify-center p-2.5 rounded-2xl hover:bg-slate-50 transition-all group"
              >
                <div className="w-11 h-11 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-md shadow-indigo-100 group-hover:scale-105 transition-transform mb-1.5">
                  <Plus size={20} strokeWidth={2.5} />
                </div>
                <span className="text-[11px] font-bold text-slate-700 text-center leading-tight">
                  Add Task
                </span>
              </button>

              {/* Focus Mode */}
              <button 
                onClick={() => onStartFocus(currentTask)}
                className="flex flex-col items-center justify-center p-2.5 rounded-2xl hover:bg-slate-50 transition-all group"
              >
                <div className="w-11 h-11 bg-rose-500 text-white rounded-2xl flex items-center justify-center shadow-md shadow-rose-100 group-hover:scale-105 transition-transform mb-1.5">
                  <Focus size={20} strokeWidth={2.5} />
                </div>
                <span className="text-[11px] font-bold text-slate-700 text-center leading-tight">
                  Focus Mode
                </span>
              </button>

              {/* AI Plan */}
              <button 
                onClick={() => onQuickAction('ai_plan')}
                className="flex flex-col items-center justify-center p-2.5 rounded-2xl hover:bg-slate-50 transition-all group"
              >
                <div className="w-11 h-11 bg-sky-500 text-white rounded-2xl flex items-center justify-center shadow-md shadow-sky-100 group-hover:scale-105 transition-transform mb-1.5">
                  <Sparkles size={20} strokeWidth={2.5} />
                </div>
                <span className="text-[11px] font-bold text-slate-700 text-center leading-tight">
                  AI Plan
                </span>
              </button>

              {/* Reschedule */}
              <button 
                onClick={() => setActiveTab('schedule')}
                className="flex flex-col items-center justify-center p-2.5 rounded-2xl hover:bg-slate-50 transition-all group"
              >
                <div className="w-11 h-11 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-md shadow-emerald-100 group-hover:scale-105 transition-transform mb-1.5">
                  <CalendarIcon size={20} strokeWidth={2.5} />
                </div>
                <span className="text-[11px] font-bold text-slate-700 text-center leading-tight">
                  Reschedule
                </span>
              </button>

              {/* Notes */}
              <button 
                onClick={() => onQuickAction('notes')}
                className="flex flex-col items-center justify-center p-2.5 rounded-2xl hover:bg-slate-50 transition-all group"
              >
                <div className="w-11 h-11 bg-amber-500 text-white rounded-2xl flex items-center justify-center shadow-md shadow-amber-100 group-hover:scale-105 transition-transform mb-1.5">
                  <FileText size={20} strokeWidth={2.5} />
                </div>
                <span className="text-[11px] font-bold text-slate-700 text-center leading-tight">
                  Notes
                </span>
              </button>
            </div>
          </div>

          {/* Today's Focus Checklist */}
          <div className="bg-white p-6 sm:p-7 rounded-[32px] border border-indigo-50 shadow-xs">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-base font-black text-slate-900 tracking-tight">
                Today's Focus
              </h4>
              <button 
                onClick={() => setShowAddFocusInput(prev => !prev)}
                className="p-1 text-slate-400 hover:text-indigo-600 transition-colors"
                title="Add focus item"
              >
                <Plus size={16} />
              </button>
            </div>

            {showAddFocusInput && (
              <form onSubmit={handleAddFocusItem} className="mb-3 flex gap-2">
                <input
                  type="text"
                  placeholder="New focus goal..."
                  value={newFocusText}
                  onChange={(e) => setNewFocusText(e.target.value)}
                  className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-indigo-400"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  Add
                </button>
              </form>
            )}

            <div className="space-y-2.5">
              {focusList.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => handleToggleFocusItem(item.id)}
                  className="flex items-center gap-3 cursor-pointer group select-none"
                >
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                    item.done 
                      ? 'bg-emerald-500 text-white shadow-xs' 
                      : 'border-2 border-slate-200 group-hover:border-indigo-400'
                  }`}>
                    {item.done && <Check size={13} strokeWidth={3} />}
                  </div>
                  <span className={`text-xs sm:text-sm font-semibold transition-colors ${
                    item.done ? 'text-slate-400 line-through' : 'text-slate-700'
                  }`}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* "You're doing great! Keep going." Card with Cute Mascot */}
          <div className="bg-gradient-to-br from-amber-50/70 via-orange-50/50 to-emerald-50/50 p-6 rounded-[32px] border border-amber-100/70 shadow-xs flex items-center justify-between gap-4">
            <div>
              <h4 className="text-base font-black text-slate-900 tracking-tight leading-snug">
                You're doing great!
              </h4>
              <p className="text-xs font-bold text-amber-700 mt-0.5">
                Keep going.
              </p>
              <div className="flex items-center gap-1 mt-2 text-[11px] font-semibold text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>6-day routine streak active</span>
              </div>
            </div>

            <div className="w-24 h-20 shrink-0">
              <CuteMascotIllustration className="w-full h-full" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
