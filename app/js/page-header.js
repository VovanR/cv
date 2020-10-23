const {
  Fragment,
  createElement,
  useContext,
} = React
import LocaleContext from './locale-context.js'
import LocaleSelector from './locale-selector.js'
import calculateCurrentYears from './utils/calculate-current-years.js'

function formatCurrentYears(locale, date) {
  const years = calculateCurrentYears(date)
  const formatter = new Intl.NumberFormat(locale, {style: 'unit', unit: 'year', unitDisplay: 'long'})

  return formatter.format(years)
}

function PageHeader({
  bio,
}) {
  const {
    locale,
    getMessage,
  } = useContext(LocaleContext)

  return createElement('header', {},
    createElement('h1', {},
      createElement('span', {}, bio.fullname),
      createElement(Fragment, {}, ' '),
      createElement('time', {dateTime: bio.birthday}, formatCurrentYears(locale, bio.birthday))
    ),
    createElement('p', {}, getMessage('cv')),
    createElement(LocaleSelector)
  )
}

export default PageHeader
