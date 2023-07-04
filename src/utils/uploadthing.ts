import { generateComponents } from "@uploadthing/react";
 
import type { OurFileRouter } from "~/server/services/uploadthing/uploadthing";
 
export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<OurFileRouter>();