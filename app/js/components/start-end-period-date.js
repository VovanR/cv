/* global React */
const {createElement, useContext} = React
import LocaleContext from '../locale-context.js'

/**
 * TODO: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/lang
 * TODO: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
 * @param {string}
 * @return {string}
 */
function formatDate(locale, date) {
  return Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}

function Time({dateTime, locale}) {
  return createElement('time', {dateTime}, formatDate(locale, dateTime))
}

function EndTime({dateTime, locale}) {
  const {getMessage} = useContext(LocaleContext)

  if (dateTime) {
    return createElement(Time, {dateTime, locale})
  }

  return getMessage('currentTime')
}

function formatMonthsDuration(locale, months) {
  return Intl.NumberFormat(locale, {
    style: 'unit',
    unit: 'month',
    unitDisplay: 'long',
  }).format(months)
}

function formatYearsDuration(locale, years) {
  return Intl.NumberFormat(locale, {
    style: 'unit',
    unit: 'year',
    unitDisplay: 'long',
  }).format(years)
}

function Period({start, end, locale}) {
  const startDate = new Date(start)
  const endDate = end ? new Date(end) : Date.now()

  const milliseconds = endDate - startDate
  const seconds = milliseconds / 1000
  const minutes = seconds / 60
  const hours = minutes / 60
  const days = hours / 24
  const months = Math.floor(days / 30)

  const relMonths = months % 12
  const years = (months - relMonths) / 12

  return `(${years ? `${formatYearsDuration(locale, years)} ` : ''}${formatMonthsDuration(locale, relMonths)})`
}

function StartEndPeriodDate({start, end}) {
  const {locale} = useContext(LocaleContext)

  return createElement(
    'span',
    {},
    Time({
      dateTime: start,
      locale,
    }),
    ' — ',
    EndTime({
      dateTime: end,
      locale,
    }),
    ' ',
    Period({
      start,
      end,
      locale,
    })
  )
}

export default StartEndPeriodDate
