export default duration => {
  let timeoutRef = null

  return callback => {
    clearTimeout(timeoutRef)
    timeoutRef = setTimeout(callback, duration)
  }
}
