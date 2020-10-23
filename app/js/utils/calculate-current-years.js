/**
 * @param {string} date
 * @return {number}
 */
export default function calculateCurrentYears(date) {
  const fromDate = new Date(date)
  const currentDate = Date.now()
  const duration = currentDate - fromDate

  return Math.floor(duration / 1000 / 60 / 60 / 24 / 365)
}
