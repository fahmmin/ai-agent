"use client";

import React, { useEffect, useState } from "react";
import { VideoDetails } from "@/types/types";
import { getVideoDetails } from "@/actions/getVideoDetails";
import Image from "next/image";

function YoutubeVideoDetails({ videoId }: { videoId: string }) {
  const [video, setVideo] = useState<VideoDetails | null>(null);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      const response = await getVideoDetails(videoId);
      setVideo(response);
    };
    fetchVideoDetails();
  }, [videoId]);

  if (!video) {
    return <div>No video details found</div>;
  }

  return (
    <div className="@container bg-white rounded-xl">
      <div className="flex flex-col @md:flex-row gap-8">
        <div className="flex-shrink-0 @md:w-[280px]">
          <Image
            src={video.thumbnail}
            alt={video.title}
            width={500}
            height={500} 
            className="rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}

export default YoutubeVideoDetails;
