import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileText, X, Loader2 } from "lucide-react";

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
    <section id="upload" className="py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl">
          {/* Section header */}
          <div className="mb-8 text-center">
            <h2 className="mb-3 text-2xl font-semibold text-foreground md:text-3xl">
              Upload Your Resume
            </h2>
            <p className="text-muted-foreground">
              Drop your resume below and let our AI analyze it for authenticity
            </p>
          </div>

          {/* Upload card */}
          <div className="rounded-xl border border-border bg-card p-8 shadow-card">
            {/* Drag & drop area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`group cursor-pointer rounded-lg border-2 border-dashed p-12 text-center transition-all duration-200 ${
                isDragging
                  ? "border-primary bg-primary/5"
                  : file
                  ? "border-success/50 bg-success/5"
                  : "border-border hover:border-primary/50 hover:bg-secondary/50"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileSelect}
                className="hidden"
              />

              {file ? (
                <div className="flex flex-col items-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                    <FileText className="h-8 w-8 text-success" />
                  </div>
                  <p className="mb-1 font-medium text-foreground">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFile();
                    }}
                    className="mt-4 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                    Remove file
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary transition-colors group-hover:bg-primary/10">
                    <Upload className="h-8 w-8 text-muted-foreground transition-colors group-hover:text-primary" />
                  </div>
                  <p className="mb-1 font-medium text-foreground">
                    Drag & drop your resume here
                  </p>
                  <p className="text-sm text-muted-foreground">
                    or click to browse files
                  </p>
                  <p className="mt-4 text-xs text-muted-foreground">
                    Supports PDF, DOC, DOCX (Max 10MB)
                  </p>
                </div>
              )}
            </div>

            {/* Analyze button */}
            <div className="mt-6 flex justify-center">
              <Button
                variant="hero"
                size="lg"
                onClick={handleAnalyzeClick}
                disabled={!file || isAnalyzing}
                className="min-w-48"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <FileText className="h-4 w-4" />
                    Analyze Resume
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UploadSection;