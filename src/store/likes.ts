import { create } from 'zustand';
import { fetcher } from '@/utils/fetcher';

interface LikesState {
  likes: Record<number, number>;
  loadingStates: Record<number, boolean>;
  initialLoadingStates: Record<number, boolean>;
  error: Record<number, any>;
  fetchLikes: (postId: number) => Promise<void>;
  updateLike: (postId: number, liked: boolean) => Promise<void>;
}

export const useLikesStore = create<LikesState>((set, get) => ({
  likes: {},
  loadingStates: {},
  initialLoadingStates: {},
  error: {},

  fetchLikes: async (postId: number) => {
    // Always set initial loading state to true before fetching
    set((state) => ({
      initialLoadingStates: { ...state.initialLoadingStates, [postId]: true },
      loadingStates: { ...state.loadingStates, [postId]: true },
    }));

    try {
      const data = await fetcher(`/api/stats?postId=${postId}`);

      // Short delay to ensure smooth loading transitions
      await new Promise((resolve) => setTimeout(resolve, 300));

      set((state) => ({
        likes: {
          ...state.likes,
          [postId]: data?.likes || 0,
        },
        loadingStates: {
          ...state.loadingStates,
          [postId]: false,
        },
        initialLoadingStates: {
          ...state.initialLoadingStates,
          [postId]: false,
        },
      }));
    } catch (error) {
      set((state) => ({
        error: {
          ...state.error,
          [postId]: error,
        },
        loadingStates: {
          ...state.loadingStates,
          [postId]: false,
        },
        initialLoadingStates: {
          ...state.initialLoadingStates,
          [postId]: false,
        },
      }));
    }
  },

  updateLike: async (postId: number, liked: boolean) => {
    const currentLikes = get().likes[postId] || 0;

    // Optimistically update UI without setting loading state
    set((state) => ({
      likes: {
        ...state.likes,
        [postId]: liked ? currentLikes + 1 : Math.max(0, currentLikes - 1),
      },
    }));

    try {
      const response = await fetch('/api/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, like: liked }),
      });

      if (!response.ok) {
        throw new Error(
          liked ? 'Failed to like post' : 'Failed to unlike post'
        );
      }

      const { likes: newLikes } = await response.json();

      set((state) => ({
        likes: {
          ...state.likes,
          [postId]: newLikes,
        },
      }));

      return newLikes;
    } catch (error) {
      // Revert optimistic update on error
      set((state) => ({
        likes: {
          ...state.likes,
          [postId]: currentLikes,
        },
        error: {
          ...state.error,
          [postId]: error,
        },
      }));
      throw error;
    }
  },
}));
