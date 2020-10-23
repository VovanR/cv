/* global React, ReactDOM */

import {
  DATA_DIR,
  DATA_FILE_NAMES,
  REPOSITORY_URL,
  SITE_SOURCE_URL,
} from './constants.js'
import getCurrentLocale from './utils/get-current-locale.js'
import {LOCALES} from './constants.js'

const {
  Fragment,
  createElement,
  useCallback,
  useEffect,
  useState,
} = React
import LocaleContext from './locale-context.js'
import PageHeader from './page-header.js'
import PageFooter from './page-footer.js'
import Education from './education.js'
import WorkingExperience from './working-experience.js'

function fetchData(locale, dataFileName) {
  return fetch(`${DATA_DIR}/${locale}/${dataFileName}.json`)
    .then(response => response.json())
}

function DataContainer() {
  const [locale, setLocale] = useState(getCurrentLocale())
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState(null)
  const [bio, setBio] = useState(null)
  const [education, setEducation] = useState(null)
  const [workingExperience, setWorkingExperience] = useState(null)

  const changeLocale = locale => {
    document.documentElement.lang = locale
    setLocale(locale)
  }

  useEffect(() => {
    Promise.all([
      fetchData(locale, DATA_FILE_NAMES.MESSAGES),
      fetchData(locale, DATA_FILE_NAMES.BIO),
      fetchData(locale, DATA_FILE_NAMES.EDUCATION),
      fetchData(locale, DATA_FILE_NAMES.WORKING_EXPERIENCE),
    ])
      .then(([messages, bio, education, workingExperience]) => {
        setMessages(messages)
        setBio(bio)
        setEducation(education)
        setWorkingExperience(workingExperience)
        setLoading(false)

        document.title = messages.metaTitle
        document.querySelector('meta[name="description"]').content = messages.metaDescription
      })
      .catch(() => setLoading(false))
  }, [locale])

  if (loading) {
    return 'Loading'
  }

  return createElement(LocaleContext.Provider, {value: {
    locale,
    locales: LOCALES,
    getMessage: id => messages[id],
    changeLocale,
  }},
    createElement(Fragment, {},
      createElement(PageHeader, {
        bio,
      }),
      createElement('main', {},
        createElement(WorkingExperience, {
          workingExperience,
        }),
        createElement(Education, {
          education,
        })
      ),
      createElement(PageFooter, {
        bio,
      })
    )
  )
}

function App() {
  return createElement(DataContainer)
}

ReactDOM.render(createElement(App), document.querySelector('#app'))
