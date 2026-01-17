
import { create } from 'zustand';
import { User, OccasionAsset, MarketplaceAsset, GeneratedAsset } from '../types';

interface AppState {
  user: User | null;
  assets: OccasionAsset[];
  marketplace: MarketplaceAsset[];
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setAssets: (assets: OccasionAsset[]) => void;
  setMarketplace: (assets: MarketplaceAsset[]) => void;
  updateCredits: (type: 'images' | 'videos', amount: number) => void;
  addToHistory: (asset: GeneratedAsset) => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  assets: [],
  marketplace: [],
  isLoading: false,
  setUser: (user) => set({ user }),
  setAssets: (assets) => set({ assets }),
  setMarketplace: (marketplace) => set({ marketplace }),
  updateCredits: (type, amount) => set((state) => {
    if (!state.user) return state;
    return {
      user: {
        ...state.user,
        credits: {
          ...state.user.credits,
          [type]: state.user.credits[type] + amount
        }
      }
    };
  }),
  addToHistory: (asset) => set((state) => {
    if (!state.user) return state;
    const history = state.user.generationHistory || [];
    return {
      user: {
        ...state.user,
        generationHistory: [asset, ...history].slice(0, 10) // Keep last 10
      }
    };
  }),
}));
