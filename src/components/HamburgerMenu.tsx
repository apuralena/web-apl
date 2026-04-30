import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { navItems } from "../config/navigation";
import MobileNavLink from "./MobileNavLink";
import MenuButton from "./MenuButton";
import CloseButton from "./CloseButton";

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setMounted(true);
    
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const openMenu = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = "";
  };

  if (!mounted) {
    return <MenuButton onClick={() => {}} isOpen={false} />;
  }

  // DEBUG: Always show for testing
  // if (!isMobile) return null;

  return (
    <>
      <MenuButton onClick={openMenu} isOpen={isOpen} />

      {createPortal(
        <>
          {/* Overlay backdrop */}
          {isOpen && (
            <div
              onClick={closeMenu}
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
            style={{
              display: isOpen ? "block" : "none",
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "85%",
              maxWidth: "18rem",
              backgroundColor: "#09090b",
              borderLeft: "1px solid rgba(255,255,255,0.1)",
              zIndex: 9999,
            }}
            aria-label='Menú principal móviles'
          >
            <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
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
              <ul style={{ padding: "1.5rem 1rem", display: "flex", flexDirection: "column" }}>
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
