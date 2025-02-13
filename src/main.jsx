import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from '@/components/ui/provider'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import TermsOfUse from './pages/TermsOfUse.jsx'
import { Theme } from '@chakra-ui/react'
import { StrictMode } from 'react'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider>
            <Theme appearance='light' colorPalette={'pink'}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<App />} />
                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                        <Route path="/terms-of-use" element={<TermsOfUse />} />
                    </Routes>
                </BrowserRouter>
            </Theme>
        </Provider>
    </StrictMode>
)