import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Calendar, 
  Plus, 
  Focus, 
  Sparkles, 
  CheckSquare, 
  Activity, 
  BarChart2, 
  Settings,
  X,
  Bell
} from 'lucide-react';
import { Task, Habit, NavTab } from './types';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { HomeDashboard } from './components/HomeDashboard';
import { ScheduleView } from './components/ScheduleView';
import { FocusModeView } from './components/FocusModeView';
import { AddTaskModal } from './components/AddTaskModal';
import { AIAssistantView } from './components/AIAssistantView';
import { InsightsView } from './components/InsightsView';
import { HabitsView } from './components/HabitsView';
import { TasksView } from './components/TasksView';
import { SettingsView } from './components/SettingsView';
import confetti from 'canvas-confetti';

const INITIAL_ROUTINE: Task[] = [
  { id: '1', title: 'Wake Up & Freshen Up', start: '08:30', end: '09:00', category: 'Personal', completed: true, icon: '☀️' },
  { id: '2', title: 'Breakfast', start: '09:00', end: '09:30', category: 'Health', completed: true, icon: '🍳' },
  { id: '3', title: 'Exercise / Walk', start: '09:30', end: '10:30', category: 'Exercise', completed: true, icon: '🏃' },
  { id: '4', title: 'Video Editing Practice', start: '10:00', end: '12:00', category: 'Skill Development', completed: false, icon: '🎬', priority: 'High', notes: 'Complete YouTube timeline scene cuts and sound design.' },
  { id: '5', title: 'Lunch & Break', start: '12:00', end: '13:00', category: 'Health', completed: false, icon: '🍱' },
  { id: '6', title: 'Get Ready for Work', start: '13:00', end: '14:00', category: 'Personal', completed: false, icon: '🎒' },
  { id: '7', title: 'Part-time Work', start: '14:00', end: '22:00', category: 'Work', completed: false, icon: '💼', priority: 'High' },
  { id: '8', title: 'Video Editing Practice', start: '22:00', end: '00:00', category: 'Video Editing', completed: false, icon: '🎬', priority: 'High' },
  { id: '9', title: 'Wind Down & Sleep', start: '00:00', end: '01:00', category: 'Personal', completed: false, icon: '🌙' },
];

const INITIAL_HABITS: Habit[] = [
  { id: 'h1', name: 'Exercise & Walk', category: 'Exercise', streak: 6, history: [true, true, true, false, true, true, true], icon: '🏃' },
  { id: 'h2', name: 'Video Editing Practice', category: 'Video Editing', streak: 4, history: [true, true, true, true, false, false, true], icon: '🎬' },
  { id: 'h3', name: 'Consistent Sleep (8h)', category: 'Health', streak: 12, history: [true, true, true, true, true, true, true], icon: '😴' },
  { id: 'h4', name: 'Hydration (2.5L)', category: 'Health', streak: 8, history: [true, true, true, true, true, true, false], icon: '💧' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [userName, setUserName] = useState('Sai');
  const [searchQuery, setSearchQuery] = useState('');

  // Persistent Routine Tasks
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem('myroutine_tasks_v2');
      return saved ? JSON.parse(saved) : INITIAL_ROUTINE;
    } catch {
      return INITIAL_ROUTINE;
    }
  });

  // Persistent Habits
  const [habits, setHabits] = useState<Habit[]>(() => {
    try {
      const saved = localStorage.getItem('myroutine_habits_v2');
      return saved ? JSON.parse(saved) : INITIAL_HABITS;
    } catch {
      return INITIAL_HABITS;
    }
  });

  // Modal / Focus States
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [focusSelectedTask, setFocusSelectedTask] = useState<Task | undefined>(undefined);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem('myroutine_tasks_v2', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('myroutine_habits_v2', JSON.stringify(habits));
  }, [habits]);

  // Actions
  const handleToggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleSaveTask = (taskToSave: Task) => {
    setTasks(prev => {
      const exists = prev.some(t => t.id === taskToSave.id);
      if (exists) {
        return prev.map(t => t.id === taskToSave.id ? taskToSave : t);
      }
      return [...prev, taskToSave];
    });
    setEditingTask(null);
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const handleStartFocus = (task?: Task) => {
    setFocusSelectedTask(task || tasks[3]);
    setActiveTab('focus');
  };

  const handleQuickAction = (action: string) => {
    if (action === 'ai_plan') {
      setActiveTab('ai');
    } else if (action === 'notes') {
      setActiveTab('tasks');
    }
  };

  const handleResetData = () => {
    setTasks(INITIAL_ROUTINE);
    setHabits(INITIAL_HABITS);
    confetti({ particleCount: 35, spread: 50 });
  };

  // Filter tasks if search is active
  const displayedTasks = searchQuery.trim()
    ? tasks.filter(t => 
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        t.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : tasks;

  return (
    <div className="min-h-screen bg-[#F8F9FF] text-[#1E1B4B] flex flex-col md:flex-row antialiased selection:bg-indigo-100 selection:text-indigo-800">
      
      {/* Desktop Left Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-12">
        <div className="w-full max-w-7xl mx-auto p-4 sm:p-8 lg:p-10 space-y-8">
          
          {/* Header visible on home and schedule */}
          {['home', 'schedule'].includes(activeTab) && (
            <Header 
              onOpenNotifications={() => setShowNotificationsModal(true)}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              userName={userName}
            />
          )}

          {/* View Routing */}
          <main>
            {activeTab === 'home' && (
              <HomeDashboard
                tasks={displayedTasks}
                onToggleTask={handleToggleTask}
                onOpenAddTask={() => {
                  setEditingTask(null);
                  setIsAddTaskOpen(true);
                }}
                onStartFocus={handleStartFocus}
                setActiveTab={setActiveTab}
                onQuickAction={handleQuickAction}
              />
            )}

            {activeTab === 'schedule' && (
              <ScheduleView
                tasks={displayedTasks}
                onToggleTask={handleToggleTask}
                onOpenAddTask={() => {
                  setEditingTask(null);
                  setIsAddTaskOpen(true);
                }}
                onStartFocus={handleStartFocus}
              />
            )}

            {activeTab === 'tasks' && (
              <TasksView
                tasks={displayedTasks}
                onToggleTask={handleToggleTask}
                onOpenAddTask={() => {
                  setEditingTask(null);
                  setIsAddTaskOpen(true);
                }}
                onEditTask={(task) => {
                  setEditingTask(task);
                  setIsAddTaskOpen(true);
                }}
                onDeleteTask={handleDeleteTask}
                onStartFocus={handleStartFocus}
              />
            )}

            {activeTab === 'habits' && (
              <HabitsView
                habits={habits}
                onToggleHabitDay={(habitId, dayIdx) => {
                  setHabits(prev => prev.map(h => {
                    if (h.id === habitId) {
                      const updatedHistory = [...h.history];
                      updatedHistory[dayIdx] = !updatedHistory[dayIdx];
                      const newStreak = updatedHistory.filter(Boolean).length;
                      return { ...h, history: updatedHistory, streak: newStreak };
                    }
                    return h;
                  }));
                }}
                onAddHabit={(newHabit) => setHabits(prev => [...prev, newHabit])}
                onDeleteHabit={(habitId) => setHabits(prev => prev.filter(h => h.id !== habitId))}
              />
            )}

            {activeTab === 'focus' && (
              <FocusModeView
                tasks={tasks}
                initialTask={focusSelectedTask}
                onBack={() => setActiveTab('home')}
                onCompleteTask={(taskId) => {
                  handleToggleTask(taskId);
                }}
              />
            )}

            {activeTab === 'insights' && (
              <InsightsView />
            )}

            {activeTab === 'ai' && (
              <AIAssistantView
                tasks={tasks}
                habits={habits}
                onApplyScheduleUpdates={(updated) => {
                  setTasks(updated);
                  confetti({ particleCount: 50, spread: 60 });
                }}
                onBack={() => setActiveTab('home')}
              />
            )}

            {activeTab === 'settings' && (
              <SettingsView
                userName={userName}
                setUserName={setUserName}
                onResetData={handleResetData}
              />
            )}
          </main>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-100 px-6 py-2.5 flex justify-between items-center z-40 shadow-lg">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center p-1 ${activeTab === 'home' ? 'text-indigo-600' : 'text-slate-400'}`}
        >
          <Home size={22} />
          <span className="text-[10px] font-bold mt-0.5">Home</span>
        </button>

        <button
          onClick={() => setActiveTab('schedule')}
          className={`flex flex-col items-center p-1 ${activeTab === 'schedule' ? 'text-indigo-600' : 'text-slate-400'}`}
        >
          <Calendar size={22} />
          <span className="text-[10px] font-bold mt-0.5">Schedule</span>
        </button>

        {/* Center Floating Add Task Button */}
        <button
          onClick={() => {
            setEditingTask(null);
            setIsAddTaskOpen(true);
          }}
          className="w-12 h-12 bg-gradient-to-tr from-indigo-600 to-purple-600 text-white rounded-2xl flex items-center justify-center -mt-6 shadow-lg shadow-indigo-300 active:scale-95 transition-transform"
        >
          <Plus size={26} strokeWidth={2.5} />
        </button>

        <button
          onClick={() => setActiveTab('focus')}
          className={`flex flex-col items-center p-1 ${activeTab === 'focus' ? 'text-indigo-600' : 'text-slate-400'}`}
        >
          <Focus size={22} />
          <span className="text-[10px] font-bold mt-0.5">Focus</span>
        </button>

        <button
          onClick={() => setActiveTab('ai')}
          className={`flex flex-col items-center p-1 ${activeTab === 'ai' ? 'text-indigo-600' : 'text-slate-400'}`}
        >
          <Sparkles size={22} />
          <span className="text-[10px] font-bold mt-0.5">AI</span>
        </button>
      </div>

      {/* Add / Edit Task Modal */}
      <AddTaskModal
        isOpen={isAddTaskOpen}
        onClose={() => {
          setIsAddTaskOpen(false);
          setEditingTask(null);
        }}
        onSaveTask={handleSaveTask}
        initialTask={editingTask}
      />

      {/* Notifications Modal */}
      {showNotificationsModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] p-6 max-w-sm w-full shadow-2xl border border-indigo-50 animate-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Bell size={18} className="text-indigo-600" />
                <h4 className="text-base font-black text-slate-900">Notifications</h4>
              </div>
              <button 
                onClick={() => setShowNotificationsModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-indigo-50/70 rounded-2xl border border-indigo-100/80">
                <p className="text-xs font-bold text-indigo-950">Next session in 15 mins</p>
                <p className="text-[11px] text-indigo-700/80 mt-0.5">Video Editing Practice starts at 10:00 PM.</p>
              </div>
              <div className="p-3 bg-emerald-50/70 rounded-2xl border border-emerald-100/80">
                <p className="text-xs font-bold text-emerald-950">6-Day Streak active!</p>
                <p className="text-[11px] text-emerald-700/80 mt-0.5">Keep up the consistency today.</p>
              </div>
            </div>

            <button
              onClick={() => setShowNotificationsModal(false)}
              className="w-full mt-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
