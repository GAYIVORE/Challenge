import React, { useRef, useEffect, useCallback } from 'react';
import { renderBlueprint } from '@/lib/canvasRenderer';

export default function CanvasPreview({ photoDataUrl, vision, discipline, name, canvasRef }) {
  const internalRef = useRef(null);
  const ref = canvasRef || internalRef;

  const render = useCallback(() => {
    const canvas = ref.current;
    if (!canvas) return;

    if (photoDataUrl) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        renderBlueprint(canvas, { photo: img, vision, discipline, name });
      };
      img.src = photoDataUrl;
    } else {
      renderBlueprint(canvas, { photo: null, vision, discipline, name });
    }
  }, [photoDataUrl, vision, discipline, name, ref]);

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