import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Clock, 
  Plus, 
  Trash2, 
  Check, 
  Tag, 
  Calendar as CalendarIcon,
  Flag
} from 'lucide-react';
import { Task, CategoryType, Subtask } from '../types';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveTask: (task: Task) => void;
  initialTask?: Task | null;
}

export const AddTaskModal: React.FC<AddTaskModalProps> = ({
  isOpen,
  onClose,
  onSaveTask,
  initialTask
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState(initialTask?.title || '');
  const [category, setCategory] = useState<CategoryType>(initialTask?.category || 'Skill Development');
  const [start, setStart] = useState(initialTask?.start || '22:00');
  const [end, setEnd] = useState(initialTask?.end || '00:00');
  const [repeat, setRepeat] = useState<'Daily' | 'Weekdays' | 'Weekends' | 'Custom'>(
    initialTask?.repeat || 'Daily'
  );
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>(
    initialTask?.priority || 'High'
  );
  const [notes, setNotes] = useState(initialTask?.notes || '');
  const [subtasks, setSubtasks] = useState<Subtask[]>(
    initialTask?.subtasks || [
      { id: 'st1', title: 'Premiere Pro practice', completed: false },
      { id: 'st2', title: 'Learn one new technique', completed: false },
      { id: 'st3', title: "Save today's project", completed: false },
      { id: 'st4', title: 'Write what I learned', completed: false },
    ]
  );
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');

  const handleAddSubtask = () => {
    if (!newSubtaskTitle.trim()) return;
    setSubtasks([
      ...subtasks,
      { id: 'st-' + Date.now(), title: newSubtaskTitle.trim(), completed: false }
    ]);
    setNewSubtaskTitle('');
  };

  const handleToggleSubtask = (id: string) => {
    setSubtasks(subtasks.map(st => st.id === id ? { ...st, completed: !st.completed } : st));
  };

  const handleDeleteSubtask = (id: string) => {
    setSubtasks(subtasks.filter(st => st.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    // Pick icon based on category
    let icon = '📌';
    if (category === 'Video Editing' || category === 'Skill Development') icon = '🎬';
    else if (category === 'Work') icon = '💼';
    else if (category === 'Exercise') icon = '🏃';
    else if (category === 'Health') icon = '🥗';
    else if (category === 'Learning') icon = '💻';
    else if (category === 'Personal') icon = '☀️';

    const newTask: Task = {
      id: initialTask?.id || 't-' + Date.now(),
      title: title.trim(),
      category,
      start,
      end,
      repeat,
      priority,
      notes,
      subtasks,
      completed: initialTask?.completed || false,
      icon,
    };

    onSaveTask(newTask);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-[36px] shadow-2xl border border-indigo-50 p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative">
        
        {/* Header (matches mockup: "< Add New Task" & "[Save]") */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-6">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-slate-800 hover:text-indigo-600 font-black text-lg transition-colors"
          >
            <ChevronLeft size={22} className="text-slate-600" />
            <span>{initialTask ? 'Edit Task' : 'Add New Task'}</span>
          </button>

          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-2xl shadow-md shadow-indigo-200 transition-all hover:scale-105 active:scale-95"
          >
            Save
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Task Name */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Task Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Video Editing Practice"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all"
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as CategoryType)}
              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all cursor-pointer"
            >
              <option value="Skill Development">Skill Development</option>
              <option value="Video Editing">Video Editing</option>
              <option value="Work">Work</option>
              <option value="Learning">Learning</option>
              <option value="Exercise">Exercise</option>
              <option value="Health">Health</option>
              <option value="Personal">Personal</option>
              <option value="Creative">Creative</option>
            </select>
          </div>

          {/* Start Time & End Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Start Time
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  placeholder="10:00 PM"
                  className="w-full pl-4 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400"
                />
                <Clock size={18} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                End Time
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                  placeholder="12:00 AM"
                  className="w-full pl-4 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400"
                />
                <Clock size={18} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Repeat & Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Repeat
              </label>
              <select
                value={repeat}
                onChange={(e) => setRepeat(e.target.value as any)}
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 font-bold text-sm focus:outline-none focus:border-indigo-400 cursor-pointer"
              >
                <option value="Daily">Daily</option>
                <option value="Weekdays">Weekdays</option>
                <option value="Weekends">Weekends</option>
                <option value="Custom">Custom</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 font-bold text-sm focus:outline-none focus:border-indigo-400 cursor-pointer"
              >
                <option value="High">🔴 High</option>
                <option value="Medium">🟡 Medium</option>
                <option value="Low">🟢 Low</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Notes
            </label>
            <textarea
              rows={2}
              placeholder="Add notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium text-xs focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 resize-none"
            />
          </div>

          {/* Subtasks (Optional) as shown in mockup */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Subtasks (Optional)
            </label>

            <div className="space-y-2 mb-3">
              {subtasks.map((st) => (
                <div 
                  key={st.id} 
                  className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100 group"
                >
                  <div 
                    onClick={() => handleToggleSubtask(st.id)}
                    className="flex items-center gap-2.5 cursor-pointer flex-1"
                  >
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                      st.completed ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300'
                    }`}>
                      {st.completed && <Check size={11} strokeWidth={3} />}
                    </div>
                    <span className={`text-xs font-semibold ${
                      st.completed ? 'text-slate-400 line-through' : 'text-slate-800'
                    }`}>
                      {st.title}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteSubtask(st.id)}
                    className="text-slate-300 hover:text-rose-500 p-1 transition-colors"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Subtask Input */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="New subtask..."
                value={newSubtaskTitle}
                onChange={(e) => setNewSubtaskTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSubtask();
                  }
                }}
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-indigo-400"
              />
              <button
                type="button"
                onClick={handleAddSubtask}
                className="px-3 py-2 bg-slate-100 hover:bg-indigo-50 text-indigo-600 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors"
              >
                <Plus size={14} /> Add Subtask
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
