export async function sha256HexFromString(str){
  const data = new TextEncoder().encode(str)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return bufferToHex(digest)
}
export async function sha256HexFromArrayBuffer(buf){
  const digest = await crypto.subtle.digest('SHA-256', buf)
  return bufferToHex(digest)
}
export function bufferToHex(buffer){
  const bytes = new Uint8Array(buffer)
  return Array.from(bytes).map(b=>b.toString(16).padStart(2,'0')).join('')
}
