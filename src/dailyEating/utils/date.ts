export const compareDate = (firstDate: number, secondDate: number) => {
  const date1 = new Date(firstDate);
  const date2 = new Date(secondDate);

  // Extract data
  const day1 = date1.getDate()
  const month1 = date1.getMonth()
  const year1 = date1.getFullYear()

  const day2 = date2.getDate()
  const month2 = date2.getMonth()
  const year2 = date2.getFullYear()

  return day1 === day2 && month1 === month2 && year1 === year2
}