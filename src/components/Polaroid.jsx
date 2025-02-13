import { Box, Image, Textarea, VisuallyHidden } from '@chakra-ui/react'
import React, { memo, useRef } from 'react'

function Polaroid({ type, image, imageText, handleChange, rotate }) {
    const inputRef = useRef(null)

    const handleImage = e => {
        const file = e.target.files[0]

        if (file) {
            handleChange(type, 'image', URL.createObjectURL(file))
        }
    }

    const handleImageText = e => {
        const text = e.target.value

        handleChange(type, 'imageText', text)
    }

    return (
        <Box rotate={rotate} bg={'white'} p={4} borderRadius={'sm'} shadow={'lg'} minH={64} w={64}>
            <Box>
                <VisuallyHidden>
                    <input ref={inputRef} type="file" accept="image/*" onChange={handleImage} />
                </VisuallyHidden>
                <Image _hover={{ cursor: 'pointer' }} h={'full'} w={'full'} onClick={() => inputRef.current.click()} aspectRatio={4 / 3} src={image} borderRadius={'xs'} alt="Foto do casal" />
            </Box>
            <Textarea autoresize textAlign={'center'} fontFamily={'cursive'} p={0} mt={4} maxLength={50} whiteSpace={'normal'} wordBreak={'break-word'} border={'none'} value={imageText} onChange={handleImageText} />
        </Box>
    )
}

export default memo(Polaroid)