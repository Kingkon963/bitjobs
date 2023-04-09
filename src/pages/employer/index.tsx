import JobsPanelByTab from "@components/employer/JobsPanelByTab";
import EmployerLayout from "@components/layouts/EmployerLayout";
import { type NextPage } from "next";



const EmployerPage: NextPage = () => {
  return (
    <EmployerLayout>
      <JobsPanelByTab />
    </EmployerLayout>
  );
};

export default EmployerPage;
