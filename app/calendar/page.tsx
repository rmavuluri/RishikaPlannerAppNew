"use client";

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePlannerStore } from '@/lib/planner-data';
import { Trash2 } from 'lucide-react';

const EventForm = ({ addEvent }: { addEvent: (event: any) => void }) => {
  const [newEvent, setNewEvent] = useState({ title: '', date: '', startTime: '', endTime: '', description: '', color: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEvent(newEvent);
    setNewEvent({ title: '', date: '', startTime: '', endTime: '', description: '', color: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          type="date"
          value={newEvent.date}
          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="startTime">Start Time</Label>
        <Input
          id="startTime"
          type="time"
          value={newEvent.startTime}
          onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="endTime">End Time</Label>
        <Input
          id="endTime"
          type="time"
          value={newEvent.endTime}
          onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={newEvent.description}
          onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="color">Color</Label>
        <Select onValueChange={(value) => setNewEvent({ ...newEvent, color: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select a color" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pink">Pink</SelectItem>
            <SelectItem value="purple">Purple</SelectItem>
            <SelectItem value="teal">Teal</SelectItem>
            <SelectItem value="gray">Gray</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">Add Event</Button>
    </form>
  );
};

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const events = usePlannerStore((state) => state.events);
  const addEvent = usePlannerStore((state) => state.addEvent);
  const deleteEvent = usePlannerStore((state) => state.deleteEvent);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Calendar</h1>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 pr-0 md:pr-4 mb-4 md:mb-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border w-full"
          />
        </div>
        <div className="w-full md:w-1/2 pl-0 md:pl-4">
          <h2 className="text-xl font-semibold mb-2">Events</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mb-4 w-full md:w-auto">Add Event</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Event</DialogTitle>
              </DialogHeader>
              <EventForm addEvent={addEvent} />
            </DialogContent>
          </Dialog>
          <div className="space-y-2">
            {events.map((event, index) => (
              <div
                key={index}
                className={`p-2 rounded-md ${event.color ? `bg-${event.color}-200` : 'bg-gray-200'} relative`}
              >
                <h3 className="font-semibold">{event.title}</h3>
                <p className="text-sm">{event.date} | {event.startTime} - {event.endTime}</p>
                <p className="text-sm">{event.description}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteEvent(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}