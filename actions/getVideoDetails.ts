"use server";

import { google } from "googleapis";
import { VideoDetails } from "@/types/types";

const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_API_KEY,
});

export async function getVideoDetails(videoId: string): Promise<VideoDetails> {
  try {
    const videoResponse = await youtube.videos.list({
      id: [videoId],
      part: ["snippet", "statistics", "contentDetails"],
    });
    const videoDetails = videoResponse.data?.items?.[0];
    if (!videoDetails) {
      throw new Error("Video details not found");
    }
    const channelResponse = await youtube.channels.list({
      id: [videoDetails.snippet?.channelId || ""],
      part: ["snippet", "statistics"],
    });

    const channelDetails = channelResponse.data?.items?.[0];
    if (!channelDetails) {
      throw new Error("Channel details not found");
    }

    const video: VideoDetails = {
      title: videoDetails.snippet?.title || "Unknown Title",
      thumbnail:
        videoDetails.snippet?.thumbnails?.default?.url ||
        videoDetails.snippet?.thumbnails?.maxres?.url ||
        videoDetails.snippet?.thumbnails?.high?.url ||
        "",
      publishedAt:
        videoDetails.snippet?.publishedAt || new Date().toISOString(),

      views: Number(videoDetails.statistics?.viewCount) || 0,
      likes: Number(videoDetails.statistics?.likeCount) || 0,
      comments: Number(videoDetails.statistics?.commentCount) || 0,
      channel: {
        title: channelDetails.snippet?.title || "Unknown Channel",
        thumbnail: channelDetails.snippet?.thumbnails?.default?.url || "",
        subscribers: Number(channelDetails.statistics?.subscriberCount) || 0,
      },
    };
    return video;
  } catch (error) {
    console.error("Error fetching video details:", error);
    throw error;
  }
}
