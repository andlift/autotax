
import React from 'react';
import { COMPANY_INFO } from '../constants';
import { Facebook, Instagram, Linkedin, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-dark border-t border-white/5 pt-20 pb-10 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="lg:col-span-1">
            <div className="flex flex-col mb-8">
              <span className="font-display font-black text-2xl tracking-tighter leading-none text-white">
                AUTO TAX <span className="text-neon">&</span> TECH
              </span>
              <span className="text-[10px] tracking-[0.3em] font-medium text-secondary uppercase opacity-80 mt-1">
                Luxembourg Solutions
              </span>
            </div>
            <p className="text-secondary text-sm leading-relaxed mb-8">
              Expertise industrielle en taximètres et solutions de vitrage automobile haut de gamme au Luxembourg.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Instagram, Linkedin].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-secondary hover:text-neon hover:border-neon transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-[0.2em] text-xs mb-8">Navigation</h4>
            <ul className="space-y-4">
              {['Accueil', 'Taximètres', 'Tech Glass', 'À propos', 'Contact'].map(link => (
                <li key={link}>
                  <a href="#" className="text-secondary hover:text-neon text-sm transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-[0.2em] text-xs mb-8">Nos Services</h4>
            <ul className="space-y-4">
              {[
                'Installation Taximètres', 
                'Configuration Digitale', 
                'Réparation Pare-brise', 
                'Remplacement de Vitres', 
                'Vitrage Spécialisé',
                'Support Technique'
              ].map(service => (
                <li key={service}>
                  <a href="#" className="text-secondary hover:text-neon text-sm transition-colors">{service}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Direct */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-[0.2em] text-xs mb-8">Nous Contacter</h4>
            <div className="space-y-4 text-sm">
              <p className="text-secondary">{COMPANY_INFO.address}</p>
              <p className="font-bold text-neon">{COMPANY_INFO.phone}</p>
              <p className="text-secondary">{COMPANY_INFO.email}</p>
              <p className="text-xs text-white/40 mt-6">{COMPANY_INFO.hours}</p>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-secondary/60">
            © {currentYear} Auto Tax & Tech Sàrl. Tous droits réservés.
          </p>
          <div className="flex space-x-8">
            <a href="#" className="text-xs text-secondary/60 hover:text-white transition-colors">Mentions Légales</a>
            <a href="#" className="text-xs text-secondary/60 hover:text-white transition-colors">Politique de Confidentialité</a>
          </div>
          <button 
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-secondary hover:text-neon hover:border-neon transition-all hover:-translate-y-1"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
