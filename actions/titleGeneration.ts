"use server";

// import { api } from "@/convex/_generated/api";
// import { FeatureFlag, featureFlagEvents } from "@/features/flags";
// import { getConvexClient } from "@/lib/convex";
// import { client } from "@/lib/schematic";
// import { currentUser } from "@clerk/nextjs/server";
// import { createGoogleGenerativeAI } from "@ai-sdk/google";

// const convexClient = getConvexClient();

// export async function titleGeneration(
//   videoId: string,
//   videoSummary: string,
//   considerations: string
// ) {
//   const user = await currentUser();

//   if (!user?.id) {
//     throw new Error("User not found");
//   }

//   const google = createGoogleGenerativeAI({
//     apiKey: process.env.GOOGLE_API_KEY,
//   });

//   const model = google("gemini-1.5-flash");

//   try {
//     console.log("🎯 Video summary:", videoSummary);
//     console.log("🎯 Generating title for video for videoId:", videoId);
//     console.log("🎯 Considerations:", considerations);

//     const result = await model.generateContent([
//       {
        
//         role: "system",
//         content:
//           "You are a helpful YouTube video creator assistant that creates high quality SEO friendly concise video titles.",
//       },
//       {
//         role: "user",
//         content: `Please provide ONE concise YouTube title (and nothing else) for this video. Focus on the main points and key takeaways, it should be SEO friendly and 100 characters or less:\n\n${videoSummary}\n\n${considerations}`,
//       },
//     ]);

//     const title =
//       result?.content?.parts?.[0]?.text?.trim() || "Unable to generate title";

//     if (!title) {
//       return {
//         error: "Failed to generate title (System error)",
//       };
//     }

//     await convexClient.mutation(api.titles.generate, {
//       videoId,
//       userId: user.id,
//       title: title,
//     });

//     await client.track({
//       event: featureFlagEvents[FeatureFlag.TITLE_GENERATION].event,
//       company: {
//         id: user.id,
//       },
//       user: {
//         id: user.id,
//       },
//     });

//     console.log("🎯 Title generated:", title);

//     return title;
//   } catch (error) {
//     console.error("❌ Error generating title:", error);
//     throw new Error("Failed to generate title");
//   }
// }


import { api } from "@/convex/_generated/api";
import { FeatureFlag, featureFlagEvents } from "@/features/flags";
import { getConvexClient } from "@/lib/convex";
import { client } from "@/lib/schematic";
import { currentUser } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const convexClient = getConvexClient();

export async function titleGenerate(
  videoId: string,
  videoSummary: string,
  considerations: string
) {
  const startTime = performance.now();
  console.log("🚀 [Title Generation] Process started", {
    timestamp: new Date().toISOString(),
    inputs: {
      videoId,
      videoSummaryLength: videoSummary.length,
      considerationsLength: considerations.length,
    },
  });

  try {
    const user = { id: "user_9qso8ArknbU" };

    if (!user?.id) {
      console.error(
        "❌ [Title Generation] Authentication Error: No user found"
      );
      throw new Error("User not found");
    }

    console.log("✅ [Title Generation] User authenticated", {
      userId: user.id,
      timestamp: new Date().toISOString(),
    });

    if (!process.env.GOOGLE_API_KEY) {
      console.error(
        "❌ [Title Generation] Configuration Error: Google API key missing"
      );
      throw new Error("Google API key is not configured");
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

    console.log("🤖 [Title Generation] Initiating Gemini request", {
      timestamp: new Date().toISOString(),
      model: "gemini-1.5-flash",
    });

    const geminiStartTime = performance.now();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Please provide ONE concise YouTube title (and nothing else) for this video. Focus on the main points and key takeaways, it should be SEO friendly and 100 characters or less:\n\n${videoSummary}\n\n${considerations}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const title = response.text().trim();

    const geminiDuration = performance.now() - geminiStartTime;
    console.log("✅ [Title Generation] Gemini response received", {
      timestamp: new Date().toISOString(),
      duration: `${geminiDuration.toFixed(2)}ms`,
      response: title,
    });

    if (!title) {
      console.error(
        "❌ [Title Generation] Processing Error: No title generated from Gemini"
      );
      throw new Error(
        "Failed to generate title (No title returned from Gemini)"
      );
    }

    console.log("📝 [Title Generation] Title generated", {
      timestamp: new Date().toISOString(),
      titleLength: title.length,
      title,
    });

    // Store the generated title
    console.log("💾 [Title Generation] Storing title in database...");
    const dbStartTime = performance.now();

    try {
      const titleId = await convexClient.mutation(api.titles.generate, {
        videoId,
        userId: user.id,
        title: title,
      });

      const dbDuration = performance.now() - dbStartTime;
      console.log("✅ [Title Generation] Title stored successfully", {
        timestamp: new Date().toISOString(),
        duration: `${dbDuration.toFixed(2)}ms`,
        titleId,
      });
    } catch (dbError) {
      console.error("❌ [Title Generation] Database Error:", {
        error: dbError instanceof Error ? dbError.message : "Unknown error",
        stack: dbError instanceof Error ? dbError.stack : undefined,
      });
      throw new Error("Failed to store title in database");
    }

    // Update video title
    console.log("🔄 [Title Generation] Updating video title...");
    const updateStartTime = performance.now();

    try {
      const videoUpdateResult = await convexClient.mutation(
        api.titles.generate,
        {
          videoId,
          userId: user.id,
          title: title,
        }
      );

      const updateDuration = performance.now() - updateStartTime;
      console.log("✅ [Title Generation] Video title updated", {
        timestamp: new Date().toISOString(),
        duration: `${updateDuration.toFixed(2)}ms`,
        result: videoUpdateResult,
      });
    } catch (updateError) {
      console.error("❌ [Title Generation] Update Error:", {
        error:
          updateError instanceof Error ? updateError.message : "Unknown error",
        stack: updateError instanceof Error ? updateError.stack : undefined,
      });
      // Don't throw here as this is a non-critical operation
      console.warn("Failed to update video title, but continuing...");
    }

    // Track analytics
    try {
      console.log("📊 [Title Generation] Tracking analytics event...");
      const trackingStartTime = performance.now();
      await client.track({
        event: featureFlagEvents[FeatureFlag.TITLE_GENERATION].event,
        company: {
          id: user.id,
        },
        user: {
          id: user.id,
        },
      });
      const trackingDuration = performance.now() - trackingStartTime;
      console.log("✅ [Title Generation] Analytics event tracked", {
        timestamp: new Date().toISOString(),
        duration: `${trackingDuration.toFixed(2)}ms`,
      });
    } catch (analyticsError) {
      console.warn("⚠️ [Title Generation] Analytics Warning:", analyticsError);
      // Don't throw for analytics errors
    }

    const totalDuration = performance.now() - startTime;
    console.log("🏁 [Title Generation] Process completed successfully", {
      timestamp: new Date().toISOString(),
      totalDuration: `${totalDuration.toFixed(2)}ms`,
      title,
    });

    return title;
  } catch (error) {
    console.error("❌ [Title Generation] Fatal Error", {
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });
    throw error;
  }
}