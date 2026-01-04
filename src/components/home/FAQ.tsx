'use client';

import { useTranslation } from '@/i18n/client';
import RevealAnimation from '../animation/RevealAnimation';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

const FAQ = () => {
  const { t } = useTranslation();

  const faqData = [
    {
      id: 1,
      question: t('faq.questions.q1.question'),
      answer: t('faq.questions.q1.answer'),
    },
    {
      id: 2,
      question: t('faq.questions.q2.question'),
      answer: t('faq.questions.q2.answer'),
    },
    {
      id: 3,
      question: t('faq.questions.q3.question'),
      answer: t('faq.questions.q3.answer'),
    },
    {
      id: 4,
      question: t('faq.questions.q4.question'),
      answer: t('faq.questions.q4.answer'),
    },
    {
      id: 5,
      question: t('faq.questions.q5.question'),
      answer: t('faq.questions.q5.answer'),
    },
  ];

  return (
    <section id="faq" className="bg-slate-50 py-20 md:py-28">
      <div className="main-container">
        <div className="mx-auto mb-16 max-w-180 space-y-5 text-center">
          <RevealAnimation delay={0.1}>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-lime-400" />
              <span className="text-tagline-2 font-medium uppercase tracking-wider text-slate-400">{t('faq.badge')}</span>
            </div>
          </RevealAnimation>
          <div className="space-y-3">
            <RevealAnimation delay={0.1}>
              <h2 className="text-3xl font-bold text-slate-950 md:text-4xl lg:text-5xl">
                {t('faq.title')} <span className="text-slate-500">{t('faq.titleAccent')}</span>
              </h2>
            </RevealAnimation>
            <RevealAnimation delay={0.1}>
              <p className="text-lg text-slate-400">
                {t('faq.subtitle')}
              </p>
            </RevealAnimation>
          </div>
        </div>
        <RevealAnimation delay={0.1}>
          <div>
            <Accordion
              className="mx-auto w-full max-w-192.5 space-y-4"
              defaultValue="1"
              enableScrollAnimation={true}
              animationDelay={0.1}>
              {faqData.map((item) => (
                <AccordionItem
                  className="rounded-2xl border border-slate-200 bg-white px-6 shadow-sm md:px-8"
                  key={item.id}
                  value={item.id.toString()}>
                  <AccordionTrigger
                    titleClassName="flex-1 text-left text-heading-6 font-normal text-slate-950"
                    className="flex w-full cursor-pointer items-center justify-between py-6 md:py-8"
                    value={item.id.toString()}
                    iconType="arrow">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-800" value={item.id.toString()}>
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
};

FAQ.displayName = 'FAQ';
export default FAQ;
