"use client";
import { cn } from "@/lib/utils";
import React from "react";
import type { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children?: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "fixed inset-0 w-full h-full bg-zinc-800 pointer-events-none z-0",
        className,
      )}
      {...props}
    >
      <div
        className='absolute inset-0 overflow-hidden'
        style={
          {
            "--aurora":
              "repeating-linear-gradient(100deg,#c2410c_10%,#ea580c_15%,#f97316_20%,#fb923c_25%,#d97706_30%)",
            "--dark-gradient":
              "repeating-linear-gradient(100deg,#000_0%,#000_7%,transparent_10%,transparent_12%,#000_16%)",
            "--white-gradient":
              "repeating-linear-gradient(100deg,#000_0%,#000_7%,transparent_10%,transparent_12%,#000_16%)",

            "--orange-700": "#c2410c",
            "--orange-600": "#ea580c",
            "--orange-500": "#f97316",
            "--orange-400": "#fb923c",
            "--amber-600": "#d97706",
            "--black": "#000",
            "--transparent": "transparent",
          } as React.CSSProperties
        }
      >
        <div
          className={cn(
            `after:animate-aurora pointer-events-none absolute -inset-[10px] [background-image:var(--dark-gradient),var(--aurora)] [background-size:300%,_200%] [background-position:50%_50%,50%_50%] opacity-40 blur-[10px] filter will-change-transform [--aurora:repeating-linear-gradient(100deg,var(--orange-700)_10%,var(--orange-600)_15%,var(--orange-500)_20%,var(--orange-400)_25%,var(--amber-600)_30%)] [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)] after:absolute after:inset-0 after:[background-image:var(--dark-gradient),var(--aurora)] after:[background-size:200%,_100%] after:[background-attachment:fixed] after:mix-blend-difference after:content-[""]`,

            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`,
          )}
        ></div>
      </div>
    </div>
  );
};
