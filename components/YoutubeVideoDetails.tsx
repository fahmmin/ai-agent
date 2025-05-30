"use server";

import { google } from "googleapis";
import { VideoDetails } from "@/types/types";

const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_API_KEY,
});

async function getVideoDetails(videoId: string) {
  console.log("🎥 Fetching video details for:", videoId);

  try {
    // Fetch video details and channel details
    const videoResponse = await youtube.videos.list({
      part: ["statistics", "snippet"],
      id: [videoId],
    });

    const videoDetails = videoResponse.data.items?.[0];

    if (!videoDetails) throw new Error("Video not found");

    // Get channel details including thumbnail
    const channelResponse = await youtube.channels.list({
      part: ["snippet", "statistics"],
      id: [videoDetails.snippet?.channelId || ""],
      key: process.env.YOUTUBE_API_KEY,
    });

    const channelDetails = channelResponse.data.items?.[0];

    console.log("✅ Video details fetched successfully");

    const video: VideoDetails = {
      // Video Info
      title: videoDetails.snippet?.title || "Unknown Title",
      thumbnail:
        videoDetails.snippet?.thumbnails?.maxres?.url ||
        videoDetails.snippet?.thumbnails?.high?.url ||
        videoDetails.snippet?.thumbnails?.default?.url ||
        "",
      publishedAt:
        videoDetails.snippet?.publishedAt || new Date().toISOString(),

      // Video Metrics
      views: Number(videoDetails.statistics?.viewCount) || 0,
      likes: Number(videoDetails.statistics?.likeCount) || 0,
      comments: Number(videoDetails.statistics?.commentCount) || 0,

      // Channel Info
      channel: {
        title: videoDetails.snippet?.channelTitle || "Unknown Channel",
        thumbnail: channelDetails?.snippet?.thumbnails?.default?.url || "",
        subscribers: channelDetails?.statistics?.subscriberCount || "0",
      },
    };

    return video;
  } catch (error) {
    console.error("❌ Error fetching video details:", error);
    return null;
  }
}

export default getVideoDetails;
