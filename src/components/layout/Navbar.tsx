import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Demo", href: "#upload" },
];

const Navbar = () => {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl"
    >
      <div className="glass rounded-2xl shadow-ambient px-6 py-3">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-glow">
              <FileText className="h-4 w-4 text-primary-foreground" strokeWidth={1.5} />
            </div>
            <span className="text-base font-semibold tracking-tight text-foreground">ResumeVerify</span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </motion.a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <motion.a
              href="#upload"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="hidden rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-ambient transition-all hover:shadow-glow sm:inline-flex"
            >
              Get Started
            </motion.a>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
