import JobFeed from "@components/jobseeker/JobFeed";
import JobseekerLayout from "@components/layouts/JobseekerLayout";
import { type NextPage } from "next";

const JobseekerPage: NextPage = () => {
  return (
    <JobseekerLayout>
      <div className="flex gap-2">
        <div className="max-w-xs flex-1 border p-2">a</div>
        <div className="flex-1 border p-2">
          <JobFeed />
        </div>
        {/* <div className="max-w-xs flex-1 border p-2">c</div> */}
      </div>
    </JobseekerLayout>
  );
};

export default JobseekerPage;
