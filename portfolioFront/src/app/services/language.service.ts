import { Injectable, signal, computed } from '@angular/core';

export type Language = 'eng-us' | 'pt-br';

const EN_US = {
  header: {
    about: 'About',
    experience: 'Experience',
    skills: 'Skills',
    projects: 'Projects',
    resume: 'Resume',
    contact: 'Contact'
  },
  hero: {
    heroLine1: "Icaro Justino",
    heroLine2: 'Software Engineer',
    watermark: 'About',
    sideLabel: 'ABOUT',
    description: 'I engineer robust and scalable full-stack applications, with a strong focus on clean code, modern architectures, and delivering high-quality technical solutions.',
    contactBtn: 'Contact Me!',
    viewProjects: 'View Projects',
    contact: 'Contact'
  },
  about: {
    title: 'About Me',
    aboutmeText: "Fullstack Developer with hands-on experience across the entire stack, building robust APIs with Java, Spring Boot, and Node.js, modern interfaces with React and Next.js, and CI/CD pipelines that streamline delivery. I've worked across technical leadership, quality automation, and microservices architecture in real-world projects across different industries. I care about code that works, teams that grow, and solutions that solve actual problems.",    
    journeyTitle: 'My Journey',
    myJourneyText: 'My professional journey began in 2019, driven by a strong aptitude for solving complex problems through technology. Since then, I have built a solid career working across various environments, from large startups and public companies to big tech, currently specializing in software quality, test automation, and web tool development.',
    approachTitle: 'My Approach',
    myApproachText: 'Before writing the first line of code, I like to fully understand the problem, what the project requirements are, what can fail, what wasn\'t specified but should have been, and what\'s truly expected. Only then do I start building, from backend to frontend, with close attention to every detail of the solution. Automation isn\'t a final step for me, it\'s part of the process from day one because writing good code and making sure it actually works are, to me, the same thing.',
    stats: {
      projects: 'Projects Completed',
      energy: 'Energy Drinks Downed',
      years: 'Years Developing'
    }
  },
  experience: {
    title: 'Professional Experience',
    subtitle: 'My professional journey',
    headerOverline: 'My Journey',
    headerTitle: 'Developer ',
    headerTitleHighlight: 'Journey',
    headerDescription: 'A timeline of my technical and professional evolution, from the first program to current architecture challenges.',
    roleLabel: 'Role',
    techLabel: 'Technologies:',
    achievementsLabel: 'Key Achievements:',
    experiences: [
      {
        badge: 'Full-Time',
        title: 'Software Quality Engineer',
        company: 'CIn - Motorola',
        location: 'Recife, PE, Brazil',
        period: '03/2025 - 04/2026',
        summary: 'Implemented CI/CD pipelines and orchestrated test environments with Docker. Developed test automations with Selenium, Cypress, Playwright, and JMeter. Guided the creation of quality artifacts and collaborated actively with development teams to reduce production failures.',
        technologies: ['Docker', 'Selenium', 'Cypress', 'Playwright', 'JMeter', 'SQL'],
        achievements: [
          'Implemented CI/CD pipelines and orchestrated test environments with Docker, ensuring high consistency and standardization.',
          'Developed and maintained robust test automations using Selenium, Cypress, Playwright, and JMeter.',
          'Led the creation of quality artifacts, elaborating test cases, charters, and test scenarios, supported by log analysis and advanced SQL validations.',
          'Collaborated actively with development teams, acting as a consultant to reduce the volume of production failures.'
        ]
      },
      {
        badge: 'Education',
        title: 'Postgraduate in Software Quality',
        company: 'CIn - UFPE',
        location: 'Recife, PE, Brazil',
        period: '2025 - 2026',
        summary: 'Specialization focused on test automation and data analysis, deepening knowledge in quality engineering and software architecture.',
        technologies: ['Test Automation', 'Data Analysis', 'Software Quality', 'QA Architecture'],
        achievements: [
          'Theoretical and practical deepening in test architecture and automation.',
          'Development of skills in data analysis applied to software quality.'
        ]
      },
      {
        badge: 'Full-Time',
        title: 'Software Developer',
        company: 'Logap Sistemas',
        location: 'Natal, RN, Brazil',
        period: '09/2024 - 12/2024',
        summary: 'Implemented centralized authentication, developed analytical dashboards, and structured CI/CD pipelines. Automated multiplatform tests with Cypress and Playwright.',
        technologies: ['Spring Boot', '.Net Core', 'Angular', 'Tailwind CSS', 'GraphQL', 'GitLab', 'Docker', 'AWS', 'Cypress', 'Playwright'],
        achievements: [
          'Implemented centralized authentication via LDAP in multiple microservices using Spring Boot and .Net Core.',
          'Developed analytical dashboards with Angular and Tailwind CSS consuming real-time data via GraphQL.',
          'Structured CI/CD pipelines with GitLab and Docker to automate build, tests, and deploy in an AWS environment.',
          'Automated multiplatform tests using Cypress and Playwright, ensuring coverage of critical flows.'
        ]
      },
      {
        badge: 'Education',
        title: 'Degree in Systems Analysis and Development',
        company: 'IFRN',
        location: 'Natal, RN, Brazil',
        period: '2019 - 2024',
        summary: 'Higher education degree in technology, providing a solid foundation in software engineering, programming, and database modeling.',
        technologies: ['Software Engineering', 'Data Structures', 'Databases', 'Programming'],
        achievements: [
          'Solid theoretical foundation in algorithms, databases, and software engineering.',
          'Development of comprehensive academic projects reflecting real-world business scenarios.'
        ]
      },
      {
        badge: 'Internship',
        title: 'Data Analysis Intern',
        company: 'CAERN',
        location: 'Natal, RN, Brazil',
        period: '04/2024 - 09/2024',
        summary: 'Developed APIs and created operational dashboards in PowerBI, Grafana, and Metabase. Modeled views and procedures in PostgreSQL.',
        technologies: ['FastAPI', 'Pandas', 'PowerBI', 'Grafana', 'Metabase', 'PostgreSQL'],
        achievements: [
          'Developed APIs with FastAPI and Pandas to consolidate data from multiple heterogeneous sources into a unified access layer.',
          'Created operational dashboards in PowerBI, Grafana, and Metabase integrated directly into the database, replacing manual reports.',
          'Modeled views and procedures in PostgreSQL to organize data from multiple sources into visualizations ready for analytical consumption.'
        ]
      },
      {
        badge: 'Internship',
        title: 'Software Development Intern',
        company: 'P2b.tech',
        location: 'Natal, RN, Brazil',
        period: '03/2023 - 03/2024',
        summary: 'Developed RESTful APIs with NestJS and Express, built interfaces with Next.js, and developed custom WordPress solutions.',
        technologies: ['NestJS', 'Express', 'Next.js', 'Material UI', 'Ant Design', 'WordPress', 'Elementor', 'GuzzleHTTP'],
        achievements: [
          'Developed and maintained RESTful APIs with NestJS and Express following a layered architecture (MVC).',
          'Built interfaces for multiple client projects with Next.js, using Material UI and Ant Design.',
          'Developed custom WordPress solutions for clients, creating layouts with Elementor and integrating external platforms via GuzzleHTTP.'
        ]
      }
    ]
  },
  skills: {
    title: 'Technical Skills',
    subtitle: 'I work with a variety of modern technologies and tools to build high-quality applications',
    categories: [
      {
        title: 'Frontend',
        items: ['Next.js', 'React.js', 'Angular', 'Tailwind CSS']
      },
      {
        title: 'Backend',
        items: ['Node.js', 'GraphQL', 'Spring Boot', '.Net Core', 'FastAPI']
      },
      {
        title: 'Database',
        items: ['PostgreSQL', 'MongoDB']
      },
      {
        title: 'DevOps & Cloud',
        items: ['Azure', 'AWS', 'CI/CD', 'Docker', 'Kubernetes', 'GitLab']
      },
      {
        title: 'Data Analysis & AI',
        items: ['PowerBI', 'Tableau', 'Metabase', 'Grafana', 'Claude', 'Gemini']
      },
      {
        title: 'Methodologies & Languages',
        items: ['Scrum', 'TDD', 'XP', 'English - Advanced', 'Spanish - Basic', 'Portuguese - Native']
      }
    ]
  },
  projects: {
    title: 'Featured Projects',
    subtitle: 'Here are some of my recent projects that showcase my skills and experience',
    codeBtn: 'Code',
    demoBtn: 'Live Demo',
    list: [
      {
        title: 'MipsCode - Web IDE for MIPS assembly',
        description: 'Educational web IDE for MIPS assembly developed in a team. The main technical challenge was implementing the MIPS instruction set interpreter and parser from scratch, allowing compilation and execution of low-level code directly in the browser.',
        technologies: ['NestJS', 'Svelte', 'React', 'TypeScript']
      }
    ]
  },
  resume: {
    title: 'Resume',
    subtitle: 'Download or view my resume to learn more about my experience and qualifications',
    name: 'Icaro Justino - Resume',
    role: 'Software Engineer • Fullstack Developer',
    showBtn: 'Show Resume',
    hideBtn: 'Hide Resume',
    downloadBtn: 'Download PDF',
    openTabBtn: 'Open in New Tab',
    previewTitle: 'Resume Preview',
    previewHint: 'Click "Download PDF" for the full version',
    pdfFile: 'assets/Icaro MirandaResumeENGUS.pdf'
  },
  contact: {
    title: 'Get In Touch',
    subtitle: 'I am always open to discussing new opportunities and interesting projects',
    connectTitle: 'Let\'s Connect',
    connectText: 'Whether you have a project in mind, want to collaborate, or just want to say hello, I would love to hear from you. Feel free to reach out!',
    info: [
      { title: 'Email', value: 'icaro.justino@gmail.com' },
      { title: 'Phone', value: '+55 84 98792-6693' },
      { title: 'Location', value: 'Brazil' }
    ],
    form: {
      name: 'Name',
      namePlaceholder: 'Your Name',
      email: 'Email',
      emailPlaceholder: 'your.email@example.com',
      message: 'Message',
      messagePlaceholder: 'Tell me about your project...',
      sendBtn: 'Send Message',
      sendingBtn: 'Sending...',
      waitBtn: 'Wait {s}s'
    },
    toast: {
      success: 'Message sent successfully! 🎉',
      rateLimit: 'Too many requests. Please wait a few minutes.',
      error: 'Failed to send message.',
      connError: 'Connection error. Please try again later.'
    }
  },
  footer: {
    description: 'Capable full-stack developer focused on architecting reliable web solutions and delivering high-performance software.',
    quickLinks: 'Quick Links',
    connect: 'Connect',
    copyright: '© 2026 Icaro Justino. All rights reserved.',
    builtWith: 'Built with Angular'
  },
  notFound: {
    title: '404',
    subtitle: 'Page not Found',
    description: 'Oops! The page you are looking for does not exist.',
    goBack: 'Back to Home Page',
  }
};

const PT_BR = {
  header: {
    about: 'Sobre',
    experience: 'Experiência',
    skills: 'Habilidades',
    projects: 'Projetos',
    resume: 'Currículo',
    contact: 'Contato'
  },
  hero: {
    heroLine1: 'Icaro Justino',
    heroLine2: 'Engenheiro de Software',
    watermark: 'Sobre',
    sideLabel: 'SOBRE',
    description: 'Construo aplicações full-stack robustas e escaláveis, com forte foco em código limpo, arquiteturas modernas e na entrega de soluções técnicas de alta qualidade.',
    contactBtn: 'Fale Comigo!',
    viewProjects: 'Ver Projetos',
    contact: 'Contato'
  },
  about: {
    title: 'Sobre Mim',
    aboutmeText: "Desenvolvedor Fullstack com experiência que vai do backend ao deploy, construindo APIs robustas com Java, Spring Boot e Node.js, interfaces modernas com React e Next.js, e pipelines CI/CD que eliminam fricção no ciclo de entrega. Já atuei em liderança técnica, automação de qualidade e arquitetura de microsserviços em projetos reais de diferentes setores. Gosto de código que funciona, times que evoluem e soluções que resolvem problemas de verdade.",
    journeyTitle: 'Minha Jornada',
    myJourneyText: 'Minha jornada profissional começou em 2023, impulsionada por uma forte aptidão para resolver problemas complexos através da tecnologia. Desde então, construí uma carreira sólida atuando em diferentes ambientes, de startups e empresas públicas até projetos de grande porte. Atualmente especializado em qualidade de software, automação de testes e desenvolvimento web.',
    approachTitle: 'Minha Abordagem',
    myApproachText: 'Antes de escrever a primeira linha de código, gosto de entender bem o problema, quais são os requisitos do projeto, o que pode falhar, o que não foi especificado mas deveria, o que é esperado. Só então implemento, construindo do backend ao frontend com atenção a cada detalhe da solução. Automação não é uma etapa final pra mim, faz parte do processo desde o início, porque escrever bom código e garantir que ele funciona de verdade são, pra mim, a mesma coisa.',
    stats: {
      projects: 'Projetos Concluídos',
      energy: 'Energéticos Tomados',
      years: 'Anos Desenvolvendo'
    }
  },
  experience: {
    title: 'Experiência Profissional',
    subtitle: 'Minha jornada profissional',
    headerOverline: 'Minha Trajetória',
    headerTitle: 'Minha jornada como ',
    headerTitleHighlight: 'Engenheiro de Software',
    headerDescription: 'Uma linha do tempo da minha evolução técnica e profissional, desde o primeiro projeto até os desafios atuais.',
    roleLabel: 'Cargo',
    techLabel: 'Tecnologias:',
    achievementsLabel: 'Principais Conquistas:',
    experiences: [
      {
        badge: 'Full-Time',
        title: 'Engenheiro de Qualidade de Software, Projeto CIn–Motorola',
        company: 'CIn - Motorola',
        location: 'Recife, PE, Brasil',
        period: '03/2025 - 04/2026',
        summary: 'Implementei pipelines CI/CD e orquestrei ambientes de teste com Docker. Desenvolvi automações de teste com Selenium, Cypress, Playwright e JMeter. Conduzi a criação de artefatos de qualidade e colaborei ativamente com times de desenvolvimento para reduzir falhas em produção.',
        technologies: ['Docker', 'Selenium', 'Cypress', 'Playwright', 'JMeter', 'SQL'],
        achievements: [
          'Implementei pipelines CI/CD e orquestrei ambientes de teste com Docker, garantindo alta consistência e padronização.',
          'Desenvolvi e mantive automações de teste robustos utilizando Selenium, Cypress, Playwright e JMeter.',
          'Conduzi a criação de artefatos de qualidade, elaborando test cases, charters e cenários de teste, apoiados por análise de logs e validações via SQL.',
          'Colaborei ativamente com times de desenvolvimento, atuando de forma consultiva para reduzir o volume de falhas em produção.'
        ]
      },
      {
        badge: 'Formação',
        title: 'Pós-graduação em Qualidade de Software',
        company: 'CIn - UFPE',
        location: 'Recife, PE, Brasil',
        period: '2025 - 2026',
        summary: 'Especialização focada em automação de testes e análise de dados, aprofundando conhecimentos em engenharia de qualidade e arquitetura de testes.',
        technologies: ['Automação de Testes', 'Análise de Dados', 'Qualidade de Software', 'Arquitetura QA'],
        achievements: [
          'Aprofundamento teórico e prático em arquitetura de testes e automação.',
          'Desenvolvimento de competências em análise de dados aplicadas à qualidade de software.'
        ]
      },
      {
        badge: 'Full-Time',
        title: 'Desenvolvedor de Software',
        company: 'Logap Sistemas',
        location: 'Natal, RN, Brasil',
        period: '09/2024 - 12/2024',
        summary: 'Implementei autenticação centralizada, desenvolvi dashboards analíticos e estruturei pipelines CI/CD. Automatizei testes multiplataforma com Cypress e Playwright.',
        technologies: ['Spring Boot', '.Net Core', 'Angular', 'Tailwind CSS', 'GraphQL', 'GitLab', 'Docker', 'AWS', 'Cypress', 'Playwright'],
        achievements: [
          'Implementei autenticação centralizada via LDAP em múltiplos microsserviços utilizando Spring Boot e .Net Core.',
          'Desenvolvi dashboards analíticos com Angular e Tailwind CSS consumindo dados em tempo real via GraphQL.',
          'Estruturei pipelines CI/CD com GitLab e Docker para automatizar build, testes e deploy em ambiente AWS.',
          'Automatizei testes multiplataforma utilizando Cypress e Playwright, garantindo cobertura dos fluxos críticos.'
        ]
      },
      {
        badge: 'Formação',
        title: 'Graduação em Análise e Desenvolvimento de Sistemas',
        company: 'IFRN',
        location: 'Natal, RN, Brasil',
        period: '2019 - 2024',
        summary: 'Formação superior em tecnologia, com base sólida em engenharia de software, programação e modelagem de banco de dados.',
        technologies: ['Engenharia de Software', 'Estrutura de Dados', 'Banco de Dados', 'Programação'],
        achievements: [
          'Base teórica sólida em algoritmos, banco de dados e engenharia de software.',
          'Desenvolvimento de projetos acadêmicos completos refletindo cenários empresariais reais.'
        ]
      },
      {
        badge: 'Estágio',
        title: 'Estágio em Análise de Dados',
        company: 'CAERN',
        location: 'Natal, RN, Brasil',
        period: '04/2024 - 09/2024',
        summary: 'Desenvolvi APIs e criei dashboards operacionais em PowerBI, Grafana e Metabase. Modelei views e procedures no PostgreSQL.',
        technologies: ['FastAPI', 'Pandas', 'PowerBI', 'Grafana', 'Metabase', 'PostgreSQL'],
        achievements: [
          'Desenvolvi APIs com FastAPI e Pandas para consolidar dados de múltiplas fontes heterogêneas em uma camada unificada de acesso.',
          'Criei dashboards operacionais em PowerBI, Grafana e Metabase integrados diretamente ao banco de dados, substituindo relatórios manuais.',
          'Modelei views e procedures no PostgreSQL para organizar dados de múltiplas fontes em visualizações prontas para consumo analítico.'
        ]
      },
      {
        badge: 'Estágio',
        title: 'Estágio em Desenvolvimento de Software',
        company: 'P2b.tech',
        location: 'Natal, RN, Brasil',
        period: '03/2023 - 03/2024',
        summary: 'Desenvolvi APIs RESTful com NestJS e Express, construí interfaces com Next.js e desenvolvi soluções WordPress customizadas.',
        technologies: ['NestJS', 'Express', 'Next.js', 'Material UI', 'Ant Design', 'WordPress', 'Elementor', 'GuzzleHTTP'],
        achievements: [
          'Desenvolvi e mantive APIs RESTful com NestJS e Express seguindo arquitetura em camadas (MVC).',
          'Construí interfaces para múltiplos projetos de clientes com Next.js, utilizando Material UI e Ant Design.',
          'Desenvolvi soluções WordPress customizadas para clientes, criando layouts com Elementor e integrando plataformas externas via GuzzleHTTP.'
        ]
      }
    ]
  },
  skills: {
    title: 'Habilidades Técnicas',
    subtitle: 'Trabalho com uma variedade de tecnologias e ferramentas modernas para construir aplicações de alta qualidade',
    categories: [
      {
        title: 'Frontend',
        items: ['Next.js', 'React.js', 'Angular', 'Tailwind CSS']
      },
      {
        title: 'Backend',
        items: ['Node.js', 'GraphQL', 'Spring Boot', '.Net Core', 'FastAPI']
      },
      {
        title: 'Banco de Dados',
        items: ['PostgreSQL', 'MongoDB']
      },
      {
        title: 'DevOps & Cloud',
        items: ['Azure', 'AWS', 'CI/CD', 'Docker', 'Kubernetes', 'GitLab']
      },
      {
        title: 'Análise de Dados & AI',
        items: ['PowerBI', 'Tableau', 'Metabase', 'Grafana', 'Claude', 'Gemini']
      },
      {
        title: 'Metodologias & Idiomas',
        items: ['Scrum', 'TDD', 'XP', 'Inglês - Avançado', 'Espanhol - Básico', 'Português - Nativo']
      }
    ]
  },
  projects: {
    title: 'Projetos em Destaque',
    subtitle: 'Aqui estão alguns dos meus projetos recentes que demonstram minhas habilidades e experiência',
    codeBtn: 'Código',
    demoBtn: 'Demonstração',
    list: [
      {
        title: 'MipsCode - IDE web para assembly MIPS',
        description: 'IDE web educativa para assembly MIPS desenvolvida em equipe. O principal desafio técnico foi implementar o interpretador e parser do conjunto de instruções MIPS do zero, permitindo compilação e execução de código de baixo nível diretamente no browser.',
        technologies: ['NestJS', 'Svelte', 'React', 'TypeScript']
      }
    ]
  },
  resume: {
    title: 'Currículo',
    subtitle: 'Baixe ou visualize meu currículo para saber mais sobre minha experiência e qualificações',
    name: 'Icaro Justino - Currículo',
    role: 'Engenheiro de Software • Desenvolvedor Fullstack',
    showBtn: 'Exibir Currículo',
    hideBtn: 'Ocultar Currículo',
    downloadBtn: 'Baixar PDF',
    openTabBtn: 'Abrir em Nova Guia',
    previewTitle: 'Visualização do Currículo',
    previewHint: 'Clique em "Baixar PDF" para a versão completa',
    pdfFile: 'assets/IcaroMirandaResumePTBR.pdf'
  },
  contact: {
    title: 'Entre em Contato',
    subtitle: 'Estou sempre aberto a discutir novas oportunidades e projetos interessantes',
    connectTitle: 'Vamos Conversar',
    connectText: 'Seja para um projeto em mente, uma colaboração, ou apenas para dizer olá, eu adoraria ouvir de você. Fique à vontade para entrar em contato!',
    info: [
      { title: 'E-mail', value: 'icaro.justino@gmail.com' },
      { title: 'Telefone', value: '+55 84 98792-6693' },
      { title: 'Localização', value: 'Brasil' }
    ],
    form: {
      name: 'Nome',
      namePlaceholder: 'Seu Nome',
      email: 'E-mail',
      emailPlaceholder: 'seu.email@exemplo.com',
      message: 'Mensagem',
      messagePlaceholder: 'Fale um pouco sobre o seu projeto...',
      sendBtn: 'Enviar Mensagem',
      sendingBtn: 'Enviando...',
      waitBtn: 'Aguarde {s}s'
    },
    toast: {
      success: 'Mensagem enviada com sucesso! 🎉',
      rateLimit: 'Muitas requisições. Aguarde alguns minutos.',
      error: 'Falha ao enviar mensagem.',
      connError: 'Erro de conexão. Tente novamente mais tarde.'
    }
  },
  footer: {
    description: 'Desenvolvedor full-stack capacitado, focado em arquitetar soluções web confiáveis e entregar software de alto desempenho.',
    quickLinks: 'Links Rápidos',
    connect: 'Conecte-se',
    copyright: '© 2026 Icaro Justino. Todos os direitos reservados.',
    builtWith: 'Construído com Angular'
  },
  notFound: {
    title: '404',
    subtitle: 'Página Não Encontrada',
    description: 'Oops! A página que você está procurando não existe.',
    goBack: 'Voltar para Página Principal',
  }
};

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  currentLang = signal<Language>('pt-br');

  t = computed(() => {
    return this.currentLang() === 'eng-us' ? EN_US : PT_BR;
  });

  setLanguage(lang: Language) {
    this.currentLang.set(lang);
  }
}
