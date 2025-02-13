import { Heading, Presence } from '@chakra-ui/react'
import React, { memo } from 'react'
import { useStartDate } from '@/providers/StartDateProvider'

function SlideTitle({ type, isVisible }) {
    const { coupleDate } = useStartDate()

    return (
        <>
            <Presence animationName={{ _open: "slide-from-bottom-full", _closed: "slide-to-bottom-full" }} zIndex={2} animationDuration="slowest" lazyMount present={isVisible}>
                <Heading color={'white'} size={'6xl'} fontWeight={'bold'}>{coupleDate[type]}</Heading>
            </Presence>
        </>
    )
}

export default memo(SlideTitle)