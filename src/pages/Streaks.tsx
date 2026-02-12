import React from 'react';
import { useTasks } from '../hooks/useTasks';
import BottomNav from '../components/BottomNav';
import { motion } from 'framer-motion';
import { Flame, Trophy, Target, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';

const Streaks = () => {
  const { tasks } = useTasks();
  
  const totalStreaks = tasks.reduce((acc, task) => acc + task.streak, 0);
  const highestStreak = tasks.length > 0 ? Math.max(...tasks.map(t => t.streak)) : 0;
  const activeTasks = tasks.length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-32">
      <header className="bg-white dark:bg-slate-900 px-6 pt-16 pb-8 rounded-b-[2.5rem] shadow-sm">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-slate-900 dark:text-white"
        >
          Jouw Streaks
        </motion.h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Blijf volhouden!</p>
      </header>

      <main className="px-6 mt-8 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 }}>
            <Card className="p-4 bg-orange-50 dark:bg-orange-950/30 border-orange-100 dark:border-orange-900">
              <Flame className="w-6 h-6 text-orange-500 mb-2" />
              <div className="text-2xl font-bold text-orange-700 dark:text-orange-400">{totalStreaks}</div>
              <div className="text-xs text-orange-600/70 dark:text-orange-400/70 uppercase font-bold">Totaal</div>
            </Card>
          </motion.div>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }}>
            <Card className="p-4 bg-indigo-50 dark:bg-indigo-950/30 border-indigo-100 dark:border-indigo-900">
              <Trophy className="w-6 h-6 text-indigo-500 mb-2" />
              <div className="text-2xl font-bold text-indigo-700 dark:text-indigo-400">{highestStreak}</div>
              <div className="text-xs text-indigo-600/70 dark:text-indigo-400/70 uppercase font-bold">Beste</div>
            </Card>
          </motion.div>
        </div>

        <section className="space-y-4">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Per Gewoonte</h2>
          {tasks.map((task, index) => (
            <motion.div 
              key={task.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-4 flex items-center justify-between dark:bg-slate-900 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-xl">
                    <Target className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  </div>
                  <span className="font-semibold dark:text-white">{task.name}</span>
                </div>
                <div className="flex items-center gap-1 text-orange-500 font-bold">
                  <Flame className="w-4 h-4 fill-orange-500" />
                  {task.streak}
                </div>
              </Card>
            </motion.div>
          ))}
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default Streaks;