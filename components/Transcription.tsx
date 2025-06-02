"use client";

import { useUser } from "@clerk/nextjs";
import Usage from "./Usage";
import { FeatureFlag } from "@/features/flags";
import Image from "next/image";
import { cache } from "react";
import { useSchematicEntitlement } from "@schematichq/schematic-react";
import { useState } from "react";

interface TranscriptionEntry {
  text: string;
  timestamp: string;
}

function Transcription({ videoId }: { videoId: string }) {
  const [transcriptState, setTranscriptState] = useState<{
    transcript: TranscriptionEntry[];
    cache: string;
  } | null>(null);


  const {featureUsageExceeded} = useSchematicEntitlement(FeatureFlag.TRANSCRIPTION);

  return (
    <div className="flex flex-col gap-4">
      <p>Transcription</p>
      <Usage
        featureFlag={FeatureFlag.TRANSCRIPTION}
        title="Generate Transcription"
      />
          {!featureUsageExceeded ?(
            <div className="flex flex-col gap-2 max-h-[250px] overflow-y-auto rounded-md p-4"> 
            {transcriptState?(
              transcriptState.transcript.map((entry,index) => (
                <div key={index} className="flex gap-2">
                  <span className="text-sm ">{entry.timestamp}</span>
                  <span className="text-sm ">{entry.text}</span>
                </div>
              ))
            ):(
              <p>Transcription</p>
            )}
              <p>Transcription</p>
            </div>)
          :
            <div>
              <p>Transcription</p>
            </div>
          }



    </div>

  );
}

export default Transcription;
