import { CheckCircle, AlertTriangle, Shield, Award, Briefcase, GraduationCap } from "lucide-react";

interface Skill {
  name: string;
  verified: boolean;
  confidence: number;
}

interface ResultsSectionProps {
  trustScore: number;
  skills: Skill[];
}

const ResultsSection = ({ trustScore, skills }: ResultsSectionProps) => {
  const getTrustScoreColor = (score: number) => {
    if (score >= 80) return "bg-success";
    if (score >= 60) return "bg-warning";
    return "bg-destructive";
  };

  const getTrustScoreLabel = (score: number) => {
    if (score >= 80) return { label: "High Trust", color: "text-success" };
    if (score >= 60) return { label: "Medium Trust", color: "text-warning" };
    return { label: "Low Trust", color: "text-destructive" };
  };

  const scoreInfo = getTrustScoreLabel(trustScore);

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          {/* Section header */}
          <div className="mb-8 text-center">
            <h2 className="mb-3 text-2xl font-semibold text-foreground md:text-3xl">
              Analysis Results
            </h2>
            <p className="text-muted-foreground">
              Here's what our AI found in the resume
            </p>
          </div>

          {/* Trust Score Card */}
          <div className="mb-6 animate-fade-in rounded-xl border border-border bg-card p-8 shadow-card">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Trust Score</h3>
                  <p className={`text-sm font-medium ${scoreInfo.color}`}>{scoreInfo.label}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-4xl font-bold text-foreground">{trustScore}</span>
                <span className="text-lg text-muted-foreground">/100</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-3 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${getTrustScoreColor(trustScore)}`}
                style={{ width: `${trustScore}%` }}
              />
            </div>

            {/* Score breakdown */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { icon: Briefcase, label: "Experience", value: "92%" },
                { icon: GraduationCap, label: "Education", value: "88%" },
                { icon: Award, label: "Skills", value: "75%" },
              ].map((item) => (
                <div key={item.label} className="rounded-lg bg-secondary/50 p-4 text-center">
                  <item.icon className="mx-auto mb-2 h-5 w-5 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="text-lg font-semibold text-foreground">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Verification Card */}
          <div className="animate-fade-in rounded-xl border border-border bg-card p-8 shadow-card [animation-delay:200ms]">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Skill Verification</h3>
                <p className="text-sm text-muted-foreground">
                  {skills.filter(s => s.verified).length} of {skills.length} skills verified
                </p>
              </div>
            </div>

            {/* Skills list */}
            <div className="space-y-3">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center justify-between rounded-lg border border-border bg-background p-4 transition-colors hover:bg-secondary/30"
                >
                  <div className="flex items-center gap-3">
                    {skill.verified ? (
                      <CheckCircle className="h-5 w-5 text-success" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-warning" />
                    )}
                    <span className="font-medium text-foreground">{skill.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">
                      {skill.confidence}% confidence
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        skill.verified
                          ? "bg-success/10 text-success"
                          : "bg-warning/10 text-warning"
                      }`}
                    >
                      {skill.verified ? "Verified" : "Unverified"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;