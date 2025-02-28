import { React } from 'react'
import { dateLastUpdate } from '@/constants'
import { Box, Container, Heading, Link, Text, VStack } from '@chakra-ui/react'

function TermsOfUse() {
    return (
        <>
            <Container maxW={'xl'} my={16} rounded={'sm'} shadow={'lg'}>
                <VStack py={16}>
                    <Heading>Termos de Uso - DiCoracao</Heading>

                    <Text my={4}>
                        Última atualização: {dateLastUpdate}
                    </Text>

                    <Heading>1. Alterações nos Termos</Heading>
                    <Text>
                        A DiCoracao se reserva o direito de alterar ou modificar estes Termos de Uso a qualquer momento. Quando isso acontecer, a plataforma notificará o usuário por meio do site ou por email. O uso contínuo da plataforma após alterações nos Termos indicará que o usuário concorda com as novas condições.
                    </Text>

                    <Heading>2. Lei Aplicável</Heading>
                    <Text>
                        Estes Termos de Uso são regidos pelas leis do Brasil. Qualquer disputa relacionada ao uso da plataforma será resolvida nos tribunais competentes da cidade de Novo Hamburgo, RS.
                    </Text>


                    <Heading>3. Contato</Heading>
                    <Text>
                        Se você tiver alguma dúvida sobre estes Termos de Uso, entre em contato conosco pelo email: mlucas4330@gmail.com
                    </Text>
                    <Box>
                        <Link href="/privacy-policy" label="Política de Privacidade" />
                        <Text textAlign='center'>Ao utilizar a DiCoracao, você confirma que leu e concorda com nossos Termos de Uso.</Text>
                    </Box>
                </VStack>
            </Container >
        </>
    )
}

export default TermsOfUse