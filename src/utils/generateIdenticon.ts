import Identicon from 'identicon.js'
import crypto from 'crypto'

export const generateIdenticon = (input: string, size = 64) => {
  const hash = crypto.createHash('md5').update(input).digest('hex')
  const data = new Identicon(hash, size).toString()

  return `data:image/png;base64,${data}`
}
