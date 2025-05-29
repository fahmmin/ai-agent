import Form from "next/form";
import AnalyseButton from "./AnalyseButton";
import { analyseYouTubeVideo } from "@/actions/analyseYoutubeVideo";

function YoutubeVideoForm() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <Form
        action={analyseYouTubeVideo}
        className="flex flex-col sm:flex-row gap-2 items-center"
      >
        <input
          type="text"
          name="url"
          placeholder="Enter Youtube video URL"
          className="w-full sm:w-auto flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <AnalyseButton />
      </Form>
    </div>
  );
}

export default YoutubeVideoForm;
