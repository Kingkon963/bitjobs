import { EmploymentType, JobStatus } from "@prisma/client";
import { prisma } from "../../../db.js";
import selectRandom from "../utils/selectRandom.js";

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


  createEntity: async () => {    
    await prisma.job.create({
      data: {
        title: "Software Engineer",
        description: "We are looking for a software engineer to join our team",
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
    JobProducer.companyId = selectRandom(companies)?.id || "";
    if (!JobProducer.companyId) {
      throw new Error("JobProducer: companyId is not set");
    }

    const addresses = await prisma.address.findMany({});
    JobProducer.addressId = selectRandom(addresses)?.id || "";
    if (!JobProducer.addressId) {
      throw new Error("JobProducer: No address found");
    }


    for (let i = 0; i < JobProducer.totalAmount; i++) {
      await JobProducer.createEntity();
    }
  },
};

export default JobProducer;
