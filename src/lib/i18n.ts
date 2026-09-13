export type Language = "en" | "es" | "fr";

export const LANGUAGES: { code: Language; label: string }[] = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
];

const dictionary = {
  en: {
    "home.emptyTitle": "Your Revia library is empty.",
    "home.emptyTitleNamed": "Nothing here yet, {name}.",
    "home.emptySubtitle": "Share something useful with Revia and it will organize it for you.",
    "home.library": "Your library",
    "home.loading": "Loading your library...",
    "home.error": "Revia couldn't reach your device's storage. Try reloading the page.",
    "common.more": "More",
    "common.backHome": "Home",
    "nav.home": "Home",
    "nav.save": "Save a link",
    "nav.search": "Search",
    "nav.profile": "Profile",
    "nav.about": "About",
    "nav.privacy": "Privacy Policy",
    "nav.terms": "Terms",
    "nav.install": "Install Revia",
    "save.title": "Save a link",
    "save.subtitle": "Paste a URL below, or once Revia's installed, share any link to it directly from other apps.",
    "save.button": "Save to Revia",
    "save.placeholder": "https://...",
    "profile.title": "Profile",
    "profile.name": "Name",
    "profile.type": "Type",
    "profile.account": "Account",
    "profile.accountBody": "Your library lives on this device only. Account creation and cross-device sync are coming later.",
    "profile.notifications": "Notifications",
    "profile.language": "Language",
  },
  es: {
    "home.emptyTitle": "Tu biblioteca de Revia está vacía.",
    "home.emptyTitleNamed": "Todavía no hay nada aquí, {name}.",
    "home.emptySubtitle": "Comparte algo útil con Revia y ella lo organizará por ti.",
    "home.library": "Tu biblioteca",
    "home.loading": "Cargando tu biblioteca...",
    "home.error": "Revia no pudo acceder al almacenamiento de tu dispositivo. Intenta recargar la página.",
    "common.more": "Ver más",
    "common.backHome": "Inicio",
    "nav.home": "Inicio",
    "nav.save": "Guardar un enlace",
    "nav.search": "Buscar",
    "nav.profile": "Perfil",
    "nav.about": "Acerca de",
    "nav.privacy": "Política de privacidad",
    "nav.terms": "Términos",
    "nav.install": "Instalar Revia",
    "save.title": "Guardar un enlace",
    "save.subtitle": "Pega una URL abajo, o una vez instalada Revia, comparte cualquier enlace directamente desde otras apps.",
    "save.button": "Guardar en Revia",
    "save.placeholder": "https://...",
    "profile.title": "Perfil",
    "profile.name": "Nombre",
    "profile.type": "Tipo",
    "profile.account": "Cuenta",
    "profile.accountBody": "Tu biblioteca vive solo en este dispositivo. La creación de cuenta y la sincronización llegarán más adelante.",
    "profile.notifications": "Notificaciones",
    "profile.language": "Idioma",
  },
  fr: {
    "home.emptyTitle": "Votre bibliothèque Revia est vide.",
    "home.emptyTitleNamed": "Rien ici pour l'instant, {name}.",
    "home.emptySubtitle": "Partagez quelque chose d'utile avec Revia et elle l'organisera pour vous.",
    "home.library": "Votre bibliothèque",
    "home.loading": "Chargement de votre bibliothèque...",
    "home.error": "Revia n'a pas pu accéder au stockage de votre appareil. Essayez de recharger la page.",
    "common.more": "Voir plus",
    "common.backHome": "Accueil",
    "nav.home": "Accueil",
    "nav.save": "Enregistrer un lien",
    "nav.search": "Rechercher",
    "nav.profile": "Profil",
    "nav.about": "À propos",
    "nav.privacy": "Politique de confidentialité",
    "nav.terms": "Conditions",
    "nav.install": "Installer Revia",
    "save.title": "Enregistrer un lien",
    "save.subtitle": "Collez une URL ci-dessous, ou une fois Revia installée, partagez n'importe quel lien directement depuis d'autres applications.",
    "save.button": "Enregistrer dans Revia",
    "save.placeholder": "https://...",
    "profile.title": "Profil",
    "profile.name": "Nom",
    "profile.type": "Type",
    "profile.account": "Compte",
    "profile.accountBody": "Votre bibliothèque reste uniquement sur cet appareil. La création de compte et la synchronisation seront ajoutées plus tard.",
    "profile.notifications": "Notifications",
    "profile.language": "Langue",
  },
} as const;

export type TranslationKey = keyof typeof dictionary["en"];

export function translate(lang: Language, key: TranslationKey, vars?: Record<string, string>): string {
  let text: string = dictionary[lang][key] ?? dictionary.en[key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      text = text.replace(`{${k}}`, v);
    }
  }
  return text;
}
