import { create } from 'zustand';

interface ViewsState {
  views: Record<string, number>;
  error: Record<string, string | null>;
  initialLoadingStates: Record<string, boolean>;
  lastFetchTime: Record<string, number>;
  fetchDebounceTime: number;
  fetchViews: (route: string, force?: boolean) => Promise<void>;
}

export const useViewsStore = create<ViewsState>((set, get) => ({
  views: {},
  error: {},
  initialLoadingStates: {},
  lastFetchTime: {},
  fetchDebounceTime: 60000, // 60 seconds

  fetchViews: async (route: string, force: boolean = false) => {
    const { lastFetchTime, fetchDebounceTime, initialLoadingStates } = get();
    const now = Date.now();

    if (
      !force &&
      initialLoadingStates[route] === false &&
      lastFetchTime[route] &&
      now - lastFetchTime[route] < fetchDebounceTime
    ) {
      return;
    }

    if (initialLoadingStates[route] === undefined || force) {
      set((state) => ({
        initialLoadingStates: { ...state.initialLoadingStates, [route]: true },
        error: { ...state.error, [route]: null },
      }));
    }

    try {
      const res = await fetch(`/api/views?route=${encodeURIComponent(route)}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch views (status: ${res.status})`);
      }
      const data = await res.json();
      const fetchedViews = data.views ?? 0;

      set((state) => ({
        views: { ...state.views, [route]: fetchedViews },
        initialLoadingStates: { ...state.initialLoadingStates, [route]: false },
        lastFetchTime: { ...state.lastFetchTime, [route]: now },
        error: { ...state.error, [route]: null },
      }));
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred';
      console.error(`Error fetching views for ${route}:`, err);
      set((state) => ({
        error: { ...state.error, [route]: errorMessage },
        initialLoadingStates: { ...state.initialLoadingStates, [route]: false }, // Ensure loading stops on error
      }));
    }
  },
}));
