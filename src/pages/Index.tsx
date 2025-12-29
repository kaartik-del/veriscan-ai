import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import UploadSection from "@/components/sections/UploadSection";
import ResultsSection from "@/components/sections/ResultsSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import Footer from "@/components/layout/Footer";

// Mock data for demo
const mockSkills = [
  { name: "React.js", verified: true, confidence: 95 },
  { name: "TypeScript", verified: true, confidence: 88 },
  { name: "Node.js", verified: true, confidence: 82 },
  { name: "Python", verified: false, confidence: 45 },
  { name: "AWS Certified", verified: true, confidence: 91 },
  { name: "Machine Learning", verified: false, confidence: 38 },
];

const Index = () => {
  const [showResults, setShowResults] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
      // Scroll to results
      setTimeout(() => {
        document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
        <UploadSection onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
        
        {showResults && (
          <div id="results">
            <ResultsSection trustScore={78} skills={mockSkills} />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Index;