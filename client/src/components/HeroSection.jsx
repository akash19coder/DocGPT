import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <div className="relative min-h-screen bg-black flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      {/* Glowing background effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-black"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[200%] aspect-[2/1]">
          <div className="w-full h-full bg-gradient-radial from-white/20 to-transparent rounded-[100%] blur-2xl"></div>
        </div>
      </div>
      {/* Hero content */}
      <div className="relative z-10 max-w-4xl h-[100vh] mx-auto flex justify-center flex-col">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
          Elevate Your Experience with DocGPT
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Empowering Your Journey as a Student, Researcher and Content Script
          Writer by providing an AI Powered Document QnA Tool.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-black font-semibold py-3 px-6 rounded-lg text-lg hover:bg-gray-200 transition duration-300 flex items-center justify-center">
            Get Free Version <ArrowRight className="ml-2 h-5 w-5" />
          </button>
          <button className="bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg text-lg hover:bg-gray-700 transition duration-300">
            Get Pro Version
          </button>
        </div>
      </div>
      {/* Dashboard mockup */}
      <div className="relative z-10 mt-4 w-full max-w-5xl mx-auto mb-4">
        <div className="bg-gray-800 rounded-t-xl p-2">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
          </div>
        </div>
        <img
          src="/heropic.JPG"
          width={1024}
          height={600}
          alt="CloudPeak Dashboard"
          className="rounded-b-xl shadow-2xl"
        />
      </div>
    </div>
  );
}
