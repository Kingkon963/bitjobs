import { createNextPageApiHandler } from "uploadthing/next-legacy";
 
import { ourFileRouter } from "~/server/services/uploadthing/uploadthing";
 
const handler = createNextPageApiHandler({
  router: ourFileRouter,
});
 
export default handler;