import { motion, type Easing } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, Sparkles } from "lucide-react";

const ease: Easing = [0.25, 0.46, 0.45, 0.94];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden pt-32 pb-20 mesh-gradient grain">
      {/* Floating gradient orbs */}
      <motion.div 
        className="absolute top-20 right-[20%] w-96 h-96 rounded-full bg-primary/10 blur-3xl"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-20 left-[10%] w-80 h-80 rounded-full bg-primary/5 blur-3xl"
        animate={{ 
          scale: [1.1, 1, 1.1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container relative z-10">
        <motion.div 
          className="mx-auto max-w-4xl text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Trust badge */}
          <motion.div 
            variants={itemVariants}
            className="mb-8 inline-flex items-center gap-2 rounded-full glass px-4 py-2 shadow-ambient"
          >
            <Shield className="h-4 w-4 text-primary" strokeWidth={1.5} />
            <span className="text-sm text-muted-foreground">Trusted by 500+ HR professionals</span>
          </motion.div>

          {/* Main headline */}
          <motion.h1 
            variants={itemVariants}
            className="mb-6 text-5xl font-semibold tracking-tighter text-foreground md:text-6xl lg:text-7xl"
          >
            Detect Resume Fraud
            <motion.span 
              className="block bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              with AI
            </motion.span>
          </motion.h1>

          {/* Subtext */}
          <motion.p 
            variants={itemVariants}
            className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl"
          >
            Verify candidate skills and detect resume fraud instantly. Our AI-powered platform provides trust scores and detailed skill verification.
          </motion.p>

          {/* CTA buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button variant="hero" size="xl" asChild>
              <motion.a 
                href="#upload"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="shadow-glow"
              >
                <Sparkles className="h-4 w-4" strokeWidth={1.5} />
                Upload Resume
              </motion.a>
            </Button>
            <Button variant="hero-secondary" size="xl" asChild>
              <motion.a 
                href="#how-it-works"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                See How It Works
              </motion.a>
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div 
            variants={itemVariants}
            className="mt-16 flex flex-wrap items-center justify-center gap-8"
          >
            {[
              { label: "AI-Powered", value: "Analysis" },
              { label: "Instant", value: "Results" },
              { label: "Enterprise", value: "Security" },
            ].map((item, i) => (
              <motion.div 
                key={item.label}
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
              >
                <p className="text-2xl font-semibold tracking-tight text-foreground">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.value}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
