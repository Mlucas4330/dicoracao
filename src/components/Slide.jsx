import { Flex, Presence } from '@chakra-ui/react'
import React, { memo } from 'react'
import SlideEmoji from './SlideEmoji'
import Polaroid from './Polaroid'
import Volume from './Volume'
import SlideTitle from './SlideTitle'
import SlideText from './SlideText'
import { useSong } from '@/providers/SongProvider'

function Slide({ slide, isVisible }) {
    const { videoId } = useSong()

    return (
        <>
            <Flex h={'dvh'} borderRadius={'md'} pos={'relative'} pt={16} pb={24} px={8} textAlign={'center'} background={slide.background} gap={6} align={'center'} justify={'center'} direction={'column'}>
                {videoId && <Volume />}
                <SlideTitle type={slide.type} isVisible={isVisible} />
                <SlideText text={slide.text} type={slide.type} isVisible={isVisible} />
                {
                    slide.image &&
                    <Presence mt={12} animationName={{ _open: `slide-from-left-full`, _closed: `slide-to-right-full`, }} zIndex={2} animationDuration="slowest" present={isVisible}>
                        <Polaroid image={slide.image} imageText={slide.imageText} type={slide.type} rotate={slide.id % 2 ? 15 : -15} />
                    </Presence>
                }
                <SlideEmoji emoji={slide.emoji} />
            </Flex>
        </>
    )
}

export default memo(Slide)