export function formatDate(dateStr) {
  let date = new Date(dateStr)

  const monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ]

  const day = date.getDate()
  const month = monthNames[date.getMonth()]
  const year = date.getFullYear()

  return `${month} ${day}, ${year}`
}

export const padleft = (str, width) => {
  let result = str.toString()

  while (result.length < width) {
    result = '0' + result
  }

  return result
}

export const formatTime = (dateStr) => {
  const date = new Date(dateStr)

  const period = date.getHours > 12 ? 'pm' : 'am'
  const minutes = date.getMinutes()
  let hours = date.getHours()
  hours = hours > 12 ? hours - 12 : hours

  return `${hours}:${padleft(minutes, 2)} ${period}`
}

export function transformData(data) {
  const { city, street, zip } = data.address
  const when = formatDate(data.start_date)

  let event = {
    ...data,
    agenda_items: data.agenda_items.map(item => ({
      ...item,
      time: formatTime(item.start),
    })),
    where: `${street} ${city}, ${zip}`,
    when,
  }

  return event
}

export function getContents(file, cb) {
  const reader = new FileReader()
  reader.onload = (e) => {
    const content = e.target.result
    cb(content)
  }
  reader.readAsText(file)
}
