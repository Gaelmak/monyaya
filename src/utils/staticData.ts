export const staticData = [
  {
    id: '1',
    name: 'Formation JavaScript Avancée',
    image: null,
    description:
      'Approfondissez vos connaissances en JavaScript pour maîtriser les concepts avancés.',
    userId: '123',
    price: 100,
    coursesId: 'js101',
    createdAt: new Date('2024-08-01'),
    _count: {
      modules: 5,
    },
    modules: [
      { title: 'Module 1', description: 'Introduction aux concepts avancés' },
      { title: 'Module 2', description: 'Gestion des erreurs en JavaScript' },
    ],
    user: {
      name: 'jdoe',
      firstName: 'John',
      lastName: 'Doe',
      municipality: 'Paris',
      email: 'jdoe@example.com',
      district: '10e arrondissement',
      avenue: 'Avenue des Champs-Élysées',
      number: '123',
      image: null,
    },
    courses: {
      name: 'JavaScript',
      category: {
        name: 'Programmation',
      },
    },
  },
  {
    id: '2',
    name: 'Introduction à Python',
    image: null,
    description:
      'Apprenez les bases du langage Python pour débuter en programmation.',
    userId: '124',
    price: 80,
    coursesId: 'py101',
    createdAt: new Date('2024-07-15'),
    _count: {
      modules: 4,
    },
    modules: [
      {
        title: 'Module 1',
        description: 'Installation et configuration de Python',
      },
      {
        title: 'Module 2',
        description: 'Syntaxe de base et structures de données',
      },
    ],
    user: {
      name: 'asmith',
      firstName: 'Alice',
      lastName: 'Smith',
      municipality: 'Lyon',
      email: 'asmith@example.com',
      district: '2e arrondissement',
      avenue: 'Rue de la République',
      number: '456',
      image: null,
    },
    courses: {
      name: 'Python',
      category: {
        name: 'Programmation',
      },
    },
  },
  {
    id: '3',
    name: 'Maîtriser React.js',
    image: null,
    description:
      'Une formation complète pour devenir un expert en développement React.',
    userId: '125',
    price: 120,
    coursesId: 'react101',
    createdAt: new Date('2024-06-20'),
    _count: {
      modules: 6,
    },
    modules: [
      { title: 'Module 1', description: 'Introduction à React' },
      { title: 'Module 2', description: 'Composants et Props' },
    ],
    user: {
      name: 'bwayne',
      firstName: 'Bruce',
      lastName: 'Wayne',
      municipality: 'Gotham',
      email: 'bwayne@example.com',
      district: 'Wayne Manor',
      avenue: 'Alfred Lane',
      number: '1',
      image: null,
    },
    courses: {
      name: 'React.js',
      category: {
        name: 'Programmation',
      },
    },
  },
  {
    id: '4',
    name: 'Développement Web avec Node.js',
    image: null,
    description: 'Apprenez à créer des applications web avec Node.js.',
    userId: '126',
    price: 110,
    coursesId: 'node101',
    createdAt: new Date('2024-05-10'),
    _count: {
      modules: 7,
    },
    modules: [
      { title: 'Module 1', description: 'Introduction à Node.js' },
      {
        title: 'Module 2',
        description: "Création d'un serveur HTTP avec Node.js",
      },
    ],
    user: {
      name: 'ckent',
      firstName: 'Clark',
      lastName: 'Kent',
      municipality: 'Metropolis',
      email: 'ckent@example.com',
      district: 'Daily Planet',
      avenue: 'Lois Lane',
      number: '7',
      image: null,
    },
    courses: {
      name: 'Node.js',
      category: {
        name: 'Programmation',
      },
    },
  },
  {
    id: '5',
    name: 'UI/UX Design pour Débutants',
    image: null,
    description:
      "Découvrez les bases du design d'interface utilisateur et de l'expérience utilisateur.",
    userId: '127',
    price: 90,
    coursesId: 'design101',
    createdAt: new Date('2024-04-05'),
    _count: {
      modules: 3,
    },
    modules: [
      { title: 'Module 1', description: 'Principes de base du design UI/UX' },
      { title: 'Module 2', description: 'Outils de design populaires' },
    ],
    user: {
      name: 'dprince',
      firstName: 'Diana',
      lastName: 'Prince',
      municipality: 'Themyscira',
      email: 'dprince@example.com',
      district: 'Amazon Island',
      avenue: 'Paradise Road',
      number: '101',
      image: null,
    },
    courses: {
      name: 'UI/UX Design',
      category: {
        name: 'Design',
      },
    },
  },
  {
    id: '6',
    name: 'SEO Avancé',
    image: null,
    description:
      'Optimisez vos sites pour les moteurs de recherche avec des techniques avancées de SEO.',
    userId: '128',
    price: 95,
    coursesId: 'seo201',
    createdAt: new Date('2024-03-18'),
    _count: {
      modules: 4,
    },
    modules: [
      { title: 'Module 1', description: 'Recherche de mots-clés avancée' },
      { title: 'Module 2', description: 'Optimisation on-page et off-page' },
    ],
    user: {
      name: 'p.parker',
      firstName: 'Peter',
      lastName: 'Parker',
      municipality: 'New York',
      email: 'p.parker@example.com',
      district: 'Queens',
      avenue: 'Web Street',
      number: '616',
      image: null,
    },
    courses: {
      name: 'SEO',
      category: {
        name: 'Marketing Digital',
      },
    },
  },
  {
    id: '7',
    name: 'Marketing Digital pour Entrepreneurs',
    image: null,
    description:
      'Apprenez à développer une stratégie de marketing digital efficace.',
    userId: '129',
    price: 130,
    coursesId: 'marketing101',
    createdAt: new Date('2024-02-25'),
    _count: {
      modules: 5,
    },
    modules: [
      { title: 'Module 1', description: 'Introduction au marketing digital' },
      { title: 'Module 2', description: 'Publicité sur les réseaux sociaux' },
    ],
    user: {
      name: 'tstark',
      firstName: 'Tony',
      lastName: 'Stark',
      municipality: 'Los Angeles',
      email: 'tstark@example.com',
      district: 'Malibu',
      avenue: 'Stark Drive',
      number: '3000',
      image: null,
    },
    courses: {
      name: 'Marketing Digital',
      category: {
        name: 'Business',
      },
    },
  },
  {
    id: '8',
    name: 'Initiation à la Cybersécurité',
    image: null,
    description:
      'Découvrez les bases de la cybersécurité pour protéger vos données en ligne.',
    userId: '130',
    price: 110,
    coursesId: 'cyber101',
    createdAt: new Date('2024-01-10'),
    _count: {
      modules: 6,
    },
    modules: [
      { title: 'Module 1', description: 'Introduction à la cybersécurité' },
      {
        title: 'Module 2',
        description: "Les menaces en ligne et comment s'en protéger",
      },
    ],
    user: {
      name: 'n.romanoff',
      firstName: 'Natasha',
      lastName: 'Romanoff',
      municipality: 'Moscow',
      email: 'n.romanoff@example.com',
      district: 'Red Square',
      avenue: 'Widow Lane',
      number: '001',
      image: null,
    },
    courses: {
      name: 'Cybersécurité',
      category: {
        name: 'Informatique',
      },
    },
  },
];
