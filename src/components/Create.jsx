import React, { memo, useCallback, useMemo, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import Slide from './Slide'
import { useStartDate } from '@/providers/StartDateProvider'

function Create() {
    const [activeSlide, setActiveSlide] = useState(0)

    const handleSlideChange = (swiper) => {
        setActiveSlide(swiper.activeIndex)
    }

    const [slides, setSlides] = useState([
        {
            id: 1,
            background: 'linear-gradient(135deg, #1a1a3a 0%, #4a1942 100%)',
            text: 'Vamos relembrar nossa história juntos?',
            type: 'first',
            emoji: '❤️'
        },
        {
            id: 2,
            background: 'linear-gradient(135deg, #ff6b6b 0%, #cc2d4a 100%)',
            type: 'seconds',
            text: 'Cada segundo ao seu lado é precioso...',
            emoji: '❤️',
            image: '/image.png',
            imageText: 'Deixe sua mensagem aqui ❤️'
        },
        {
            id: 3,
            background: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)',
            type: 'minutes',
            text: 'Minutos que se transformaram em memórias inesquecíveis...',
            emoji: '❤️',
            image: '/image.png',
            imageText: 'Deixe sua mensagem aqui ❤️'
        },
        {
            id: 4,
            background: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
            text: 'Horas de conversas, sorrisos e momentos especiais...',
            type: 'hours',
            emoji: '❤️',
            image: '/image.png',
            imageText: 'Deixe sua mensagem aqui ❤️'
        },
        {
            id: 5,
            background: 'linear-gradient(135deg, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)',
            type: 'days',
            text: 'Dias que parecem ter passado em um piscar de olhos...',
            emoji: '❤️',
            image: '/image.png',
            imageText: 'Deixe sua mensagem aqui ❤️'
        },
        {
            id: 6,
            background: 'linear-gradient(135deg, #051937 0%, #004d7a 100%)',
            type: 'weeks',
            text: 'Semanas repletas de amor e cumplicidade...',
            emoji: '❤️',
            image: '/image.png',
            imageText: 'Deixe sua mensagem aqui ❤️'
        },
        {
            id: 7,
            background: 'linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)',
            type: 'months',
            text: 'Meses que passaram voando, mas nos pousaram em um amor sólido...',
            emoji: '❤️',
            image: '/image.png',
            imageText: 'Deixe sua mensagem aqui ❤️'

        },
        {
            id: 8,
            background: 'linear-gradient(135deg,rgb(255, 188, 117) 0%,rgb(253, 255, 126) 100%)',
            type: 'years',
            text: 'Anos que passaram, amadurecendo nosso amor, nos tornando mais fortes...',
            emoji: '❤️',
            image: '/image.png',
            imageText: 'Deixe sua mensagem aqui ❤️'
        },
        {
            id: 9,
            background: 'linear-gradient(135deg,rgb(126, 6, 120) 0%,rgb(225, 69, 165) 100%)',
            type: 'last',
            text: 'Mensagem para o seu amor',
            emoji: '❤️'
        }
    ])

    return (
        <>
            <Swiper pagination={{ clickable: true }} style={{ overflow: 'auto' }} onSlideChange={handleSlideChange} effect={'fade'} modules={[Pagination, EffectFade]}>
                {
                    slides.map((slide, index) => (
                        <SwiperSlide key={slide.id}>
                            <Slide slide={slide} isVisible={activeSlide === index} />
                        </SwiperSlide>
                    ))
                }
            </Swiper >
        </>
    )
}

export default memo(Create)