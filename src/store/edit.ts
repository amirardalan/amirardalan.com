import { create } from 'zustand';

type EditPostStore = {
  currentPostPublished: boolean | null;
  setCurrentPostPublished: (published: boolean | null) => void;
};

export const useEditPostStore = create<EditPostStore>((set) => ({
  currentPostPublished: null,
  setCurrentPostPublished: (published) =>
    set({ currentPostPublished: published }),
}));
