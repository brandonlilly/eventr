export function getFileContents(file, cb) {
  const reader = new FileReader()
  reader.onload = (e) => {
    const content = e.target.result
    cb(content)
  }
  reader.readAsText(file)
}

export function padleft(str, width) {
  let result = str.toString()

  while (result.length < width) {
    result = '0' + result
  }

  return result
}
