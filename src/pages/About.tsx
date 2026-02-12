import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Heart, Code, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Logo from '../components/Logo';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-12">
      <header className="bg-white dark:bg-slate-900 px-6 pt-16 pb-8 rounded-b-[2.5rem] shadow-sm mb-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full">
            <ChevronLeft className="w-6 h-6 dark:text-white" />
          </Button>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Over deze app</h1>
        </div>
      </header>

      <main className="px-6 space-y-8">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center text-center space-y-4"
        >
          <Logo className="w-24 h-24" />
          <div>
            <h2 className="text-2xl font-bold dark:text-white">HabitHero</h2>
            <p className="text-slate-500 dark:text-slate-400">Versie 1.0.0</p>
          </div>
        </motion.div>

        <section className="space-y-4">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-red-50 dark:bg-red-900/30 p-3 rounded-2xl">
                <Heart className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="font-bold dark:text-white">Missie</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  Ontworpen om je te helpen je dagelijkse routines nooit meer te vergeten door middel van slimme, aanhoudende herinneringen.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-2xl">
                <Code className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="font-bold dark:text-white">Technologie</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  Gebouwd met React, Tailwind CSS en Framer Motion voor een soepele, native-achtige ervaring op je smartphone.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-2xl">
                <Smartphone className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h3 className="font-bold dark:text-white">Mobile First</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  Volledig geoptimaliseerd voor gebruik met één hand en Android-specifieke interface elementen.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="text-center text-slate-400 text-xs">
          Gemaakt met passie voor productiviteit.
        </div>
      </main>
    </div>
  );
};

export default About;