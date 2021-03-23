/* global React */
const {createElement, useCallback, useContext, useEffect, useState} = React
import LocaleContext from './locale-context.js'
import StartEndPeriodDate from './components/start-end-period-date.js'

function Education({education}) {
  const {getMessage} = useContext(LocaleContext)

  return createElement(
    'section',
    {},
    createElement('h2', {}, getMessage('higherEducation')),
    createElement('p', {}, ''),
    createElement(
      'div',
      {},
      education.map((item, index) => {
        const {name, faculty, start, end} = item

        return createElement(
          'section',
          {key: index},
          createElement('header', {}, name),
          createElement(
            'div',
            {},
            createElement('strong', {}, getMessage('faculty') + ': '),
            createElement('strong', {}, faculty)
          ),
          createElement(
            'div',
            {},
            createElement(StartEndPeriodDate, {
              start,
              end,
            })
          )
        )
      })
    )
  )
}

export default Education
