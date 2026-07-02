import fs from 'fs';
import path from 'path';

const clients = [
  {
    id: 'bii',
    name: "Bouira d'Ingénierie Industrielle (BII)",
    tier: "A",
    sector: "Ingénierie industrielle et structures métalliques",
    painPoints: ["Temps de préparation des devis", "Documentation des plans de récolement (as-built)", "Gestion des conflits de planification des équipes", "Écarts de communication entre le chantier et le bureau", "Volatilité des prix des matériaux"],
    aiOpportunities: ["Génération de devis assistée par IA", "Documentation as-built automatisée", "Optimisation du planning des ressources", "Capture des progrès sur site via WhatsApp", "Suivi des prix des matériaux en temps réel"],
    roiEstimation: "5 à 10 heures d'ingénierie récupérées par semaine (2 000 € - 4 000 €/an) en plus des devis plus rapides.",
    pitch: "Vous générez déjà une documentation technique détaillée pour chaque projet (plans as-built, isométriques, devis). Nous créons des outils IA qui transforment vos fichiers historiques en brouillons de devis instantanés et génèrent automatiquement la documentation de fin de chantier, pour que vos ingénieurs se concentrent sur la conception plutôt que sur la saisie.",
    outreachMessage: "Bonjour, j'ai vu le travail de BII dans le domaine des structures métalliques et de la chaudronnerie. On aide les bureaux d'ingénierie industrielle en Algérie à automatiser la génération de devis et de documentation technique grâce à l'IA. Un échange rapide de 15 minutes vous intéresserait-il pour voir si ça peut s'appliquer chez BII ?"
  },
  {
    id: 'general-emballage',
    name: "General Emballage",
    tier: "A",
    sector: "Emballage carton et ondulé",
    painPoints: ["Planification de la production face à de multiples délais", "Suivi des déchets de papier/carton", "Analyse des causes des défauts de qualité", "Risques de pénalités de retard avec les grands clients", "Réconciliation manuelle des commandes et factures"],
    aiOpportunities: ["Optimisation de la planification de production", "Tableau de bord de suivi des défauts", "Prévision de la demande basée sur l'historique", "Réconciliation automatisée commandes/factures", "Analyse des déchets matériels"],
    roiEstimation: "Une réduction de 3 à 5 % des déchets matériels (5 000 € - 15 000 €/an d'économies directes).",
    pitch: "Vos plus gros clients sont des industriels de l'agroalimentaire qui ne peuvent pas se permettre de retards de livraison. Nous aidons les producteurs d'emballages à prévoir la demande et à planifier la production pour réduire le risque de retard, tout en diminuant le gaspillage matière.",
    outreachMessage: "Bonjour, on travaille avec des industriels de l'emballage et de l'agroalimentaire dans la région de Béjaïa pour réduire le gaspillage matière et fiabiliser les délais de livraison grâce à l'IA. Seriez-vous disponible pour un échange de 15 minutes ?"
  },
  {
    id: 'beje',
    name: "Béjaïa Emballage SPA (BEJE)",
    tier: "A",
    sector: "Emballage plastique industriel",
    painPoints: ["Exposition aux prix des résines", "Planification de la production multicatégorie", "Documentation de contrôle qualité", "Gestion des coûts énergétiques", "Lourdeur des rapports administratifs/conseil d'administration"],
    aiOpportunities: ["Surveillance des prix des résines et conseil en achat", "Planification de production optimisée", "Automatisation des certificats de qualité", "Analyse de l'optimisation énergétique", "Assistance automatisée aux rapports financiers"],
    roiEstimation: "Optimisation du timing d'achat des matières premières volatiles (résine) avec un impact majeur sur les marges.",
    pitch: "En tant que SPA structurée, vous raisonnez déjà en termes de reporting régulier. Nous apportons cette même structure à vos achats de matières premières et à votre planification de production, en utilisant l'IA pour identifier les meilleures fenêtres d'achat et le planning de production le plus sûr.",
    outreachMessage: "Bonjour, en tant qu'entreprise structurée du secteur de l'emballage à Béjaïa, BEJE pourrait bénéficier d'un outil IA de suivi des prix matières premières et de planification de production. Seriez-vous ouverts à un court échange pour explorer cela ?"
  },
  {
    id: 'groupe-zouaoui',
    name: "Groupe Zouaoui",
    tier: "A",
    sector: "Panneaux d'isolation (BTP)",
    painPoints: ["Prévision de la demande pour les projets BTP", "Exposition aux coûts des matières premières", "Concurrence des produits importés", "Retards de paiement des clients (cascade de l'État)", "Planification des capacités de production"],
    aiOpportunities: ["Prévision de la demande synchronisée avec les projets publics (AIPA)", "Scoring du risque de paiement des clients", "Conseil sur le timing d'achat des matières premières", "Optimisation de la production", "Veille concurrentielle sur les prix d'importation"],
    roiEstimation: "Évitement d'impayés en qualifiant mieux les clients BTP risqués (des dizaines de milliers d'euros sauvés).",
    pitch: "Nous suivons déjà le pipeline des projets BTP publics en Algérie. Nous pouvons vous créer des prévisions de demande directement liées aux travaux publics à venir, et évaluer le risque de paiement de vos clients pour que vous ne subissiez pas les retards de paiement de l'État.",
    outreachMessage: "Bonjour, félicitations pour la position de Groupe Zouaoui sur le marché des panneaux isolants. Nous travaillons sur l'intelligence de marché du secteur BTP algérien et pensons pouvoir vous aider à anticiper la demande liée aux grands projets publics, ainsi qu'à évaluer le risque de paiement de vos clients. Un échange de 15 minutes serait-il possible ?"
  },
  {
    id: 'bhs-olives',
    name: "BHS Olives",
    tier: "A",
    sector: "Conditionnement d'olives (Agroalimentaire)",
    painPoints: ["Planification de la capacité saisonnière", "Documentation de traçabilité des lots (surtout pour l'export)", "Arrêts de ligne de conditionnement en pleine saison", "Variabilité de la qualité des olives", "Documents de conformité export"],
    aiOpportunities: ["Assistant de planification de la demande saisonnière", "Générateur automatique de traçabilité", "Maintenance prédictive de la ligne de conditionnement", "Alertes d'inventaire (risques de détérioration)", "Automatisation des documents d'exportation"],
    roiEstimation: "Gain de temps administratif pendant la haute saison et réduction des risques de conformité à l'export (1 500 € - 4 000 €/an).",
    pitch: "L'agroalimentaire saisonnier se joue sur quelques semaines pendant la récolte. Nous aidons les producteurs comme vous à planifier la capacité en amont et à générer la documentation de traçabilité automatiquement, afin qu'une question qualité ne prenne pas une semaine de recherches.",
    outreachMessage: "Bonjour, BHS Olives semble bien positionnée dans le conditionnement d'olives à Akbou. On aide les transformateurs agroalimentaires à automatiser la traçabilité et la planification de la capacité en période de récolte grâce à l'IA. Un appel de 15 minutes vous intéresserait-il ?"
  },
  {
    id: 'ecolift',
    name: "ECOLIFT",
    tier: "A",
    sector: "Installation et maintenance d'ascenseurs",
    painPoints: ["Planification des contrats de maintenance et routage des techniciens", "Gestion des pièces détachées par modèle", "Suivi des renouvellements de contrats", "Efficacité des itinéraires des techniciens", "Suivi des installations versus la charge de maintenance"],
    aiOpportunities: ["Planification de maintenance prédictive", "Optimisation des itinéraires de techniciens", "Prévision de la demande en pièces détachées", "Rappels et propositions automatiques de renouvellement", "Suivi des projets d'installation"],
    roiEstimation: "La récupération des renouvellements de contrats oubliés et l'optimisation des tournées justifient largement le coût (ROI élevé).",
    pitch: "Vous gérez déjà un modèle d'abonnement via vos contrats de maintenance. Nous nous assurons qu'aucun revenu récurrent ne vous échappe, avec un suivi automatisé des renouvellements, des tournées de techniciens plus intelligentes et des prévisions de pièces de rechange.",
    outreachMessage: "Bonjour, ECOLIFT gère à la fois l'installation et la maintenance d'ascenseurs — un modèle avec un vrai potentiel récurrent. On aide ce type d'entreprise à ne perdre aucun renouvellement de contrat et à optimiser les tournées techniciens grâce à l'IA. Un échange de 15 minutes serait-il possible ?"
  },
  {
    id: 'lotfi-electronics',
    name: "Lotfi Electronics",
    tier: "B",
    sector: "Électronique et électroménager",
    painPoints: ["Visibilité sur la chaîne d'approvisionnement", "Compétitivité face au leader du marché (Condor)", "Suivi du service après-vente (SAV)", "Coordination du réseau de distribution"],
    aiOpportunities: ["Surveillance des délais d'approvisionnement", "Analyse des réclamations de garantie/SAV", "Prévisions de la demande de distribution", "Surveillance des prix concurrentiels"],
    roiEstimation: "Amélioration de la visibilité sur la supply chain (5 000 € - 15 000 € d'implémentation).",
    pitch: "Face à un acteur dominant, votre avantage est l'efficacité et le service. Nous aidons les fabricants d'électronique de taille moyenne à optimiser leur chaîne d'approvisionnement et leurs analyses SAV pour concurrencer intelligemment.",
    outreachMessage: "Bonjour, on aide les fabricants d'électronique algériens à mieux visualiser leur chaîne d'approvisionnement et leur service après-vente grâce à l'IA. Intéressé par un échange rapide ?"
  },
  {
    id: 'cork-processor-taher',
    name: "Transformateur de Liège (Taher)",
    tier: "B",
    sector: "Produits en liège (Niche/Export)",
    painPoints: ["Lourdeur documentaire pour l'export", "Constance de l'approvisionnement", "Prévision de la demande pour un marché de niche", "Certification qualité pour les acheteurs internationaux"],
    aiOpportunities: ["Automatisation des documents d'exportation", "Prévision de la demande saisonnière/niche", "Traçabilité de la qualité"],
    roiEstimation: "Gain de temps massif sur la documentation export.",
    pitch: "La paperasse d'exportation consomme un temps que les fabricants de niche ne peuvent pas se permettre de perdre — nous l'automatisons.",
    outreachMessage: "Bonjour, on aide les fabricants de produits de niche comme le liège à automatiser leur documentation d'export. Un court échange serait-il possible ?"
  },
  {
    id: 'grain-mill-jijel',
    name: "Minoterie (Ouled Yahia Khadrouch)",
    tier: "B",
    sector: "Minoterie (Farine, Semoule)",
    painPoints: ["Exposition aux coûts du blé", "Planification face à la demande des distributeurs", "Suivi des rendements et déchets", "Logistique de distribution"],
    aiOpportunities: ["Optimiseur de planification", "Analyse des déchets et du rendement", "Prévision de la demande"],
    roiEstimation: "L'amélioration continue du rendement se traduit par 3 000 € - 8 000 €/an.",
    pitch: "La minoterie est un processus à fort volume : de petites améliorations du rendement se cumulent vite. Nous aidons les minoteries à suivre et à améliorer cela avec l'IA.",
    outreachMessage: "Bonjour, on aide les minoteries en Algérie à optimiser le rendement et la planification de production grâce à l'IA. Un échange de 15 minutes serait-il possible ?"
  },
  {
    id: 'toudja',
    name: "Toudja",
    tier: "B",
    sector: "Eau minérale et embouteillage",
    painPoints: ["Optimisation logistique de la distribution", "Temps d'arrêt de la ligne d'embouteillage", "Prévision de la demande régionale", "Concurrence"],
    aiOpportunities: ["Optimisation des tournées de distribution", "Maintenance prédictive", "Prévision de la demande par région", "Surveillance des prix concurrentiels"],
    roiEstimation: "Économies directes sur les coûts de transport et de carburant.",
    pitch: "L'eau en bouteille est autant une question de logistique que de production. Nous aidons à réduire les coûts de distribution et les arrêts de lignes de production.",
    outreachMessage: "Bonjour, Toudja est un acteur reconnu de l'eau embouteillée à Béjaïa. On aide les producteurs de ce secteur à optimiser leurs tournées de distribution et réduire les arrêts de ligne grâce à l'IA. Un échange rapide serait-il possible ?"
  },
  {
    id: 'laiterie-soummam',
    name: "Laiterie Soummam",
    tier: "C",
    sector: "Produits laitiers",
    painPoints: ["Efficacité de la chaîne du froid", "Prévision de la demande à grande échelle (SKU complexes)"],
    aiOpportunities: ["Prévision de la demande", "Optimisation des itinéraires de la chaîne du froid"],
    roiEstimation: "Gains massifs en optimisation de flotte réfrigérée.",
    pitch: "Nous optimisons les chaînes du froid et prévoyons la demande au niveau national pour limiter les pertes et les surstocks.",
    outreachMessage: "Bonjour, nous accompagnons les leaders de l'agroalimentaire dans l'optimisation par l'IA de la logistique de la chaîne du froid et de la prévision de la demande. Un échange de 15 minutes serait-il possible ?"
  },
  {
    id: 'danone-djurdjura',
    name: "Danone Djurdjura Algérie",
    tier: "C",
    sector: "Produits laitiers (Multinationale)",
    painPoints: ["Logistique d'approvisionnement et de distribution locale", "Alignement avec les systèmes IT mondiaux du groupe"],
    aiOpportunities: ["Prévision de distribution locale", "Outils conformes aux standards globaux"],
    roiEstimation: "Réduction des invendus à l'échelle du réseau.",
    pitch: "Nous développons des outils IA spécifiques pour la distribution locale, s'intégrant parfaitement en parallèle des standards IT globaux.",
    outreachMessage: "Bonjour, nous accompagnons les filiales de multinationales agroalimentaires avec des solutions d'IA agiles et ciblées pour la distribution locale. Un échange de 15 minutes serait-il possible ?"
  },
  {
    id: 'ifri',
    name: "Ifri",
    tier: "C",
    sector: "Boissons et eaux",
    painPoints: ["Optimisation du réseau de distribution", "Prévision de la demande", "Maintien de la position de leader face à la concurrence"],
    aiOpportunities: ["Optimisation des itinéraires", "Veille concurrentielle", "Prévision de la demande"],
    roiEstimation: "Fort potentiel de réduction des coûts de distribution sur le volume.",
    pitch: "Pour une marque leader, la distribution est clé. Nous optimisons le réseau de distribution national avec l'IA pour réduire l'empreinte carbone et les coûts de transport.",
    outreachMessage: "Bonjour, Ifri étant un acteur incontournable, l'optimisation des tournées par l'IA peut apporter des gains de distribution massifs. Un échange de 15 minutes serait-il possible ?"
  },
  {
    id: 'scaek-gica',
    name: "SCAEK / GICA Group",
    tier: "C",
    sector: "Cimenterie",
    painPoints: ["Planification de la production liée aux travaux publics", "Gestion des flux logistiques lourds"],
    aiOpportunities: ["Prévision de la demande via le pipeline BTP public", "Optimisation logistique"],
    roiEstimation: "Alignement optimal avec les commandes de l'État limitant les surproductions.",
    pitch: "Nous synchronisons votre planification de production directement avec le pipeline officiel des projets BTP en Algérie, pour anticiper exactement les volumes de ciment requis.",
    outreachMessage: "Bonjour, nous accompagnons l'industrie lourde en liant la production aux données d'intelligence économique des projets BTP nationaux grâce à l'IA. Un échange serait-il possible ?"
  },
  {
    id: 'groupe-iris',
    name: "Groupe Iris (Pneus)",
    tier: "C",
    sector: "Fabrication de pneumatiques",
    painPoints: ["Efficacité des lignes de production", "Maintenance prédictive", "Visibilité sur la chaîne d'approvisionnement en caoutchouc"],
    aiOpportunities: ["Maintenance prédictive des lignes", "Prévisions d'approvisionnement en matières premières"],
    roiEstimation: "Réduction des temps d'arrêt non planifiés de la production.",
    pitch: "Dans l'industrie lourde, un arrêt machine coûte cher. Nos modèles de maintenance prédictive anticipent les pannes pour garantir un taux de rendement synthétique maximal.",
    outreachMessage: "Bonjour, félicitations pour le développement de votre pôle pneumatique. Nous déployons de l'IA pour la maintenance prédictive industrielle et serions ravis d'en discuter 15 minutes avec vous."
  },
  {
    id: 'condor-electronics',
    name: "Condor Electronics",
    tier: "C",
    sector: "Électronique et électroménager",
    painPoints: ["Optimisation de la production et exportation massive", "Complexité de la supply chain internationale"],
    aiOpportunities: ["Outils d'IA pour des processus spécifiques non couverts par l'ERP"],
    roiEstimation: "Avantages compétitifs ciblés sur les exports.",
    pitch: "Vous avez déjà l'infrastructure IT. Nous venons en complément pour résoudre les problèmes d'export et d'optimisation pointus avec des modèles d'IA sur-mesure.",
    outreachMessage: "Bonjour, nous concevons des solutions d'IA agiles qui s'intègrent aux infrastructures existantes des leaders de l'électronique algérienne pour résoudre des points de friction ciblés. Un échange serait-il possible ?"
  },
  {
    id: 'cevital-agro',
    name: "Cevital Agro-industrie",
    tier: "C",
    sector: "Conglomérat agro-industriel",
    painPoints: ["Opérations à une échelle massive", "Optimisation de l'écosystème portuaire de Béjaïa"],
    aiOpportunities: ["Capacités d'IA exclusives et novatrices sur des problématiques complexes"],
    roiEstimation: "Transformation de processus à très grande échelle.",
    pitch: "Nous développons des capacités d'IA uniques capables de gérer la complexité opérationnelle d'un conglomérat de votre envergure.",
    outreachMessage: "Bonjour, nous sommes une agence spécialisée en IA capable de traiter des défis opérationnels complexes à grande échelle. Nous aimerions vous présenter nos capacités lors d'un court échange."
  }
];

export { clients };
