"use server";

import { NextResponse } from "next/server";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";
import { currentUser } from "@clerk/nextjs/server";
import { getVideoDetails } from "@/actions/getVideoDetails";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

const model = google("gemini-1.5-flash");

function errorHandler(error: unknown) {
  if (error == null) {
    return "unknown error";
  }

  if (typeof error === "string") {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return JSON.stringify(error);
}

export async function POST(req: Request) {
  try {
    const { messages, videoId } = await req.json();

    // const user = await currentUser();

    // if (!user) {
    //   return NextResponse.json(
    //     { error: "Unauthorized from clerk" },
    //     { status: 401 }
    //   );
    // }

    const videoDetails = await getVideoDetails(videoId);

    const systemMessage = `You are an AI agent ready to accept questions from the user about ONE specific video. The video ID in question is ${videoId} but you'll refer to this as ${
      videoDetails?.title || "Selected Video"
    }. Use emojis to make the conversation more engaging. If an error occurs, explain it to the user and ask them to try again later. If the error suggest the user upgrade, explain that they must upgrade to use the feature, tell them to go to 'Manage Plan' in the header and upgrade. If any tool is used, analyse the response and if it contains a cache, explain that the transcript is cached because they previously transcribed the video saving the user a token - use words like database instead of cache to make it more easy to understand. Format for notion.`;

    const result = streamText({
      model,
      messages: [
        {
          role: "system",
          content: systemMessage,
        },
        ...messages,
      ],
    });

    console.log(messages);

    return result.toDataStreamResponse({
      getErrorMessage: errorHandler,
    });
  } catch (error) {
    // Handle any synchronous errors that might occur
    return NextResponse.json({ error: errorHandler(error) }, { status: 500 });
  }
}
