import { create } from "zustand";

interface CreateJobStore {
  jobId: string;
  setJobId: (jobId: string) => void;
}

const useCreateJobStore = create<CreateJobStore>()((set) => ({
  jobId: "",
  setJobId: (jobId: string) => set({ jobId }),
}));

export default useCreateJobStore;
