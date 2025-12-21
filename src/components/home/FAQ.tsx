import RevealAnimation from '../animation/RevealAnimation';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: 'Quels types de taximètres installez-vous ?',
    answer:
      'Nous installons les principales marques homologuées au Luxembourg et proposons des solutions alternatives modernes.',
  },
  {
    id: 2,
    question: 'Combien de temps prend un remplacement de pare-brise ?',
    answer:
      'La plupart des interventions sont réalisées en moins de 3 heures, incluant le temps de séchage de la colle pour votre sécurité.',
  },
  {
    id: 3,
    question: 'Intervenez-vous sur les véhicules électriques ?',
    answer:
      'Oui, nous sommes équipés pour intervenir sur toutes les motorisations, y compris les véhicules hybrides et électriques.',
  },
  {
    id: 4,
    question: "Prenez-vous en charge les démarches avec l'assurance ?",
    answer:
      'Pour Tech Glass, nous pouvons vous accompagner dans vos démarches de bris de glace auprès de votre assureur.',
  },
  {
    id: 5,
    question: 'Faut-il un rendez-vous ?',
    answer:
      'Il est préférable de prendre rendez-vous pour garantir une prise en charge immédiate, mais nous gérons les urgences au cas par cas.',
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="bg-slate-50 py-20 md:py-28">
      <div className="main-container">
        <div className="mx-auto mb-16 max-w-[720px] space-y-5 text-center">
          <RevealAnimation delay={0.1}>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-lime-400" />
              <span className="text-tagline-2 font-medium uppercase tracking-wider text-slate-400">FAQ</span>
            </div>
          </RevealAnimation>
          <div className="space-y-3">
            <RevealAnimation delay={0.1}>
              <h2 className="text-3xl font-bold text-slate-950 md:text-4xl lg:text-5xl">
                Questions <span className="text-slate-500">Fréquentes</span>
              </h2>
            </RevealAnimation>
            <RevealAnimation delay={0.1}>
              <p className="text-lg text-slate-400">
                Tout ce que vous devez savoir sur nos services taximètre et vitrage.
              </p>
            </RevealAnimation>
          </div>
        </div>
        <RevealAnimation delay={0.1}>
          <div>
            <Accordion
              className="mx-auto w-full max-w-[770px] space-y-4"
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
