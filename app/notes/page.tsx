"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { usePlannerStore } from '@/lib/planner-data';
import { Trash2 } from 'lucide-react';

const NoteForm = ({ addNote }: { addNote: (note: any) => void }) => {
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addNote(newNote);
    setNewNote({ title: '', content: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          value={newNote.content}
          onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
          required
        />
      </div>
      <Button type="submit">Add Note</Button>
    </form>
  );
};

export default function NotesPage() {
  const notes = usePlannerStore((state) => state.notes);
  const addNote = usePlannerStore((state) => state.addNote);
  const deleteNote = usePlannerStore((state) => state.deleteNote);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Notes</h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4 w-full sm:w-auto">Add Note</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Note</DialogTitle>
          </DialogHeader>
          <NoteForm addNote={addNote} />
        </DialogContent>
      </Dialog>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note, index) => (
          <div key={index} className="bg-white p-4 rounded-md shadow relative">
            <h3 className="font-semibold text-lg mb-2">{note.title}</h3>
            <p className="text-gray-600 text-sm">{note.content}</p>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteNote(index)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}