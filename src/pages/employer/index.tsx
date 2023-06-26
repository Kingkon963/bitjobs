import CreateJobButton from "@components/employer/CreateJobButton";
import JobsPanelByTab from "@components/employer/JobsPanelByTab";
import EmployerLayout from "@components/layouts/EmployerLayout";
import { type NextPage } from "next";

const EmployerPage: NextPage = () => {
  return (
    <EmployerLayout>
      <div className="flex justify-end">
        <CreateJobButton />
      </div>
      <JobsPanelByTab />
    </EmployerLayout>
  );
};

export default EmployerPage;
