interface MobileNavLinkProps {
  href: string;
  text: string;
  onClick: () => void;
}

export default function MobileNavLink({
  href,
  text,
  onClick,
}: MobileNavLinkProps) {
  return (
    <li>
      <a
        href={href}
        onClick={onClick}
        className='block py-3 px-4 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200'
      >
        {text}
      </a>
    </li>
  );
}
