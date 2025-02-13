import React from 'react'
import { Container } from '@chakra-ui/react'
import FrequentlyAsked from './components/FrequentlyAsked'
import Footer from './components/Footer'
import { Toaster } from "@/components/ui/toaster"
import CTA from './components/CTA'
import Header from './components/Header'
import Hero from './components/Hero'
import Steps from './components/Steps'
import Preview from './components/Preview'

function App() {
    return (
        <>
            <Toaster />
            <Container>
                <Header />
                <Hero />
                <Preview />
                <Steps />
                <FrequentlyAsked />
                <CTA />
                <Footer />
            </Container >
        </>
    )
}

export default App
