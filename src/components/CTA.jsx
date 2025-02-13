import React from 'react'
import { Badge, Card, Flex, QrCode, VStack } from '@chakra-ui/react'
import { Button } from '@/components/ui/button'

function CTA() {
    return (
        <>
            <Card.Root my={16} flexDirection={{ base: 'column', lg: 'row' }} alignItems={'center'} p={4}>
                <Card.Body>
                    <Flex gap={4} direction={{ base: 'column', lg: 'row' }} align={'center'}>
                        <QrCode.Root shadow={'lg'} size={'lg'}>
                            <QrCode.Frame>
                                <QrCode.Pattern />
                            </QrCode.Frame>
                        </QrCode.Root>
                        <VStack gap={4} align={'flex-start'}>
                            <Card.Title fontSize={'3xl'}>
                                Vamos transformar seu amor em surpresa agora mesmo?
                            </Card.Title>
                            <Badge>Crie em menos de 5 minutos!</Badge>
                            <Button as={'a'} href={'#create'} size={'lg'}>Quero criar minha surpresa</Button>
                        </VStack>
                    </Flex>
                </Card.Body>
            </Card.Root>
        </>
    )
}

export default CTA