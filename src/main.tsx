import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { UserProvider } from './services/context/UsernameContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider >
      <App />
    </UserProvider>
  </StrictMode>,
)
