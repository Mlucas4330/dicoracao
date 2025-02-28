import { Box, Container, Heading, Link, Text, VStack } from '@chakra-ui/react'
import { dateLastUpdate } from '@/constants'
import { React } from 'react'

function PrivacyPolicy() {
    return (
        <>
            <Container maxW={'xl'} rounded={'lg'} shadow={'lg'} my={16}>
                <VStack py={16} textAlign={'center'}>
                    <Heading>Política de Privacidade - DiCoracao</Heading>

                    <Text my={4}>
                        Última atualização: {dateLastUpdate}
                    </Text>

                    <Heading>1. Introdução</Heading>
                    <Text>
                        A DiCoracao compromete-se a proteger a sua privacidade. Esta política descreve como coletamos, usamos, e protegemos as informações pessoais fornecidas por você ao utilizar nossos serviços.
                    </Text>

                    <Heading>2. Coleta de Dados</Heading>
                    <Text>
                        Coletamos dados pessoais, como nome, e-mail e informações de pagamento, para proporcionar uma experiência personalizada ao usuário. Esses dados são utilizados apenas para a criação de contas, processamento de pagamentos e geração de vídeos.
                    </Text>

                    <Heading>3. Uso dos Dados</Heading>
                    <Text>
                        As informações coletadas são usadas para criar e gerenciar a conta do usuário, processar transações de pagamento, e gerar vídeos solicitados. Não compartilhamos seus dados com terceiros, exceto quando necessário para o processamento de pagamentos ou conforme exigido por lei.
                    </Text>

                    <Heading>4. Segurança</Heading>
                    <Text>
                        Tomamos medidas razoáveis para proteger seus dados pessoais, utilizando criptografia e outras tecnologias de segurança durante o processo de pagamento e no armazenamento de informações sensíveis.
                    </Text>

                    <Heading>5. Direitos Autorais</Heading>
                    <Text>
                        Os vídeos gerados através do DiCoracao são de sua propriedade, mas você é responsável por garantir que o conteúdo não infrinja direitos autorais de terceiros. A DiCoracao não se responsabiliza por quaisquer violações de direitos autorais.
                    </Text>

                    <Heading>6. Alterações nesta Política</Heading>
                    <Text>
                        A DiCoracao pode alterar esta política de privacidade de tempos em tempos. Quaisquer mudanças serão publicadas nesta página com a data de atualização.
                    </Text>

                    <Heading>7. Dados de Pagamento</Heading>
                    <Text>
                        Para realizar transações financeiras, coletamos informações de pagamento como números de cartão de crédito, detalhes de contas bancárias, e outros métodos de pagamento. Esses dados são criptografados e processados por nossos parceiros de pagamento, que seguem padrões de segurança rigorosos. A DiCoracao não armazena os dados sensíveis de pagamento diretamente em seus servidores. Usamos provedores de pagamento de confiança para garantir que suas informações estejam protegidas.
                    </Text>

                    <Heading>8. Contato</Heading>
                    <Text>
                        Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco pelo email: mlucas4330@gmail.com
                    </Text>
                </VStack>
            </Container>
        </>
    )
}

export default PrivacyPolicy