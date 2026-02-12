import React from 'react';
import { Home, Settings, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const BottomNav = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: 'Vandaag', path: '/' },
    { icon: Award, label: 'Streaks', path: '/streaks' },
    { icon: Settings, label: 'Instellingen', path: '/settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 px-8 py-4 flex justify-between items-center z-50 pb-10 sm:pb-8">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link 
            key={item.path} 
            to={item.path}
            className={cn(
              "flex flex-col items-center gap-1 transition-all relative",
              isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400"
            )}
          >
            {isActive && (
              <motion.div 
                layoutId="nav-indicator"
                className="absolute -top-2 w-8 h-1 bg-indigo-600 dark:bg-indigo-400 rounded-full"
              />
            )}
            <item.icon className={cn("w-6 h-6", isActive && "fill-indigo-50 dark:fill-indigo-900/30")} />
            <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;