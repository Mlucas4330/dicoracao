import React, { memo } from 'react'
import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'

function SlideEmoji() {
    const MotionBox = motion.create(Box)

    return (
        <>
            {
                Array.from({ length: 15 }).map((_, i) => (
                    <MotionBox
                        key={i}
                        position="absolute"
                        top="0"
                        left={`${Math.floor(Math.random() * 90)}%`}
                        fontSize={Math.floor(Math.random() * (50 - 10) + 10)}
                        initial={{ y: '-50%', opacity: 0 }}
                        animate={{ y: `${100 * 7}% `, opacity: [0, 1, 1, 0], }}
                        transition={{
                            duration: 4 + Math.random() * 4,
                            delay: Math.random() * 4,
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: 'easeOut'
                        }}
                    >
                        ❤️
                    </MotionBox>
                ))
            }
        </>
    )
}

export default memo(SlideEmoji)