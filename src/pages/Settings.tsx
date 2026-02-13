import React, { useState, useEffect } from 'react';
import BottomNav from '../components/BottomNav';
import { Bell, Moon, Shield, Info, ChevronRight, Sun, ListTodo, AlertCircle } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import { requestNotificationPermission } from '../lib/notifications';
import { showSuccess, showError } from '../utils/toast';

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    if ("Notification" in window) {
      setHasPermission(Notification.permission === "granted");
    }
  }, []);

  const handleEnableNotifications = async () => {
    const granted = await requestNotificationPermission();
    if (granted) {
      setHasPermission(true);
      showSuccess("Meldingen geactiveerd!");
    } else {
      showError("Toegang geweigerd. Controleer je browser instellingen.");
    }
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
        {!hasPermission && (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/50 p-4 rounded-3xl flex flex-col gap-3"
          >
            <div className="flex items-center gap-3 text-amber-800 dark:text-amber-400">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm font-semibold">Meldingen staan uit</span>
            </div>
            <p className="text-xs text-amber-700 dark:text-amber-500">
              Activeer meldingen om herinneringen te ontvangen voor je gewoontes.
            </p>
            <Button 
              onClick={handleEnableNotifications}
              className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl h-10 text-sm"
            >
              Zet meldingen aan
            </Button>
          </motion.div>
        )}

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
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
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-900 rounded-3xl p-2 shadow-sm"
        >
          <div className="flex items-center justify-between p-4 border-b border-slate-50 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-50 dark:bg-indigo-900/30 p-2 rounded-xl">
                <Bell className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <span className="font-medium dark:text-white">Notificaties</span>
            </div>
            <Switch checked={hasPermission} onCheckedChange={handleEnableNotifications} />
          </div>
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
          Versie 1.0.0
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Settings;