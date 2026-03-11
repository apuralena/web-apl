"use client";
import React, { useState, useEffect } from "react";
import type { SVGProps } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { cn } from "@/lib/utils";

interface StickyBannerProps {
  className?: string;
  children: React.ReactNode;
  hideOnScroll?: boolean;
  persistKey?: string;
  href?: string;
  showCloseButton?: boolean;
}

export const StickyBanner = ({
  className,
  children,
  hideOnScroll = false,
  persistKey,
  href,
  showCloseButton = true,
}: StickyBannerProps) => {
  const [open, setOpen] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    setMounted(true);
    if (persistKey && typeof window !== "undefined") {
      const saved = localStorage.getItem(`banner-closed-${persistKey}`);
      if (saved === "true") {
        setOpen(false);
      }
    }
  }, [persistKey]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (hideOnScroll && latest > 40) {
      setOpen(false);
    } else if (
      !persistKey ||
      localStorage.getItem(`banner-closed-${persistKey}`) !== "true"
    ) {
      setOpen(true);
    }
  });

  const handleClose = () => {
    setOpen(false);
    if (persistKey && typeof window !== "undefined") {
      localStorage.setItem(`banner-closed-${persistKey}`, "true");
    }
  };

  if (!mounted) {
    return null;
  }

  const content = (
    <>
      <div className='flex-1 text-center px-8'>{children}</div>

      {showCloseButton && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className='absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer p-2 hover:bg-white/20 rounded-full transition-colors'
          onClick={handleClose}
          aria-label='Cerrar banner'
        >
          <CloseIcon className='h-5 w-5 text-white' />
        </motion.button>
      )}
    </>
  );

  return (
    <motion.div
      className={cn(
        "fixed inset-x-0 top-0 z-[100] flex min-h-14 w-full items-center justify-center px-4 py-1 bg-gray-900",
        className,
      )}
      initial={{
        y: -100,
        opacity: 0,
      }}
      animate={{
        y: open ? 0 : -100,
        opacity: open ? 1 : 0,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      style={{
        pointerEvents: open ? "auto" : "none",
      }}
    >
      {href ? (
        <a
          href={href}
          className='flex items-center justify-center w-full h-full no-underline'
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {content}
        </a>
      ) : (
        content
      )}
    </motion.div>
  );
};

const CloseIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
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
      {...props}
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M18 6l-12 12' />
      <path d='M6 6l12 12' />
    </svg>
  );
};
