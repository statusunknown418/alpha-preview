import { create } from "zustand";

export type MetadataStore = {
  role: "student" | "landlord" | null;
  setRole: (role: "student" | "landlord") => void;
};

export const useMetadataStore = create<MetadataStore>((set) => ({
  role: null,
  setRole: (role) => set({ role }),
}));
