import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      setToken: (token) => {
        localStorage.setItem("poaw-token", token);
        set({ token });
      },
      clearToken: () => {
        localStorage.removeItem("poaw-token");
        set({ token: null });
      },
      isAuthenticated: () => !!get().token,
    }),
    { name: "poaw-auth" }
  )
);
