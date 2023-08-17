import EditEducationDialog from "@components/jobseeker/profile/EditEducationDialog";
import EditWorkExperienceDialog from "@components/jobseeker/profile/EditWorkExperienceDialog";
import EducationList from "@components/jobseeker/profile/EducationList";
import PersonalInfo from "@components/jobseeker/profile/PersonalInfo";
import UploadCV from "@components/jobseeker/profile/UploadCV";
import WorkExperienceList from "@components/jobseeker/profile/WorkExperienceList";
import JobseekerLayout from "@components/layouts/JobseekerLayout";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { type NextPage } from "next";
import { BsPlusCircle } from "react-icons/bs";
import { RxAvatar } from "react-icons/rx";
import useWorkExperience from "~/hooks/stores/useWorkExperience";

const JobseekerProfilePage: NextPage = () => {
  const setOpenWeDialog = useWorkExperience((store) => store.setOpenDialog);
  const resetWorkExperienceData = useWorkExperience((store) => store.reset);

  const openAddWorkExperienceDialog = () => {
    resetWorkExperienceData();
    setOpenWeDialog(true);
  };

  return (
    <>
      <JobseekerLayout>
        <div className="mb-24 flex gap-2">
          {/* Left panel */}
          <div className="sticky top-10 max-w-xs flex-1 p-2 ">
            <div className="flex flex-col items-center justify-center">
              <div className="avatar">
                <div className="w-24 rounded-full">
                  <RxAvatar className="h-full w-full" />
                </div>
              </div>
              <h3 className="text-xl">Name</h3>
            </div>
          </div>

          {/* Right panel */}
          <div className="flex-1">
            <div className="flex w-full flex-col gap-4 p-2">
              <div className="collapse overflow-visible bg-base-200">
                <input
                  type="radio"
                  name="profile-info-accordion"
                  id="profile-info-accordion-1"
                  defaultChecked
                />
                <label
                  htmlFor="profile-info-accordion-1"
                  className="collapse-title text-xl font-medium"
                >
                  Personal Information
                </label>
                <div className="collapse-content">
                  <PersonalInfo />
                </div>
              </div>
              <div className="collapse bg-base-200">
                <input
                  type="radio"
                  name="profile-info-accordion"
                  id="profile-info-accordion-2"
                  className="border border-red-500"
                />
                <label
                  htmlFor="profile-info-accordion-2"
                  className="collapse-title flex items-center text-xl font-medium"
                >
                  <span className="flex-1">Education</span>
                  <EditEducationDialog>
                    <DialogTrigger
                      className="btn-ghost btn"
                      onClick={() => {
                        console.log("clicked");
                      }}
                    >
                      <BsPlusCircle className="ml-0 inline-block h-5 w-5" /> Add
                    </DialogTrigger>
                  </EditEducationDialog>
                </label>
                <div className="collapse-content">
                  <EducationList />
                </div>
              </div>
              <div className="collapse bg-base-200">
                <input
                  type="radio"
                  name="profile-info-accordion"
                  id="profile-info-accordion-3"
                />
                <label
                  htmlFor="profile-info-accordion-3"
                  className="collapse-title flex items-center text-xl font-medium"
                >
                  <span className="flex-1">Work Experience</span>
                  <EditWorkExperienceDialog>
                    <button
                      className="btn-ghost btn"
                      onClick={openAddWorkExperienceDialog}
                    >
                      <BsPlusCircle className="ml-0 inline-block h-5 w-5" /> Add
                    </button>
                  </EditWorkExperienceDialog>
                </label>
                <div className="collapse-content">
                  <WorkExperienceList />
                </div>
              </div>
              <div className="collapse bg-base-200">
                <input
                  type="radio"
                  name="profile-info-accordion"
                  id="profile-info-accordion-4"
                />
                <label
                  htmlFor="profile-info-accordion-4"
                  className="collapse-title text-xl font-medium"
                >
                  Upload CV/Resume
                </label>
                <div className="collapse-content">
                  <UploadCV />
                </div>
              </div>
            </div>
          </div>
          {/* <div className="max-w-xs flex-1 border p-2">c</div> */}
        </div>
      </JobseekerLayout>
    </>
  );
};

// export

export default JobseekerProfilePage;
