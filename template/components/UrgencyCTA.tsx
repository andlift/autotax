
import React from 'react';
import { Button } from './ui/Buttons';
import { Phone, AlertCircle } from 'lucide-react';
import { COMPANY_INFO } from '../constants';

const UrgencyCTA: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="relative rounded-[2rem] overflow-hidden p-12 lg:p-20 bg-gradient-to-br from-tech-blue via-dark to-dark border border-white/5">
          {/* Decorative Background Element */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-neon/10 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 text-neon mb-6">
                <AlertCircle className="w-6 h-6" />
                <span className="font-bold tracking-widest uppercase text-sm">Urgence Pare-Brise</span>
              </div>
              <h2 className="font-display font-black text-4xl lg:text-6xl mb-6 leading-tight uppercase">
                Pare-brise fissuré ? <br />
                <span className="text-white opacity-60">Intervention rapide.</span>
              </h2>
              <p className="text-xl text-secondary mb-0">
                Nous intervenons sur toutes marques de véhicules pour assurer votre sécurité et votre visibilité sur la route.
              </p>
            </div>
            
            <div className="flex flex-col items-center lg:items-end space-y-6">
              <div className="text-center lg:text-right">
                <div className="text-secondary text-sm font-bold uppercase tracking-widest mb-1">Contact immédiat</div>
                <a href={`tel:${COMPANY_INFO.phone}`} className="text-3xl lg:text-4xl font-display font-black text-neon hover:text-white transition-colors">
                  {COMPANY_INFO.phone}
                </a>
              </div>
              <Button variant="neon" size="lg" className="w-full lg:w-auto shadow-neon-glow-strong">
                Appeler Maintenant
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UrgencyCTA;
