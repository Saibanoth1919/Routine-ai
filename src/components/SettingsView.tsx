import React, { useState } from 'react';
import { User, Bell, Moon, Volume2, RotateCcw, Check, Sparkles, Shield } from 'lucide-react';
import { UserAvatar } from '../utils/illustrations';

interface SettingsViewProps {
  userName: string;
  setUserName: (name: string) => void;
  onResetData: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  userName,
  setUserName,
  onResetData
}) => {
  const [nameInput, setNameInput] = useState(userName);
  const [wakeTime, setWakeTime] = useState('08:30');
  const [sleepTime, setSleepTime] = useState('01:00');
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setUserName(nameInput);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white p-6 sm:p-7 rounded-[32px] border border-indigo-50 shadow-xs flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Settings
          </h2>
          <p className="text-slate-400 text-xs font-semibold mt-0.5">
            Personalize your routine, sleep schedules, and preferences
          </p>
        </div>

        {savedToast && (
          <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-xl flex items-center gap-1.5 border border-emerald-100">
            <Check size={14} /> Saved!
          </span>
        )}
      </div>

      {/* Profile Card */}
      <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-[32px] border border-indigo-50 shadow-xs space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
          <UserAvatar className="w-16 h-16" />
          <div>
            <h3 className="text-lg font-black text-slate-900">{userName}</h3>
            <p className="text-xs font-bold text-indigo-600">Video Editor & Creator</p>
            <p className="text-xs text-slate-400 mt-0.5">saibanoth2006@gmail.com</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Display Name
            </label>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Focus Goal
            </label>
            <input
              type="text"
              defaultValue="Mastering Video Editing & YouTube Workflow"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold text-sm focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Target Wake Up Time
            </label>
            <input
              type="text"
              value={wakeTime}
              onChange={(e) => setWakeTime(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold text-sm focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Target Bed Time
            </label>
            <input
              type="text"
              value={sleepTime}
              onChange={(e) => setSleepTime(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold text-sm focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-2xl shadow-md shadow-indigo-200 transition-all hover:scale-105 active:scale-95"
          >
            Save Preferences
          </button>
        </div>
      </form>

      {/* Danger / Reset zone */}
      <div className="bg-white p-6 rounded-[32px] border border-rose-100 shadow-xs flex items-center justify-between">
        <div>
          <h4 className="text-sm font-black text-rose-950">Reset Routine Template</h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Restore the initial routine and habits from the original schedule
          </p>
        </div>

        <button
          onClick={onResetData}
          className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
        >
          <RotateCcw size={14} /> Reset Data
        </button>
      </div>
    </div>
  );
};
