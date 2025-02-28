import React from 'react'
import { Box, Heading, Text } from '@chakra-ui/react'
import { Button } from '@/components/ui/button'

function Hero() {
    return (
        <>
            <Box my={16} textAlign={'center'} gap={4} justifyItems={'center'}>
                <Heading pb={2} size={'6xl'} fontWeight={'bold'}>Transforme seu amor em surpresa</Heading>
                <Text w={{ md: '1/2' }} pb={6}>Crie uma experiência inesquecível! Personalize uma surpresa especial que será revelada através de um QR Code único.</Text>
                <Button as={'a'} href={'#create'} size={'2xl'}>Quero criar minha surpresa</Button>
            </Box>
        </>
    )
}

export default Hero