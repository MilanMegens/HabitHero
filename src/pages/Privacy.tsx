import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ShieldCheck, Database, Lock } from 'lucide-react';
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
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Privacy & Data</h1>
        </div>
      </header>

      <main className="px-6 space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm space-y-6"
        >
          <div className="flex items-center gap-4">
            <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-2xl">
              <ShieldCheck className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-xl font-bold dark:text-white">Jouw data is van jou</h2>
          </div>

          <div className="space-y-4 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            <div className="flex gap-3">
              <Database className="w-5 h-5 text-indigo-500 shrink-0" />
              <p>
                <strong className="text-slate-900 dark:text-white">Lokale Opslag:</strong> Alle taken en gewoontes die je toevoegt worden uitsluitend op je eigen apparaat opgeslagen (Local Storage). Er wordt geen data naar een externe server gestuurd.
              </p>
            </div>

            <div className="flex gap-3">
              <Lock className="w-5 h-5 text-indigo-500 shrink-0" />
              <p>
                <strong className="text-slate-900 dark:text-white">Geen Tracking:</strong> We gebruiken geen analytische cookies of tracking scripts. Je privacy is 100% gewaarborgd.
              </p>
            </div>

            <p>
              Omdat alle data lokaal staat, ben je je gegevens kwijt als je de browser-cache wist of de app verwijdert. In een toekomstige update zullen we optionele cloud-synchronisatie toevoegen.
            </p>
          </div>
        </motion.div>

        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-3xl border border-indigo-100 dark:border-indigo-900/50">
          <h3 className="font-bold text-indigo-900 dark:text-indigo-300 mb-2">Vragen?</h3>
          <p className="text-indigo-700 dark:text-indigo-400 text-sm">
            Heb je vragen over hoe we met je data omgaan? Neem gerust contact op via de instellingen.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Privacy;