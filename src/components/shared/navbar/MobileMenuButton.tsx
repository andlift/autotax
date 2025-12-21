'use client';

import { useMobileMenuContext } from '@/context/MobileMenuContext';

const MobileMenuButton = () => {
  const { openMenu } = useMobileMenuContext();

  return (
    <div className="block xl:hidden">
      <button
        onClick={() => openMenu()}
        className="flex size-12 cursor-pointer flex-col items-center justify-center gap-[5px] rounded-full bg-slate-900 transition-all duration-200 hover:scale-105"
        aria-label="Open mobile menu">
        <span className="sr-only">Menu</span>
        <span className="block h-0.5 w-6 bg-slate-500 transition-all duration-200"></span>
        <span className="block h-0.5 w-6 bg-slate-500 transition-all duration-200"></span>
        <span className="block h-0.5 w-6 bg-slate-500 transition-all duration-200"></span>
      </button>
    </div>
  );
};

export default MobileMenuButton;
