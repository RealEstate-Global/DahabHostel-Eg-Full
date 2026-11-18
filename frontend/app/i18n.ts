import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const validLocale = requested || 'en';

  let messages = {} as Record<string, any>;

  const messageFiles = ["nav", "footer", "legal"];

  for (const file of messageFiles) {
    try {
      const imported = await import(`@/messages/${validLocale}/${file}.json`);
      messages[file] = imported.default || imported;
    } catch {
      messages[file] = {};
    }
  }

  return {
    locale: validLocale,
    messages
  };
});
