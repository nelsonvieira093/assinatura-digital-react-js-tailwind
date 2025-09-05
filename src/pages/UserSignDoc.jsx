import React, { useEffect, useMemo, useState } from 'react'
import { getDocs, removeDocById, addSignature } from '../storage'
import { sha256HexFromString } from '../utils/hash'

function onlyDigits(str){ return (str||'').replace(/\D/g,'') }

/** Gera download de um JSON com os metadados da assinatura (comprovante) */
function downloadSignatureJSON(signature){
  const blob = new Blob([JSON.stringify(signature, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `assinatura-${signature.docId}.json`
  a.click()
  URL.revokeObjectURL(url)
}

/** Força download do PDF original (dataURL) com um nome amigável */
function downloadOriginalPDF(currentDoc){
  // currentDoc.dataUrl já é um DataURL do PDF
  const a = document.createElement('a')
  a.href = currentDoc.dataUrl
  // nome do arquivo: usa o nome cadastrado ou o id
  const safeName = (currentDoc.name || `documento-${currentDoc.id}`).replace(/[^\w\-]+/g,'_')
  a.download = `${safeName}.pdf`
  a.click()
}

export default function UserSignDoc(){
  const [available, setAvailable] = useState([])
  const [cpf, setCpf] = useState('')
  const [msg, setMsg] = useState('')

  useEffect(()=>{ setAvailable(getDocs()) }, [])

  const current = useMemo(()=> available[0] || null, [available])

  async function handleSign(e){
    e.preventDefault()
    if(!current){ setMsg('Nenhum documento disponível para assinatura.'); return }
    const cpfDigits = onlyDigits(cpf)
    if(cpfDigits.length !== 11){ setMsg('CPF inválido. Informe 11 dígitos.'); return }

    // Gera hash de assinatura: SHA256(docHash + '#' + cpf)
    const signatureHash = await sha256HexFromString(`${current.docHash}#${cpfDigits}`)

    // Monta o objeto de assinatura para persistir e para o comprovante .json
    const signature = {
      id: crypto.randomUUID(),
      docId: current.id,
      docName: current.name,
      signedAt: new Date().toISOString(),
      cpf: cpfDigits,
      signatureHash
    }

    // Persiste assinatura e remove o doc da fila
    addSignature(signature)
    removeDocById(current.id)
    setAvailable(getDocs())
    setCpf('')
    setMsg('Assinatura registrada com sucesso. Obrigado!')

    // 🔽 Baixa automaticamente o comprovante .json
    downloadSignatureJSON(signature)

    // 🔽 Baixa automaticamente o PDF original (opcional — comente se não quiser)
    downloadOriginalPDF(current)

    // 👉 Se quiser um PDF “carimbado” com CPF e hash no rodapé,
    // use a função opcional com pdf-lib (veja abaixo) e chame aqui.
    // await downloadSignedPdfWithStamp(current, cpfDigits, signatureHash)
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="card">
        <h2 className="text-xl font-semibold">Documento para Assinatura</h2>
        {!current ? (
          <p className="text-slate-300">Não há documentos para assinar no momento.</p>
        ) : (
          <>
            <p className="mb-2"><strong>{current.name}</strong></p>
            <div className="w-full h-[60vh] border border-slate-700 rounded-xl overflow-hidden bg-slate-900">
              <object data={current.dataUrl} type="application/pdf" width="100%" height="100%">
                <p className="p-3">Não foi possível exibir o PDF. <a className="underline" href={current.dataUrl} target="_blank" rel="noreferrer">Abrir em nova aba</a></p>
              </object>
            </div>
            <form onSubmit={handleSign} className="grid gap-2 mt-3">
              <label className="label">CPF do Assinante</label>
              <input className="input" value={cpf} onChange={e=>setCpf(e.target.value)} placeholder="Digite seu CPF"/>
              <button className="btn-primary" type="submit">Assinar Documento</button>
              <p className="text-xs text-slate-400">Após assinar, o documento some da lista. O download do comprovante e do PDF inicia automaticamente.</p>
              {msg && <p className="text-sm text-slate-400">{msg}</p>}
            </form>
          </>
        )}
      </div>
    </div>
  )
}
