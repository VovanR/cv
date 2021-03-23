const {createContext} = React

const LocaleContext = createContext({
  locale: '',
  locales: [],
  getMessage: () => {},
  changeLocale: () => {},
})

export default LocaleContext
