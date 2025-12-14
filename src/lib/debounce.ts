export default function debounce<T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number = 250,
) {
  let timeoutId: ReturnType<typeof setTimeout>
  return (...args: T) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      callback(...args)
    }, delay)
  }
}
