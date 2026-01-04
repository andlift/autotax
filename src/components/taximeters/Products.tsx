'use client';

import RevealAnimation from '@/components/animation/RevealAnimation';
import LinkButton from '@/components/ui/button/Button';
import { useI18n } from '@/i18n/client';
import { Check, Star } from 'lucide-react';
import Image from 'next/image';
import type { Dictionary } from '@/i18n/dictionaries';

interface ProductDict {
  title: string;
  price: string;
  description: string;
  popular?: string;
  features: string[];
}

interface TaximetersPageDict {
  products?: {
    basic?: ProductDict;
    connecte?: ProductDict;
    cam?: ProductDict;
  };
}

const Products = () => {
  const { t, dictionary } = useI18n();
  const taximetersPage = (dictionary as Dictionary & { taximetersPage?: TaximetersPageDict }).taximetersPage;

  const products = [
    {
      key: 'basic' as const,
      image: '/images/auto-tax-taximeter-taxi-air-start.png',
      features: taximetersPage?.products?.basic?.features || [],
    },
    {
      key: 'connecte' as const,
      image: '/images/auto-tax-taximeter-taxi-air-w-start.png',
      popular: true,
      features: taximetersPage?.products?.connecte?.features || [],
    },
    {
      key: 'cam' as const,
      image: '/images/auto-tax-taximeter-taxi-primus-start.png',
      features: taximetersPage?.products?.cam?.features || [],
    },
  ];

  return (
    <section id="products" className="bg-gray-50 py-20 md:py-28">
      <div className="main-container">
        {/* Header */}
        <RevealAnimation direction="up" delay={0.1}>
          <div className="mb-16 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-lime-400" />
              <span className="text-tagline-2 font-medium uppercase tracking-wider text-slate-500">
                {t('taximetersPage.products.badge')}
              </span>
            </div>

            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
              {t('taximetersPage.products.title')}{' '}
              <span className="text-lime-500">{t('taximetersPage.products.titleAccent')}</span>
            </h2>
          </div>
        </RevealAnimation>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <RevealAnimation key={product.key} direction="up" delay={0.1 + index * 0.1}>
              <div className={`relative flex h-full flex-col rounded-2xl border ${product.popular ? 'border-lime-400 shadow-lg shadow-lime-400/10' : 'border-slate-200'} bg-white p-6 lg:p-8`}>
                {/* Popular Badge */}
                {product.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1 rounded-full bg-lime-400 px-4 py-1.5">
                      <Star className="h-4 w-4 fill-slate-950 text-slate-950" />
                      <span className="text-tagline-3 font-semibold text-slate-950">
                        {t(`taximetersPage.products.${product.key}.popular`)}
                      </span>
                    </div>
                  </div>
                )}

                {/* Product Image */}
                <div className="mb-6 flex justify-center pt-2">
                  <div className="relative h-40 w-full">
                    <Image
                      src={product.image}
                      alt={t(`taximetersPage.products.${product.key}.title`)}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Title & Price */}
                <div className="mb-4 text-center">
                  <h3 className="mb-2 text-xl font-bold text-slate-900 lg:text-2xl">
                    {t(`taximetersPage.products.${product.key}.title`)}
                  </h3>
                  <div className="text-2xl font-bold text-lime-500 lg:text-3xl">
                    {t(`taximetersPage.products.${product.key}.price`)}
                  </div>
                </div>

                {/* Description */}
                <p className="text-tagline-2 mb-6 text-center text-slate-600">
                  {t(`taximetersPage.products.${product.key}.description`)}
                </p>

                {/* Features */}
                <ul className="mb-8 grow space-y-3">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-lime-500" />
                      <span className="text-tagline-2 text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <LinkButton
                  href="#contact"
                  btnClass={`btn-md w-full ${product.popular ? '!border-lime-400 !bg-lime-400 !text-slate-950 hover:!bg-lime-500' : '!border-slate-300 !bg-white !text-slate-900 hover:!border-lime-400 hover:!bg-lime-50'} font-semibold`}>
                  {t('taximetersPage.products.cta')}
                </LinkButton>
              </div>
            </RevealAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};

Products.displayName = 'TaximetersProducts';
export default Products;
