import { create } from 'zustand';

export const useEventStore = create<{ joinedEventId: string | null; setJoinedEventId: (id: string) => void }>((set) => ({
  joinedEventId: null,
  setJoinedEventId: (id) => set({ joinedEventId: id }),
}));