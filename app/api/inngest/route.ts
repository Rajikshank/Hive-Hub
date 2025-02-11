import { inngest } from "@/utils/inngest/client";
import { serve } from "inngest/next";
import { handleJobExpiration } from "./functions";
 

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    /* your functions will be passed here later! */
    handleJobExpiration
  ],
});
