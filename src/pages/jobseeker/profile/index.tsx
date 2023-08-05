import EditWorkExperienceDialog from "@components/jobseeker/profile/EditWorkExperienceDialog";
import PersonalInfo from "@components/jobseeker/profile/PersonalInfo";
import UploadCV from "@components/jobseeker/profile/UploadCV";
import WorkExperienceList from "@components/jobseeker/profile/WorkExperienceList";
import JobseekerLayout from "@components/layouts/JobseekerLayout";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { type NextPage } from "next";
import { BsPlusCircle } from "react-icons/bs";
import { RxAvatar } from "react-icons/rx";

const JobseekerProfilePage: NextPage = () => {
  return (
    <>
      <JobseekerLayout>
        <div className="mb-24 flex gap-2">
          {/* Left panel */}
          <div className="sticky top-10 max-w-xs flex-1 border p-2 ">
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
            <div className="flex w-full flex-col gap-4 border p-2">
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
                />
                <label
                  htmlFor="profile-info-accordion-2"
                  className="collapse-title text-xl font-medium"
                >
                  Education
                </label>
                <div className="collapse-content">Education</div>
              </div>
              <div className="collapse bg-base-200">
                <input
                  type="radio"
                  name="profile-info-accordion"
                  id="profile-info-accordion-3"
                />
                <label
                  htmlFor="profile-info-accordion-3"
                  className="collapse-title text-xl font-medium flex items-center"
                >
                  <span className="flex-1">Work Experience</span>
                  <EditWorkExperienceDialog>
                    <DialogTrigger className="btn-ghost btn">
                      <BsPlusCircle className="inline-block ml-0 w-5 h-5" /> Add
                    </DialogTrigger>
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
