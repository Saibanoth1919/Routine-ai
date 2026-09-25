import React, { useState } from 'react';
import { 
  CheckSquare, 
  Plus, 
  Trash2, 
  Edit3, 
  Clock, 
  Check, 
  Play, 
  Filter,
  ChevronDown
} from 'lucide-react';
import { Task, CategoryType } from '../types';

interface TasksViewProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onOpenAddTask: () => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onStartFocus: (task: Task) => void;
}

export const TasksView: React.FC<TasksViewProps> = ({
  tasks,
  onToggleTask,
  onOpenAddTask,
  onEditTask,
  onDeleteTask,
  onStartFocus
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Completed' | 'Pending'>('All');

  const categories = ['All', 'Skill Development', 'Work', 'Health', 'Exercise', 'Personal', 'Learning'];

  const filteredTasks = tasks.filter(task => {
    if (filterCategory !== 'All' && task.category !== filterCategory) return false;
    if (filterStatus === 'Completed' && !task.completed) return false;
    if (filterStatus === 'Pending' && task.completed) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="bg-white p-6 sm:p-7 rounded-[32px] border border-indigo-50 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            Tasks & Subtasks
          </h2>
          <p className="text-slate-400 text-xs font-semibold mt-0.5">
            Manage your daily milestones and subtask checklists
          </p>
        </div>

        <button
          onClick={onOpenAddTask}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-indigo-200 transition-all hover:scale-105 active:scale-95"
        >
          <Plus size={16} strokeWidth={3} />
          <span>Add Task</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterCategory === cat
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/80'
            }`}
          >
            {cat}
          </button>
        ))}

        <div className="ml-auto flex items-center gap-2">
          {(['All', 'Pending', 'Completed'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all ${
                filterStatus === status
                  ? 'bg-slate-800 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Task Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTasks.map((task) => {
          const completedSubtasks = task.subtasks?.filter(s => s.completed).length || 0;
          const totalSubtasks = task.subtasks?.length || 0;
          const subtaskPercent = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

          return (
            <div
              key={task.id}
              className={`bg-white p-5 rounded-[28px] border transition-all ${
                task.completed 
                  ? 'border-slate-100 opacity-75' 
                  : 'border-indigo-50 hover:border-indigo-200 shadow-xs'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => onToggleTask(task.id)}
                    className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                      task.completed
                        ? 'bg-emerald-500 text-white shadow-xs'
                        : 'border-2 border-slate-200 hover:border-indigo-500'
                    }`}
                  >
                    {task.completed && <Check size={14} strokeWidth={3} />}
                  </button>

                  <div>
                    <h4 className={`text-base font-bold ${task.completed ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
                      {task.icon} {task.title}
                    </h4>
                    <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 mt-0.5">
                      <Clock size={12} /> {task.start} – {task.end}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onStartFocus(task)}
                    className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    title="Focus mode"
                  >
                    <Play size={15} fill="currentColor" />
                  </button>
                  <button
                    onClick={() => onEditTask(task)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
                    title="Edit task"
                  >
                    <Edit3 size={15} />
                  </button>
                  <button
                    onClick={() => onDeleteTask(task.id)}
                    className="p-1.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Delete task"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              {/* Category & Priority */}
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-slate-100 text-slate-600">
                  {task.category}
                </span>
                {task.priority && (
                  <span className={`text-[10px] font-bold ${
                    task.priority === 'High' ? 'text-rose-500' : 'text-amber-500'
                  }`}>
                    ● {task.priority} Priority
                  </span>
                )}
              </div>

              {/* Subtasks Progress Bar & Checklist */}
              {totalSubtasks > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-100 space-y-2">
                  <div className="flex justify-between text-xs font-bold text-slate-500">
                    <span>Subtasks</span>
                    <span>{completedSubtasks}/{totalSubtasks}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                      style={{ width: `${subtaskPercent}%` }}
                    />
                  </div>
                  <div className="space-y-1 pt-1">
                    {task.subtasks?.map(st => (
                      <div key={st.id} className="flex items-center gap-2 text-xs font-medium text-slate-600">
                        <span className={`w-1.5 h-1.5 rounded-full ${st.completed ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                        <span className={st.completed ? 'line-through text-slate-400' : ''}>{st.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
