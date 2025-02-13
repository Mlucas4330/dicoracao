import React, { memo } from 'react'
import { Presence, Text, Textarea } from '@chakra-ui/react'

function SlideText({ text, type, isVisible, handleChange }) {
    const handleText = e => {
        const text = e.target.value

        handleChange(type, 'text', text)
    }

    return (
        <>
            <Presence animationName={{ _open: "slide-from-bottom-full", _closed: "slide-to-bottom-full" }} zIndex={2} animationDuration="slowest" lazyMount present={isVisible}>
                {
                    type === 'last' ?
                        
                        :
                        <Text color={'white'} textAlign={'center'} fontSize={'xl'} fontWeight={'semibold'}>{text}</Text>
                }
            </Presence>
        </>
    )
}

export default memo(SlideText)