/* global React */
const {
  Fragment,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} = React
import classNames from './utils/class-names.js'
import StartEndPeriodDate from './components/start-end-period-date.js'
import LocaleContext from './locale-context.js'

function createId({start, end}) {
  return start + end
}

function Item({
  className,
  name,
  juristic,
  position,
  city,
  start,
  end,
  description,
}) {
  return createElement('section', {
    className: classNames('working-experience-item', className),
  },
    createElement('header', {},
      createElement('span', {}, name),
      ' ',
      createElement('em', {}, juristic),
    ),
    createElement('div', {},
      createElement('div', {},
        createElement('strong', {}, position)
      ),
      createElement('div', {},
        createElement(StartEndPeriodDate, {
          start,
          end,
        })
      ),
      description && createElement('pre', {}, description)
    ),
  )
}

function List({
  workingExperience,
}) {
  return createElement('div', {
    className: 'working-experience-list',
  }, workingExperience.map(item => {
    const {
      name,
      juristic,
      position,
      city,
      start,
      end,
      description,
    } = item

    return createElement(Item, {
      key: createId(item),
      className: 'working-experience-list__item',
      name,
      juristic,
      position,
      city,
      start,
      end,
      description,
    })
  }))
}

function WorkingExperience({
  workingExperience,
}) {
  const {
    getMessage,
  } = useContext(LocaleContext)

  return createElement('section', {},
    createElement('h2', {}, getMessage('workingExperience')),
    createElement('p', {},
      createElement(StartEndPeriodDate, {
        start: workingExperience[0].start,
        end: Date.now(),
      }),
    ),
    createElement(List, {
      workingExperience,
    })
  )
}

export default WorkingExperience
