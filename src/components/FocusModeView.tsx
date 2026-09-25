import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronDown, 
  RotateCcw, 
  Play, 
  Pause, 
  Square, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  Sparkles, 
  Music,
  CheckCircle2
} from 'lucide-react';
import { Task } from '../types';
import { FocusBoyIllustration } from '../utils/illustrations';
import { playAmbientSound, stopAmbientSound, setAmbientVolume, playCompletionChime } from '../utils/audio';
import confetti from 'canvas-confetti';

interface FocusModeViewProps {
  tasks: Task[];
  initialTask?: Task;
  onBack: () => void;
  onCompleteTask?: (taskId: string) => void;
}

export const FocusModeView: React.FC<FocusModeViewProps> = ({
  tasks,
  initialTask,
  onBack,
  onCompleteTask
}) => {
  // Selected task
  const [selectedTaskId, setSelectedTaskId] = useState<string>(
    initialTask?.id || tasks.find(t => t.title.toLowerCase().includes('video editing'))?.id || tasks[0]?.id || '1'
  );
  const [showTaskDropdown, setShowTaskDropdown] = useState(false);

  // Focus Timer States: default 1 hour 24 minutes 32 seconds as shown in mockup, or Pomodoro presets
  const [totalSeconds, setTotalSeconds] = useState(84 * 60 + 32); // 01:24:32 as in screenshot!
  const [remainingSeconds, setRemainingSeconds] = useState(84 * 60 + 32);
  const [isRunning, setIsRunning] = useState(false);

  // Soundscape settings
  const [activeSound, setActiveSound] = useState<'off' | 'rain' | 'forest' | 'cafe' | 'lofi'>('off');
  const [volume, setVolume] = useState(0.4);
  const [showSoundModal, setShowSoundModal] = useState(false);

  // Fullscreen state
  const [isFullscreen, setIsFullscreen] = useState(false);

  const selectedTask = tasks.find(t => t.id === selectedTaskId) || tasks[0];

  // Timer Tick
  useEffect(() => {
    let interval: any = null;
    if (isRunning && remainingSeconds > 0) {
      interval = setInterval(() => {
        setRemainingSeconds(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsRunning(false);
            playCompletionChime();
            confetti({ particleCount: 70, spread: 80, origin: { y: 0.5 } });
            if (selectedTask && onCompleteTask) {
              onCompleteTask(selectedTask.id);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, remainingSeconds, selectedTask, onCompleteTask]);

  // Handle ambient audio
  useEffect(() => {
    if (activeSound !== 'off' && isRunning) {
      playAmbientSound(activeSound, volume);
    } else {
      stopAmbientSound();
    }
    return () => stopAmbientSound();
  }, [activeSound, isRunning, volume]);

  const toggleSound = (sound: 'off' | 'rain' | 'forest' | 'cafe' | 'lofi') => {
    if (activeSound === sound) {
      setActiveSound('off');
      stopAmbientSound();
    } else {
      setActiveSound(sound);
      playAmbientSound(sound, volume);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setRemainingSeconds(totalSeconds);
  };

  const handleStop = () => {
    setIsRunning(false);
    if (selectedTask && onCompleteTask) {
      onCompleteTask(selectedTask.id);
      confetti({ particleCount: 50, spread: 60 });
    }
  };

  const handlePreset = (mins: number) => {
    setIsRunning(false);
    const secs = mins * 60;
    setTotalSeconds(secs);
    setRemainingSeconds(secs);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Time format: HH:MM:SS or MM:SS
  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Progress for Circular Dial
  const progressPercent = totalSeconds > 0 ? (totalSeconds - remainingSeconds) / totalSeconds : 0;
  const strokeDashoffset = 880 - (880 * progressPercent);

  return (
    <div className={`space-y-6 ${isFullscreen ? 'fixed inset-0 z-50 bg-[#F8F9FF] p-8 overflow-y-auto' : ''} animate-in fade-in duration-300`}>
      {/* Top Header Bar */}
      <div className="bg-white p-5 sm:p-6 rounded-[32px] border border-indigo-50 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-50 rounded-2xl transition-colors"
            title="Back to home"
          >
            <ChevronLeft size={22} />
          </button>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Focus Mode</h2>
        </div>

        <div className="flex items-center gap-2">
          {/* Ambient Music / Soundscape button */}
          <button
            onClick={() => setShowSoundModal(prev => !prev)}
            className={`p-2.5 rounded-2xl border transition-all ${
              activeSound !== 'off' 
                ? 'bg-indigo-50 border-indigo-300 text-indigo-600 shadow-xs' 
                : 'bg-white border-slate-200 text-slate-400 hover:text-slate-700'
            }`}
            title="Ambient Soundscapes"
          >
            <Music size={18} className={activeSound !== 'off' ? 'animate-pulse' : ''} />
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="p-2.5 bg-white border border-slate-200 hover:border-indigo-300 text-slate-400 hover:text-indigo-600 rounded-2xl transition-all shadow-xs"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
        </div>
      </div>

      {/* Main Focus Area */}
      <div className="bg-white p-8 sm:p-12 rounded-[40px] border border-indigo-50 shadow-xs flex flex-col items-center text-center relative overflow-hidden">
        
        {/* Task Selector Dropdown (matches mockup "Video Editing Practice ⌵") */}
        <div className="relative mb-8 z-20">
          <button
            onClick={() => setShowTaskDropdown(prev => !prev)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-50/80 hover:bg-indigo-100/80 text-indigo-950 font-black rounded-2xl text-base sm:text-lg transition-all shadow-xs"
          >
            <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
              <Play size={12} fill="currentColor" />
            </div>
            <span>{selectedTask?.title || 'Video Editing Practice'}</span>
            <ChevronDown size={18} className="text-indigo-600" />
          </button>

          {showTaskDropdown && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-indigo-100 p-2 z-30">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 py-1 text-left">
                Select Task to Focus On
              </p>
              {tasks.map(task => (
                <button
                  key={task.id}
                  onClick={() => {
                    setSelectedTaskId(task.id);
                    setShowTaskDropdown(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-bold rounded-xl text-left transition-colors ${
                    task.id === selectedTaskId ? 'bg-indigo-50 text-indigo-600' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="truncate">{task.icon} {task.title}</span>
                  <span className="text-[10px] text-slate-400 shrink-0">{task.start}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Circular Timer Dial */}
        <div className="relative w-72 h-72 sm:w-88 sm:h-88 flex items-center justify-center mb-8">
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 320 320">
            {/* Background Track Circle */}
            <circle
              cx="160"
              cy="160"
              r="140"
              stroke="#F1F5F9"
              strokeWidth="12"
              fill="transparent"
            />
            {/* Gradient Arc */}
            <circle
              cx="160"
              cy="160"
              r="140"
              stroke="url(#focusGradient)"
              strokeWidth="14"
              strokeDasharray="880"
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-linear"
            />
            <defs>
              <linearGradient id="focusGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#818CF8" />
                <stop offset="50%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#A855F7" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center Digital Time & Subtitle & Boy Character (matching mockup) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 select-none pointer-events-none">
            <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tighter tabular-nums mb-1">
              {formatTime(remainingSeconds)}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Focus Time
            </span>

            {/* Boy character illustration at desk */}
            <div className="w-36 h-28 sm:w-44 sm:h-32 mt-1">
              <FocusBoyIllustration className="w-full h-full" />
            </div>
          </div>
        </div>

        {/* Controls: Reset, Play/Pause, Stop */}
        <div className="flex items-center gap-6 mb-10">
          {/* Reset */}
          <button
            onClick={handleReset}
            className="w-14 h-14 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
            title="Reset Timer"
          >
            <RotateCcw size={22} />
          </button>

          {/* Big Purple Play / Pause */}
          <button
            onClick={() => setIsRunning(prev => !prev)}
            className="w-20 h-20 rounded-[28px] bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white flex items-center justify-center shadow-xl shadow-indigo-200 hover:scale-105 active:scale-95 transition-all"
            title={isRunning ? "Pause" : "Start"}
          >
            {isRunning ? (
              <Pause size={34} fill="white" />
            ) : (
              <Play size={34} fill="white" className="ml-1" />
            )}
          </button>

          {/* Stop / Complete */}
          <button
            onClick={handleStop}
            className="w-14 h-14 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
            title="Finish & Save Session"
          >
            <Square size={22} fill="currentColor" />
          </button>
        </div>

        {/* Bottom Presets & White Noise bar (matching mockup bottom right) */}
        <div className="flex flex-wrap items-center justify-center gap-4 w-full max-w-md">
          {/* Pomodoro Presets */}
          <button
            onClick={() => handlePreset(25)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-50 hover:bg-indigo-50 border border-slate-100 text-xs font-bold text-slate-700 hover:text-indigo-600 transition-all shadow-xs"
          >
            <span>🍅</span>
            <span>Pomodoro (25m)</span>
          </button>

          {/* White Noise Toggle */}
          <button
            onClick={() => setShowSoundModal(prev => !prev)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-xs font-bold transition-all shadow-xs ${
              activeSound !== 'off'
                ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                : 'bg-slate-50 hover:bg-indigo-50 border-slate-100 text-slate-700 hover:text-indigo-600'
            }`}
          >
            <Music size={14} />
            <span>White Noise {activeSound !== 'off' ? `(${activeSound})` : ''}</span>
          </button>

          {/* Full Screen */}
          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-50 hover:bg-indigo-50 border border-slate-100 text-xs font-bold text-slate-700 hover:text-indigo-600 transition-all shadow-xs"
          >
            <Maximize2 size={14} />
            <span>Full Screen</span>
          </button>
        </div>

        {/* White Noise Selector Modal / Popover */}
        {showSoundModal && (
          <div className="mt-6 p-5 bg-indigo-50/70 border border-indigo-100 rounded-3xl max-w-sm w-full animate-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-900">
                Ambient Soundscape
              </span>
              <button 
                onClick={() => setShowSoundModal(false)}
                className="text-xs font-bold text-indigo-600 hover:underline"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2 mb-4">
              {[
                { id: 'rain', label: 'Rain', icon: '🌧️' },
                { id: 'forest', label: 'Forest', icon: '🌲' },
                { id: 'cafe', label: 'Cafe', icon: '☕' },
                { id: 'lofi', label: 'Lo-Fi', icon: '🎧' },
              ].map(s => (
                <button
                  key={s.id}
                  onClick={() => toggleSound(s.id as any)}
                  className={`p-3 rounded-2xl flex flex-col items-center justify-center transition-all ${
                    activeSound === s.id
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-white text-slate-700 hover:bg-indigo-100'
                  }`}
                >
                  <span className="text-lg">{s.icon}</span>
                  <span className="text-[10px] font-bold mt-1">{s.label}</span>
                </button>
              ))}
            </div>

            {/* Volume Slider */}
            <div className="flex items-center gap-3">
              <Volume2 size={16} className="text-indigo-600" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setVolume(val);
                  setAmbientVolume(val);
                }}
                className="w-full accent-indigo-600"
              />
              <span className="text-xs font-bold text-indigo-700 w-8">
                {Math.round(volume * 100)}%
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
