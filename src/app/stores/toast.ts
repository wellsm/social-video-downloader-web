import { toast } from "sonner";
import { create } from "zustand";

type ToastStoreProps = {
  isToastOpen: boolean;
  toastMessage: string;
  toastDescription: string;
  toastAction: ToastActionProps | null;
  closeToast(): void;
  openToast(
    title?: string,
    description?: string,
    action?: ToastActionProps,
    duration?: number
  ): void;
};

type ToastActionProps = {
  label: string;
  onClick(): void;
};

export const useToastStore = create<ToastStoreProps>((set) => ({
  isToastOpen: false,
  toastMessage: "",
  toastDescription: "",
  toastAction: null,
  closeToast: () => set(() => ({ isToastOpen: false })),
  openToast: (
    title?: string,
    description?: string,
    action?: ToastActionProps,
    duration?: number
  ) => {
    toast(title, { description, action, duration: duration ?? 3000 });
  },
}));
