import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Upload, FileText, X, Loader2, Sparkles } from "lucide-react";

interface UploadSectionProps {
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

const UploadSection = ({ onAnalyze, isAnalyzing }: UploadSectionProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === "application/pdf" || droppedFile.name.endsWith(".doc") || droppedFile.name.endsWith(".docx"))) {
      setFile(droppedFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAnalyzeClick = () => {
    if (file) {
      onAnalyze();
    }
  };

  return (
    <section id="upload" className="py-24 md:py-32 relative">
      <div className="container">
        <motion.div 
          className="mx-auto max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Section header */}
          <div className="mb-10 text-center">
            <motion.h2 
              className="mb-3 text-3xl font-semibold tracking-tighter text-foreground md:text-4xl"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Upload Your Resume
            </motion.h2>
            <motion.p 
              className="text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Drop your resume below and let our AI analyze it for authenticity
            </motion.p>
          </div>

          {/* Upload card - Glassmorphism */}
          <motion.div 
            className="glass rounded-2xl p-8 shadow-ambient-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            {/* Luminous Portal - Drag & drop area */}
            <motion.div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative cursor-pointer rounded-xl border-2 border-dashed p-16 text-center transition-all duration-300 portal-glow ${
                isDragging
                  ? "border-primary bg-primary/5 active"
                  : file
                  ? "border-success/50 bg-success/5"
                  : "border-border/50 hover:border-primary/50"
              }`}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileSelect}
                className="hidden"
              />

              <AnimatePresence mode="wait">
                {file ? (
                  <motion.div 
                    key="file"
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div 
                      className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-success/10"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <FileText className="h-8 w-8 text-success" strokeWidth={1.5} />
                    </motion.div>
                    <p className="mb-1 font-medium text-foreground">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile();
                      }}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-destructive"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <X className="h-4 w-4" strokeWidth={1.5} />
                      Remove file
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="empty"
                    className="flex flex-col items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div 
                      className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary transition-colors"
                      animate={isDragging ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                    >
                      <Upload className={`h-8 w-8 transition-colors ${isDragging ? "text-primary" : "text-muted-foreground"}`} strokeWidth={1.5} />
                    </motion.div>
                    <p className="mb-1 font-medium text-foreground">
                      Drag & drop your resume here
                    </p>
                    <p className="text-sm text-muted-foreground">
                      or click to browse files
                    </p>
                    <p className="mt-4 text-xs text-muted-foreground/60">
                      Supports PDF, DOC, DOCX (Max 10MB)
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Analyze button */}
            <motion.div 
              className="mt-8 flex justify-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Button
                variant="hero"
                size="lg"
                onClick={handleAnalyzeClick}
                disabled={!file || isAnalyzing}
                className="min-w-52 shadow-glow"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" strokeWidth={1.5} />
                    Analyze Resume
                  </>
                )}
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default UploadSection;
