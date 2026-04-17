import { useEffect, useRef, useState } from "react";

const InstagramFeed = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasLoaded) {
            setIsVisible(true);
            setHasLoaded(true);
          }
        });
      },
      { rootMargin: "200px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasLoaded]);

  useEffect(() => {
    if (isVisible && !document.querySelector('script[src="https://w.behold.so/widget.js"]')) {
      const script = document.createElement("script");
      script.type = "module";
      script.src = "https://w.behold.so/widget.js";
      document.head.appendChild(script);
    }
  }, [isVisible]);

  return (
    <div className='max-w-6xl mx-auto space-y-6'>
      <div className='space-y-2'>
        <p className='text-sm font-medium tracking-[0.3em] uppercase text-orange-500'>
          Instagram
        </p>
        <h3 className='text-2xl md:text-3xl font-bold tracking-tight text-white'>
          Seguinos
        </h3>
      </div>
      <div ref={containerRef} className='rounded-2xl overflow-hidden min-h-[300px] bg-white/5 flex items-center justify-center'>
        {!hasLoaded ? (
          <div className='text-white/40 text-sm'>Cargando Instagram...</div>
        ) : (
          /* @ts-ignore */
          <behold-widget feed-id='wBxxTa5ICsbPcGmyoYuP'></behold-widget>
        )}
      </div>
      <div className='text-center mt-6'>
        <a
          href='https://www.instagram.com/a_pura_lena/'
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg'
        >
          Ver más en Instagram
        </a>
      </div>
    </div>
  );
};

export default InstagramFeed;
