"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Maximize2, X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

export type GalleryImage = {
  url: string;
  alt: string;
};

interface ProductImageGalleryProps {
  images: GalleryImage[] | string[];
  productName: string;
  category?: string;
  inStock?: boolean;
}

export default function ProductImageGallery({
  images,
  productName,
  category,
  inStock = true,
}: ProductImageGalleryProps) {
  // Normalize images to GalleryImage[]
  const normalizedImages: GalleryImage[] = images.map((img, idx) => {
    if (typeof img === "string") {
      return {
        url: img,
        alt: `${productName} - View ${idx + 1}`,
      };
    }
    return img;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const currentImage = normalizedImages[currentIndex] || {
    url: "/images/products/Inverter.png",
    alt: productName,
  };

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? normalizedImages.length - 1 : prev - 1));
    setZoomLevel(1);
  }, [normalizedImages.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === normalizedImages.length - 1 ? 0 : prev + 1));
    setZoomLevel(1);
  }, [normalizedImages.length]);

  const handleCloseFullscreen = useCallback(() => {
    setIsFullscreen(false);
    setZoomLevel(1);
  }, []);

  // Keyboard navigation for fullscreen lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullscreen) return;
      if (e.key === "Escape") {
        handleCloseFullscreen();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isFullscreen, handleCloseFullscreen, handlePrev, handleNext]);

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Main Image Stage */}
      <div className="relative w-full aspect-square bg-surface-container-low/70 rounded-2xl border border-border-light overflow-hidden flex items-center justify-center p-6 md:p-8 shadow-xs group">
        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
          {category && (
            <span className="bg-surface-container-lowest/90 backdrop-blur-md text-charcoal font-technical-data text-[11px] font-bold px-3 py-1 rounded-full border border-border-light shadow-xs uppercase">
              {category}
            </span>
          )}
          {inStock && (
            <span className="bg-primary-green/10 text-primary font-technical-data text-[11px] font-bold px-3 py-1 rounded-full border border-primary-green/30 flex items-center gap-1.5 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-status-green animate-pulse" />
              In Stock Lusaka
            </span>
          )}
        </div>

        {/* Fullscreen Expand Action Button */}
        <button
          onClick={() => setIsFullscreen(true)}
          type="button"
          aria-label="Expand image fullscreen"
          className="absolute top-4 right-4 z-10 bg-surface-container-lowest/90 hover:bg-primary hover:text-white text-charcoal p-2.5 rounded-full backdrop-blur-md border border-border-light transition-all shadow-sm group-hover:scale-105 flex items-center gap-1.5 text-xs font-medium cursor-pointer"
          title="Click to view full screen"
        >
          <Maximize2 className="w-4 h-4" />
          <span className="hidden sm:inline font-label-cta text-[11px]">Fullscreen</span>
        </button>

        {/* Main Product Image */}
        <div
          onClick={() => setIsFullscreen(true)}
          className="w-full h-full flex items-center justify-center cursor-zoom-in relative"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentImage.url}
            alt={currentImage.alt}
            className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-md select-none"
          />
        </div>

        {/* Hover Hint */}
        <div className="absolute bottom-3 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white text-[10px] font-technical-data px-2.5 py-1 rounded-full pointer-events-none backdrop-blur-xs">
          Click image to preview fullscreen
        </div>

        {/* Carousel Prev/Next Buttons on Main Image if multiple */}
        {normalizedImages.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-surface-container-lowest/80 hover:bg-surface-container-lowest text-charcoal p-2 rounded-full border border-border-light shadow-sm transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-surface-container-lowest/80 hover:bg-surface-container-lowest text-charcoal p-2 rounded-full border border-border-light shadow-sm transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Row (if multiple images) */}
      {normalizedImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1 pt-0.5">
          {normalizedImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setCurrentIndex(idx);
                setZoomLevel(1);
              }}
              aria-label={`Select product image view ${idx + 1}`}
              className={`w-20 h-20 shrink-0 rounded-xl overflow-hidden p-2 bg-surface-container-low border transition-all cursor-pointer flex items-center justify-center ${
                currentIndex === idx
                  ? "border-primary ring-2 ring-primary/20 bg-surface-container-lowest shadow-sm scale-102"
                  : "border-border-light opacity-70 hover:opacity-100 hover:border-neutral-400"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.url}
                alt={img.alt}
                className="max-h-full max-w-full object-contain select-none"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 md:p-6 animate-in fade-in duration-200"
          onClick={handleCloseFullscreen}
        >
          {/* Top Bar */}
          <div
            className="flex items-center justify-between text-white pb-3 border-b border-white/10 z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h3 className="font-headline-md text-base md:text-lg font-semibold truncate max-w-md md:max-w-xl text-white">
                {productName}
              </h3>
              <p className="font-technical-data text-xs text-neutral-400 mt-0.5">
                Image {currentIndex + 1} of {normalizedImages.length}
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoomLevel((z) => Math.min(z + 0.5, 3))}
                aria-label="Zoom in"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel((z) => Math.max(z - 0.5, 1))}
                aria-label="Zoom out"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              {zoomLevel !== 1 && (
                <button
                  onClick={() => setZoomLevel(1)}
                  aria-label="Reset zoom"
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="Reset Zoom"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={handleCloseFullscreen}
                aria-label="Close fullscreen view"
                className="p-2 rounded-lg bg-white/10 hover:bg-red-500/80 text-white transition-colors ml-2 cursor-pointer flex items-center gap-1 text-xs font-medium"
              >
                <X className="w-5 h-5" />
                <span className="hidden sm:inline">Close (Esc)</span>
              </button>
            </div>
          </div>

          {/* Main Fullscreen Image Display */}
          <div
            className="relative flex-grow flex items-center justify-center overflow-hidden my-4"
            onClick={(e) => e.stopPropagation()}
          >
            {normalizedImages.length > 1 && (
              <button
                onClick={handlePrev}
                aria-label="Previous fullscreen image"
                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 text-white p-3 md:p-4 rounded-full backdrop-blur-md transition-all cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            <div className="w-full h-full flex items-center justify-center p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentImage.url}
                alt={currentImage.alt}
                style={{
                  transform: `scale(${zoomLevel})`,
                  transition: "transform 0.2s ease-out",
                }}
                className="max-h-[75vh] max-w-[85vw] object-contain select-none filter drop-shadow-2xl"
              />
            </div>

            {normalizedImages.length > 1 && (
              <button
                onClick={handleNext}
                aria-label="Next fullscreen image"
                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 text-white p-3 md:p-4 rounded-full backdrop-blur-md transition-all cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Bottom Fullscreen Thumbnails */}
          {normalizedImages.length > 1 && (
            <div
              className="flex justify-center gap-3 pt-3 border-t border-white/10 z-20 overflow-x-auto no-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              {normalizedImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setCurrentIndex(idx);
                    setZoomLevel(1);
                  }}
                  className={`w-16 h-16 shrink-0 rounded-xl overflow-hidden p-1.5 bg-white/5 border transition-all cursor-pointer flex items-center justify-center ${
                    currentIndex === idx
                      ? "border-primary-green ring-2 ring-primary-green/40 bg-white/15 scale-105"
                      : "border-white/20 opacity-60 hover:opacity-100 hover:border-white/50"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.url}
                    alt={img.alt}
                    className="max-h-full max-w-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
