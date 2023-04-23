import Stepper, { type StepProps } from "@components/Stepper";
import JobDescriptionForm from "@components/employer/JobDescriptionForm";
import JobLocationForm from "@components/employer/JobLocationForm";
import EmployerLayout from "@components/layouts/EmployerLayout";
import { api } from "@utils/api";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const steps: StepProps[] = [
  { id: "01", name: "Job description", href: "?step=1", status: "complete" },
  { id: "02", name: "Job location", href: "?step=2", status: "current" },
  { id: "03", name: "Employment type", href: "?step=3", status: "upcoming" },
  { id: "04", name: "Company info", href: "?step=4", status: "upcoming" },
  { id: "05", name: "Preview", href: "?step=5", status: "upcoming" },
];

const JobCreationPage: NextPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();
  const { step } = router.query;

  useEffect(() => {
    if (step) {
      setCurrentStep(Number(step));
    }
  }, [step]);

  const handleNextStep = () => {
    if (currentStep === steps.length) return;
    setCurrentStep((prev) => prev + 1);
  };
  const handlePrevStep = () => {
    if (currentStep === 1) return;
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <EmployerLayout>
      <>
        <h1 className="text-2xl font-semibold">Create a new job</h1>
        <div className="my-5">
          <Stepper definedSteps={steps} doneTill={currentStep - 1} />
        </div>
        {/* Step Content */}
        <div className="my-5">
          {currentStep === 1 && <JobDescriptionForm />}
          {currentStep === 2 && <JobLocationForm />}
        </div>

        {/* Step Control Btns  */}
        <div className="my-5">
          <div className="flex justify-between">
            <button
              className="inline-flex items-center rounded bg-gray-200 py-2 px-4 font-bold text-gray-800 hover:bg-gray-300"
              onClick={handlePrevStep}
            >
              <svg
                className="mr-2 h-4 w-4"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
              <span>Previous</span>
            </button>
            <button
              className="inline-flex items-center rounded bg-indigo-500 py-2 px-4 font-bold text-white hover:bg-indigo-700"
              onClick={handleNextStep}
            >
              <span>Next</span>
              <svg
                className="ml-2 h-4 w-4"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </>
    </EmployerLayout>
  );
};

export default JobCreationPage;
