// Index.tsx - Main page component
// This is the landing page that contains all sections

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import UploadSection from "@/components/sections/UploadSection";
import ResultsSection from "@/components/sections/ResultsSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import Footer from "@/components/layout/Footer";

// Mock data for demo - this will be replaced by real data from backend
const mockSkills = [
  { name: "React.js", verified: true, confidence: 95 },
  { name: "TypeScript", verified: true, confidence: 88 },
  { name: "Node.js", verified: true, confidence: 82 },
  { name: "Python", verified: false, confidence: 45 },
  { name: "AWS Certified", verified: true, confidence: 91 },
  { name: "Machine Learning", verified: false, confidence: 38 },
];

const Index = () => {
  // State to control whether to show the results section
  const [showResults, setShowResults] = useState(false);
  
  // State to store the backend response data
  const [analysisData, setAnalysisData] = useState<any>(null);

  // Called when upload is complete and successful
  const handleAnalyzeComplete = (data: any) => {
    // Store the response data from backend
    setAnalysisData(data);
    
    // Show the results section
    setShowResults(true);
    
    // Scroll to results section smoothly
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
        
        {/* Upload section - passes callback to handle successful upload */}
        <UploadSection onAnalyzeComplete={handleAnalyzeComplete} />
        
        {/* Results section - only shown after successful upload */}
        {showResults && (
          <div id="results">
            {/* Using mock data for now - replace with analysisData when backend returns real data */}
            <ResultsSection 
              trustScore={analysisData?.trustScore || 78} 
              skills={analysisData?.skills || mockSkills} 
            />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
