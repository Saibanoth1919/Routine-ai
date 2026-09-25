import React from 'react';
import { 
  Home, 
  Calendar, 
  CheckSquare, 
  Activity, 
  Focus, 
  BarChart2, 
  Sparkles, 
  Settings, 
  Zap,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { NavTab } from '../types';
import { UserAvatar } from '../utils/illustrations';

interface SidebarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  collapsed?: boolean;
  setCollapsed?: (collapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab,
  collapsed = false,
  setCollapsed
}) => {
  const menu: Array<{ id: NavTab; icon: React.ElementType; label: string; badge?: string }> = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'schedule', icon: Calendar, label: 'Schedule' },
    { id: 'tasks', icon: CheckSquare, label: 'Tasks' },
    { id: 'habits', icon: Activity, label: 'Habits' },
    { id: 'focus', icon: Focus, label: 'Focus' },
    { id: 'insights', icon: BarChart2, label: 'Insights' },
    { id: 'ai', icon: Sparkles, label: 'AI Assistant', badge: 'AI' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <aside 
      className={`hidden md:flex flex-col bg-white border-r border-indigo-50/80 h-screen sticky top-0 transition-all duration-300 z-30 select-none ${
        collapsed ? 'w-20 p-3' : 'w-64 p-6'
      }`}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between mb-8 px-2">
        <div 
          onClick={() => setActiveTab('home')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:scale-105 transition-transform">
            <Zap size={22} fill="currentColor" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-1.5">
                MyRoutine
              </h1>
              <span className="text-[10px] font-semibold tracking-wider uppercase text-indigo-500">Daily Focus</span>
            </div>
          )}
        </div>

        {setCollapsed && !collapsed && (
          <button 
            onClick={() => setCollapsed(true)}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
            title="Collapse sidebar"
          >
            <ChevronLeft size={18} />
          </button>
        )}
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 space-y-1.5">
        {menu.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-2xl transition-all duration-200 text-left relative ${
                isActive
                  ? 'bg-indigo-50/90 text-indigo-600 font-bold shadow-xs'
                  : 'text-slate-500 hover:bg-slate-50/80 hover:text-slate-800 font-medium'
              } ${collapsed ? 'justify-center px-2' : ''}`}
              title={collapsed ? item.label : undefined}
            >
              <Icon 
                size={21} 
                strokeWidth={isActive ? 2.5 : 2} 
                className={isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'} 
              />
              
              {!collapsed && (
                <span className="text-[14.5px] flex-1">{item.label}</span>
              )}

              {!collapsed && item.badge && (
                <span className="px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded-md bg-indigo-100 text-indigo-700">
                  {item.badge}
                </span>
              )}

              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-indigo-600 rounded-r-full" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Profile Widget */}
      <div 
        onClick={() => setActiveTab('settings')}
        className={`mt-auto bg-slate-50/90 hover:bg-indigo-50/60 p-3.5 rounded-2xl flex items-center gap-3 cursor-pointer transition-all border border-slate-100/80 ${
          collapsed ? 'justify-center p-2' : ''
        }`}
      >
        <UserAvatar className="w-10 h-10 shrink-0" />
        {!collapsed && (
          <div className="flex-1 overflow-hidden">
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-bold truncate text-slate-900">Sai</p>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
            <p className="text-xs text-slate-500 truncate font-medium">Keep going! 💪</p>
          </div>
        )}
      </div>

      {collapsed && setCollapsed && (
        <button 
          onClick={() => setCollapsed(false)}
          className="mt-3 mx-auto p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl"
          title="Expand sidebar"
        >
          <ChevronRight size={18} />
        </button>
      )}
    </aside>
  );
};
