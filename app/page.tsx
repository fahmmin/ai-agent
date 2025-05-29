import AgentPulse from "@/components/AgentPulse";
import YoutubeVideoForm from "@/components/YoutubeVideoForm";

export default function Home() {
  return (
  <div className="min-h-screen">
    {/* Hero Section */}
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-10 text-center mb-12">
          <AgentPulse size="large" color="blue" />
  
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Meet Your Personal{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              AI Content Agent
            </span>
          </h1>
          <p className="text-gray-600 text-lg">
            Your personal AI content agent that helps you create content for your business.
          </p>

          <YoutubeVideoForm/>
        </div>
      </div>
    </section>
  
    {/* Features Section */}
  
    <section className="py-20 bg-gradient-to-b from-white to-gray-50"> 
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-10 text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Features</h2>
        </div>
      </div>
      </section>
    {/* How it works sections */}
    <section className="py-20 bg-gradient-to-b from-white to-gray-50"> 
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-10 text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">How it works</h2>
        </div>
      </div>
    </section>

    {/* Footer section */}
    <section className="py-20 bg-gradient-to-b from-white to-gray-50"> 
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-10 text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Footer</h2>
        </div>
      </div>
    </section>
  </div>
  );
}
