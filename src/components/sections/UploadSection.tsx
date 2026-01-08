// UploadSection.tsx - Resume upload component that connects to backend
// This component handles file selection, drag & drop, and uploads to the server

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Upload, FileText, X, Loader2, Sparkles, CheckCircle, AlertCircle } from "lucide-react";

// Props interface - defines what data this component receives from parent
interface UploadSectionProps {
  onAnalyzeComplete: (data: any) => void; // Called when upload succeeds with backend response
}

const UploadSection = ({ onAnalyzeComplete }: UploadSectionProps) => {
  // State for the selected file (null if no file selected)
  const [file, setFile] = useState<File | null>(null);
  
  // State for drag and drop visual feedback
  const [isDragging, setIsDragging] = useState(false);
  
  // State to track if we're currently uploading
  const [isUploading, setIsUploading] = useState(false);
  
  // State to store success or error messages
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  
  // Reference to the hidden file input element
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle when user drags a file over the drop zone
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Prevent default browser behavior
    setIsDragging(true); // Show visual feedback
  };

  // Handle when user drags a file out of the drop zone
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false); // Remove visual feedback
  };

  // Handle when user drops a file
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setMessage(null); // Clear any previous messages
    
    // Get the first dropped file
    const droppedFile = e.dataTransfer.files[0];
    
    // Only accept PDF files
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
    } else {
      // Show error if file is not a PDF
      setMessage({ type: "error", text: "Please upload a PDF file only" });
    }
  };

  // Handle when user selects a file using the file picker
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setMessage(null); // Clear any previous messages
    
    if (selectedFile) {
      // Check if it's a PDF file
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
      } else {
        setMessage({ type: "error", text: "Please upload a PDF file only" });
      }
    }
  };

  // Handle removing the selected file
  const handleRemoveFile = () => {
    setFile(null);
    setMessage(null);
    // Reset the file input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Main function to upload the file to the backend
  const handleUpload = async () => {
    // Check if a file is selected
    if (!file) {
      setMessage({ type: "error", text: "Please select a file first" });
      return;
    }

    // Start the loading state
    setIsUploading(true);
    setMessage(null);

    try {
      // Create FormData object to send the file
      // FormData is used to send files via HTTP requests
      const formData = new FormData();
      
      // Append the file with field name "resume" (must match backend's multer config)
      formData.append("resume", file);

      // Send the file to the backend using fetch API
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST", // POST request to upload data
        body: formData, // The FormData containing our file
        // Note: Don't set Content-Type header - fetch will set it automatically with boundary
      });

      // Parse the JSON response from the backend
      const data = await response.json();

      // Check if the upload was successful
      if (response.ok) {
        // Show success message (use backend message if available)
        setMessage({ 
          type: "success", 
          text: data.message || "Resume uploaded successfully!" 
        });
        
        // Call the parent component's callback with the response data
        onAnalyzeComplete(data);
      } else {
        // Show error message from backend
        setMessage({ 
          type: "error", 
          text: data.message || "Upload failed. Please try again." 
        });
      }
    } catch (error) {
      // Handle network errors (e.g., backend not running)
      console.error("Upload error:", error);
      setMessage({ 
        type: "error", 
        text: "Cannot connect to server. Make sure backend is running on http://localhost:5000" 
      });
    } finally {
      // Stop the loading state regardless of success or failure
      setIsUploading(false);
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

          {/* Upload card - Glassmorphism style */}
          <motion.div 
            className="glass rounded-2xl p-8 shadow-ambient-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            {/* Drag & drop area */}
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
              {/* Hidden file input - triggered by clicking the drop zone */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf" // Only accept PDF files
                onChange={handleFileSelect}
                className="hidden"
              />

              {/* Animate between empty state and file selected state */}
              <AnimatePresence mode="wait">
                {file ? (
                  // File is selected - show file info
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
                    {/* Display file name */}
                    <p className="mb-1 font-medium text-foreground">{file.name}</p>
                    {/* Display file size in KB */}
                    <p className="text-sm text-muted-foreground">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                    {/* Button to remove the selected file */}
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering file picker
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
                  // No file selected - show upload prompt
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
                      Supports PDF only (Max 10MB)
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Message display area - shows success or error messages */}
            <AnimatePresence>
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`mt-4 flex items-center justify-center gap-2 rounded-lg p-3 text-sm ${
                    message.type === "success" 
                      ? "bg-success/10 text-success" 
                      : "bg-destructive/10 text-destructive"
                  }`}
                >
                  {message.type === "success" ? (
                    <CheckCircle className="h-4 w-4" strokeWidth={1.5} />
                  ) : (
                    <AlertCircle className="h-4 w-4" strokeWidth={1.5} />
                  )}
                  {message.text}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Upload button */}
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
                onClick={handleUpload}
                disabled={!file || isUploading} // Disable if no file or currently uploading
                className="min-w-52 shadow-glow"
              >
                {isUploading ? (
                  // Show loading state while uploading
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />
                    Uploading...
                  </>
                ) : (
                  // Show default button text
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
