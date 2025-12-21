
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ServiceSplit from './components/ServiceSplit';
import TrustSection from './components/TrustSection';
import UrgencyCTA from './components/UrgencyCTA';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <ServiceSplit />
        <TrustSection />
        <UrgencyCTA />
        
        {/* Testimonials Section (Inline implementation for the demo) */}
        <section className="py-24 bg-surface/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-display font-black text-4xl mb-4 uppercase">Ce qu'en disent nos clients</h2>
              <div className="w-20 h-1 bg-neon mx-auto"></div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: "Marc K.", rating: 5, content: "Service impeccable pour l'installation du nouveau taximètre. Rapide et très pro." },
                { name: "Sophie L.", rating: 5, content: "Remplacement de pare-brise parfait. On ne voit même pas la différence avec l'original." },
                { name: "Jean-Paul M.", rating: 4, content: "Une équipe à l'écoute et des solutions techniques innovantes. Je recommande." }
              ].map((review, idx) => (
                <div key={idx} className="glass-panel p-8 rounded-3xl border border-white/5 hover:border-white/10 transition-all">
                  <div className="flex text-neon mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={i < review.rating ? 'opacity-100' : 'opacity-20'}>★</span>
                    ))}
                  </div>
                  <p className="text-secondary italic mb-6">"{review.content}"</p>
                  <div className="font-bold text-white">{review.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
