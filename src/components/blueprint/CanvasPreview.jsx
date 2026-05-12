import React, { useRef, useEffect, useCallback, useState } from 'react';
import { renderBlueprint } from '@/lib/canvasRenderer';

const LOGO_URL = 'https://media.base44.com/images/public/6a0213882ed34b920445b369/bc269bd83_logo.jpg';

export default function CanvasPreview({ photoDataUrl, vision, discipline, name, canvasRef }) {
  const internalRef = useRef(null);
  const ref = canvasRef || internalRef;
  const [logoImg, setLogoImg] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => setLogoImg(img);
    img.src = LOGO_URL;
  }, []);

  const render = useCallback(() => {
    const canvas = ref.current;
    if (!canvas) return;

    if (photoDataUrl) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
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