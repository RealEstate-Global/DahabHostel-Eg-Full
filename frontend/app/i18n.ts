import { getRequestConfig } from 'next-intl/server';
import { routing, type AppLocale } from './routing';

const namespaces = ['nav', 'footer', 'legal', 'common', 'pages', 'auth', 'admin', 'confirmation'] as const;

async function loadMessages(locale: AppLocale) {
  const entries = await Promise.all(
    namespaces.map(async (namespace) => {
      const imported = await import(`@/messages/${locale}/${namespace}.json`);
      return [namespace, imported.default] as const;
    }),
  );

  return Object.fromEntries(entries);
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale: AppLocale = requested
    ? routing.locales.includes(requested as AppLocale)
      ? (requested as AppLocale)
      : (() => { throw new Error(`Unsupported locale requested: ${requested}`); })()
    : routing.defaultLocale;
  const messages = await loadMessages(locale);

  return {
    locale,
    messages,
  };
});
