import { Box, Card, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { steps } from '@/constants'

function Steps() {
    return (
        <>
            <Box my={16}>
                <Box justifyItems={'center'} textAlign={'center'}>
                    <Heading size={'3xl'} fontWeight={'bold'} mb={4}>Como Funciona?</Heading>
                    <Text w={{ md: '1/2' }}>
                        Em apenas três passos simples, você cria seu presente personalizado e o acessa
                        facilmente através de um QR code único enviado para seu e-mail.
                    </Text>
                </Box>
                <Flex my={12} gap={4} flexDirection={{ base: 'column', lg: 'row' }}>
                    {
                        steps.map((step, index) => (
                            <Card.Root flex={1} key={index} size={'lg'} textAlign={'center'}>
                                <Card.Header>
                                    <Heading color={'pink.500'} size={'5xl'} fontWeight={'bold'}>{step.step}</Heading>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Title mb={2}>{step.title}</Card.Title>
                                    <Card.Description>
                                        {step.description}
                                    </Card.Description>
                                </Card.Body>
                            </Card.Root>
                        ))
                    }
                </Flex>
            </Box>
        </>
    )
}

export default Steps