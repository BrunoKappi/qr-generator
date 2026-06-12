export interface DeveloperConfig {
  name: string;
  role: {
    pt: string;
    en: string;
    es: string;
  };
  description: {
    pt: string;
    en: string;
    es: string;
  };
  location: {
    pt: string;
    en: string;
    es: string;
  };
  email: string;
  portfolioUrl: string;
  profilePictureUrl: string;
}

export const developerConfig: DeveloperConfig = {
  name: "Bruno Kappi",
  role: {
    pt: "Analista de Sistemas, Desenvolvedor Full Stack e Gerente de Projetos de Software",
    en: "Systems Analyst, Full Stack Developer and Software Project Manager",
    es: "Analista de Sistemas, Desarrollador Full Stack y Gerente de Proyectos de Software"
  },
  description: {
    pt: "Profissional com experiência em desenvolvimento Full Stack, sistemas MES e automação industrial. Atua na criação de soluções web modernas utilizando React, TypeScript, Node.js e Firebase, combinando visão técnica e estratégica para entregar produtos escaláveis, intuitivos e de alta qualidade. Possui sólida experiência em integração de sistemas, bancos de dados relacionais e gestão de projetos de software, sempre com foco em performance, usabilidade e resultados.",
    en: "Professional with experience in Full Stack development, MES systems, and industrial automation. Specializes in building modern web solutions using React, TypeScript, Node.js, and Firebase, combining technical and strategic vision to deliver scalable, intuitive, and high-quality products. Background includes system integration, relational databases, and software project management, with a continuous focus on performance, usability, and outcomes.",
    es: "Profesional con experiencia en desarrollo Full Stack, sistemas MES y automatización industrial. Especializado en crear soluciones web modernas utilizando React, TypeScript, Node.js y Firebase, combinando visión técnica y estratégica para entregar productos escalables, intuitivos y de alta calidad. Cuenta con una sólida trayectoria en integración de sistemas, bases de datos relacionales y gestión de proyectos de software, siempre enfocado en rendimiento, usabilidad y resultados."
  },
  location: {
    pt: "Novo Hamburgo, Rio Grande do Sul, Brasil",
    en: "Novo Hamburgo, Rio Grande do Sul, Brazil",
    es: "Novo Hamburgo, Río Grande del Sur, Brasil"
  },
  email: "bruno@bkappi.com",
  portfolioUrl: "https://portfolio.bkappi.com",
  profilePictureUrl: "https://cdn.bkappi.com/BrunoKappi/Images/ProfilePicture.jpg"
};
