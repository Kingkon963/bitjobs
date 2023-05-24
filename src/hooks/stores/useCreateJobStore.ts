import { create } from "zustand";

interface CreateJobStore {
  jobId: string;
  setJobId: (jobId: string) => void;
  currStep: number;
  goNextStep: () => void;
  goPrevStep: () => void;
  setStep: (step: number) => void;
}

const useCreateJobStore = create<CreateJobStore>()((set) => ({
  jobId: "",
  setJobId: (jobId: string) => set({ jobId }),
  currStep: 1,
  goNextStep: () => set((state) => ({ currStep: state.currStep + 1 })),
  goPrevStep: () => set((state) => ({ currStep: state.currStep - 1 })),
  setStep: (step) => set(() => ({ currStep: step })),
}));

export default useCreateJobStore;