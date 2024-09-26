import { create } from "zustand";
import { ApiSuccessfullResponse } from "../types/ApiResponse";
import { UserType } from "../types/User";

type AuthStore = {
  user: UserType | null;
  isAuthenticated: boolean;
  error: string | null;
  isLoading: boolean;
  isCheckingAuth: boolean;
  signup: (name: string, email: string, password: string) => Promise<void>;
};

const apiUrl = "http://localhost:5000/api/v1/auth";

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,

  signup: async (name: string, email: string, password: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(`${apiUrl}/signup`, {
        name,
        email,
        password,
      });

      const data = response.data as ApiSuccessfullResponse<UserType>;
      console.log({ data });

      set({ user: data.data, isAuthenticated: true, isLoading: false });
    } catch (err) {
      const error = err as Error;

      set({ error: error.message || "Error signing up", isLoading: false });
      throw error;
    }
  },
}));
