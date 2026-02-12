import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Plus, Bell } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface AddTaskDialogProps {
  onAdd: (name: string, time: string, interval: number) => void;
}

const AddTaskDialog = ({ onAdd }: AddTaskDialogProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [time, setTime] = useState('21:00');
  const [interval, setInterval] = useState('5');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && time) {
      onAdd(name, time, parseInt(interval));
      setName('');
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="fixed bottom-32 right-6 w-14 h-14 rounded-full shadow-2xl bg-indigo-600 hover:bg-indigo-700 text-white p-0 z-40">
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

          <div className="flex items-center gap-2 text-sm text-slate-500 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
            <Bell className="w-4 h-4 text-indigo-500" />
            <span className="dark:text-slate-400">We blijven je herinneren tot je afvinkt.</span>
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