import React, { useState } from 'react';
import { Activity, Flame, Plus, Check, Award, Sparkles, Trash2 } from 'lucide-react';
import { Habit, CategoryType } from '../types';
import confetti from 'canvas-confetti';

interface HabitsViewProps {
  habits: Habit[];
  onToggleHabitDay: (habitId: string, dayIndex: number) => void;
  onAddHabit: (newHabit: Habit) => void;
  onDeleteHabit: (habitId: string) => void;
}

export const HabitsView: React.FC<HabitsViewProps> = ({
  habits,
  onToggleHabitDay,
  onAddHabit,
  onDeleteHabit
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [habitName, setHabitName] = useState('');
  const [habitCategory, setHabitCategory] = useState<CategoryType>('Exercise');
  const [habitGoal, setHabitGoal] = useState('Daily');

  const daysLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!habitName.trim()) return;

    let icon = '⚡';
    if (habitCategory === 'Exercise') icon = '🏃';
    else if (habitCategory === 'Video Editing') icon = '🎬';
    else if (habitCategory === 'Health') icon = '🥗';
    else if (habitCategory === 'Learning') icon = '📚';

    const newHabit: Habit = {
      id: 'h-' + Date.now(),
      name: habitName.trim(),
      category: habitCategory,
      streak: 1,
      history: [false, false, false, true, false, false, false],
      icon,
      goal: habitGoal,
    };

    onAddHabit(newHabit);
    setHabitName('');
    setShowAddForm(false);
    confetti({ particleCount: 40, spread: 50 });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white p-6 sm:p-7 rounded-[32px] border border-indigo-50 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            Habit Tracker
          </h2>
          <p className="text-slate-400 text-xs font-semibold mt-0.5">
            Build unshakeable daily momentum through consistent repetition
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(prev => !prev)}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-indigo-200 transition-all hover:scale-105 active:scale-95"
        >
          <Plus size={16} strokeWidth={3} />
          <span>Add Habit</span>
        </button>
      </div>

      {/* Add Habit Form Modal/Card */}
      {showAddForm && (
        <form onSubmit={handleCreate} className="bg-white p-6 rounded-[32px] border border-indigo-100 shadow-md space-y-4 animate-in zoom-in duration-200">
          <h4 className="text-base font-black text-slate-900">Create New Habit</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="e.g. 10m Meditation"
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-500"
              autoFocus
            />
            <select
              value={habitCategory}
              onChange={(e) => setHabitCategory(e.target.value as CategoryType)}
              className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none"
            >
              <option value="Exercise">Exercise</option>
              <option value="Video Editing">Video Editing</option>
              <option value="Health">Health</option>
              <option value="Learning">Learning</option>
              <option value="Personal">Personal</option>
            </select>
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2.5 bg-slate-100 text-slate-600 font-bold text-xs rounded-xl"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Habits List */}
      <div className="space-y-4">
        {habits.map((habit) => {
          return (
            <div
              key={habit.id}
              className="bg-white p-5 sm:p-6 rounded-[28px] border border-indigo-50 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              {/* Left Info */}
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl shadow-xs">
                  {habit.icon || '⚡'}
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">{habit.name}</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-slate-100 text-slate-600">
                      {habit.category}
                    </span>
                    <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                      <Flame size={14} fill="currentColor" /> {habit.streak} day streak
                    </span>
                  </div>
                </div>
              </div>

              {/* 7-Day Matrix */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                {habit.history.map((done, dayIdx) => (
                  <div key={dayIdx} className="flex flex-col items-center gap-1">
                    <span className="text-[10px] font-extrabold text-slate-400">
                      {daysLabels[dayIdx]}
                    </span>
                    <button
                      onClick={() => onToggleHabitDay(habit.id, dayIdx)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                        done
                          ? 'bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-xs scale-105'
                          : 'bg-slate-50 border-2 border-slate-200 text-transparent hover:border-indigo-400'
                      }`}
                    >
                      {done && <Check size={16} strokeWidth={3} />}
                    </button>
                  </div>
                ))}

                <button
                  onClick={() => onDeleteHabit(habit.id)}
                  className="p-2 text-slate-300 hover:text-rose-500 rounded-xl transition-colors ml-2"
                  title="Delete habit"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
