"use server";

// import { getVideoIdFromUrl } from "@/lib/youtube/getVideoIdFromUrl";
import { redirect } from "next/navigation";

export async function analyseYouTubeVideo(formData: FormData) {
  const url = formData.get("url")?.toString();
  if (!url) return;

  const videoId = 'abc'; // TODO: fix this
  if (!videoId) return;

  // Redirect to the new post
  redirect(`/video/${videoId}/analysis`);
}