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

export function ext(filename) {
  // https://stackoverflow.com/questions/190852/how-can-i-get-file-extensions-with-javascript
  return filename.substr((~-filename.lastIndexOf(".") >>> 0) + 2);
}

export function fdAppend(file) {
  const fd = new FormData()
  fd.append(file.name, file)
  return fd
}
