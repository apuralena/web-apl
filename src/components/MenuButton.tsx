import { Menu } from "lucide-react";

interface MenuButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export default function MenuButton({ onClick, isOpen }: MenuButtonProps) {
  return (
    <button
      onClick={onClick}
      className='lg:hidden text-white/70 hover:text-white p-2 hover:bg-white/5 rounded-lg transition-all duration-200'
      aria-label='Abrir menú'
      aria-expanded={isOpen}
    >
      <Menu className='w-5 h-5' />
    </button>
  );
}
