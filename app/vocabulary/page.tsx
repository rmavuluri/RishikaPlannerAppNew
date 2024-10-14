"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { usePlannerStore } from '@/lib/planner-data';
import { Trash2 } from 'lucide-react';

const VocabularyForm = ({ addVocabulary }: { addVocabulary: (word: any) => void }) => {
  const [newWord, setNewWord] = useState({ word: '', definition: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addVocabulary(newWord);
    setNewWord({ word: '', definition: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="word">Word</Label>
        <Input
          id="word"
          value={newWord.word}
          onChange={(e) => setNewWord({ ...newWord, word: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="definition">Definition</Label>
        <Textarea
          id="definition"
          value={newWord.definition}
          onChange={(e) => setNewWord({ ...newWord, definition: e.target.value })}
          required
        />
      </div>
      <Button type="submit">Add Word</Button>
    </form>
  );
};

export default function VocabularyPage() {
  const vocabulary = usePlannerStore((state) => state.vocabulary);
  const addVocabulary = usePlannerStore((state) => state.addVocabulary);
  const deleteVocabulary = usePlannerStore((state) => state.deleteVocabulary);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Vocabulary</h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4 w-full sm:w-auto">Add Word</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Word</DialogTitle>
          </DialogHeader>
          <VocabularyForm addVocabulary={addVocabulary} />
        </DialogContent>
      </Dialog>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {vocabulary.map((item, index) => (
          <div key={index} className="bg-pink-100 p-4 rounded-md shadow relative">
            <h3 className="font-semibold text-lg mb-2">{item.word}</h3>
            <p className="text-gray-600 text-sm">{item.definition}</p>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteVocabulary(index)}
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