import React from 'react'
import { IconButton } from '@chakra-ui/react'
import { BiVolumeFull, BiVolumeMute } from 'react-icons/bi'
import { useSong } from '@/providers/SongProvider'

function Volume() {
    const { volume, setVolume } = useSong()

    return (
        <>
            <IconButton zIndex={2} pos={'absolute'} top={4} onClick={() => setVolume(prev => !prev)} right={4} variant={'plain'}>
                {volume ? <BiVolumeMute /> : <BiVolumeFull />}
            </IconButton>
        </>
    )
}

export default Volume