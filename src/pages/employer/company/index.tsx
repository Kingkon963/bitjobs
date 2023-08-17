import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { Skeleton } from "@/components/ui/skeleton";
import CompanyLogo from "@components/employer/CompanyLogo";
import EmployerLayout from "@components/layouts/EmployerLayout";
import { ExclamationIcon } from "@heroicons/react/outline";
import { api } from "@utils/api";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";

const CompanyPage: NextPage = () => {
  const { data: session } = useSession();
  const getCompanyQuery = api.company.get.useQuery({
    userId: session?.user?.id || "",
  });

  const isLoading = getCompanyQuery.isLoading;
  const isLoaded = getCompanyQuery.isSuccess;
  const isError = getCompanyQuery.isError;
  const company = getCompanyQuery.data;

  if (!isLoading && !company) {
    return (
      <EmployerLayout>
        <Skeleton className="h-[50vh] w-full bg-base-200" />
      </EmployerLayout>
    );
  }

  if (isError) {
    return (
      <EmployerLayout>
        <Alert>
          <ExclamationIcon className="h-5 w-5" />
          <AlertTitle>Failed to Load data!</AlertTitle>
          <AlertDescription>{"Something went wrong"}</AlertDescription>
        </Alert>
      </EmployerLayout>
    );
  }

  return (
    <EmployerLayout>
      {isLoaded && company && (
        <>
          <div className="flex items-center gap-16">
            <CompanyLogo
              companyId={company.id}
              logoUrl={company.imageUrl || ""}
              alt={company.name}
            />
            <div>
              <h1 className="text-7xl">{company.name}</h1>
              <p className="mt-1 text-2xl">{company.location}</p>
            </div>
          </div>
        </>
      )}
    </EmployerLayout>
  );
};

export default CompanyPage;
