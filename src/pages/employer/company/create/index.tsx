import EmployerLayout from "@components/layouts/EmployerLayout";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";

const CompanyCreatePage: NextPage = () => {
  const { data: session } = useSession();
  return (
    <EmployerLayout title="Company Create Page">
      <div className="max-w-lg">
        <form>
          <div className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="companyName"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="companyName"
                  id="companyName"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Company Name"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="companyLocation"
                className="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="companyLocation"
                  id="companyLocation"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Company Location"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="companyAdmin"
                className="block text-sm font-medium text-gray-700"
              >
                Admin
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="companyAdmin"
                  id="companyAdmin"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:cursor-not-allowed sm:text-sm"
                  placeholder="Company Admin"
                  defaultValue={session?.user?.email || ""}
                  disabled
                />
              </div>
            </div>
            <button
              type="button"
              className="mr-auto inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </EmployerLayout>
  );
};

export default CompanyCreatePage;
