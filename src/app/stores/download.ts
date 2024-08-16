import { create } from "zustand";

type DownloadStoreProps = {
  downloads: number;
  downloaded(): void
};

export const useDownloadStore = create<DownloadStoreProps>((set) => ({
  downloads: 0,
  downloaded: () => set((state) => ({ downloads: state.downloads + 1 })),
}));
