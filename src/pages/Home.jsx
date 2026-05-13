import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Download, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

// Component Imports
import PhotoUploader from '@/components/blueprint/PhotoUploader';
import TextInputs from '@/components/blueprint/TextInputs';
import CanvasPreview from '@/components/blueprint/CanvasPreview';

// Local Asset Import (Correct way for React/Vite)
import logoFile from '@/logo.jpg'; 

export default function Home() {
  const [photoDataUrl, setPhotoDataUrl] = useState(null);
  const [vision, setVision] = useState('');
  const [discipline, setDiscipline] = useState('');
  const [name, setName] = useState('');
  const canvasRef = useRef(null);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      alert("Preview is not ready yet!");
      return;
    }

    // Safety: ensure name doesn't contain invalid filename characters
    const safeName = (name || 'PENSA-UCC').replace(/[^a-z0-9]/gi, '-').toLowerCase();
    
    try {
      const link = document.createElement('a');
      link.download = `success-blueprint-${safeName}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Download failed:", err);
      alert("Failed to download image. If you're on mobile, try long-pressing the preview to save.");
    }
  };

  return (
    <div className="min-h-screen bg-background selection:bg-accent/30">
      {/* Header */}
      <header className="relative overflow-hidden bg-primary py-12 px-6">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute -top-12 -left-12 w-96 h-96 bg-accent rounded-full blur-[100px]" />
          <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-accent/50 rounded-full blur-[80px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative max-w-4xl mx-auto text-center"
        >
          <div className="flex justify-center mb-6">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={logoFile} // Using the local imported logo
              alt="PENSA UCC Logo"
              className="w-20 h-20 rounded-full object-cover border-2 border-accent shadow-xl ring-4 ring-accent/10"
            />
          </div>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary-foreground tracking-tighter">
            The Success <span className="text-accent">Blueprint</span>
          </h1>
          <p className="mt-4 text-primary-foreground/80 font-body text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
           Embody the vision. Design your personal roadmap to excellence and step into your identity as a King/Queen crowned with divine purpose.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="text-accent font-body text-xs font-bold tracking-[0.2em] uppercase">
              PENSA UCC
            </span>
            <span className="text-primary-foreground/30 text-lg">|</span>
            <span className="text-accent/90 font-body text-sm italic">
              Crowned with Purpose
            </span>
          </div>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Panel: Inputs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-card rounded-3xl shadow-xl border border-border/50 p-6 md:p-10 space-y-10">
              <header className="space-y-2">
                <h2 className="font-heading text-2xl font-bold text-primary flex items-center gap-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Sparkles className="w-6 h-6 text-accent" />
                  </div>
                  Personalize
                </h2>
                <p className="text-sm text-muted-foreground">
                  Your blueprint updates in the preview as you type.
                </p>
              </header>

              <PhotoUploader
                photoPreview={photoDataUrl}
                onPhotoChange={setPhotoDataUrl}
                onClear={() => setPhotoDataUrl(null)}
              />

              <TextInputs
                name={name}
                vision={vision}
                discipline={discipline}
                onNameChange={setName}
                onVisionChange={setVision}
                onDisciplineChange={setDiscipline}
              />

              <div className="pt-4">
                <Button
                  onClick={handleDownload}
                  size="xl"
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-lg h-16 gap-3 shadow-2xl shadow-accent/20 rounded-2xl transition-all active:scale-[0.98]"
                >
                  <Download className="w-6 h-6" />
                  Download Blueprint
                </Button>
                <p className="text-center text-[10px] uppercase tracking-widest text-muted-foreground mt-4 font-bold">
                  Perfect for Instagram & WhatsApp Stories (1080×1920)
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Panel: Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:sticky lg:top-10"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <h2 className="font-heading text-xl font-bold text-primary">
                  Live Preview
                </h2>
                <span className="flex items-center gap-2 text-[10px] font-bold bg-accent/10 text-accent px-3 py-1 rounded-full uppercase tracking-tighter">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                  Processing
                </span>
              </div>
              
              <div className="relative group">
                {/* Decorative shadow behind canvas */}
                <div className="absolute -inset-1 bg-gradient-to-b from-accent/20 to-primary/20 rounded-[2rem] blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000" />
                
                <CanvasPreview
                  photoDataUrl={photoDataUrl}
                  vision={vision}
                  discipline={discipline}
                  name={name}
                  canvasRef={canvasRef}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary py-12 mt-16 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center px-6">
          <p className="text-accent font-bold tracking-[0.3em] text-xs mb-4">
            #CROWNEDWITHPURPOSE
          </p>
          <div className="h-px w-12 bg-accent/30 mx-auto mb-6" />
          <p className="text-primary-foreground/40 text-xs font-medium uppercase tracking-widest">
            PENSA UCC © {new Date().getFullYear()} — Building Disciple-Kings
          </p>
        </div>
      </footer>
    </div>
  );
}