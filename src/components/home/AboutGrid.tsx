'use client';

import { useTranslation } from '@/i18n/client';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { Box, Lock, Search, Settings, Sparkles } from 'lucide-react';

export default function AboutGrid() {
  const { t } = useTranslation();

  const gridItems = [
    {
      area: 'md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]',
      icon: <Box className="h-4 w-4 text-slate-400" />,
      title: t('aboutGrid.expertise.title'),
      description: t('aboutGrid.expertise.description'),
    },
    {
      area: 'md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]',
      icon: <Settings className="h-4 w-4 text-slate-400" />,
      title: t('aboutGrid.technicians.title'),
      description: t('aboutGrid.technicians.description'),
    },
    {
      area: 'md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]',
      icon: <Lock className="h-4 w-4 text-slate-400" />,
      title: t('aboutGrid.solutions.title'),
      description: t('aboutGrid.solutions.description'),
    },
    {
      area: 'md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]',
      icon: <Sparkles className="h-4 w-4 text-slate-400" />,
      title: t('aboutGrid.quality.title'),
      description: t('aboutGrid.quality.description'),
    },
    {
      area: 'md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]',
      icon: <Search className="h-4 w-4 text-slate-400" />,
      title: t('aboutGrid.location.title'),
      description: t('aboutGrid.location.description'),
    },
  ];

  return (
    <section className="bg-slate-950 py-20 md:py-28">
      <div className="main-container">
        <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
          {gridItems.map((item, index) => (
            <GridItem
              key={index}
              area={item.area}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2xl border border-slate-800 p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          blur={0}
          borderWidth={3}
          spread={80}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          variant="lime"
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl bg-slate-900 p-6 shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-slate-700 p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-white md:text-2xl/[1.875rem]">
                {title}
              </h3>
              <p className="font-sans text-sm/[1.5rem] text-slate-400 md:text-base/[1.625rem]">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
