import { X } from "lucide-react";

interface CloseButtonProps {
  onClick: () => void;
}

export default function CloseButton({ onClick }: CloseButtonProps) {
  return (
    <button
      onClick={onClick}
      className='text-white/60 hover:text-white p-2 hover:bg-white/5 rounded-lg transition-all duration-200'
      aria-label='Cerrar menú'
    >
      <X className='w-5 h-5' />
    </button>
  );
}
