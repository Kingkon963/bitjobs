import JobseekerLayout from "@components/layouts/JobseekerLayout";
import { type NextPage } from "next";
import { RxAvatar } from "react-icons/rx";

const JobseekerProfilePage: NextPage = () => {
  return (
    <JobseekerLayout>
      <div className="flex gap-2">
        <div className="max-w-xs flex-1 border p-2">
          <div className="flex flex-col items-center justify-center">
            <div className="avatar">
              <div className="w-24 rounded-full">
                <RxAvatar className="h-full w-full" />
              </div>
            </div>
            <h3 className="text-xl">Name</h3>
          </div>
        </div>
        <div className="flex-1 border p-2">
          <div className="collapse bg-base-200">
            <input type="radio" name="my-accordion-1" checked />
            <div className="collapse-title text-xl font-medium">
              Click to open this one and close others
            </div>
            <div className="collapse-content">
              <p>hello</p>
            </div>
          </div>
          <div className="collapse bg-base-200">
            <input type="radio" name="my-accordion-1" />
            <div className="collapse-title text-xl font-medium">
              Click to open this one and close others
            </div>
            <div className="collapse-content">
              <p>hello</p>
            </div>
          </div>
          <div className="collapse bg-base-200">
            <input type="radio" name="my-accordion-1" />
            <div className="collapse-title text-xl font-medium">
              Click to open this one and close others
            </div>
            <div className="collapse-content">
              <p>hello</p>
            </div>
          </div>
        </div>
        {/* <div className="max-w-xs flex-1 border p-2">c</div> */}
      </div>
    </JobseekerLayout>
  );
};

// export

export default JobseekerProfilePage;
