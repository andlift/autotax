'use client';

import RevealAnimation from '@/components/animation/RevealAnimation';
import { useTranslation } from '@/i18n/client';

const Specs = () => {
  const { t } = useTranslation();

  const specKeys = [
    'dimensions',
    'weight',
    'operatingTemp',
    'storageTemp',
    'humidity',
    'kCoefficient',
    'distanceAccuracy',
    'timeAccuracy',
    'fareAccuracy',
  ];

  return (
    <section className="bg-gray-50 py-20 md:py-28">
      <div className="main-container">
        {/* Header */}
        <RevealAnimation direction="up" delay={0.1}>
          <div className="mb-16 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-lime-400" />
              <span className="text-tagline-2 font-medium uppercase tracking-wider text-slate-500">
                {t('taximetersPage.specs.badge')}
              </span>
            </div>

            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
              {t('taximetersPage.specs.title')}{' '}
              <span className="text-lime-500">{t('taximetersPage.specs.titleAccent')}</span>
            </h2>
          </div>
        </RevealAnimation>

        {/* Specs Table */}
        <RevealAnimation direction="up" delay={0.2}>
          <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full">
              <tbody>
                {specKeys.map((key, index) => (
                  <tr
                    key={key}
                    className={`${index !== specKeys.length - 1 ? 'border-b border-slate-100' : ''}`}>
                    <td className="px-6 py-4 text-tagline-1 font-medium text-slate-900">
                      {t(`taximetersPage.specs.items.${key}.label`)}
                    </td>
                    <td className="px-6 py-4 text-right text-tagline-1 text-slate-600">
                      {t(`taximetersPage.specs.items.${key}.value`)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
};

Specs.displayName = 'TaximetersSpecs';
export default Specs;
