import { Shield, Zap, Lock, BarChart3, Users, Globe } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Fraud Detection",
    description: "Advanced AI algorithms detect inconsistencies and potential fabrications in resumes.",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Get comprehensive analysis results in under 30 seconds.",
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description: "Bank-level encryption ensures all resume data remains secure and private.",
  },
  {
    icon: BarChart3,
    title: "Detailed Analytics",
    description: "In-depth reports with confidence scores for each verified claim.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Share reports with hiring managers and collaborate on candidate evaluation.",
  },
  {
    icon: Globe,
    title: "Global Database",
    description: "Cross-reference skills and certifications against worldwide databases.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-5xl">
          {/* Section header */}
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-2xl font-semibold text-foreground md:text-3xl">
              Powerful Features
            </h2>
            <p className="mx-auto max-w-xl text-muted-foreground">
              Everything you need to verify resumes and make confident hiring decisions
            </p>
          </div>

          {/* Features grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group rounded-xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;