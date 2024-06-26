import { PrismaClient } from "@prisma/client";
import londonAreasList from "../src/data/londonAreasList";
const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);
  await prisma.londonAddress.deleteMany({});
  for (const area of londonAreasList) {
    await prisma.londonAddress.create({
      data: {
        location: area.location,
        borough: area.borough,
        postcode: area.postCodes,
        postTown: area.postTown,
      },
    });
  }
}

main()
  .then(() => {
    console.log("seeding done");
  })
  .catch(() => {
    console.log("seeding failed");
    process.exit(1);
  })
  .finally(() => {
    prisma
      .$disconnect()
      .then(() => {
        console.log("prisma disconnected");
      })
      .catch(() => {
        console.log("disconnect failed");
        process.exit(1);
      });
  });

export default main;
