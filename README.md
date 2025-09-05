# Assinatura Digital — React (JSX) + Tailwind

- React + Vite + React Router
- TailwindCSS (mobile-first)
- Upload de PDF, hash SHA-256 (Web Crypto), assinatura `SHA256(docHash + '#' + cpf)`
- Persistência mock com localStorage
- Vitest + Testing Library
- Dockerfile (build e servir produção)

## Rodando
```bash
npm install
npm run dev
# http://localhost:5173
```

Admin padrão: `admin@akrk.dev / admin123` (pode alterar via `.env` com VITE_ADMIN_EMAIL e VITE_ADMIN_PASSWORD).
