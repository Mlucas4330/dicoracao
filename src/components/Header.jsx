import React from 'react'
import { Box, Flex, Heading } from '@chakra-ui/react'
import { SegmentedControl } from '@/components/ui/segmented-control'

function Header() {
    return (
        <>
            <Flex py={4} justify={'space-between'}>
                <Heading>DiCoracao</Heading>
                <Box as={'nav'}>
                    <SegmentedControl defaultValue="table" items={[{ value: "table", label: 'EN', }, { value: "board", label: 'PT' }]} />
                </Box>
            </Flex>
        </>
    )
}

export default Header