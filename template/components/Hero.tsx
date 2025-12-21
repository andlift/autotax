
import React from 'react';
import { Button } from './ui/Buttons';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden flex items-center circuit-bg">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-neon/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-tech-blue/20 rounded-full blur-[120px]"></div>

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-neon/10 border border-neon/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-neon animate-pulse"></span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-neon">Disponible au Luxembourg</span>
          </div>
          
          <h1 className="font-display font-black text-6xl md:text-8xl leading-none mb-6">
            AUTO TAX<br />
            <span className="text-neon">& TECH</span>
          </h1>
          
          <h2 className="text-xl md:text-2xl font-bold text-white/90 mb-4 max-w-lg">
            Solutions taximètre & vitrage automobile.
          </h2>
          
          <p className="text-secondary text-lg mb-10 max-w-xl">
            Votre alternative pour l'installation de taximètres. Réparation & remplacement de pare-brise. <span className="text-white font-semibold">Toutes marques.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg">Demander un devis</Button>
            <Button variant="outline" size="lg">Voir Tech Glass</Button>
          </div>
        </motion.div>

        {/* HUD Graphics Mockup */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative hidden lg:block"
        >
          <div className="relative w-full aspect-square max-w-md mx-auto">
            {/* Outer Circle Ring */}
            <div className="absolute inset-0 border-[1px] border-white/5 rounded-full animate-[spin_20s_linear_infinite]"></div>
            <div className="absolute inset-4 border-[1px] border-neon/20 border-dashed rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
            
            {/* HUD Central Display */}
            <div className="absolute inset-12 glass-panel rounded-3xl border-t border-white/20 flex flex-col items-center justify-center shadow-neon-glow overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon to-transparent opacity-50"></div>
                
                <div className="text-[10px] font-mono text-neon/60 tracking-[0.2em] mb-4">SYSTEM STATUS: OPTIMAL</div>
                
                <div className="flex flex-col items-center">
                    <span className="text-5xl font-display font-black text-white neon-text">€ 0.00</span>
                    <span className="text-xs font-mono text-secondary mt-2">TARIF 1 • ACTIVE</span>
                </div>
                
                <div className="mt-8 grid grid-cols-3 gap-4 w-full px-8">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div 
                                className="h-full bg-neon" 
                                initial={{ width: 0 }}
                                animate={{ width: `${30 * i}%` }}
                                transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                            />
                        </div>
                    ))}
                </div>
                
                {/* Tech Glass Hud Element */}
                <div className="absolute bottom-6 right-6 flex items-center space-x-2">
                    <div className="text-[8px] font-mono text-right text-secondary">TECH GLASS<br/>SCANNER</div>
                    <div className="w-8 h-8 rounded-full border border-neon/40 flex items-center justify-center p-1">
                        <div className="w-full h-full border-b-2 border-neon animate-spin"></div>
                    </div>
                </div>
            </div>

            {/* Floating Decorative Elements */}
            <div className="absolute -top-4 right-10 p-4 glass-panel border border-neon/20 rounded-xl">
                <div className="text-[10px] font-bold text-neon mb-1 uppercase">Installation</div>
                <div className="text-sm font-bold">CERTIFIÉ</div>
            </div>
            
            <div className="absolute bottom-10 -left-4 p-4 glass-panel border border-white/10 rounded-xl">
                <div className="text-[10px] font-bold text-secondary mb-1 uppercase">Vitrage</div>
                <div className="text-sm font-bold">QUALITÉ OEM</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
