import { type workExpDialogFormSchema } from "@components/jobseeker/profile/EditWorkExperienceDialog";
import { type z } from "zod";
import { create } from "zustand";

type State = {
  currId: string | undefined
  openDialog: boolean
  data: z.infer<typeof workExpDialogFormSchema> | undefined
}

type Action = {
  setOpenDialog: (openDialog: boolean) => void
  setData: (data: z.infer<typeof workExpDialogFormSchema> | undefined) => void
  setCurrentId: (currId: string | undefined) => void
  reset: () => void
}

export const useWorkExperience = create<State & Action>((set) => ({
  currId: undefined,
  openDialog: false,
  data: undefined,
  setOpenDialog: (openDialog) => set({ openDialog }),
  setData: (data) => set({ data }),
  setCurrentId: (currId) => set({ currId }),
  reset: () => set(() => ({ currId: undefined, openDialog: false, data: undefined })),
}))

export default useWorkExperience
  