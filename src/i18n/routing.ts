import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    // Lista completa de idiomas soportados
    locales: ['en', 'es', 'fr', 'it', 'pt', 'de', 'ru', 'zh', 'nl'],

    // Idioma por defecto
    defaultLocale: 'en'
});
