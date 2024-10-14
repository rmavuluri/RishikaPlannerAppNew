"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { usePlannerStore } from '@/lib/planner-data';

export default function ServiceHoursPage() {
  const serviceHours = usePlannerStore((state) => state.serviceHours);
  const addServiceHours = usePlannerStore((state) => state.addServiceHours);
  const [newHours, setNewHours] = useState('');
  const [description, setDescription] = useState('');

  const handleAddHours = (e: React.FormEvent) => {
    e.preventDefault();
    addServiceHours({ hours: parseFloat(newHours), description });
    setNewHours('');
    setDescription('');
  };

  const totalHours = serviceHours.reduce((sum, entry) => sum + entry.hours, 0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Service Hours</h1>
      <p className="text-lg mb-4">Total Hours: {totalHours.toFixed(1)}</p>
      <form onSubmit={handleAddHours} className="space-y-4">
        <div>
          <Label htmlFor="hours">Add Hours</Label>
          <Input
            id="hours"
            type="number"
            step="0.1"
            value={newHours}
            onChange={(e) => setNewHours(e.target.value)}
            required
            className="w-full"
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full"
          />
        </div>
        <Button type="submit" className="w-full sm:w-auto">Add Hours</Button>
      </form>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Service History</h2>
        <ul className="space-y-2">
          {serviceHours.map((entry, index) => (
            <li key={index} className="bg-gray-100 p-2 rounded">
              <span className="font-medium">{entry.hours} hours:</span> {entry.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}