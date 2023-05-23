import { PrismaClient } from "@prisma/client";
import londonAreasList from "../src/data/londonAreasList";
const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);
  await prisma.londonAddress.deleteMany({});
  londonAreasList.map(async (area) => {
    await prisma.londonAddress.create({
      data: {
        location: area.location,
        borough: area.borough,
        postcode: area.postCodes,
        postTown: area.postTown,
      },
    });
  });
}

main()
  .then(() => {
    console.log("seeding done");
  })
  .catch((e) => {
    console.log("seeding failed", e);
    process.exit(1);
  });

export default main;
