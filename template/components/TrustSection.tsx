
import React from 'react';
import { TRUST_BADGES, PROCESS_STEPS } from '../constants';
import { motion } from 'framer-motion';

const TrustSection: React.FC = () => {
  return (
    <section className="py-24 bg-surface/50" id="about">
      <div className="container mx-auto px-6">
        
        {/* Badges Bar */}
        <div className="flex flex-wrap justify-center gap-4 mb-24">
          {TRUST_BADGES.map((badge, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center space-x-3 px-6 py-3 rounded-full bg-white/5 border border-white/5 hover:border-neon/30 transition-all cursor-default"
            >
              <span className="text-neon">{badge.icon}</span>
              <span className="text-xs font-bold uppercase tracking-widest text-white/80">{badge.text}</span>
            </motion.div>
          ))}
        </div>

        {/* Process Steps */}
        <div className="text-center mb-16">
          <h2 className="font-display font-black text-4xl mb-4 uppercase">Notre Processus</h2>
          <div className="w-20 h-1 bg-neon mx-auto"></div>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"></div>

          {PROCESS_STEPS.map((step, idx) => (
            <motion.div 
              key={idx} 
              className="relative z-10 flex flex-col items-center text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: idx * 0.15 }}
              viewport={{ once: true }}
            >
              <div className="w-20 h-20 rounded-2xl bg-dark border border-white/10 flex items-center justify-center text-2xl font-black text-neon mb-6 group-hover:scale-110 transition-transform shadow-lg relative">
                 <div className="absolute inset-0 bg-neon/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 0{idx + 1}
              </div>
              <h4 className="font-bold text-lg mb-2 text-white">{step.title}</h4>
              <p className="text-sm text-secondary px-4">{step.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TrustSection;
