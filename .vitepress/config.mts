import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Materis Docs',
  cleanUrls: true,
  lastUpdated: true,

  // Español en la raíz (docs.materis.io/signal-scope),
  // inglés bajo /en/ (docs.materis.io/en/signal-scope).
  locales: {
    root: {
      label: 'Español',
      lang: 'es-ES',
      description: 'Documentación de los productos de Materis',
      themeConfig: {
        nav: [
          { text: 'Inicio', link: '/' },
          { text: 'SignalScope', link: '/signal-scope/' },
        ],
        sidebar: {
          '/signal-scope/': [
            {
              text: 'SignalScope',
              items: [
                { text: 'Introducción', link: '/signal-scope/' },
                { text: 'Instalación y activación', link: '/signal-scope/instalacion' },
                { text: 'Primeros pasos', link: '/signal-scope/primeros-pasos' },
              ],
            },
            {
              text: 'La interfaz',
              items: [
                { text: 'Panorama', link: '/signal-scope/interfaz/' },
                { text: 'Estaciones', link: '/signal-scope/interfaz/estaciones' },
                { text: 'Puntos de acceso', link: '/signal-scope/interfaz/puntos-de-acceso' },
                { text: 'Detectados y Otros', link: '/signal-scope/interfaz/detectados-y-otros' },
                { text: 'Mapa de cobertura', link: '/signal-scope/interfaz/mapa' },
              ],
            },
            {
              text: 'Guías',
              items: [
                { text: 'Semáforo y diagnóstico', link: '/signal-scope/diagnostico' },
                { text: 'Centinela y calificación', link: '/signal-scope/centinela' },
                { text: 'Herramientas de diagnóstico', link: '/signal-scope/herramientas' },
                { text: 'Atajos y navegación rápida', link: '/signal-scope/atajos' },
                { text: 'Historial, snapshots y reportes', link: '/signal-scope/snapshots' },
                { text: 'Compartir', link: '/signal-scope/compartir' },
                { text: 'Seguridad y privacidad', link: '/signal-scope/seguridad-privacidad' },
                { text: 'Solución de problemas', link: '/signal-scope/solucion-problemas' },
                { text: 'Glosario', link: '/signal-scope/glosario' },
                { text: 'Novedades por versión', link: '/signal-scope/changelog' },
              ],
            },
          ],
        },
        outline: { level: [2, 3], label: 'En esta página' },
        docFooter: { prev: 'Anterior', next: 'Siguiente' },
        darkModeSwitchLabel: 'Tema',
        lightModeSwitchTitle: 'Cambiar a tema claro',
        darkModeSwitchTitle: 'Cambiar a tema oscuro',
        returnToTopLabel: 'Volver arriba',
        sidebarMenuLabel: 'Menú',
        langMenuLabel: 'Cambiar idioma',
        lastUpdatedText: 'Última actualización',
        footer: {
          message: 'Documentación de producto',
          copyright: '© Materis',
        },
      },
    },

    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      description: 'Documentation for Materis products',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'SignalScope', link: '/en/signal-scope/' },
        ],
        sidebar: {
          '/en/signal-scope/': [
            {
              text: 'SignalScope',
              items: [
                { text: 'Introduction', link: '/en/signal-scope/' },
                { text: 'Installation and activation', link: '/en/signal-scope/installation' },
                { text: 'First steps', link: '/en/signal-scope/first-steps' },
              ],
            },
            {
              text: 'The interface',
              items: [
                { text: 'Overview', link: '/en/signal-scope/interface/' },
                { text: 'Stations', link: '/en/signal-scope/interface/stations' },
                { text: 'Access points', link: '/en/signal-scope/interface/access-points' },
                { text: 'Detected and Others', link: '/en/signal-scope/interface/detected-and-others' },
                { text: 'Coverage map', link: '/en/signal-scope/interface/map' },
              ],
            },
            {
              text: 'Guides',
              items: [
                { text: 'Traffic light and diagnostics', link: '/en/signal-scope/diagnostics' },
                { text: 'Sentinel and network score', link: '/en/signal-scope/sentinel' },
                { text: 'Diagnostic tools', link: '/en/signal-scope/tools' },
                { text: 'Shortcuts and quick navigation', link: '/en/signal-scope/shortcuts' },
                { text: 'History, snapshots and reports', link: '/en/signal-scope/snapshots' },
                { text: 'Sharing', link: '/en/signal-scope/sharing' },
                { text: 'Security and privacy', link: '/en/signal-scope/security-privacy' },
                { text: 'Troubleshooting', link: '/en/signal-scope/troubleshooting' },
                { text: 'Glossary', link: '/en/signal-scope/glossary' },
                { text: 'Release notes', link: '/en/signal-scope/changelog' },
              ],
            },
          ],
        },
        outline: { level: [2, 3], label: 'On this page' },
        footer: {
          message: 'Product documentation',
          copyright: '© Materis',
        },
      },
    },
  },

  themeConfig: {
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: { buttonText: 'Buscar', buttonAriaLabel: 'Buscar' },
              modal: {
                displayDetails: 'Mostrar detalles',
                resetButtonTitle: 'Limpiar búsqueda',
                backButtonTitle: 'Cerrar búsqueda',
                noResultsText: 'Sin resultados para',
                footer: {
                  selectText: 'seleccionar',
                  navigateText: 'navegar',
                  closeText: 'cerrar',
                },
              },
            },
          },
        },
      },
    },
  },
})
