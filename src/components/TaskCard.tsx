import React from 'react';
import { Task } from '../types/task';
import { CheckCircle2, Circle, Clock, Trash2, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskCard = ({ task, onToggle, onDelete }: TaskCardProps) => {
  return (
    <Card className={cn(
      "p-4 mb-3 transition-all duration-300 border-2",
      task.completed ? "bg-green-50 border-green-200 opacity-80" : "bg-white border-slate-100 shadow-sm"
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1" onClick={() => onToggle(task.id)}>
          <div className="cursor-pointer">
            {task.completed ? (
              <CheckCircle2 className="w-8 h-8 text-green-500 fill-green-50" />
            ) : (
              <Circle className="w-8 h-8 text-slate-300" />
            )}
          </div>
          
          <div className="flex flex-col">
            <span className={cn(
              "text-lg font-semibold",
              task.completed ? "text-slate-500 line-through" : "text-slate-800"
            )}>
              {task.name}
            </span>
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {task.time}
              </span>
              {task.streak > 0 && (
                <span className="flex items-center gap-1 text-orange-500 font-medium">
                  <Flame className="w-3 h-3 fill-orange-500" /> {task.streak} dagen
                </span>
              )}
            </div>
          </div>
        </div>

        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => onDelete(task.id)}
          className="text-slate-300 hover:text-red-500"
        >
          <Trash2 className="w-5 h-5" />
        </Button>
      </div>
    </Card>
  );
};

export default TaskCard;