"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ServiceHoursPage() {
  const [totalHours, setTotalHours] = useState(0);
  const [newHours, setNewHours] = useState('');

  const handleAddHours = (e: React.FormEvent) => {
    e.preventDefault();
    setTotalHours(totalHours + parseFloat(newHours));
    setNewHours('');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Service Hours</h1>
      <p>Total Hours: {totalHours}</p>
      <form onSubmit={handleAddHours} className="mt-4">
        <Label htmlFor="hours">Add Hours</Label>
        <Input
          id="hours"
          type="number"
          step="0.1"
          value={newHours}
          onChange={(e) => setNewHours(e.target.value)}
          required
        />
        <Button type="submit" className="mt-2">Add Hours</Button>
      </form>
    </div>
  );
}