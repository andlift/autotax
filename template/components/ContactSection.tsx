
import React from 'react';
import { Button } from './ui/Buttons';
import { COMPANY_INFO } from '../constants';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const ContactSection: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden" id="contact">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Form Side */}
          <div className="glass-panel p-10 rounded-3xl border border-white/5">
            <h3 className="font-display font-black text-3xl mb-8 uppercase">Demande de devis</h3>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-secondary uppercase tracking-[0.2em] mb-2">Nom Complet</label>
                  <input 
                    type="text" 
                    placeholder="Jean Dupont"
                    className="w-full bg-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-secondary uppercase tracking-[0.2em] mb-2">Téléphone</label>
                  <input 
                    type="tel" 
                    placeholder="+352 000 000 000"
                    className="w-full bg-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-secondary uppercase tracking-[0.2em] mb-2">Email</label>
                <input 
                  type="email" 
                  placeholder="jean@exemple.lu"
                  className="w-full bg-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-secondary uppercase tracking-[0.2em] mb-2">Service</label>
                <select className="w-full bg-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon transition-colors appearance-none">
                  <option value="taximeter">Taximètre (Installation / Config)</option>
                  <option value="glass">Tech Glass (Pare-brise / Vitrage)</option>
                  <option value="other">Autre demande</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-secondary uppercase tracking-[0.2em] mb-2">Message</label>
                <textarea 
                  rows={4}
                  placeholder="Décrivez votre besoin..."
                  className="w-full bg-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon transition-colors resize-none"
                ></textarea>
              </div>

              <Button size="lg" className="w-full">
                <Send className="w-4 h-4 mr-2" /> Envoyer la demande
              </Button>
            </form>
          </div>

          {/* Info Side */}
          <div className="flex flex-col justify-center">
            <h3 className="font-display font-black text-3xl mb-12 uppercase">Nos Coordonnées</h3>
            
            <div className="space-y-10">
              <div className="flex items-start space-x-6">
                <div className="w-14 h-14 bg-neon/10 rounded-2xl flex items-center justify-center shrink-0">
                  <MapPin className="text-neon w-6 h-6" />
                </div>
                <div>
                  <h5 className="font-bold text-white mb-2 uppercase tracking-widest text-sm">Adresse</h5>
                  <p className="text-secondary leading-relaxed max-w-xs">{COMPANY_INFO.address}</p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="w-14 h-14 bg-neon/10 rounded-2xl flex items-center justify-center shrink-0">
                  <Phone className="text-neon w-6 h-6" />
                </div>
                <div>
                  <h5 className="font-bold text-white mb-2 uppercase tracking-widest text-sm">Téléphone</h5>
                  <a href={`tel:${COMPANY_INFO.phone}`} className="text-secondary hover:text-neon transition-colors text-lg font-semibold">{COMPANY_INFO.phone}</a>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="w-14 h-14 bg-neon/10 rounded-2xl flex items-center justify-center shrink-0">
                  <Mail className="text-neon w-6 h-6" />
                </div>
                <div>
                  <h5 className="font-bold text-white mb-2 uppercase tracking-widest text-sm">Email</h5>
                  <a href={`mailto:${COMPANY_INFO.email}`} className="text-secondary hover:text-neon transition-colors">{COMPANY_INFO.email}</a>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="w-14 h-14 bg-neon/10 rounded-2xl flex items-center justify-center shrink-0">
                  <Clock className="text-neon w-6 h-6" />
                </div>
                <div>
                  <h5 className="font-bold text-white mb-2 uppercase tracking-widest text-sm">Horaires d'ouverture</h5>
                  <p className="text-secondary">{COMPANY_INFO.hours}</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-12 rounded-3xl overflow-hidden h-64 bg-surface border border-white/5 relative group">
                <div className="absolute inset-0 bg-dark/40 group-hover:bg-transparent transition-colors z-10"></div>
                <img 
                    src="https://picsum.photos/800/400?grayscale" 
                    alt="Location map" 
                    className="w-full h-full object-cover filter brightness-50"
                />
                <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="p-4 glass-panel border border-neon/40 rounded-2xl flex flex-col items-center">
                        <MapPin className="text-neon mb-2" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Voir sur Google Maps</span>
                    </div>
                </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
