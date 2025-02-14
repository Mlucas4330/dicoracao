import React from 'react'
import { Flex, Heading } from '@chakra-ui/react'

function Header() {
    return (
        <>
            <Flex py={4} justify={'space-between'}>
                <Heading>DiCoracao</Heading>
            </Flex>
        </>
    )
}

export default Header