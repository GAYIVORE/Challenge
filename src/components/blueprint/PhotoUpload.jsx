import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Camera, X, ImagePlus } from 'lucide-react';

export default function PhotoUploader({ photoPreview, onPhotoChange, onClear }) {
  const fileRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onPhotoChange(ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-primary tracking-wide uppercase flex items-center gap-2">
        <Camera className="w-4 h-4 text-accent" />
        Upload Your Photo
      </label>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      
      {photoPreview ? (
        <div className="relative group">
          <div className="w-full aspect-square rounded-xl overflow-hidden border-2 border-accent/30">
            <img
              src={photoPreview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={() => { onClear(); fileRef.current.value = ''; }}
            className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => fileRef.current?.click()}
          className="w-full aspect-square rounded-xl border-2 border-dashed border-accent/40 hover:border-accent bg-accent/5 hover:bg-accent/10 transition-all flex flex-col items-center justify-center gap-3 cursor-pointer"
        >
          <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
            <ImagePlus className="w-7 h-7 text-accent" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">Click to upload</p>
            <p className="text-xs text-muted-foreground mt-1">Square photo recommended</p>
          </div>
        </button>
      )}
    </div>
  );
}