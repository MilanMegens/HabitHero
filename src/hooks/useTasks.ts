import { useState, useEffect } from 'react';
import { Task } from '../types/task';
import { sendNotification } from '../lib/notifications';

const STORAGE_KEY = 'habit_tasks';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Laden van taken
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsedTasks = JSON.parse(saved);
      const today = new Date().toDateString();
      
      // Reset completed status als het een nieuwe dag is
      const updatedTasks = parsedTasks.map((task: Task) => {
        const lastDate = task.lastCompletedDate ? new Date(task.lastCompletedDate).toDateString() : null;
        if (lastDate && lastDate !== today) {
          return { ...task, completed: false, lastNotificationTime: null };
        }
        return task;
      });
      setTasks(updatedTasks);
    }
  }, []);

  // Opslaan van taken
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // De "Agressieve" Reminder Loop
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      const todayDay = now.getDay();
      const nowTs = now.getTime();
      
      let hasUpdates = false;
      const updatedTasks = tasks.map(task => {
        // Alleen checken als: niet voltooid EN vandaag is een actieve dag
        if (!task.completed && task.days.includes(todayDay)) {
          const [taskHour, taskMin] = task.time.split(':').map(Number);
          const taskTimeDate = new Date();
          taskTimeDate.setHours(taskHour, taskMin, 0, 0);

          // Is de starttijd al geweest?
          if (now >= taskTimeDate) {
            const diffMs = nowTs - taskTimeDate.getTime();
            const diffMins = Math.floor(diffMs / 60000);
            
            // Moeten we nu een melding sturen? 
            // (Elke 'interval' minuten sinds de starttijd)
            const shouldNotify = diffMins % task.interval === 0;
            
            // Voorkom dubbele meldingen in dezelfde minuut
            const lastNotified = task.lastNotificationTime || 0;
            const minsSinceLastNotify = (nowTs - lastNotified) / 60000;

            if (shouldNotify && minsSinceLastNotify >= 0.9) {
              sendNotification("HabitHero Herinnering", `⚠️ Vergeet niet: ${task.name}`);
              hasUpdates = true;
              return { ...task, lastNotificationTime: nowTs };
            }
          }
        }
        return task;
      });

      if (hasUpdates) {
        setTasks(updatedTasks);
      }
    };

    // Check elke 30 seconden voor maximale nauwkeurigheid
    const intervalId = setInterval(checkReminders, 30000);
    return () => clearInterval(intervalId);
  }, [tasks]);

  const addTask = (name: string, time: string, interval: number, days: number[]) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      name,
      time,
      interval,
      days,
      completed: false,
      lastCompletedDate: null,
      lastNotificationTime: null,
      streak: 0,
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => [...prev, newTask]);
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === id) {
        const isCompleting = !task.completed;
        const today = new Date().toISOString();
        return {
          ...task,
          completed: isCompleting,
          lastCompletedDate: isCompleting ? today : task.lastCompletedDate,
          streak: isCompleting ? task.streak + 1 : Math.max(0, task.streak - 1),
          lastNotificationTime: isCompleting ? null : task.lastNotificationTime
        };
      }
      return task;
    }));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return { tasks, addTask, toggleTask, deleteTask };
};