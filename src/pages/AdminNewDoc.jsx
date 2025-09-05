import React, { useState } from 'react'
import { addDoc } from '../storage'
import { sha256HexFromArrayBuffer } from '../utils/hash'

export default function AdminNewDoc(){
  const [file, setFile] = useState(null)
  const [name, setName] = useState('')
  const [msg, setMsg] = useState('')

  async function handleUpload(e){
    e.preventDefault()
    if(!file){ setMsg('Selecione um PDF'); return }
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')
    if(!isPdf){ setMsg('Apenas PDF é permitido.'); return }

    const arrayBuff = await file.arrayBuffer()
    const docHash = await sha256HexFromArrayBuffer(arrayBuff)

    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = String(reader.result)
      const doc = {
        id: crypto.randomUUID(),
        name: name || file.name,
        uploadedAt: new Date().toISOString(),
        dataUrl,
        docHash
      }
      addDoc(doc)
      setMsg('Documento cadastrado e disponível para assinatura.')
      setFile(null); setName('')
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="card">
        <h2 className="text-xl font-semibold">Cadastrar Documento</h2>
        <form onSubmit={handleUpload} className="grid gap-3 mt-2">
          <label className="label">Arquivo (PDF)</label>
          <input className="input" type="file" accept="application/pdf" onChange={e=>setFile(e.target.files?.[0] || null)}/>
          <label className="label">Nome do documento</label>
          <input className="input" value={name} onChange={e=>setName(e.target.value)} placeholder="Ex.: Contrato Financeiro #123"/>
          <button className="btn-primary" type="submit">Cadastrar</button>
          {msg && <p className="text-sm text-slate-400">{msg}</p>}
        </form>
      </div>
    </div>
  )
}
