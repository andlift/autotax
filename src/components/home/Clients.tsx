import { cn } from '@/utils/cn';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import RevealAnimation from '../animation/RevealAnimation';

// Car brand logos
const carBrands = [
  { id: 1, name: 'Nissan', logo: '/images/nissan.webp' },
  { id: 2, name: 'Chevrolet', logo: '/images/Chevrolet.png' },
  { id: 3, name: 'Ford', logo: '/images/ford.webp' },
  { id: 4, name: 'Kia', logo: '/images/kia.webp' },
  { id: 5, name: 'Toyota', logo: '/images/Toyota.png' },
  { id: 6, name: 'Honda', logo: '/images/Honda.png' },
  { id: 7, name: 'BMW', logo: '/images/bmw.webp' },
  { id: 8, name: 'Tesla', logo: '/images/tesla.webp' },
  { id: 9, name: 'Mercedes-Benz', logo: '/images/mercedes.webp' },
];

const Clients = () => {
  return (
    <section className="bg-slate-50 py-16">
      <div className="main-container mb-8 text-center">
        <RevealAnimation delay={0.1}>
          <p className="text-tagline-1 text-slate-400">
            <span className="font-semibold text-lime-500">Toutes marques</span> — Nous intervenons sur tous les
            véhicules
          </p>
        </RevealAnimation>
      </div>
      <RevealAnimation delay={0.1}>
        <div className="relative">
          <div className="absolute top-0 left-0 z-40 h-full w-[15%] bg-gradient-to-r from-slate-50 to-transparent md:w-[20%]" />
          <div className="absolute top-0 right-0 z-40 h-full w-[15%] bg-gradient-to-l from-slate-50 to-transparent md:w-[20%]" />
          <Marquee autoFill speed={30}>
            <div className="flex items-center justify-center gap-12 py-8 md:gap-16">
              {carBrands.map((brand, index) => (
                <div
                  key={brand.id}
                  className={cn(
                    'flex min-w-[100px] items-center justify-center rounded-lg border border-slate-200 bg-white px-6 py-4 shadow-sm transition-all hover:border-lime-400 hover:shadow-md md:min-w-[140px] md:px-8',
                    index === 0 && 'ml-12',
                  )}>
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={160}
                    height={80}
                    className="h-16 w-auto object-contain grayscale transition-all hover:grayscale-0 md:h-20"
                  />
                </div>
              ))}
            </div>
          </Marquee>
        </div>
      </RevealAnimation>
    </section>
  );
};

Clients.displayName = 'Clients';
export default Clients;
