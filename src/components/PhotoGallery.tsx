import React, { useState, useEffect } from "react";

interface Photo {
  url: string;
  alt?: string;
}

interface PhotoGalleryProps {
  fotos: Photo[];
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ fotos }) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (!fotos || fotos.length === 0) return null;

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
        {fotos.map((foto, i) => {
          const thumbnailUrL = `${foto.url}?w=500&h=500&fit=crop&q=70&auto=format`;
          return (
            <button
              key={i}
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
              className='group relative aspect-square rounded-xl overflow-hidden border border-white/10 cursor-pointer bg-zinc-900'
            >
              <img
                src={thumbnailUrL}
                alt={foto.alt || "Foto de A Pura Leña"}
                className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                loading='lazy'
                decoding='async'
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

      {open && (
        <div
          className='fixed inset-0 z-50 bg-black/95 flex items-center justify-center'
          onClick={() => setOpen(false)}
        >
          <button
            className='absolute top-4 right-4 text-white/70 hover:text-white p-2'
            onClick={() => setOpen(false)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='32'
              height='32'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M18 6l-12 12' />
              <path d='M6 6l12 12' />
            </svg>
          </button>

          <button
            className='absolute left-4 text-white/70 hover:text-white p-2 hidden md:block'
            onClick={(e) => {
              e.stopPropagation();
              setIndex((index - 1 + fotos.length) % fotos.length);
            }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='32'
              height='32'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='m15 18-6-6 6-6' />
            </svg>
          </button>

          <button
            className='absolute right-4 text-white/70 hover:text-white p-2 hidden md:block'
            onClick={(e) => {
              e.stopPropagation();
              setIndex((index + 1) % fotos.length);
            }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='32'
              height='32'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='m9 18 6-6-6-6' />
            </svg>
          </button>

          <img
            src={`${fotos[index].url}?w=1600&q=90&auto=format`}
            alt={fotos[index].alt || "Foto"}
            className='max-w-full max-h-[85vh] object-contain'
            onClick={(e) => e.stopPropagation()}
          />

          <div className='absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm'>
            {index + 1} / {fotos.length}
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoGallery;
