import EmptyState from "@components/EmptyState";
import { useRouter } from "next/router";
import React from "react";
import DraftJobList from "./DraftJobList";

type Tab = {
  name: string;
};
const tabs: Tab[] = [{ name: "Active" }, { name: "Closed" }, { name: "Draft" }];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function JobsPanelByTab() {
  const [selectedTab, setSelectedTab] = React.useState<Tab>(tabs[0] as Tab);
  const router = useRouter();

  const handleTabChange = (tab: Tab) => {
    console.log("handleTabChange", tab);
    setSelectedTab(tab);
  };

  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 sm:px-6">
        <div>
          <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">
              Select a tab
            </label>
            {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
            <select
              id="tabs"
              name="tabs"
              className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              defaultValue={selectedTab.name}
            >
              {tabs.map((tab) => (
                <option key={tab.name}>{tab.name}</option>
              ))}
            </select>
          </div>
          <div className="hidden sm:block">
            <div className="border-b-0 border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                {tabs.map((tab) => (
                  <span
                    key={tab.name}
                    className={classNames(
                      tab.name === selectedTab.name
                        ? "border-indigo-500 text-indigo-600"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                      "cursor-pointer select-none whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium"
                    )}
                    aria-current={
                      tab.name === selectedTab.name ? "page" : undefined
                    }
                    onClick={() => handleTabChange(tab)}
                  >
                    {tab.name}
                  </span>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 py-5 sm:p-6">
        {selectedTab.name === "Active" && (
          <EmptyState
            title="No active jobs"
            description="Get started by creating a new job."
            buttonLabel="Create one"
            buttonOnClick={() => void router.push("/employer/job/create")}
          />
        )}

        {selectedTab.name === "Closed" && (
          <EmptyState
            title="No closed jobs"
            description="Get started by creating a new job."
            buttonLabel="Create one"
            buttonOnClick={() => void router.push("/employer/job/create")}
          />
        )}

        {selectedTab.name === "Draft" && <DraftJobList />}
      </div>
    </div>
  );
}

export default JobsPanelByTab;
