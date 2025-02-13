import { Link, Text } from '@chakra-ui/react'
import React from 'react'

function Footer() {
    return (
        <>
            <Text py={4} textAlign={'center'}>DiCoracao © {new Date().getFullYear()} - Todos os direitos reservados - <Link href='/terms-of-use'>Termos de Uso</Link> e <Link href='/privacy-policy'>Política de Privacidade</Link></Text>
        </>
    )
}

export default Footer