import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// PrimeReact & Styling Imports
import 'primereact/resources/themes/lara-light-indigo/theme.css' // theme
import 'primereact/resources/primereact.min.css'                  // core css
import 'primeicons/primeicons.css'                                // icons
import 'primeflex/primeflex.css'                                  // primeflex grid css

import './index.css'                                              // custom custom styles
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
