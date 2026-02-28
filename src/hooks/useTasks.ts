import { useState, useEffect } from 'react';
import { Task } from '../types/task';
import { sendNotification } from '../lib/notifications';
import { LocalNotifications } from '@capacitor/local-notifications';

const STORAGE_KEY = 'habit_tasks';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Laden van taken en opschonen van oude meldingen
  useEffect(() => {
    const loadTasks = async () => {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsedTasks = JSON.parse(saved);
        const today = new Date().toDateString();
        
        const updatedTasks = parsedTasks.map((task: Task) => {
          const lastDate = task.lastCompletedDate ? new Date(task.lastCompletedDate).toDateString() : null;
          if (lastDate && lastDate !== today) {
            return { ...task, completed: false, lastNotificationTime: null };
          }
          return task;
        });
        setTasks(updatedTasks);
        
        // Sync native notifications
        syncNativeNotifications(updatedTasks);
      }
    };
    loadTasks();
  }, []);

  // Opslaan van taken
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // Native Notifications inplannen
  const syncNativeNotifications = async (currentTasks: Task[]) => {
    // Eerst alle bestaande meldingen verwijderen om dubbelingen te voorkomen
    const pending = await LocalNotifications.getPending();
    if (pending.notifications.length > 0) {
      await LocalNotifications.cancel(pending);
    }

    const now = new Date();
    const todayDay = now.getDay();

    for (const task of currentTasks) {
      if (!task.completed && task.days.includes(todayDay)) {
        const [hour, min] = task.time.split(':').map(Number);
        const scheduleDate = new Date();
        scheduleDate.setHours(hour, min, 0, 0);

        // Als de tijd al geweest is, plan hem dan in voor nu (agressief)
        const finalDate = scheduleDate < now ? new Date(now.getTime() + 5000) : scheduleDate;

        await LocalNotifications.schedule({
          notifications: [
            {
              title: "HabitHero Herinnering",
              body: `Tijd voor: ${task.name}!`,
              id: Math.abs(task.id.split('-').reduce((a, b) => a + b.charCodeAt(0), 0)),
              schedule: { 
                at: finalDate,
                repeats: true,
                every: 'minute', // Dit zorgt voor de 'agressieve' herhaling
                allowWhileIdle: true
              },
              sound: 'beep.wav',
              ongoing: true, // Maakt de melding lastiger weg te swipen
            }
          ]
        });
      }
    }
  };

  // De "Agressieve" ntfy Loop (voor als de app WEL open staat)
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      const todayDay = now.getDay();
      const nowTs = now.getTime();
      
      tasks.forEach(task => {
        if (!task.completed && task.days.includes(todayDay)) {
          const [taskHour, taskMin] = task.time.split(':').map(Number);
          const taskTimeDate = new Date();
          taskTimeDate.setHours(taskHour, taskMin, 0, 0);

          if (now >= taskTimeDate) {
            const diffMins = Math.floor((nowTs - taskTimeDate.getTime()) / 60000);
            const shouldNotify = diffMins % task.interval === 0;
            const lastNotified = task.lastNotificationTime || 0;

            if (shouldNotify && (nowTs - lastNotified) / 60000 >= 0.9) {
              sendNotification("HabitHero", `⚠️ Vergeet niet: ${task.name}`);
              // We updaten de state niet direct in de loop om infinite loops te voorkomen
              // maar we gebruiken de ntfy call als extra trigger
            }
          }
        }
      });
    };

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
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    syncNativeNotifications(newTasks);
  };

  const toggleTask = async (id: string) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        const isCompleting = !task.completed;
        return {
          ...task,
          completed: isCompleting,
          lastCompletedDate: isCompleting ? new Date().toISOString() : task.lastCompletedDate,
          streak: isCompleting ? task.streak + 1 : Math.max(0, task.streak - 1),
        };
      }
      return task;
    });
    setTasks(updatedTasks);
    syncNativeNotifications(updatedTasks);
  };

  const deleteTask = (id: string) => {
    const filtered = tasks.filter(t => t.id !== id);
    setTasks(filtered);
    syncNativeNotifications(filtered);
  };

  return { tasks, addTask, toggleTask, deleteTask };
};