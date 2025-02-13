import { React } from 'react'
import { dateLastUpdate } from '@/constants'
import { Box, Heading, Link, Text, VStack } from '@chakra-ui/react'

function TermsOfUse() {
    return (
        <>
            <VStack>
                <Heading level={2} margin="none">Termos de Uso - DiCoracao</Heading>

                <Text margin={{ vertical: 'md' }}>
                    Última atualização: {dateLastUpdate}
                </Text>

                <Heading level={3} margin="none">8. Alterações nos Termos</Heading>
                <Text margin={{
                    vertical: 'small'
                }}>
                    A DiCoracao se reserva o direito de alterar ou modificar estes Termos de Uso a qualquer momento. Quando isso acontecer, a plataforma notificará o usuário por meio do site ou por email. O uso contínuo da plataforma após alterações nos Termos indicará que o usuário concorda com as novas condições.
                </Text>

                <Heading level={3} margin="none">10. Lei Aplicável</Heading>
                <Text margin={{
                    vertical: 'small'
                }}>
                    Estes Termos de Uso são regidos pelas leis do Brasil. Qualquer disputa relacionada ao uso da plataforma será resolvida nos tribunais competentes da cidade de Novo Hamburgo, RS.
                </Text>


                <Heading level={3} margin="none">11. Contato</Heading>
                <Text margin={{
                    vertical: 'small'
                }}>
                    Se você tiver alguma dúvida sobre estes Termos de Uso, entre em contato conosco pelo email: mlucas4330@gmail.com
                </Text>
            </VStack>
            <Box align="center">
                <Link href="/privacy-policy" label="Política de Privacidade" />
                <Text textAlign='center' size="small">Ao utilizar a DiCoracao, você confirma que leu e concorda com nossos Termos de Uso.</Text>
            </Box>
        </>
    )
}

export default TermsOfUse