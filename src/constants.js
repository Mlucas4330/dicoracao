import { label } from "framer-motion/client"

export const steps = [
    {
        step: 1,
        title: 'Crie uma Experiência Única',
        description: 'Compartilhe a data que marca o início da sua jornada juntos e escolha uma música do YouTube que represente esse momento especial. Com essas informações, vamos criar algo único, refletindo a história de vocês de maneira personalizada.'
    },
    {
        step: 2,
        title: 'Finalize o Seu Pedido',
        description: 'Conclua a criação da sua experiência personalizada com um pagamento rápido e seguro, garantindo que esse presente chegue de forma exclusiva e única.'
    },
    {
        step: 3,
        title: 'Acesso Imediato e QR Code',
        description: 'Após a confirmação do pagamento, você receberá um QR code no seu e-mail. Ao escanear o código, terá acesso imediato à sua experiência, personalizada e disponível online.'
    }
]

export const plans = [
    {
        title: '19.90',
        description: 'Básico',
        value: 'basic',
        benefits: [
            {
                has: true,
                label: 'Personalização Completa',
            },
            {
                has: false,
                label: 'Música Personalizada'
            },
            {
                has: false,
                label: '1 Ano de Acesso'
            }
        ]
    },
    {
        title: '29.90',
        description: 'Avançado',
        value: 'advanced',
        benefits: [
            {
                has: true,
                label: 'Personalização Completa',
            },
            {
                has: true,
                label: 'Música Personalizada'
            },
            {
                has: true,
                label: 'Pra Sempre'
            }
        ]
    },
]

export const questions = [
    { value: "a", title: "Quais são as formas de pagamento? Tem como parcelar?", text: "No momento, aceitamos pagamentos por Pix, boleto e cartão de crédito até 2x" },
    { value: "b", title: "Quanto tempo demora para receber o QR Code no e-mail?", text: "Após a confirmação do pagamento você receberá o QR Code na hora." },
    { value: "c", title: "O presente personalizado tem validade?", text: "Não, seu presente personalizado estará disponível para você pelo resto da vida." },
    { value: "d", title: "Posso editar meu presente depois de criá-lo?", text: "Não, após a finalização do processo de criação, o presente é gerado e não pode ser alterado. Mas você pode revisar todas as escolhas antes de confirmar o pagamento." },
    { value: "f", title: "Quanto tempo demora para receber o QR Code pagando por boleto bancário?", text: "O pagamento via boleto bancário pode levar de 1 a 3 dias úteis para ser processado. Após a confirmação, você receberá o QR Code imediatamente." },
    { value: "e", title: "Como posso entrar em contato com o suporte ao cliente?", text: "Você pode entrar em contato com nosso suporte ao cliente através do e-mail mlucas4330@gmail.com." }
]

export const slides = [
    { id: 1, type: 'first' },
    { id: 2, type: 'seconds' },
    { id: 3, type: 'minutes' },
    { id: 4, type: 'hours' },
    { id: 5, type: 'days' },
    { id: 6, type: 'weeks' },
    { id: 7, type: 'months' },
    { id: 8, type: 'years' },
    { id: 9, type: 'last' }
]

export const dateLastUpdate = '06/12/2024'
