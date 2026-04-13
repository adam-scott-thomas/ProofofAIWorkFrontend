import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UnlockState {
  unlocked: boolean;
  unlockedAt: string | null;
  setUnlocked: () => void;
  clear: () => void;
}

export const useUnlockStore = create<UnlockState>()(
  persist(
    (set) => ({
      unlocked: false,
      unlockedAt: null,
      setUnlocked: () =>
        set({ unlocked: true, unlockedAt: new Date().toISOString() }),
      clear: () => set({ unlocked: false, unlockedAt: null }),
    }),
    { name: "poaw-unlock" },
  ),
);
