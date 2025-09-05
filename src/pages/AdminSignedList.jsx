import React, { useEffect, useState } from 'react'
import { getSignatures } from '../storage'

export default function AdminSignedList(){
  const [sigs, setSigs] = useState([])
  useEffect(()=>{ setSigs(getSignatures()) }, [])

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="card">
        <h2 className="text-xl font-semibold mb-2">Documentos Assinados</h2>
        {sigs.length === 0 ? (<p className="text-slate-300">Sem assinaturas registradas ainda.</p>) : (
          <div className="overflow-auto">
            <table className="table">
              <thead>
                <tr className="text-slate-300">
                  <th className="th">ID</th>
                  <th className="th">Nome</th>
                  <th className="th">Data</th>
                  <th className="th">CPF</th>
                  <th className="th">Hash</th>
                </tr>
              </thead>
              <tbody>
                {sigs.map(s => (
                  <tr key={s.id}>
                    <td className="td">{s.docId}</td>
                    <td className="td">{s.docName}</td>
                    <td className="td">{new Date(s.signedAt).toLocaleString()}</td>
                    <td className="td">{s.cpf}</td>
                    <td className="td font-mono break-all">{s.signatureHash}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
