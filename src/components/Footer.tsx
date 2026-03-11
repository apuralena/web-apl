import React from "react";
import { Instagram, Facebook, Youtube, Send, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Resena {
  autor: string;
  texto: string;
  estrellas: number;
  fecha?: string;
}

interface FooterProps {
  resenas?: Resena[];
}

const Footer = ({ resenas = [] }: FooterProps) => {
  return (
    <footer className='border-t border-white/5 text-white/40 py-16 px-6'>
      {/* Reseñas de Google */}
      {resenas.length > 0 && (
        <div className='max-w-6xl mx-auto mb-16'>
          <div className='space-y-2 mb-8'>
            <div className='flex items-center gap-2'>
              <svg viewBox='0 0 24 24' className='w-5 h-5' fill='none'>
                <path
                  d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z'
                  fill='#4285F4'
                />
                <path
                  d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                  fill='#34A853'
                />
                <path
                  d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                  fill='#FBBC05'
                />
                <path
                  d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                  fill='#EA4335'
                />
              </svg>
              <h3 className='text-lg font-semibold text-white'>
                Reseñas de Google
              </h3>
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {resenas.map((resena, i) => (
              <div
                key={i}
                className='bg-white/5 border border-white/10 rounded-xl p-5 space-y-3'
              >
                <div className='flex items-center justify-between'>
                  <span className='text-white font-medium text-sm'>
                    {resena.autor}
                  </span>
                  {resena.fecha && (
                    <span className='text-white/30 text-xs'>
                      {resena.fecha}
                    </span>
                  )}
                </div>
                <div className='flex gap-0.5'>
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      className={`w-3.5 h-3.5 ${
                        j < resena.estrellas
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-white/20"
                      }`}
                    />
                  ))}
                </div>
                <p className='text-white/50 text-sm leading-relaxed'>
                  {resena.texto}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12'>
        {/* Columna 1: Logo y Bio */}
        <div className='md:col-span-1 space-y-5'>
          <div className='flex items-center gap-2.5'>
            <img src='/logo.png' alt='A Pura Leña' className='w-10 ' />
            <span className='text-white font-semibold text-lg tracking-tight'>
              A Pura Leña
            </span>
          </div>
          <p className='text-sm leading-relaxed'>
            Llevamos la tradición del asado argentino a tu evento con la pasión
            del fuego y la mejor selección de carnes.
          </p>
          <div className='flex gap-3'>
            <a
              href='https://www.instagram.com/a_pura_lena/'
              target='_blank'
              rel='noopener noreferrer'
              className='p-2 rounded-lg hover:bg-white/5 transition-colors'
            >
              <Instagram className='w-4 h-4 hover:text-white transition-colors' />
            </a>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://www.facebook.com/profile.php?id=61561940952103'
              className='p-2 rounded-lg hover:bg-white/5 transition-colors'
            >
              <Facebook className='w-4 h-4 hover:text-white transition-colors' />
            </a>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://www.youtube.com/@apurale%C3%B1a'
              className='p-2 rounded-lg hover:bg-white/5 transition-colors'
            >
              <Youtube className='w-4 h-4 hover:text-white transition-colors' />
            </a>
          </div>
        </div>

        {/* Columna 2: Empresa */}
        <div className='space-y-4'>
          <h4 className='text-xs font-semibold tracking-widest uppercase text-orange-500'>
            Empresa
          </h4>
          <ul className='space-y-3 text-sm'>
            <li>
              <a
                href='/#nosotros'
                className='hover:text-white transition-colors'
              >
                Nosotros
              </a>
            </li>
            <li>
              <a
                href='/#propuestas'
                className='hover:text-white transition-colors'
              >
                Propuestas
              </a>
            </li>
            <li>
              <a
                href='/#experiencias'
                className='hover:text-white transition-colors'
              >
                Experiencias
              </a>
            </li>
            <li>
              <a
                href='/#contacto'
                className='hover:text-white transition-colors'
              >
                Contacto
              </a>
            </li>
          </ul>
        </div>

        {/* Columna 3: Ayuda */}
        <div className='space-y-4'>
          <h4 className='text-xs font-semibold tracking-widest uppercase text-orange-500'>
            Ayuda
          </h4>
          <ul className='space-y-3 text-sm'>
            <li>
              <a href='#' className='hover:text-white transition-colors'>
                Soporte
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-white transition-colors'>
                Términos
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-white transition-colors'>
                Privacidad
              </a>
            </li>
          </ul>
        </div>

        {/* Columna 4: Newsletter */}
        <div className='space-y-4'>
          <h4 className='text-xs font-semibold tracking-widest uppercase text-orange-500'>
            Newsletter
          </h4>
          <p className='text-sm'>Recibí novedades y promociones.</p>
          <div className='flex gap-2'>
            <Input
              type='email'
              placeholder='Tu email...'
              className='bg-white/3 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-orange-600 text-sm'
            />
            <Button
              size='icon'
              className='bg-orange-600 hover:bg-orange-500 text-white shrink-0'
            >
              <Send className='w-4 h-4' />
            </Button>
          </div>
        </div>
      </div>

      <div className='max-w-6xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-xs'>
        © {new Date().getFullYear()} A Pura Leña. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
