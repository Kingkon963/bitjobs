import { generateComponents } from "@uploadthing/react";
import { generateReactHelpers } from "@uploadthing/react/hooks";

import type { OurFileRouter } from "~/server/services/uploadthing/uploadthing";

export const { UploadButton, UploadDropzone, Uploader, useUploadThing } = {
  ...generateComponents<OurFileRouter>(),
  ...generateReactHelpers<OurFileRouter>(),
};
