import React, { useEffect } from 'react';
import { useTasks } from '../hooks/useTasks';
import TaskCard from '../components/TaskCard';
import AddTaskDialog from '../components/AddTaskDialog';
import BottomNav from '../components/BottomNav';
import { requestNotificationPermission } from '../lib/notifications';
import { Sparkles, CalendarDays, Plus } from 'lucide-react';

const Index = () => {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const completedCount = tasks.filter(t => t.completed).length;
  const progress = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      {/* Header */}
      <header className="bg-white px-6 pt-12 pb-6 rounded-b-[2.5rem] shadow-sm">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Vandaag</h1>
            <p className="text-slate-500 flex items-center gap-2 mt-1">
              <CalendarDays className="w-4 h-4" />
              {new Date().toLocaleDateString('nl-NL', { weekday: 'long', day: 'numeric', month: 'long' })}
            </p>
          </div>
          <div className="bg-indigo-50 p-3 rounded-2xl">
            <Sparkles className="w-6 h-6 text-indigo-600" />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium">
            <span className="text-slate-600">Je voortgang</span>
            <span className="text-indigo-600">{Math.round(progress)}%</span>
          </div>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-600 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      {/* Task List */}
      <main className="px-6 mt-8">
        {tasks.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Plus className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">Nog geen taken</h3>
            <p className="text-slate-500">Voeg je eerste gewoonte toe om te beginnen!</p>
          </div>
        ) : (
          <div className="space-y-1">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Jouw gewoontes</h2>
            {tasks.map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onToggle={toggleTask} 
                onDelete={deleteTask} 
              />
            ))}
          </div>
        )}
      </main>

      <AddTaskDialog onAdd={addTask} />
      <BottomNav />
    </div>
  );
};

export default Index;