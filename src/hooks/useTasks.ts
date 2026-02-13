import { useState, useEffect } from 'react';
import { Task } from '../types/task';
import { sendNotification } from '../lib/notifications';

const STORAGE_KEY = 'habit_tasks';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsedTasks = JSON.parse(saved);
      const today = new Date().toDateString();
      const updatedTasks = parsedTasks.map((task: Task) => {
        if (task.lastCompletedDate && new Date(task.lastCompletedDate).toDateString() !== today) {
          return { ...task, completed: false };
        }
        return task;
      });
      setTasks(updatedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const todayDay = now.getDay();
      
      tasks.forEach(task => {
        // Check of taak voor vandaag is en nog niet voltooid
        if (!task.completed && task.days.includes(todayDay)) {
          const [taskHour, taskMin] = task.time.split(':').map(Number);
          const taskTimeDate = new Date();
          taskTimeDate.setHours(taskHour, taskMin, 0, 0);

          if (now >= taskTimeDate) {
            const diffMs = now.getTime() - taskTimeDate.getTime();
            const diffMins = Math.floor(diffMs / 60000);
            
            if (diffMins % task.interval === 0) {
              sendNotification("HabitHero Herinnering", `Vergeet niet: ${task.name}`);
            }
          }
        }
      });
    }, 60000);

    return () => clearInterval(interval);
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
          streak: isCompleting ? task.streak + 1 : Math.max(0, task.streak - 1)
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