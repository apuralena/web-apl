const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

interface MenuButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export default function MenuButton({ onClick, isOpen }: MenuButtonProps) {
  return (
    <button
      onClick={onClick}
      className='text-white hover:text-white p-2 hover:bg-white/10 rounded-lg transition-all duration-200 flex items-center justify-center'
      style={{ width: "44px", height: "44px" }}
      aria-label='Abrir menú'
      aria-expanded={isOpen}
    >
      <MenuIcon />
    </button>
  );
}
