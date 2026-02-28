export interface Task {
  id: string;
  name: string;
  time: string; // HH:mm format
  interval: number; // in minutes
  completed: boolean;
  lastCompletedDate: string | null; // ISO date string
  lastNotificationTime: number | null; // Timestamp of last ntfy send
  streak: number;
  createdAt: string;
  days: number[]; // 0 = Zondag, 1 = Maandag, ..., 6 = Zaterdag
}

export interface TaskReminder {
  taskId: string;
  nextReminderTime: number; // timestamp
}