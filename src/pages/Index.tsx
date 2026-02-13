import React, { useEffect } from 'react';
import { useTasks } from '../hooks/useTasks';
import TaskCard from '../components/TaskCard';
import AddTaskDialog from '../components/AddTaskDialog';
import BottomNav from '../components/BottomNav';
import { requestNotificationPermission } from '../lib/notifications';
import { Sparkles, CalendarDays, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Index = () => {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const todayDay = new Date().getDay();
  const todayTasks = tasks.filter(t => t.days.includes(todayDay));
  
  const completedCount = todayTasks.filter(t => t.completed).length;
  const progress = todayTasks.length > 0 ? (completedCount / todayTasks.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-40">
      <header className="bg-white dark:bg-slate-900 px-6 pt-16 pb-8 rounded-b-[2.5rem] shadow-sm">
        <div className="flex justify-between items-start mb-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Vandaag</h1>
            <p className="text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-1">
              <CalendarDays className="w-4 h-4" />
              {new Date().toLocaleDateString('nl-NL', { weekday: 'long', day: 'numeric', month: 'long' })}
            </p>
          </motion.div>
          <motion.div 
            whileHover={{ rotate: 15 }}
            className="bg-indigo-50 dark:bg-indigo-900/30 p-3 rounded-2xl"
          >
            <Sparkles className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </motion.div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium">
            <span className="text-slate-600 dark:text-slate-400">Je voortgang</span>
            <span className="text-indigo-600 dark:text-indigo-400">{Math.round(progress)}%</span>
          </div>
          <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-indigo-600 dark:bg-indigo-400"
            />
          </div>
        </div>
      </header>

      <main className="px-6 mt-8">
        {todayTasks.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="bg-white dark:bg-slate-900 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Plus className="w-10 h-10 text-slate-300 dark:text-slate-700" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Geen taken voor vandaag</h3>
            <p className="text-slate-500 dark:text-slate-400">Geniet van je vrije dag of voeg er een toe!</p>
          </motion.div>
        ) : (
          <div className="space-y-1">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Jouw gewoontes</h2>
            <AnimatePresence mode="popLayout">
              {todayTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <TaskCard 
                    task={task} 
                    onToggle={toggleTask} 
                    onDelete={deleteTask} 
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      <AddTaskDialog onAdd={addTask} />
      <BottomNav />
    </div>
  );
};

export default Index;