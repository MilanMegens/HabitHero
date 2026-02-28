import React, { useState, useEffect } from 'react';
import BottomNav from '../components/BottomNav';
import { Bell, Moon, Shield, Info, ChevronRight, Sun, ListTodo, ExternalLink, Send } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import { sendNotification } from '../lib/notifications';
import { showSuccess, showError } from '../utils/toast';

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [ntfyTopic, setNtfyTopic] = useState('');

  useEffect(() => {
    const savedTopic = localStorage.getItem('ntfy_topic');
    if (savedTopic) setNtfyTopic(savedTopic);
  }, []);

  const saveNtfyTopic = (val: string) => {
    const cleanTopic = val.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
    setNtfyTopic(cleanTopic);
    localStorage.setItem('ntfy_topic', cleanTopic);
  };

  const handleTestNotification = async () => {
    if (!ntfyTopic) {
      showError("Vul eerst een topic in!");
      return;
    }
    await sendNotification("HabitHero Test", "Je ntfy.sh koppeling werkt perfect! 🚀");
    showSuccess("Testbericht verstuurd!");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-32">
      <header className="bg-white dark:bg-slate-900 px-6 pt-16 pb-8 rounded-b-[2.5rem] shadow-sm mb-8">
        <div className="flex items-center gap-4">
          <Logo className="w-10 h-10" />
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Instellingen</h1>
        </div>
      </header>

      <main className="px-6 space-y-6">
        {/* ntfy.sh Sectie */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm space-y-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-orange-50 dark:bg-orange-900/30 p-2 rounded-xl">
              <Bell className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <h2 className="font-bold dark:text-white text-lg">Meldingen via ntfy.sh</h2>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ntfy-topic" className="text-xs text-slate-500 uppercase font-bold tracking-wider">Jouw Topic Naam</Label>
            <div className="flex gap-2">
              <Input 
                id="ntfy-topic"
                placeholder="bijv. mijn-gewoontes-123"
                value={ntfyTopic}
                onChange={(e) => saveNtfyTopic(e.target.value)}
                className="rounded-xl dark:bg-slate-800 dark:border-slate-700"
              />
              <Button 
                onClick={handleTestNotification}
                variant="secondary"
                className="rounded-xl px-3"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-[10px] text-slate-400 leading-tight">
              Zorg dat je in de ntfy app geabonneerd bent op dit exacte topic.
            </p>
          </div>

          <Button 
            variant="outline" 
            className="w-full rounded-xl text-xs gap-2 h-9"
            onClick={() => window.open('https://ntfy.sh', '_blank')}
          >
            <ExternalLink className="w-3 h-3" /> Open ntfy.sh
          </Button>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-900 rounded-3xl p-2 shadow-sm"
        >
          <Link to="/all-tasks">
            <Button variant="ghost" className="w-full flex items-center justify-between p-4 h-auto hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="bg-green-50 dark:bg-green-900/30 p-2 rounded-xl">
                  <ListTodo className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <span className="font-medium dark:text-white">Mijn Gewoontes</span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300" />
            </Button>
          </Link>
          
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-xl">
                {theme === 'dark' ? <Moon className="w-5 h-5 text-slate-400" /> : <Sun className="w-5 h-5 text-amber-500" />}
              </div>
              <span className="font-medium dark:text-white">Donkere Modus</span>
            </div>
            <Switch 
              checked={theme === 'dark'} 
              onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')} 
            />
          </div>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-900 rounded-3xl p-2 shadow-sm"
        >
          <Link to="/privacy">
            <Button variant="ghost" className="w-full flex items-center justify-between p-4 h-auto hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-xl">
                  <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="font-medium dark:text-white">Privacy & Data</span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300" />
            </Button>
          </Link>
          <Link to="/about">
            <Button variant="ghost" className="w-full flex items-center justify-between p-4 h-auto hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="bg-amber-50 dark:bg-amber-900/30 p-2 rounded-xl">
                  <Info className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <span className="font-medium dark:text-white">Over deze app</span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300" />
            </Button>
          </Link>
        </motion.section>

        <div className="text-center text-slate-400 text-sm pt-4">
          Versie 1.1.0 (ntfy enabled)
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Settings;