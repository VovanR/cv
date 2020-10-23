const {
  createElement,
  useCallback,
  useContext,
} = React
import LocaleContext from './locale-context.js'

function LocaleSelector() {
  const {
    locale,
    locales,
    changeLocale,
  } = useContext(LocaleContext)

  return createElement('select', {
    value: locale,
    onChange: ({target: {value}}) => changeLocale(value),
  },
    locales.map(({label, value}) => {
      return createElement('option', {
        key: value,
        value,
      }, label)
    })
  )
}

export default LocaleSelector
