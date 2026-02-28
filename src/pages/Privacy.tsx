import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ShieldCheck, Database, Lock, BatteryWarning } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-12">
      <header className="bg-white dark:bg-slate-900 px-6 pt-16 pb-8 rounded-b-[2.5rem] shadow-sm mb-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full">
            <ChevronLeft className="w-6 h-6 dark:text-white" />
          </Button>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Privacy & Help</h1>
        </div>
      </header>

      <main className="px-6 space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-3xl border border-orange-100 dark:border-orange-900/50 space-y-4"
        >
          <div className="flex items-center gap-3 text-orange-800 dark:text-orange-400">
            <BatteryWarning className="w-6 h-6" />
            <h2 className="font-bold">Belangrijk voor meldingen!</h2>
          </div>
          <p className="text-sm text-orange-700 dark:text-orange-500 leading-relaxed">
            Android stopt apps vaak op de achtergrond om batterij te besparen. Om meldingen te blijven ontvangen als de app "niet runt":
          </p>
          <ol className="text-xs text-orange-800 dark:text-orange-400 list-decimal ml-4 space-y-2">
            <li>Houd het HabitHero icoon op je startscherm ingedrukt.</li>
            <li>Tik op <strong>App-info</strong> (i-icoontje).</li>
            <li>Ga naar <strong>Batterij</strong>.</li>
            <li>Kies <strong>Onbeperkt</strong> (of "Niet optimaliseren").</li>
          </ol>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm space-y-6"
        >
          <div className="flex items-center gap-4">
            <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-2xl">
              <ShieldCheck className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-xl font-bold dark:text-white">Jouw data</h2>
          </div>

          <div className="space-y-4 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            <div className="flex gap-3">
              <Database className="w-5 h-5 text-indigo-500 shrink-0" />
              <p>
                <strong className="text-slate-900 dark:text-white">Lokale Opslag:</strong> Alles staat op je eigen apparaat.
              </p>
            </div>
            <div className="flex gap-3">
              <Lock className="w-5 h-5 text-indigo-500 shrink-0" />
              <p>
                <strong className="text-slate-900 dark:text-white">Geen Tracking:</strong> We bespioneren je niet.
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Privacy;