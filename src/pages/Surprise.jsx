import { Flex } from '@chakra-ui/react'
import React from 'react'
import Swiper from 'swiper'
import { EffectFade } from 'swiper/modules'
import { SwiperSlide } from 'swiper/react'
import { slides } from '../constants'

function Surprise() {
    return (
        <Swiper  effect={'fade'} modules={[EffectFade]}>
            {
                slides.filter(slide => title[slide.type]).map((slide, index) => (
                    <SwiperSlide key={slide.id}>
                        <Flex h={'vh'} pos={'relative'} pt={16} pb={24} px={8} textAlign={'center'} background={`linear-gradient(135deg, ${cor1[slide.type]} 0%, ${cor2[slide.type]} 100%)`} gap={6} align={'center'} justify={'center'} direction={'column'}>
                            <IconButton zIndex={2} pos={'absolute'} top={4} onClick={() => setVolume(prev => !prev)} right={4} variant={'plain'}>
                                {volume ? <VolumeOff /> : <Volume2 />}
                            </IconButton>

                            <Presence animationName={{ _open: "slide-from-bottom-full", _closed: "slide-to-bottom-full" }} zIndex={2} animationDuration="slowest" lazyMount present={activeSlide === index}>
                                <Heading color={'white'} size={'6xl'} fontWeight={'bold'}>
                                    {handleTitle(slide.type)}
                                </Heading>
                            </Presence>

                            <Presence animationName={{ _open: "slide-from-bottom-full", _closed: "slide-to-bottom-full" }} zIndex={2} animationDuration="slowest" lazyMount present={activeSlide === index}>
                                <Text color={'white'} textAlign={'center'} fontSize={'xl'} fontWeight={'semibold'}>{text[slide.type]}</Text>
                            </Presence>
                            {
                                image[slide.type] &&
                                <Presence mt={12} animationName={{ _open: `slide-from-left-full`, _closed: `slide-to-right-full`, }} zIndex={2} animationDuration="slowest" present={activeSlide === index}>
                                    <Box rotate={slide.id % 2 ? 15 : -15} bg={'white'} p={4} rounded={'sm'} shadow={'lg'} minH={64} w={64}>
                                        <Image h={'full'} w={'full'} aspectRatio={4 / 3} src={image[slide.type]} rounded={'xs'} alt="Foto do casal" />
                                        <Text textAlign={'center'} fontFamily={'cursive'} mt={4} whiteSpace={'normal'} wordBreak={'break-word'}>{imageText[slide.type]}</Text>
                                    </Box>
                                </Presence>
                            }
                            <SlideEmoji emoji={emoji[slide.type]} />
                        </Flex>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    )
}

export default Surprise