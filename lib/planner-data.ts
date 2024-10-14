import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface PlannerState {
  events: any[];
  reminders: any[];
  notes: any[];
  vocabulary: any[];
  serviceHours: any[];
  addEvent: (event: any) => void;
  deleteEvent: (index: number) => void;
  addReminder: (reminder: any) => void;
  toggleReminder: (index: number) => void;
  deleteReminder: (index: number) => void;
  addNote: (note: any) => void;
  deleteNote: (index: number) => void;
  addVocabulary: (word: any) => void;
  deleteVocabulary: (index: number) => void;
  addServiceHours: (entry: any) => void;
  deleteServiceHours: (index: number) => void;
}

export const usePlannerStore = create(
  persist<PlannerState>(
    (set) => ({
      events: [],
      reminders: [],
      notes: [],
      vocabulary: [],
      serviceHours: [],
      addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
      deleteEvent: (index) => set((state) => ({ events: state.events.filter((_, i) => i !== index) })),
      addReminder: (reminder) => set((state) => ({ reminders: [...state.reminders, reminder] })),
      toggleReminder: (index) =>
        set((state) => ({
          reminders: state.reminders.map((reminder, i) =>
            i === index ? { ...reminder, completed: !reminder.completed } : reminder
          ),
        })),
      deleteReminder: (index) =>
        set((state) => ({
          reminders: state.reminders.filter((_, i) => i !== index),
        })),
      addNote: (note) => set((state) => ({ notes: [...state.notes, note] })),
      deleteNote: (index) =>
        set((state) => ({
          notes: state.notes.filter((_, i) => i !== index),
        })),
      addVocabulary: (word) => set((state) => ({ vocabulary: [...state.vocabulary, word] })),
      deleteVocabulary: (index) =>
        set((state) => ({
          vocabulary: state.vocabulary.filter((_, i) => i !== index),
        })),
      addServiceHours: (entry) => set((state) => ({ serviceHours: [...state.serviceHours, entry] })),
      deleteServiceHours: (index) =>
        set((state) => ({
          serviceHours: state.serviceHours.filter((_, i) => i !== index),
        })),
    }),
    {
      name: 'planner-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);