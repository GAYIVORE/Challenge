import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Download, Sparkles, Crown } from 'lucide-react';
import { motion } from 'framer-motion';
import PhotoUploader from "@/components/blueprint/PhotoUploader.jsx";
import TextInputs from '@/components/blueprint/TextInputs';
import CanvasPreview from '@/components/blueprint/CanvasPreview';

export default function Home() {
  const [photoDataUrl, setPhotoDataUrl] = useState(null);
  const [vision, setVision] = useState('');
  const [discipline, setDiscipline] = useState('');
  const [name, setName] = useState('');
  const canvasRef = useRef(null);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `success-blueprint-${name || 'PENSA-UCC'}.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="relative overflow-hidden bg-primary py-10 px-6">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-accent rounded-full blur-3xl" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto text-center"
        >
          <div className="flex justify-center mb-4">
            <Crown className="w-10 h-10 text-accent" />
          </div>
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground tracking-tight">
            The Success Blueprint
          </h1>
          <p className="mt-3 text-primary-foreground/70 font-body text-sm md:text-base max-w-md mx-auto">
            Create your personalized challenge graphic. Upload, type, download — share your vision with the world.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="text-accent font-body text-xs font-semibold tracking-widest uppercase">
              PENSA UCC
            </span>
            <span className="text-primary-foreground/30">•</span>
            <span className="text-accent/80 font-body text-xs italic">
              Crowned with Purpose
            </span>
          </div>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left: Input Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-card rounded-2xl shadow-lg border border-border p-6 md:p-8 space-y-8">
              <div>
                <h2 className="font-heading text-xl font-bold text-primary flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-accent" />
                  Build Your Blueprint
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Fill in the fields below — your live preview updates instantly.
                </p>
              </div>

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

              <Button
                onClick={handleDownload}
                size="lg"
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-base gap-2 shadow-lg shadow-accent/20 transition-all"
              >
                <Download className="w-5 h-5" />
                Download Blueprint
              </Button>
              
              <p className="text-xs text-center text-muted-foreground">
                Downloads as a 1080×1920 PNG — perfect for Instagram & WhatsApp stories
              </p>
            </div>
          </motion.div>

          {/* Right: Live Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:sticky lg:top-8"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-xl font-bold text-primary">
                  Live Preview
                </h2>
                <span className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full font-medium">
                  Real-time
                </span>
              </div>
              <CanvasPreview
                photoDataUrl={photoDataUrl}
                vision={vision}
                discipline={discipline}
                name={name}
                canvasRef={canvasRef}
              />
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary py-8 mt-12">
        <div className="max-w-4xl mx-auto text-center space-y-2">
          <p className="text-primary-foreground/60 text-sm font-body">
            #CrownedWithPurpose
          </p>
          <p className="text-primary-foreground/40 text-xs font-body">
            PENSA UCC © {new Date().getFullYear()} — All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
}