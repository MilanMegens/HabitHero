import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Plus, Bell, Check } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { cn } from '@/lib/utils';

interface AddTaskDialogProps {
  onAdd: (name: string, time: string, interval: number, days: number[]) => void;
}

const DAYS = [
  { id: 1, label: 'M' },
  { id: 2, label: 'D' },
  { id: 3, label: 'W' },
  { id: 4, label: 'D' },
  { id: 5, label: 'V' },
  { id: 6, label: 'Z' },
  { id: 0, label: 'Z' },
];

const AddTaskDialog = ({ onAdd }: AddTaskDialogProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [time, setTime] = useState('21:00');
  const [interval, setInterval] = useState('5');
  const [selectedDays, setSelectedDays] = useState<number[]>([1, 2, 3, 4, 5, 6, 0]);

  const toggleDay = (dayId: number) => {
    setSelectedDays(prev => 
      prev.includes(dayId) ? prev.filter(d => d !== dayId) : [...prev, dayId]
    );
  };

  const toggleAllDays = () => {
    if (selectedDays.length === 7) {
      setSelectedDays([]);
    } else {
      setSelectedDays([1, 2, 3, 4, 5, 6, 0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && time && selectedDays.length > 0) {
      onAdd(name, time, parseInt(interval), selectedDays);
      setName('');
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="fixed bottom-36 right-6 w-14 h-14 rounded-full shadow-2xl bg-indigo-600 hover:bg-indigo-700 text-white p-0 z-40">
          <Plus className="w-8 h-8" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-t-3xl sm:rounded-3xl dark:bg-slate-900 dark:border-slate-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-800 dark:text-white">Nieuwe Taak</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="dark:text-slate-300">Wat wil je doen?</Label>
            <Input 
              id="name" 
              placeholder="Bijv. Tandenpoetsen" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="text-lg h-12 rounded-xl dark:bg-slate-800 dark:border-slate-700 dark:text-white"
              required
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="dark:text-slate-300">Dagen</Label>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={toggleAllDays}
                className="text-xs text-indigo-600 dark:text-indigo-400 font-bold"
              >
                {selectedDays.length === 7 ? 'Deselecteer alles' : 'Selecteer alles'}
              </Button>
            </div>
            <div className="flex justify-between gap-1">
              {DAYS.map((day) => (
                <button
                  key={day.id}
                  type="button"
                  onClick={() => toggleDay(day.id)}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all",
                    selectedDays.includes(day.id) 
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none" 
                      : "bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-600"
                  )}
                >
                  {day.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="time" className="dark:text-slate-300">Tijdstip</Label>
              <Input 
                id="time" 
                type="time" 
                value={time} 
                onChange={(e) => setTime(e.target.value)}
                className="h-12 rounded-xl dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interval" className="dark:text-slate-300">Herinner elke...</Label>
              <Select value={interval} onValueChange={setInterval}>
                <SelectTrigger className="h-12 rounded-xl dark:bg-slate-800 dark:border-slate-700 dark:text-white">
                  <SelectValue placeholder="Interval" />
                </SelectTrigger>
                <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                  <SelectItem value="1">1 minuut</SelectItem>
                  <SelectItem value="5">5 minuten</SelectItem>
                  <SelectItem value="10">10 minuten</SelectItem>
                  <SelectItem value="30">30 minuten</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full h-12 text-lg rounded-xl bg-indigo-600 hover:bg-indigo-700">
              Taak Opslaan
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskDialog;