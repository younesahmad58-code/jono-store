"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Upload, X, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ImageItem {
  url: string;
  alt: string;
}

interface ImageUploaderProps {
  images: ImageItem[];
  onChange: (images: ImageItem[]) => void;
}

export function ImageUploader({ images, onChange }: ImageUploaderProps) {
  const [dragOver, setDragOver] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const handleFiles = useCallback(
    async (files: FileList) => {
      const formData = new FormData();
      Array.from(files).forEach((file) => formData.append("files", file));

      try {
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        const data = await res.json();
        if (data.urls) {
          const newImages = data.urls.map((url: string, i: number) => ({
            url,
            alt: files[i]?.name?.replace(/\.[^.]+$/, "") ?? "",
          }));
          onChange([...images, ...newImages]);
        }
      } catch {
        const newImages = Array.from(files).map((file) => ({
          url: URL.createObjectURL(file),
          alt: file.name.replace(/\.[^.]+$/, ""),
        }));
        onChange([...images, ...newImages]);
      }
    },
    [images, onChange]
  );

  const addByUrl = useCallback(() => {
    const url = window.prompt("URL imagine:");
    if (url) onChange([...images, { url, alt: "" }]);
  }, [images, onChange]);

  const removeImage = useCallback(
    (index: number) => {
      onChange(images.filter((_, i) => i !== index));
    },
    [images, onChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      if (e.dataTransfer.files.length > 0) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [handleFiles]
  );

  const handleReorder = useCallback(
    (from: number, to: number) => {
      const reordered = [...images];
      const [moved] = reordered.splice(from, 1);
      reordered.splice(to, 0, moved);
      onChange(reordered);
      setDragIndex(null);
    },
    [images, onChange]
  );

  return (
    <div className="space-y-3">
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer",
          dragOver ? "border-primary bg-primary/5" : "border-muted hover:border-muted-foreground/50"
        )}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => document.getElementById("file-upload")?.click()}
      >
        <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground">
          Trage imaginile aici sau click pentru a selecta
        </p>
        <input
          id="file-upload"
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
      </div>

      <Button type="button" variant="outline" size="sm" onClick={addByUrl}>
        Adaugă prin URL
      </Button>

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {images.map((img, i) => (
            <div
              key={`${img.url}-${i}`}
              className={cn(
                "relative group border rounded-lg overflow-hidden",
                i === 0 && "ring-2 ring-primary"
              )}
              draggable
              onDragStart={() => setDragIndex(i)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => dragIndex !== null && handleReorder(dragIndex, i)}
            >
              <div className="relative aspect-square">
                <Image src={img.url} alt={img.alt} fill className="object-cover" sizes="150px" />
              </div>
              {i === 0 && (
                <span className="absolute top-1 left-1 bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded">
                  Principal
                </span>
              )}
              <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => removeImage(i)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              <div className="absolute bottom-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab">
                <GripVertical className="h-4 w-4 text-white drop-shadow" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
