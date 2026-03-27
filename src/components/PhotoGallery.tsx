import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface Photo {
  url: string; // URL original de Sanity
  alt?: string;
}

interface PhotoGalleryProps {
  fotos: Photo[];
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ fotos }) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (!fotos || fotos.length === 0) return null;

  // 1. Optimizamos las imágenes del Lightbox (Pantalla completa)
  // Agregamos parámetros de Sanity a la URL para bajar el peso drásticamente
  const slides = fotos.map((foto) => ({
    src: `${foto.url}?w=1600&q=80&auto=format`, // Max 1600px, calidad 80%, formato moderno
    alt: foto.alt || "Foto de A Pura Leña",
  }));

  return (
    <>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
        {fotos.map((foto, i) => {
          // 2. Optimizamos la miniatura de la grilla
          // No necesitamos 18MB para un cuadrado de 400px.
          const thumbnailUrL = `${foto.url}?w=500&h=500&fit=crop&q=70&auto=format`;
          return (
            <button
              key={i}
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
              className='group relative aspect-square rounded-xl overflow-hidden border border-white/10 cursor-pointer bg-gray-900'
            >
              <img
                src={thumbnailUrL} // <--- Usamos la URL optimizada
                alt={foto.alt || "Foto de A Pura Leña"}
                className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                loading='lazy'
                decoding='async' // Ayuda al navegador a no bloquear el hilo principal
              />
              <div className='absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                >
                  <circle cx='11' cy='11' r='8' />
                  <path d='m21 21-4.3-4.3' />
                  <path d='M11 8v6' />
                  <path d='M8 11h6' />
                </svg>
              </div>
            </button>
          );
        })}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
      />
    </>
  );
};

export default PhotoGallery;
