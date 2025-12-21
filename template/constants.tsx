
import React from 'react';
import { 
  ShieldCheck, 
  Zap, 
  Settings, 
  Wrench, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Mail, 
  Clock 
} from 'lucide-react';

export const LANGUAGES = [
  { code: 'FR', label: 'Français' },
  { code: 'EN', label: 'English' },
  { code: 'DE', label: 'Deutsch' },
  { code: 'PT', label: 'Português' }
];

export const COMPANY_INFO = {
  name: 'AUTO TAX & TECH',
  glassBrand: 'TECH GLASS',
  address: 'Zone Industrielle Rolach, L-5280 Sandweiler – Luxembourg',
  phone: '+352 26 777 503',
  email: 'info@autotaxtech.lu',
  hours: 'Lun – Ven: 08:00 – 18:00',
};

export const SERVICES = {
  taximeters: {
    title: "TAXIMÈTRES",
    description: "Installation, configuration et mise en conformité de vos solutions de taximètre.",
    features: ["Installation certifiée", "Configuration technique", "Mise en conformité", "Support technique"],
    icon: <Settings className="w-8 h-8 text-neon" />
  },
  glass: {
    title: "TECH GLASS",
    description: "Réparation et remplacement de pare-brise pour toutes marques de véhicules.",
    features: ["Pare-brise & Vitres", "Toutes marques", "Vitrage spécial", "Intervention rapide"],
    icon: <ShieldCheck className="w-8 h-8 text-neon" />
  }
};

export const TRUST_BADGES = [
  { text: "Entreprise au Luxembourg", icon: <MapPin className="w-5 h-5" /> },
  { text: "Intervention rapide", icon: <Zap className="w-5 h-5" /> },
  { text: "Toutes marques", icon: <CheckCircle2 className="w-5 h-5" /> },
  { text: "Techniciens qualifiés", icon: <Wrench className="w-5 h-5" /> }
];

export const PROCESS_STEPS = [
  { title: "Diagnostic", desc: "Analyse technique et évaluation des besoins." },
  { title: "Devis", desc: "Proposition tarifaire claire et transparente." },
  { title: "Intervention", desc: "Travaux réalisés par nos experts qualifiés." },
  { title: "Qualité", desc: "Contrôle rigoureux avant livraison." },
  { title: "Remise", desc: "Restitution du véhicule prêt à l'emploi." }
];

export const FAQS = [
  { q: "Quels types de taximètres installez-vous ?", a: "Nous installons les principales marques homologuées au Luxembourg et proposons des solutions alternatives modernes." },
  { q: "Combien de temps prend un remplacement de pare-brise ?", a: "La plupart des interventions sont réalisées en moins de 3 heures, incluant le temps de séchage de la colle pour votre sécurité." },
  { q: "Intervenez-vous sur les véhicules électriques ?", a: "Oui, nous sommes équipés pour intervenir sur toutes les motorisations, y compris les véhicules hybrides et électriques." },
  { q: "Prenez-vous en charge les démarches avec l'assurance ?", a: "Pour Tech Glass, nous pouvons vous accompagner dans vos démarches de bris de glace auprès de votre assureur." },
  { q: "Faut-il un rendez-vous ?", a: "Il est préférable de prendre rendez-vous pour garantir une prise en charge immédiate, mais nous gérons les urgences au cas par cas." }
];
