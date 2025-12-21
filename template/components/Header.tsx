
import React, { useState, useEffect } from 'react';
import { Button } from './ui/Buttons';
import { LANGUAGES, COMPANY_INFO } from '../constants';
import { Phone, ChevronDown, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('FR');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Accueil', href: '#' },
    { label: 'Taximètres', href: '#taximetres' },
    { label: 'Tech Glass', href: '#techglass' },
    { label: 'À propos', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-3 glass-panel shadow-lg' : 'py-6 bg-transparent'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex flex-col">
          <span className="font-display font-black text-2xl tracking-tighter leading-none text-white">
            AUTO TAX <span className="text-neon">&</span> TECH
          </span>
          <span className="text-[10px] tracking-[0.3em] font-medium text-secondary uppercase opacity-80">
            Luxembourg Solutions
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <a 
              key={item.label} 
              href={item.href} 
              className="text-xs font-bold uppercase tracking-widest text-white/70 hover:text-neon transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          <div className="relative group">
            <button className="flex items-center space-x-1 text-xs font-bold text-white hover:text-neon">
              <span>{currentLang}</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            <div className="absolute right-0 top-full mt-2 hidden group-hover:block bg-surface border border-glass-border rounded-lg shadow-xl overflow-hidden min-w-[120px]">
              {LANGUAGES.map((lang) => (
                <button 
                  key={lang.code}
                  onClick={() => setCurrentLang(lang.code)}
                  className="block w-full text-left px-4 py-2 text-xs hover:bg-white/10 transition-colors"
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
          
          <Button variant="outline" size="sm" className="hidden xl:flex">
            <Phone className="w-3 h-3 mr-2" />
            {COMPANY_INFO.phone}
          </Button>
          
          <Button size="sm">Devis</Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-dark border-t border-glass-border p-6 shadow-2xl animate-in fade-in slide-in-from-top-4">
          <div className="flex flex-col space-y-6">
            {navItems.map((item) => (
              <a 
                key={item.label} 
                href={item.href} 
                className="text-lg font-bold uppercase text-white hover:text-neon"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 border-t border-glass-border flex flex-col space-y-4">
              <Button className="w-full">Demander un devis</Button>
              <Button variant="outline" className="w-full">
                {COMPANY_INFO.phone}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
