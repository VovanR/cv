/**
 * @param {Object|Array|string} classes
 * @return {string}
 */
function classNames() {
  const result = []

  for (const className of arguments) {
    if (typeof className === 'string') {
      result.push(className)
    } else if (Array.isArray(className)) {
      className.forEach(className => {
        result.push(classNames(className))
      })
    } else {
      result.push(classNamesObject(className))
    }
  }

  return result.join(' ')
}

/**
 * @param {Object} object
 * @return {string}
 */
function classNamesObject(object) {
  const classNames = []

  for (const [className, active] of Object.entries(object)) {
    if (active) {
      classNames.push(className)
    }
  }

  return classNames.join(' ')
}


export default classNames
