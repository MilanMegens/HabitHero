import { useState, useEffect, useCallback } from 'react';
import { Task } from '../types/task';
import { sendNotification } from '../lib/notifications';

const STORAGE_KEY = 'habit_tasks';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load tasks
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsedTasks = JSON.parse(saved);
      // Reset completion status if it's a new day
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

  // Save tasks
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // Reminder Logic
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      tasks.forEach(task => {
        if (!task.completed) {
          const [taskHour, taskMin] = task.time.split(':').map(Number);
          const taskTimeDate = new Date();
          taskTimeDate.setHours(taskHour, taskMin, 0, 0);

          if (now >= taskTimeDate) {
            // Check if we should notify based on interval
            // For simplicity in this web demo, we check every minute
            // In a real app, we'd track 'lastNotified'
            const diffMs = now.getTime() - taskTimeDate.getTime();
            const diffMins = Math.floor(diffMs / 60000);
            
            if (diffMins % task.interval === 0) {
              sendNotification("Tijd voor je taak!", `Vergeet niet: ${task.name}`);
            }
          }
        }
      });
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [tasks]);

  const addTask = (name: string, time: string, interval: number) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      name,
      time,
      interval,
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