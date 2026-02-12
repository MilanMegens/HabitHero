import React from 'react';
import BottomNav from '../components/BottomNav';
import { Bell, Moon, Shield, Info, ChevronRight } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

const Settings = () => {
  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      <header className="bg-white px-6 pt-12 pb-6 rounded-b-[2.5rem] shadow-sm mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Instellingen</h1>
      </header>

      <main className="px-6 space-y-6">
        <section className="bg-white rounded-3xl p-2 shadow-sm">
          <div className="flex items-center justify-between p-4 border-b border-slate-50">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-50 p-2 rounded-xl">
                <Bell className="w-5 h-5 text-indigo-600" />
              </div>
              <span className="font-medium">Notificaties</span>
            </div>
            <Switch checked={true} />
          </div>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="bg-slate-50 p-2 rounded-xl">
                <Moon className="w-5 h-5 text-slate-600" />
              </div>
              <span className="font-medium">Donkere Modus</span>
            </div>
            <Switch />
          </div>
        </section>

        <section className="bg-white rounded-3xl p-2 shadow-sm">
          <Button variant="ghost" className="w-full flex items-center justify-between p-4 h-auto hover:bg-slate-50 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 p-2 rounded-xl">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <span className="font-medium">Privacy & Data</span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300" />
          </Button>
          <Button variant="ghost" className="w-full flex items-center justify-between p-4 h-auto hover:bg-slate-50 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="bg-amber-50 p-2 rounded-xl">
                <Info className="w-5 h-5 text-amber-600" />
              </div>
              <span className="font-medium">Over deze app</span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300" />
          </Button>
        </section>

        <div className="text-center text-slate-400 text-sm pt-4">
          Versie 1.0.0
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Settings;