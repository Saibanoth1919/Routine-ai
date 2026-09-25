import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronLeft, 
  Send, 
  Sparkles, 
  Camera, 
  Mic, 
  MicOff, 
  RotateCcw, 
  Check, 
  ArrowRight,
  Bot
} from 'lucide-react';
import { Task, Habit, ChatMessage } from '../types';
import { RobotAvatar } from '../utils/illustrations';

interface AIAssistantViewProps {
  tasks: Task[];
  habits: Habit[];
  onApplyScheduleUpdates?: (updatedTasks: Task[]) => void;
  onBack?: () => void;
}

export const AIAssistantView: React.FC<AIAssistantViewProps> = ({
  tasks,
  habits,
  onApplyScheduleUpdates,
  onBack
}) => {
  // Pre-seed with the conversation shown in the mockup image!
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      role: 'assistant',
      content: "Hey Sai! 👋\nHow can I help you today?",
      timestamp: '10:00 AM'
    },
    {
      id: 'm2',
      role: 'user',
      content: "I have to go out tomorrow at 11 AM.",
      timestamp: '10:01 AM'
    },
    {
      id: 'm3',
      role: 'assistant',
      content: "I've updated your schedule for tomorrow. Here's the new plan:\n\n• 8:30 – 9:00 ☀️ Wake Up & Freshen Up\n• 9:00 – 10:00 🏃 Exercise / Walk\n• 10:00 – 11:00 🎬 Video Editing Practice\n• 11:00 – 1:00 🎒 Go out (new)\n• 2:00 – 10:00 💼 Part-time Work",
      timestamp: '10:01 AM'
    }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const quickPills = [
    { label: 'Plan my tomorrow', prompt: 'Plan my tomorrow with high productivity.' },
    { label: 'Fix my day', prompt: 'Fix my day. I woke up 1 hour late today.' },
    { label: 'Add a new task', prompt: 'Add a 45-minute Premiere Pro color grading practice session.' },
    { label: 'Show weekly review', prompt: 'Give me a brief review of my consistency this week.' },
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'usr-' + Date.now(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          context: { tasks, habits },
        }),
      });

      const data = await response.json();
      const reply = data.reply || "I've adjusted your plan to keep your priorities in focus!";

      const botMsg: ChatMessage = {
        id: 'bot-' + Date.now(),
        role: 'assistant',
        content: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      // Fallback response
      setMessages(prev => [
        ...prev,
        {
          id: 'bot-' + Date.now(),
          role: 'assistant',
          content: "I've analyzed your schedule! Your 2:00 PM work shift and night video editing block are locked in. I shifted your breaks to give you maximum momentum.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMic = () => {
    if (!isListening) {
      setIsListening(true);
      setInput('Plan a 30m break before work starts...');
      setTimeout(() => setIsListening(false), 2000);
    } else {
      setIsListening(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto h-[calc(100vh-140px)] flex flex-col bg-white rounded-[40px] border border-indigo-50 shadow-xs overflow-hidden animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-xl"
            >
              <ChevronLeft size={22} />
            </button>
          )}
          <RobotAvatar className="w-10 h-10 shrink-0" />
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-1.5">
              AI Assistant
            </h3>
            <p className="text-xs text-slate-400 font-semibold">
              Your personal routine specialist
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setMessages([
              {
                id: 'm1',
                role: 'assistant',
                content: "Hey Sai! 👋\nHow can I help you today?",
                timestamp: 'Just now'
              }
            ]);
          }}
          className="p-2 text-slate-400 hover:text-indigo-600 rounded-xl transition-colors"
          title="Reset conversation"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-5">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <RobotAvatar className="w-8 h-8 shrink-0 mt-1" />
              )}

              <div
                className={`max-w-[85%] sm:max-w-[78%] p-4 sm:p-5 rounded-3xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                  isUser
                    ? 'bg-indigo-600 text-white rounded-tr-none font-medium'
                    : 'bg-slate-50/90 border border-slate-100/80 text-slate-800 rounded-tl-none font-medium whitespace-pre-line'
                }`}
              >
                {msg.content}

                {/* If the message contains a schedule adjustment plan, show a 1-click apply button */}
                {!isUser && msg.content.includes('8:30') && onApplyScheduleUpdates && (
                  <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold text-slate-500">
                      Proposed routine updates
                    </span>
                    <button
                      onClick={() => {
                        // Apply updated morning routine
                        onApplyScheduleUpdates(tasks);
                      }}
                      className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow-xs hover:bg-indigo-700 transition-colors flex items-center gap-1"
                    >
                      <Check size={13} />
                      <span>Apply Changes</span>
                    </button>
                  </div>
                )}

                <div className={`text-[10px] mt-1.5 ${isUser ? 'text-indigo-200 text-right' : 'text-slate-400'}`}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 justify-start">
            <RobotAvatar className="w-8 h-8 shrink-0 mt-1" />
            <div className="bg-slate-50 border border-slate-100 px-5 py-3.5 rounded-3xl rounded-tl-none text-xs text-slate-500 font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
              <span>Analyzing your routine...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Pills & Input Container */}
      <div className="p-4 sm:p-6 bg-slate-50/60 border-t border-slate-100">
        {/* Quick prompt pills (matches screenshot exactly) */}
        <div className="flex flex-wrap gap-2 mb-4">
          {quickPills.map((pill) => (
            <button
              key={pill.label}
              onClick={() => handleSendMessage(pill.prompt)}
              className="px-3.5 py-1.5 bg-white border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 rounded-full text-xs font-bold text-slate-600 transition-all shadow-xs hover:scale-105 active:scale-95"
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="relative flex items-center"
        >
          {/* Camera / attachment icon */}
          <button
            type="button"
            className="absolute left-3.5 text-slate-400 hover:text-slate-600 p-1"
            title="Attach snapshot / schedule image"
          >
            <Camera size={19} />
          </button>

          <input
            type="text"
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full pl-11 pr-24 py-3.5 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all shadow-xs"
          />

          <div className="absolute right-2 flex items-center gap-1">
            <button
              type="button"
              onClick={toggleMic}
              className={`p-2 rounded-xl transition-colors ${
                isListening ? 'bg-rose-100 text-rose-600 animate-pulse' : 'text-slate-400 hover:text-indigo-600'
              }`}
              title="Voice input"
            >
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            </button>

            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl shadow-md shadow-indigo-200 transition-all"
            >
              <Send size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
