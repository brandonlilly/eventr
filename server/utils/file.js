import busboy from 'connect-busboy'
import { StringDecoder } from 'string_decoder'
import { ext } from '../../app/utils'

export function extractFile(req) {
  return new Promise((resolve, reject) => {
    req.pipe(req.busboy)
    req.busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      let contents = ''
      let decoder = new StringDecoder('utf8')

      file.on('data', data => {
        contents += decoder.write(data)
      })

      file.on('end', () => {
        resolve({ fieldname, file, filename, encoding, mimetype, contents, extension: ext(fieldname) })
      })

      file.on('error', error => {
        reject(error)
      })
    })

    req.busboy.on('error', error => {
      reject(error)
    })
  })
}
