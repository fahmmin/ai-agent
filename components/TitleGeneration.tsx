"use client";
import { useUser } from "@clerk/nextjs";
import Usage from "./Usage";
import { FeatureFlag } from "@/features/flags";
import Image from "next/image";


function TitleGeneration({ videoId }: { videoId: string }) {
  const { user } = useUser();
  const title: string = "";

  return (
    <div>
      <p>Title Generation</p>
      <Usage
        featureFlag={FeatureFlag.TITLE_GENERATION}
        title="Generate Title"
      />
      <div className={`flex overflow-x-auto gap-4 ${title && "mt-4"}`}>
        {title && (
              <div
                key={title}
                className="flex-none w-[200px] h-[110px] rounded-lg overflow-x-auto"
              >
                <p>{title}</p>
    
              </div>
            )
        }  
      </div>

      {!title && (
            <p className="text-sm text-gray-500 text-center mt-8 py-5 border rounded-xl" >No title generated yet</p>
      )}
    </div>
  );
}

export default TitleGeneration;
