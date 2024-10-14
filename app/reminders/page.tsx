"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { usePlannerStore } from '@/lib/planner-data';
import { Trash2 } from 'lucide-react';

const subjects = [
  { name: 'Algebra', color: 'bg-red-200' },
  { name: 'AP Human Geography', color: 'bg-blue-200' },
  { name: 'Research', color: 'bg-green-200' },
  { name: 'English', color: 'bg-yellow-200' },
  { name: 'Spanish', color: 'bg-purple-200' },
  { name: 'Chemistry', color: 'bg-pink-200' },
  { name: 'Journalism', color: 'bg-indigo-200' },
];

const ReminderForm = ({ addReminder }: { addReminder: (reminder: any) => void }) => {
  const [newReminder, setNewReminder] = useState({ subject: '', task: '', dueDate: '', dueTime: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addReminder({ ...newReminder, completed: false });
    setNewReminder({ subject: '', task: '', dueDate: '', dueTime: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="subject">Subject</Label>
        <Select onValueChange={(value) => setNewReminder({ ...newReminder, subject: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select a subject" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((subject) => (
              <SelectItem key={subject.name} value={subject.name}>
                {subject.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="task">Task</Label>
        <Input
          id="task"
          value={newReminder.task}
          onChange={(e) => setNewReminder({ ...newReminder, task: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="dueDate">Due Date</Label>
        <Input
          id="dueDate"
          type="date"
          value={newReminder.dueDate}
          onChange={(e) => setNewReminder({ ...newReminder, dueDate: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="dueTime">Due Time</Label>
        <Input
          id="dueTime"
          type="time"
          value={newReminder.dueTime}
          onChange={(e) => setNewReminder({ ...newReminder, dueTime: e.target.value })}
          required
        />
      </div>
      <Button type="submit">Add Reminder</Button>
    </form>
  );
};

export default function RemindersPage() {
  const reminders = usePlannerStore((state) => state.reminders);
  const addReminder = usePlannerStore((state) => state.addReminder);
  const toggleReminder = usePlannerStore((state) => state.toggleReminder);
  const deleteReminder = usePlannerStore((state) => state.deleteReminder);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Reminders</h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4 w-full sm:w-auto">Add Reminder</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Reminder</DialogTitle>
          </DialogHeader>
          <ReminderForm addReminder={addReminder} />
        </DialogContent>
      </Dialog>
      <ul className="space-y-2">
        {reminders.map((reminder, index) => (
          <li
            key={index}
            className={`p-2 rounded-md ${
              subjects.find((s) => s.name === reminder.subject)?.color || 'bg-gray-200'
            } flex items-center justify-between`}
          >
            <div className="flex items-center flex-grow">
              <Checkbox
                checked={reminder.completed}
                onCheckedChange={() => toggleReminder(index)}
                className="mr-2 flex-shrink-0"
              />
              <div className={`${reminder.completed ? 'line-through' : ''} flex-grow`}>
                <h3 className="font-semibold text-sm sm:text-base">{reminder.subject}</h3>
                <p className="text-xs sm:text-sm">{reminder.task}</p>
                <p className="text-xs sm:text-sm">
                  Due: {reminder.dueDate} at {reminder.dueTime}
                </p>
              </div>
            </div>
            {reminder.completed && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteReminder(index)}
                className="text-red-500 hover:text-red-700 ml-2 flex-shrink-0"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}