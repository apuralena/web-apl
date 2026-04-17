"use client";
import React, { useState, useEffect } from "react";

interface Resena {
  autor: string;
  texto: string;
  estrellas: number;
  fecha?: string;
}

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg viewBox="0 0 24 24" className={`w-3 h-3 ${filled ? "text-yellow-500" : "text-white/20"}`} fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

export function ReviewsCarousel({ resenas }: { resenas: Resena[] }) {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
  }, []);

  const perPage = isMobile ? 1 : 3;
  const total = Math.ceil(resenas.length / perPage);
  const current = resenas.slice(index * perPage, index * perPage + perPage);

  if (!resenas?.length) return null;

  const goPrev = () => setIndex(i => (i - 1 + total) % total);
  const goNext = () => setIndex(i => (i + 1) % total);

  return (
    <div className="max-w-6xl mx-auto mb-16">
      <div className="space-y-2 mb-6">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          <h3 className="text-lg font-semibold text-white">Reseñas de Google</h3>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        {total > 1 && (
          <button
            onClick={goPrev}
            type="button"
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'white',
              cursor: 'pointer',
              flexShrink: 0,
            }}
            aria-label="Anterior"
          >
            ←
          </button>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ flex: 1, minHeight: isMobile ? 280 : 200 }}>
          {current.map((r, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2" style={{ flex: 1 }}>
              <div className="flex items-center justify-between">
                <span className="text-white font-medium text-sm">{r.autor}</span>
                {r.fecha && <span className="text-white/30 text-xs">{r.fecha}</span>}
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => <StarIcon key={j} filled={j < r.estrellas} />)}
              </div>
              <p className="text-white/50 text-sm leading-relaxed">{r.texto}</p>
            </div>
          ))}
        </div>

        {total > 1 && (
          <button
            onClick={goNext}
            type="button"
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'white',
              cursor: 'pointer',
              flexShrink: 0,
            }}
            aria-label="Siguiente"
          >
            →
          </button>
        )}
      </div>
    </div>
  );
}