const {
  createElement,
} = React
import LocaleContext from './locale-context.js'

function PageFooter({
  bio,
}) {
  return createElement('footer', {},
    createElement('a', {
      href: 'https://github.com/vovanr/cv',
    }, `© ${bio.fullname}, ${new Date().getFullYear()}`)
  )
}

export default PageFooter
