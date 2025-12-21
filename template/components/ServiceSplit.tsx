
import React from 'react';
import { SERVICES } from '../constants';
import { Button } from './ui/Buttons';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

const ServiceSplit: React.FC = () => {
  return (
    <section className="py-24 relative" id="taximetres">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Taximeters */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="group glass-panel rounded-3xl p-10 border border-white/5 hover:border-neon/30 transition-all duration-500 overflow-hidden relative"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-neon/5 rounded-full blur-3xl group-hover:bg-neon/10 transition-colors"></div>
            
            <div className="flex items-center space-x-4 mb-8">
              <div className="p-3 bg-neon/10 rounded-xl group-hover:shadow-neon-glow transition-all">
                {SERVICES.taximeters.icon}
              </div>
              <h3 className="font-display font-black text-3xl tracking-tight">
                {SERVICES.taximeters.title}
              </h3>
            </div>
            
            <p className="text-secondary text-lg mb-8 leading-relaxed">
              {SERVICES.taximeters.description}
            </p>
            
            <ul className="space-y-4 mb-10">
              {SERVICES.taximeters.features.map(f => (
                <li key={f} className="flex items-center space-x-3 text-white/80">
                  <Check className="w-5 h-5 text-neon" />
                  <span className="font-semibold">{f}</span>
                </li>
              ))}
            </ul>
            
            <Button variant="neon" className="w-full">
              En savoir plus <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>

          {/* Tech Glass */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="group glass-panel rounded-3xl p-10 border border-white/5 hover:border-tech-blue/30 transition-all duration-500 overflow-hidden relative bg-tech-blue/5"
            id="techglass"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-tech-blue/10 rounded-full blur-3xl group-hover:bg-tech-blue/20 transition-colors"></div>
            
            <div className="flex items-center space-x-4 mb-8">
              <div className="p-3 bg-white/5 rounded-xl group-hover:shadow-lg transition-all">
                {SERVICES.glass.icon}
              </div>
              <h3 className="font-display font-black text-3xl tracking-tight">
                {SERVICES.glass.title}
              </h3>
            </div>
            
            <p className="text-secondary text-lg mb-8 leading-relaxed">
              {SERVICES.glass.description}
            </p>
            
            <ul className="space-y-4 mb-10">
              {SERVICES.glass.features.map(f => (
                <li key={f} className="flex items-center space-x-3 text-white/80">
                  <Check className="w-5 h-5 text-neon" />
                  <span className="font-semibold">{f}</span>
                </li>
              ))}
            </ul>
            
            <Button variant="secondary" className="w-full">
              Voir Tech Glass <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ServiceSplit;
