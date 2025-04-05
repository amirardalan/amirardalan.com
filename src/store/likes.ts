import { create } from 'zustand';

interface LikesState {
  likes: Record<number, number>;
  error: Record<number, string>;
  initialLoadingStates: Record<number, boolean>;
  lastFetchTime: Record<number, number>;
  fetchDebounceTime: number;
  fetchLikes: (postId: number, force?: boolean) => Promise<void>;
  updateLike: (postId: number, like: boolean) => Promise<void>;
}

export const useLikesStore = create<LikesState>((set, get) => ({
  likes: {},
  error: {},
  initialLoadingStates: {},
  lastFetchTime: {},
  fetchDebounceTime: 30000, // 30 seconds

  fetchLikes: async (postId: number, force: boolean = false) => {
    const { lastFetchTime, fetchDebounceTime } = get();
    const now = Date.now();

    // Skip fetch if we've fetched recently and not forced
    if (
      !force &&
      lastFetchTime[postId] &&
      now - lastFetchTime[postId] < fetchDebounceTime
    ) {
      return;
    }

    set((state) => ({
      initialLoadingStates: { ...state.initialLoadingStates, [postId]: true },
    }));

    try {
      const response = await fetch(`/api/like?postId=${postId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch likes');
      }
      const data = await response.json();

      set((state) => ({
        likes: { ...state.likes, [postId]: data.likes },
        initialLoadingStates: {
          ...state.initialLoadingStates,
          [postId]: false,
        },
        lastFetchTime: { ...state.lastFetchTime, [postId]: now },
      }));
    } catch (err) {
      console.error('Error fetching likes:', err);
      set((state) => ({
        error: { ...state.error, [postId]: 'Failed to load likes' },
        initialLoadingStates: {
          ...state.initialLoadingStates,
          [postId]: false,
        },
      }));
    }
  },

  updateLike: async (postId: number, like: boolean) => {
    try {
      const response = await fetch('/api/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId, like }),
      });

      if (!response.ok) {
        throw new Error('Failed to update like');
      }

      const data = await response.json();

      set((state) => ({
        likes: { ...state.likes, [postId]: data.likes },
        lastFetchTime: { ...state.lastFetchTime, [postId]: Date.now() },
      }));
    } catch (err) {
      console.error('Error updating like:', err);
      set((state) => ({
        error: { ...state.error, [postId]: 'Failed to update like' },
      }));
      throw err;
    }
  },
}));
