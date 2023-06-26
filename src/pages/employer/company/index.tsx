import EmployerLayout from "@components/layouts/EmployerLayout";
import { api } from "@utils/api";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";

const CompanyPage: NextPage = () => {
  const { data: session } = useSession();
  const getCompanyQuery = api.company.get.useQuery({
    userId: session?.user?.id || "",
  });

  const isLoaded = getCompanyQuery.isSuccess;
  const isError = getCompanyQuery.isError;
  const company = getCompanyQuery.data;

  return (
    <EmployerLayout>
      {isLoaded && company && (
        <div>
          <h1 className="text-4xl">{company.name}</h1>
          <p className="mt-1 text-xl">{company.location}</p>
        </div>
      )}
      {isError && <p>Something went wrong</p>}
    </EmployerLayout>
  );
};

export default CompanyPage;
