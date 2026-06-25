const themeToggle = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;
const langSwitch = document.getElementById('lang-switch');

// Theme Logic
const savedTheme = localStorage.getItem('theme') || 'dark';
htmlEl.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = htmlEl.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  htmlEl.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

// Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Initialize Lucide Icons
lucide.createIcons();

// i18n Logic
const translations = {
  en: {
    "hero-title": "The Ultimate QR Code Generator",
    "hero-subtitle": "Professional, high-definition, and customizable QR Codes engineered for absolute reliability.",
    "hero-cta": "Start Generating Now",
    "features-title": "Everything You Need",
    "f1-title": "Intelligent Autodetect",
    "f1-desc": "Automatically identifies format (URL, Wi-Fi, VCard, etc) instantly as you type.",
    "f2-title": "Physical Capacity Guard",
    "f2-desc": "Adjust ECC levels and monitor density in real-time for perfect scannability.",
    "f3-title": "Elite Customization",
    "f3-desc": "Modify dots, eye frames, gradients, and brand logos with precision safe zones.",
    "f4-title": "High-Def Exports",
    "f4-desc": "Export up to 4K resolution in SVG, PDF, PNG or JPEG formats seamlessly.",
    "f5-title": "History & Favorites",
    "f5-desc": "Your past codes are kept safe locally, along with beautifully crafted standard templates.",
    "f6-title": "Privacy First & Localized",
    "f6-desc": "Operates entirely offline on your device, with support for EN, PT, and ES.",
    "showcase-title": "Powerful Customization",
    "showcase-desc": "Take full control of your brand with advanced customizers, presets, and color combinations. Create something truly yours.",
    "dev-title": "About the Developer",
    "dev-role": "Fullstack Developer & Systems Analyst",
    "dev-bio1": "With a background in both industrial automation and modern web development, Bruno brings a rare blend of technical depth and product vision to everything he builds.",
    "dev-bio2": "He believes software should be elegant, efficient, and most of all, useful.",
    "dev-portfolio": "Portfolio",
    "footer-text": "© 2024 Bruno Kappi. All rights reserved."
  },
  pt: {
    "hero-title": "O Melhor Gerador de QR Code",
    "hero-subtitle": "QR Codes profissionais, de alta definição e personalizáveis, projetados para máxima confiabilidade.",
    "hero-cta": "Comece a Gerar Agora",
    "features-title": "Tudo o que você precisa",
    "f1-title": "Detecção Inteligente",
    "f1-desc": "Identifica automaticamente o formato (URL, Wi-Fi, VCard, etc) instantaneamente enquanto você digita.",
    "f2-title": "Guarda de Capacidade Física",
    "f2-desc": "Ajuste níveis ECC e monitore a densidade em tempo real para leitura perfeita.",
    "f3-title": "Personalização de Elite",
    "f3-desc": "Modifique pontos, bordas, gradientes e logotipos com zonas de segurança precisas.",
    "f4-title": "Exportações em Alta Definição",
    "f4-desc": "Exporte até resolução 4K nos formatos SVG, PDF, PNG ou JPEG de forma contínua.",
    "f5-title": "Histórico e Favoritos",
    "f5-desc": "Seus códigos anteriores são mantidos seguros localmente, junto com templates padrão bem elaborados.",
    "f6-title": "Privacidade Primeiro e Localizado",
    "f6-desc": "Opera totalmente offline no seu dispositivo, com suporte para EN, PT e ES.",
    "showcase-title": "Personalização Poderosa",
    "showcase-desc": "Assuma o controle total da sua marca com opções avançadas, predefinições e combinações de cores. Crie algo verdadeiramente seu.",
    "dev-title": "Sobre o Desenvolvedor",
    "dev-role": "Desenvolvedor Fullstack e Analista de Sistemas",
    "dev-bio1": "Com experiência em automação industrial e desenvolvimento web moderno, Bruno traz uma rara combinação de profundidade técnica e visão de produto para tudo o que constrói.",
    "dev-bio2": "Ele acredita que o software deve ser elegante, eficiente e, acima de tudo, útil.",
    "dev-portfolio": "Portfólio",
    "footer-text": "© 2024 Bruno Kappi. Todos os direitos reservados."
  },
  es: {
    "hero-title": "El Mejor Generador de Código QR",
    "hero-subtitle": "Códigos QR profesionales, de alta definición y personalizables, diseñados para una fiabilidad absoluta.",
    "hero-cta": "Empieza a Generar Ahora",
    "features-title": "Todo lo que necesitas",
    "f1-title": "Detección Inteligente",
    "f1-desc": "Identifica automáticamente el formato (URL, Wi-Fi, VCard, etc.) al instante mientras escribes.",
    "f2-title": "Guardia de Capacidad Física",
    "f2-desc": "Ajusta los niveles de ECC y monitorea la densidad en tiempo real para un escaneo perfecto.",
    "f3-title": "Personalización de Élite",
    "f3-desc": "Modifica puntos, bordes, degradados y logotipos con zonas de seguridad precisas.",
    "f4-title": "Exportaciones en Alta Definición",
    "f4-desc": "Exporta hasta en resolución 4K en formatos SVG, PDF, PNG o JPEG sin problemas.",
    "f5-title": "Historial y Favoritos",
    "f5-desc": "Tus códigos anteriores se mantienen seguros localmente, junto con plantillas estándar bellamente diseñadas.",
    "f6-title": "Privacidad Primero y Localizado",
    "f6-desc": "Funciona completamente sin conexión en tu dispositivo, con soporte para EN, PT y ES.",
    "showcase-title": "Personalización Potente",
    "showcase-desc": "Toma el control total de tu marca con opciones avanzadas, ajustes preestablecidos y combinaciones de colores. Crea algo verdaderamente tuyo.",
    "dev-title": "Sobre el Desarrollador",
    "dev-role": "Desarrollador Fullstack y Analista de Sistemas",
    "dev-bio1": "Con experiencia tanto en automatización industrial como en desarrollo web moderno, Bruno aporta una rara combinación de profundidad técnica y visión de producto a todo lo que construye.",
    "dev-bio2": "Cree que el software debe ser elegante, eficiente y, sobre todo, útil.",
    "dev-portfolio": "Portafolio",
    "footer-text": "© 2024 Bruno Kappi. Todos los derechos reservados."
  }
};

function setLanguage(lang) {
  const t = translations[lang];
  for (const id in t) {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = t[id];
    }
  }
  localStorage.setItem('lang', lang);
  langSwitch.value = lang;
}

langSwitch.addEventListener('change', (e) => {
  setLanguage(e.target.value);
});

const savedLang = localStorage.getItem('lang') || 'en';
setLanguage(savedLang);
