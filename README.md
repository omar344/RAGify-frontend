# RAGify Frontend

Web frontend for **RAGify**, a Retrieval-Augmented Generation application that lets users upload documents and ask questions about their content. Graduation project (team). Pairs with the [multi-model-rag-app](https://github.com/omar344/multi-model-rag-app) FastAPI backend.

## Features

- User authentication (register / login) against the backend's `/api/v1/auth` endpoints
- Document upload (`FileUploader`)
- Chat interface for asking questions over the uploaded documents
- Dashboard layout with header, guarded routes redirecting to login

## Tech Stack

- **Next.js 15** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS** + **Radix UI** (shadcn/ui components)
- **react-markdown** for rendered answers

## Configuration

The backend URL is read from the environment variable `NEXT_PUBLIC_API_URL`. Create a `.env.local` file:

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

pointing at a running [multi-model-rag-app](https://github.com/omar344/multi-model-rag-app) backend (the repo's `Ngrokurl.env` is the temporary tunnel URL used during development).

## Getting Started

```bash
npm install
npm run dev
```

The app runs on `http://localhost:3000` and redirects to `/login` until you sign in.

## Related Repositories

- [multi-model-rag-app](https://github.com/omar344/multi-model-rag-app): the FastAPI RAG backend (document upload, chunking, indexing, multi-LLM QA)
- [RAG-client](https://github.com/omar344/RAG-client): a lighter chat-only client for the same backend
