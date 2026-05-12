import React, { useRef, useEffect, useCallback, useState } from 'react';
import { renderBlueprint } from '@/lib/CanvasRenderer';

// 1. Import your local logo file directly
import logoFile from '@/logo.jpg'; 

export default function CanvasPreview({ photoDataUrl, vision, discipline, name, canvasRef }) {
  const internalRef = useRef(null);
  const ref = canvasRef || internalRef;
  const [logoImg, setLogoImg] = useState(null);

  // 2. Load the local image into an HTMLImageElement
  useEffect(() => {
    const img = new Image();
    // No need for crossOrigin 'anonymous' for local files, 
    // but keeping it doesn't hurt if you ever switch back to a URL
    img.onload = () => setLogoImg(img);
    img.onerror = () => console.error("Failed to load logo from src/logo.jpg");
    img.src = logoFile; 
  }, []);

  const render = useCallback(() => {
    const canvas = ref.current;
    if (!canvas) return;

    // We only render if the logo is ready (optional, or you can render without it)
    if (photoDataUrl) {
      const img = new Image();
      img.onload = () => {
        renderBlueprint(canvas, { photo: img, vision, discipline, name, logoImg });
      };
      img.src = photoDataUrl;
    } else {
      renderBlueprint(canvas, { photo: null, vision, discipline, name, logoImg });
    }
  }, [photoDataUrl, vision, discipline, name, ref, logoImg]);

  useEffect(() => {
    render();
  }, [render]);

  return (
    <div className="w-full flex justify-center">
      <canvas
        ref={ref}
        className="w-full max-w-[400px] rounded-xl shadow-2xl border border-accent/20"
        style={{ aspectRatio: '9/16' }}
      />
    </div>
  );
}