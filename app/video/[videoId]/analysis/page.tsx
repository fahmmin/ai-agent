"use client";

import SchematicComponent from "@/components/schematic/SchematicComponent";
import React, { use } from "react";
import Usage from "@/components/Usage";
import { FeatureFlag } from "@/features/flags";
import { useParams } from "next/navigation";
import YoutubeVideoDetails from "@/components/YoutubeVideoDetails";
import TitleGeneration from "@/components/TitleGeneration";
import Transcription from "@/components/Transcription";
import ThumbnailGeneration from "@/components/ThumbnailGeneration";
import AiAgentChat from "@/components/AiAgentChat";


 function AnalysisPage() {
  const params = useParams<{ videoId: string }>();
  const { videoId } = params;

  return (
    <div className="xl:container mx-auto px-4 md:px-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
        <div className="order-2 lg:order-1 flex flex-col gap-4 lg:border-r border-gray-200 p-">
          <p>Left Side</p>
          <p>Analysis Section</p>
          <div className="flex flex-col gap-4 p-4 border border-gray-200 rounded-xl">
            <Usage featureFlag={FeatureFlag.ANALYSE_VIDEO} title="Analyse Video" />
          </div>
          <p>Video Details</p>
          <div>
            <YoutubeVideoDetails videoId={videoId} />
          </div>
          <ThumbnailGeneration videoId={videoId} />
          <TitleGeneration videoId={videoId} />
          <Transcription videoId={videoId} />
          <p>Summary</p>
          <p>Keywords</p>
          <p>Sentiment Analysis</p>
          <p>Action Items</p>
        </div>
        <div className="order-1 lg:order-2 lg:sticky lg:top-20 h-[500px] md:h-[calc(100vh-6rem)]">
          <AiAgentChat videoId={videoId} />
        </div>
      </div>
    </div>
  );
}

export default AnalysisPage;
