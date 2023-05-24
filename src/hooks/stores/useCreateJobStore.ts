import { create } from "zustand";

interface CreateJobStore {
  jobId: string;
  setJobId: (jobId: string) => void;
  currStep: number;
  totalStep: number;
  goNextStep: () => void;
  goPrevStep: () => void;
  setStep: (step: number) => void;
  reset: () => void;
}

const useCreateJobStore = create<CreateJobStore>()((set) => ({
  jobId: "",
  setJobId: (jobId: string) => set({ jobId }),
  currStep: 1,
  totalStep: 4,
  goNextStep: () =>
    set((state) => ({
      currStep:
        state.currStep + 1 > state.totalStep
          ? state.totalStep
          : state.currStep + 1,
    })),
  goPrevStep: () =>
    set((state) => ({
      currStep: state.currStep - 1 < 1 ? 1 : state.currStep - 1,
    })),
  setStep: (step) => set(() => ({ currStep: step })),
  reset: () => set(() => ({ currStep: 1, jobId: "" })),
}));

export default useCreateJobStore;
