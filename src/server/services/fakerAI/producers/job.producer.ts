import { EmploymentType, JobStatus } from "@prisma/client";
import { prisma } from "../../../db.js";
import selectRandom from "../utils/selectRandom.js";
import Completion from "../../openai/services/Completion.js";

const JobProducer = {
  companyId: "",
  setCompanyId: (companyId: string) => {
    JobProducer.companyId = companyId;
  },

  addressId: "",
  setAddressId: (addressId: string) => {
    JobProducer.addressId = addressId;
  },

  totalAmount: 1,
  setTotalAmount: (totalAmount: number) => {
    JobProducer.totalAmount = totalAmount;
  },


  createEntity: async ({title, description}: {title?: string, description?: string}) => {    
    await prisma.job.create({
      data: {
        title: title || "Software Engineer",
        description: description || "We are looking for a software engineer to join our team",
        company: {
          connect: {
            id: JobProducer.companyId,
          },
        },
        employmentType: selectRandom([
          EmploymentType.FullTime,
          EmploymentType.Contract,
          EmploymentType.PartTime,
          EmploymentType.Internship,
        ]),
        location: {
          connect: {
            id: JobProducer.addressId,
          },
        },
        status: JobStatus.Open,
      },
    });
  },

  produce: async () => {
    const companies = await prisma.company.findMany({});
    JobProducer.setCompanyId(selectRandom(companies)?.id || "");
    if (!JobProducer.companyId) {
      throw new Error("JobProducer: companyId is not set");
    }

    const addresses = await prisma.address.findMany({});
    JobProducer.setAddressId(selectRandom(addresses)?.id || "");
    if (!JobProducer.addressId) {
      throw new Error("JobProducer: No address found");
    }

    
    
    for (let i = 0; i < JobProducer.totalAmount; i++) {
      const jobTitle = (await Completion("Generate a job title: ")).trim();
      const jobDescription = (await Completion(`Generate a job description for ${jobTitle}: `)).trim();

      await JobProducer.createEntity({
        title: jobTitle,
        description: jobDescription,
      });

      console.log(`JobProducer: ${i + 1}/${JobProducer.totalAmount} jobs created`);
    }
  },
};

export default JobProducer;
