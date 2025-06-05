import { titleGenerate } from "@/actions/titleGeneration";
import { tool } from "ai";
import { z } from "zod";

const generateTitle = tool({
  description: "Generate a title for a YouTube video",
  parameters: z.object({
    videoId: z.string().describe("The video ID to generate a title for"),
    videoSummary: z
      .string()
      .describe("The summary of the video to generate a title for"),
    considerations: z
      .string()
      .describe("Any additional considerations for the title"),
  }),
  execute: async ({ videoId, videoSummary, considerations }) => {
    try {
      const title = await titleGenerate(
        videoId,
        videoSummary,
        considerations
      );
      if (!title) {
        return {
          title: "No title could be generated. Please try again later.",
        };
      }
      return { title };
    } catch (e) {
      return { title: "An error occurred while generating the title." };
    }
  },
});

export default generateTitle;
