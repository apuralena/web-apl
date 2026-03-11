import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { navItems } from "../config/navigation";
import MobileNavLink from "./MobileNavLink";
import MenuButton from "./MenuButton";
import CloseButton from "./CloseButton";

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openMenu = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = "";
  };

  return (
    <>
      <MenuButton onClick={openMenu} isOpen={isOpen} />

      {mounted &&
        createPortal(
          <>
            {/* Overlay backdrop */}
            {isOpen && (
              <div
                onClick={closeMenu}
                className='lg:hidden'
                style={{
                  position: "fixed",
                  inset: 0,
                  backgroundColor: "rgba(0,0,0,0.6)",
                  backdropFilter: "blur(4px)",
                  zIndex: 9998,
                }}
                aria-hidden='true'
              />
            )}

            {/* Menú móvil */}
            <nav
              className='lg:hidden'
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                width: "18rem",
                backgroundColor: "#0a0a0a",
                borderLeft: "1px solid rgba(255,255,255,0.1)",
                transform: isOpen ? "translateX(0)" : "translateX(100%)",
                transition: "transform 300ms ease-out",
                zIndex: 9999,
              }}
              aria-label='Menú principal móvil'
            >
              <div className='flex flex-col h-full'>
                <div
                  className='flex justify-between items-center'
                  style={{
                    padding: "1.25rem 1.5rem",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#f97316",
                    }}
                  >
                    Menú
                  </span>
                  <CloseButton onClick={closeMenu} />
                </div>
                <ul
                  className='flex flex-col'
                  style={{ padding: "1.5rem 1rem" }}
                >
                  {navItems.map((item) => (
                    <MobileNavLink
                      key={item.href}
                      href={item.href}
                      text={item.text}
                      onClick={closeMenu}
                    />
                  ))}
                </ul>
              </div>
            </nav>
          </>,
          document.body,
        )}
    </>
  );
}
