const numberAbbreviations = ["", "k", "M", "B"]

export function abbreviateNumber(num: number, decimals: number = 1): string {
  let i = 0
  while (Math.abs(num) >= 1000 && i < numberAbbreviations.length - 1) {
    num /= 1000
    i++
  }
  const abbrev = numberAbbreviations[i]
  return num.toFixed(decimals).replace(/\.0+$|(\.\d*?[1-9])0+$/, "$1") + abbrev
}
