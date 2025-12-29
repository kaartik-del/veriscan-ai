import { Upload, Cpu, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Resume",
    description: "Simply upload the candidate's resume in PDF or DOC format. Our system accepts all standard formats.",
  },
  {
    icon: Cpu,
    title: "AI Analysis",
    description: "Our AI engine analyzes the resume for inconsistencies, skill claims, and potential fraud indicators.",
  },
  {
    icon: CheckCircle,
    title: "Get Results",
    description: "Receive a detailed trust score and skill verification report within seconds.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="bg-secondary/30 py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          {/* Section header */}
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-2xl font-semibold text-foreground md:text-3xl">
              How It Works
            </h2>
            <p className="mx-auto max-w-xl text-muted-foreground">
              Three simple steps to verify any resume and detect potential fraud
            </p>
          </div>

          {/* Steps */}
          <div className="relative grid gap-8 md:grid-cols-3">
            {/* Connecting line */}
            <div className="absolute left-0 right-0 top-16 hidden h-0.5 bg-gradient-to-r from-transparent via-border to-transparent md:block" />

            {steps.map((step, index) => (
              <div
                key={step.title}
                className="relative flex flex-col items-center text-center"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Step number */}
                <div className="relative mb-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-card shadow-card">
                    <step.icon className="h-7 w-7 text-primary" />
                  </div>
                  <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                    {index + 1}
                  </div>
                </div>

                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;