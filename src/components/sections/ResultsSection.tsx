import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertTriangle, Shield, Briefcase, GraduationCap, Code, Award } from "lucide-react";

interface Skill {
  name: string;
  verified: boolean;
  confidence: number;
}

interface ResultsSectionProps {
  trustScore: number;
  skills: Skill[];
}

// Radial Gauge Component
const RadialGauge = ({ score }: { score: number }) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getColor = (score: number) => {
    if (score >= 80) return "stroke-success";
    if (score >= 60) return "stroke-warning";
    return "stroke-destructive";
  };

  return (
    <div className="relative w-32 h-32">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          className="text-border"
        />
        {/* Progress circle */}
        <motion.circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          className={getColor(score)}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span 
          className="text-3xl font-semibold tracking-tight text-foreground"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.3 }}
        >
          {score}
        </motion.span>
        <span className="text-xs text-muted-foreground">Trust Score</span>
      </div>
    </div>
  );
};

const ResultsSection = ({ trustScore, skills }: ResultsSectionProps) => {
  const [showScanning, setShowScanning] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowScanning(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const getTrustLabel = (score: number) => {
    if (score >= 80) return { label: "High Trust", color: "text-success" };
    if (score >= 60) return { label: "Medium Trust", color: "text-warning" };
    return { label: "Low Trust", color: "text-destructive" };
  };

  const scoreInfo = getTrustLabel(trustScore);
  const verifiedCount = skills.filter(s => s.verified).length;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section className="py-24 md:py-32 relative">
      <div className="container">
        <motion.div 
          className="mx-auto max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-semibold tracking-tighter text-foreground md:text-4xl">
              Analysis Results
            </h2>
            <p className="text-muted-foreground">
              Here's what our AI found in the resume
            </p>
          </motion.div>

          {/* Main Results Grid - Bento Box Layout */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Trust Score Card - Large */}
            <motion.div 
              variants={itemVariants}
              className="glass rounded-2xl p-8 shadow-ambient-lg relative overflow-hidden md:row-span-2"
            >
              {/* Scanning line animation */}
              <AnimatePresence>
                {showScanning && (
                  <motion.div 
                    className="scanning-line"
                    initial={{ y: "-100%" }}
                    animate={{ y: "100%" }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2 }}
                  />
                )}
              </AnimatePresence>

              <div className="flex flex-col items-center text-center h-full justify-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" strokeWidth={1.5} />
                </div>
                
                <RadialGauge score={trustScore} />
                
                <motion.p 
                  className={`mt-4 text-lg font-medium ${scoreInfo.color}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  {scoreInfo.label}
                </motion.p>
                
                <p className="mt-2 text-sm text-muted-foreground">
                  Based on comprehensive AI analysis
                </p>
              </div>
            </motion.div>

            {/* Category Cards - Bento Tiles */}
            {[
              { icon: Briefcase, label: "Experience", value: "92%", desc: "Work history verified" },
              { icon: GraduationCap, label: "Education", value: "88%", desc: "Credentials confirmed" },
              { icon: Code, label: "Technical", value: "75%", desc: "Skills validated" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                variants={itemVariants}
                className="glass rounded-2xl p-6 shadow-ambient"
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
                      <item.icon className="h-5 w-5 text-muted-foreground" strokeWidth={1.5} />
                    </div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="text-2xl font-semibold tracking-tight text-foreground">{item.value}</p>
                  </div>
                  <span className="text-xs text-muted-foreground/60">{item.desc}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Skills Matrix - Bento Box Grid */}
          <motion.div 
            variants={itemVariants}
            className="mt-6 glass rounded-2xl p-8 shadow-ambient-lg"
          >
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Award className="h-5 w-5 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">Skill Verification</h3>
                  <p className="text-sm text-muted-foreground">
                    {verifiedCount} of {skills.length} skills verified
                  </p>
                </div>
              </div>
            </div>

            {/* Skills Grid - Bento Tiles */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  className={`relative rounded-xl p-4 transition-all ${
                    skill.verified 
                      ? "bg-success/5 border border-success/20" 
                      : "bg-warning/5 border border-warning/20"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="font-medium text-foreground text-sm">{skill.name}</span>
                    {skill.verified ? (
                      <CheckCircle className="h-4 w-4 text-success" strokeWidth={1.5} />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-warning" strokeWidth={1.5} />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {skill.confidence}% confidence
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        skill.verified
                          ? "bg-success/10 text-success"
                          : "bg-warning/10 text-warning"
                      }`}
                    >
                      {skill.verified ? "Verified" : "Review"}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResultsSection;
