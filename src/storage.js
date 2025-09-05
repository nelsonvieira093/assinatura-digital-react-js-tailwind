const DOCS_KEY = 'docs'
const SIGS_KEY = 'signatures'

export function getDocs(){
  const raw = localStorage.getItem(DOCS_KEY)
  return raw ? JSON.parse(raw) : []
}
export function saveDocs(docs){
  localStorage.setItem(DOCS_KEY, JSON.stringify(docs))
}
export function addDoc(doc){
  const docs = getDocs(); docs.push(doc); saveDocs(docs); return doc
}
export function removeDocById(id){
  const docs = getDocs().filter(d => d.id !== id); saveDocs(docs)
}

export function getSignatures(){
  const raw = localStorage.getItem(SIGS_KEY)
  return raw ? JSON.parse(raw) : []
}
export function addSignature(sig){
  const list = getSignatures(); list.push(sig)
  localStorage.setItem(SIGS_KEY, JSON.stringify(list))
  return sig
}
export function clearAll(){
  localStorage.removeItem(DOCS_KEY); localStorage.removeItem(SIGS_KEY)
}
