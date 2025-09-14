
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
=======
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
>>>>>>> aff305642fc91ffe31cbc44b06800b7a53ceee1b
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
