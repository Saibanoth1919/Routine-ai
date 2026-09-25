export type CategoryType = 
  | 'Personal' 
  | 'Work' 
  | 'Video Editing' 
  | 'Skill Development' 
  | 'Learning' 
  | 'Exercise' 
  | 'Health'
  | 'Creative';

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  start: string; // "08:30"
  end: string;   // "09:00"
  category: CategoryType;
  completed: boolean;
  icon?: string;
  priority?: 'High' | 'Medium' | 'Low';
  repeat?: 'Daily' | 'Weekdays' | 'Weekends' | 'Custom';
  notes?: string;
  subtasks?: Subtask[];
  date?: string; // YYYY-MM-DD
}

export interface Habit {
  id: string;
  name: string;
  category: CategoryType;
  streak: number;
  history: boolean[]; // 7 days (Mon - Sun)
  icon?: string;
  goal?: string;
}

export type NavTab = 
  | 'home' 
  | 'schedule' 
  | 'tasks' 
  | 'habits' 
  | 'focus' 
  | 'insights' 
  | 'ai' 
  | 'settings';

export type ScheduleViewMode = 'today' | 'week' | 'calendar';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  proposedChanges?: Task[];
}
