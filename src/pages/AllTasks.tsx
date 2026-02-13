import React from 'react';
import { useTasks } from '../hooks/useTasks';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Trash2, Calendar, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { showSuccess } from '../utils/toast';

const DAYS_SHORT = ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'];

const AllTasks = () => {
  const { tasks, deleteTask } = useTasks();
  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    deleteTask(id);
    showSuccess("Gewoonte verwijderd");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-12">
      <header className="bg-white dark:bg-slate-900 px-6 pt-16 pb-8 rounded-b-[2.5rem] shadow-sm mb-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full">
            <ChevronLeft className="w-6 h-6 dark:text-white" />
          </Button>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Mijn Gewoontes</h1>
        </div>
      </header>

      <main className="px-6 space-y-4">
        {tasks.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            <p>Je hebt nog geen gewoontes aangemaakt.</p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                layout
              >
                <Card className="p-4 dark:bg-slate-900 dark:border-slate-800">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h3 className="font-bold text-lg dark:text-white">{task.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {task.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {task.days.length === 7 ? 'Elke dag' : task.days.map(d => DAYS_SHORT[d]).join(', ')}
                        </span>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleDelete(task.id)}
                      className="text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </main>
    </div>
  );
};

export default AllTasks;