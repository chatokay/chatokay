import type { App } from 'vue'
import { type Locale, createI18n } from 'vue-i18n'

// Import i18n resources
// https://vitejs.dev/guide/features.html#glob-import
export const i18n = createI18n({
  legacy: false,
  locale: '',
  messages: {},
  fallbackLocale: 'en',
})

const localesMap = Object.fromEntries(
  Object.entries(import.meta.glob('../locales/*.json'))
    .map(([path, loadLocale]) => [path.match(/([\w-]*)\.json$/)?.[1], loadLocale]),
) as Record<Locale, () => Promise<{ default: Record<string, string> }>>

export const availableLocales = Object.keys(localesMap)

const loadedLanguages: string[] = []
const currentLocale = useStorage('locale', navigator.language.toLowerCase())

function setI18nLanguage(lang: Locale) {
  i18n.global.locale.value = lang as any
  document.querySelector('html')?.setAttribute('lang', lang)
  return lang
}

export async function loadLanguageAsync(lang: string): Promise<Locale> {
  // If the same language
  if (i18n.global.locale.value === lang)
    return setI18nLanguage(lang)

  // If the language was already loaded
  if (loadedLanguages.includes(lang))
    return setI18nLanguage(lang)

  // If the language hasn't been loaded yet
  const messages = await localesMap[lang]()
  i18n.global.setLocaleMessage(lang, messages.default as any)
  loadedLanguages.push(lang)
  return setI18nLanguage(lang)
}

export function installI18n(app: App<Element>) {
  app.use(i18n)
  setLocale(currentLocale.value)
}

export function setLocale(lang: string) {
  const locale = availableLocales.includes(lang) ? lang : i18n.global.fallbackLocale.value.toString()
  currentLocale.value = locale
  loadLanguageAsync(locale)
}
