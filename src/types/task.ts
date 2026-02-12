export interface Task {
  id: string;
  name: string;
  time: string; // HH:mm format
  interval: number; // in minutes
  completed: boolean;
  lastCompletedDate: string | null; // ISO date string
  streak: number;
  createdAt: string;
}

export interface TaskReminder {
  taskId: string;
  nextReminderTime: number; // timestamp
}