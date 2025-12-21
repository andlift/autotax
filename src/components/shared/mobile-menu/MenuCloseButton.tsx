'use client';

import { useMobileMenuContext } from '@/context/MobileMenuContext';

const MenuCloseButton = () => {
  const { closeMenu } = useMobileMenuContext();
  return (
    <button
      onClick={closeMenu}
      className="nav-hamburger-close relative flex size-10 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-full bg-slate-900">
      <span className="sr-only">Close Menu</span>
      <span className="absolute block h-0.5 w-4 rotate-45 bg-slate-500" />
      <span className="absolute block h-0.5 w-4 -rotate-45 bg-slate-500" />
    </button>
  );
};

MenuCloseButton.displayName = 'MenuCloseButton';
export default MenuCloseButton;
