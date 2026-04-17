import React, { useState } from "react";
import { Instagram, Facebook, Youtube, Send, Loader2, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ReviewsCarousel } from "./ReviewsCarousel";

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
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setStatus(null);
    setMessage("");

    try {
      const res = await fetch("/api/newsletter-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message);
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error);
      }
    } catch {
      setStatus("error");
      setMessage("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className='border-t border-white/5 text-white/40 py-12 px-4' style={{ paddingBottom: "2rem" }}>
      <ReviewsCarousel resenas={resenas} />

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
          <form onSubmit={handleSubscribe} className='space-y-2'>
            <div className='flex gap-2'>
              <Input
                type='email'
                placeholder='Tu email...'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className='bg-white/3 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-orange-600 text-sm'
              />
              <Button
                type='submit'
                size='icon'
                disabled={loading}
                className='bg-orange-600 hover:bg-orange-500 text-white shrink-0'
              >
                {loading ? <Loader2 className='w-4 h-4 animate-spin' /> : <Send className='w-4 h-4' />}
              </Button>
            </div>
            {message && (
              <div className={`flex items-center gap-1.5 text-xs ${status === "success" ? "text-green-400" : "text-red-400"}`}>
                {status === "success" ? <CheckCircle className='w-3.5 h-3.5' /> : <XCircle className='w-3.5 h-3.5' />}
                {message}
              </div>
            )}
          </form>
          <a href='/newsletter' className='text-xs text-white/40 hover:text-orange-400 transition-colors'>
            Ver boletines anteriores →
          </a>
        </div>
      </div>

      <div className='max-w-6xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-xs'>
        © {new Date().getFullYear()} A Pura Leña. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
