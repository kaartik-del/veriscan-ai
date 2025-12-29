import { Button } from "@/components/ui/button";
import { Shield, CheckCircle } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden pb-16 pt-24 md:pb-24 md:pt-32">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-secondary/30 to-background" />
      
      {/* Decorative elements */}
      <div className="absolute -top-40 right-0 -z-10 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-40 left-0 -z-10 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          {/* Trust badge */}
          <div className="mb-6 inline-flex animate-fade-in items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm shadow-soft">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">Trusted by 500+ HR professionals</span>
          </div>

          {/* Main headline */}
          <h1 className="mb-6 animate-fade-in text-4xl font-bold tracking-tight text-foreground [animation-delay:100ms] md:text-5xl lg:text-6xl">
            Detect Resume Fraud
            <span className="block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              with AI
            </span>
          </h1>

          {/* Subtext */}
          <p className="mx-auto mb-8 max-w-2xl animate-fade-in text-lg text-muted-foreground [animation-delay:200ms] md:text-xl">
            Verify candidate skills and detect resume fraud instantly. Our AI-powered platform provides trust scores and detailed skill verification to help you hire with confidence.
          </p>

          {/* CTA buttons */}
          <div className="flex animate-fade-in flex-col items-center justify-center gap-4 [animation-delay:300ms] sm:flex-row">
            <Button variant="hero" size="xl" asChild>
              <a href="#upload">Upload Resume</a>
            </Button>
            <Button variant="hero-secondary" size="xl" asChild>
              <a href="#how-it-works">See How It Works</a>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex animate-fade-in flex-wrap items-center justify-center gap-6 [animation-delay:400ms]">
            {[
              "AI-Powered Analysis",
              "Instant Results",
              "Enterprise Security",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;