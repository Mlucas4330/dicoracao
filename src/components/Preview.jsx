import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import VideoPlayer from './VideoPlayer'
import { format } from 'date-fns'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import { Flex, Heading, Presence, Text, Badge, Float, FormatNumber, List, IconButton, Box, Fieldset, Input, Image, Group, parseColor } from '@chakra-ui/react'
import SlideEmoji from './SlideEmoji'
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInMonths, differenceInSeconds, differenceInWeeks, differenceInYears } from 'date-fns'
import { BiVolumeFull, BiVolumeMute } from 'react-icons/bi'
import { StepsContent, StepsItem, StepsList, StepsNextTrigger, StepsPrevTrigger, StepsRoot, } from "@/components/ui/steps"
import { RadioCardItem, RadioCardLabel, RadioCardRoot } from "@/components/ui/radio-card"
import { plans } from '@/constants'
import { LuCircleCheck, LuCircleX } from 'react-icons/lu'
import { FaStar } from 'react-icons/fa'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import EmojiPicker from 'emoji-picker-react'
import { slides } from '../constants'
import { ColorPickerControl, ColorPickerEyeDropper, ColorPickerInput, ColorPickerLabel, ColorPickerRoot, ColorPickerValueSwatch } from "@/components/ui/color-picker"
import { InputGroup } from "@/components/ui/input-group"

function Preview() {
    const [startDate, setStartDate] = useState('')
    const [activeSlide, setActiveSlide] = useState(0)
    const [volume, setVolume] = useState()
    const [plan, setPlan] = useState('advanced')
    const [openIndex, setOpenIndex] = useState(null)
    const [song, setSong] = useState()
    const [videoId, setVideoId] = useState()
    const [emoji, setEmoji] = useState({
        first: '✨',
        seconds: '❤️',
        minutes: '🤍',
        hours: '💌',
        days: '❤️‍🔥',
        weeks: '❤️',
        months: '🤍',
        years: '💛',
        last: '🌺'
    })
    const [text, setText] = useState({
        first: 'Vamos relembrar nossa história juntos?',
        seconds: 'Cada segundo ao seu lado é precioso...',
        minutes: 'Minutos que se transformaram em memórias inesquecíveis...',
        hours: 'Horas de conversas, sorrisos e momentos especiais...',
        days: 'Dias que parecem ter passado em um piscar de olhos...',
        weeks: 'Semanas repletas de amor e cumplicidade...',
        months: 'Meses que passaram voando, mas nos pousaram em um amor sólido...',
        years: 'Anos que passaram, amadurecendo nosso amor, nos tornando mais fortes...',
        last: 'Mensagem para o seu amor'
    })
    const [cor1, setCor1] = useState({
        first: '#1a1a3a',
        seconds: ' #ff6b6b',
        minutes: ' #ff9a9e',
        hours: ' #2c3e50',
        days: ' #f78ca0',
        weeks: ' #051937',
        months: ' #ff758c',
        years: '#ffbc75',
        last: '#7e0678'
    })
    const [cor2, setCor2] = useState({
        first: '#4a1942',
        seconds: '#cc2d4a',
        minutes: '#fad0c4',
        hours: '#3498db',
        days: '#fd868c',
        weeks: '#004d7a',
        months: '#ff7eb3',
        years: '#fdff7e4',
        last: '#ee80c4'
    })
    const [title, setTitle] = useState({
        first: 'Nossa História',
        seconds: '',
        minutes: '',
        hours: '',
        days: '',
        weeks: '',
        months: '',
        years: '',
        last: 'É apenas o começo!'
    })
    const [image, setImage] = useState({
        first: '/image.png',
        seconds: '/image.png',
        minutes: '/image.png',
        hours: '/image.png',
        days: '/image.png',
        weeks: '/image.png',
        months: '/image.png',
        years: '/image.png',
    })
    const [imageText, setImageText] = useState({
        first: 'Deixe sua mensagem aqui ❤️',
        seconds: 'Deixe sua mensagem aqui ❤️',
        minutes: 'Deixe sua mensagem aqui ❤️',
        hours: 'Deixe sua mensagem aqui ❤️',
        days: 'Deixe sua mensagem aqui ❤️',
        weeks: 'Deixe sua mensagem aqui ❤️',
        months: 'Deixe sua mensagem aqui ❤️',
        years: 'Deixe sua mensagem aqui ❤️',
    })

    const handleSlideChange = (swiper) => {
        setActiveSlide(swiper.activeIndex)
    }

    // `${coupleDate.seconds.toLocaleString()} ${coupleDate.seconds > 1 ? 'Segundos' : 'Segundo'}`

    const handleSong = () => {
        const regex = /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=|(?:youtu\.be\/)))([a-zA-Z0-9_-]{11})/i

        const matched = song.match(regex)

        if (!matched) return

        setVideoId(matched[1])
    }

    useEffect(() => {
        if (!song) return
        handleSong()
    }, [song])

    const handleTimeTogether = () => {
        const start = new Date(startDate)
        const today = new Date()

        setTitle(prev => ({
            ...prev,
            seconds: differenceInSeconds(today, start),
            minutes: differenceInMinutes(today, start),
            hours: differenceInHours(today, start),
            days: differenceInDays(today, start),
            weeks: differenceInWeeks(today, start),
            months: differenceInMonths(today, start),
            years: differenceInYears(today, start)
        }))
    }

    useEffect(() => {
        if (!startDate) return
        handleTimeTogether()
        const interval = setInterval(() => { handleTimeTogether() }, 1000)
        return () => clearInterval(interval)
    }, [startDate])

    const handleDragEnd = async (result) => {
        if (!result.destination) {
            return
        }
    }

    return (
        <>
            <Box id='create' shadow={'lg'} my={16} p={8} borderRadius={'md'}>
                <Flex gap={6}>
                    <StepsRoot h={'vh'} flex={2} count={2}>
                        <StepsList>
                            <StepsItem index={0} title="Preencher Informações" />
                            <StepsItem index={1} title="Customizar" />
                        </StepsList>

                        <Box overflow={'auto'} pr={1}>
                            <StepsContent index={0}>
                                <Fieldset.Root>
                                    <Fieldset.Content>
                                        <RadioCardRoot value={plan} onValueChange={({ value }) => setPlan(value)} size={'lg'}>
                                            <RadioCardLabel>Selecione um Plano</RadioCardLabel>
                                            <Flex gap={4} direction={{ base: 'column', lg: 'row' }}>
                                                {plans.map(item => (
                                                    <Box key={item.value} flex={1} position={'relative'}>
                                                        {
                                                            item.value === 'advanced' &&
                                                            <Float zIndex={2} placement={'top-center'}>
                                                                <Badge>
                                                                    Mais Escolhido <FaStar />
                                                                </Badge>
                                                            </Float>
                                                        }
                                                        <RadioCardItem
                                                            label={<FormatNumber value={item.title} style="currency" currency="BRL" />}
                                                            description={item.description}
                                                            indicator={null}
                                                            addon={
                                                                <List.Root variant={'plain'} gap={2}>
                                                                    {
                                                                        item.benefits.map((benefit, index) => (
                                                                            <List.Item key={index}>
                                                                                <List.Indicator asChild color={benefit.has ? 'green.500' : 'red.500'}>
                                                                                    {benefit.has ? <LuCircleCheck /> : <LuCircleX />}
                                                                                </List.Indicator>
                                                                                {benefit.label}
                                                                            </List.Item>
                                                                        ))
                                                                    }
                                                                </List.Root>
                                                            }
                                                            key={item.value}
                                                            value={item.value}
                                                        />
                                                    </Box>
                                                ))}
                                            </Flex>
                                        </RadioCardRoot>

                                        <Field label={'Início do Relacionamento'}>
                                            <Input max={format(new Date(), "yyyy-MM-dd")} type='date' value={startDate} onChange={e => setStartDate(e.target.value)} />
                                        </Field>

                                        {
                                            plan === 'advanced' && <Field label={"Música - Youtube"}>
                                                <Input value={song} onChange={e => setSong(e.target.value)} placeholder='https://www.youtube.com/watch?v=igIfiqqVHtA' />
                                            </Field>
                                        }
                                    </Fieldset.Content>
                                </Fieldset.Root>
                            </StepsContent>
                            <StepsContent index={1}>
                                <DragDropContext onDragEnd={handleDragEnd}>
                                    <Droppable droppableId="slides" type="list" direction="vertical">
                                        {(provided) => (
                                            <Box ref={provided.innerRef} {...provided.droppableProps}>
                                                {slides.filter(slide => title[slide.type]).map((slide, index) => (
                                                    <Draggable key={slide.id} draggableId={slide.id.toString()} index={index}>
                                                        {(provided) => (
                                                            <Box ref={provided.innerRef} {...provided.draggableProps}{...provided.dragHandleProps}>
                                                                <Heading>Arrastar</Heading>
                                                                <Fieldset.Root>
                                                                    <Fieldset.Content>
                                                                        {
                                                                            ['first', 'last'].includes(slide.type) &&
                                                                            <Field label={'Título'}>
                                                                                <Input value={title[slide.type]} maxLength={20} onChange={e => setTitle(prev => ({
                                                                                    ...prev,
                                                                                    [slide.type]: e.target.value
                                                                                }))} />
                                                                            </Field>
                                                                        }
                                                                        <Input value={text[slide.type]} maxLength={50} onChange={e => setText(prev => ({
                                                                            ...prev,
                                                                            [slide.type]: e.target.value
                                                                        }))} />
                                                                        <Group>
                                                                            <Button onClick={() => setOpenIndex((prevIndex) => (prevIndex === index ? null : index))}>{emoji[slide.type]}</Button>
                                                                            <EmojiPicker onEmojiClick={({ emoji }) => {
                                                                                setEmoji(prev => ({
                                                                                    ...prev,
                                                                                    [slide.type]: emoji
                                                                                }))
                                                                                setOpenIndex(null)
                                                                            }} emojiStyle={'native'} open={openIndex === index} />

                                                                            <ColorPickerRoot format={'hex'} value={cor1[slide.type]} onValueChange={({ value }) => setCor1(prev => ({
                                                                                ...prev,
                                                                                [slide.type]: value
                                                                            }))}>
                                                                                <ColorPickerControl>
                                                                                    <InputGroup
                                                                                        startOffset="0px"
                                                                                        startElement={<ColorPickerValueSwatch boxSize="4.5" />}
                                                                                        endElementProps={{ px: "1" }}
                                                                                        endElement={<ColorPickerEyeDropper variant="ghost" />}
                                                                                    >
                                                                                        <ColorPickerInput />
                                                                                    </InputGroup>
                                                                                </ColorPickerControl>
                                                                            </ColorPickerRoot>

                                                                            <ColorPickerRoot format={'hex'} value={cor2[slide.type]} onValueChange={({ value }) => setCor2(prev => ({
                                                                                ...prev,
                                                                                [slide.type]: value
                                                                            }))}>
                                                                                <ColorPickerControl>
                                                                                    <InputGroup
                                                                                        startOffset="0px"
                                                                                        startElement={<ColorPickerValueSwatch boxSize="4.5" />}
                                                                                        endElementProps={{ px: "1" }}
                                                                                        endElement={<ColorPickerEyeDropper variant="ghost" />}
                                                                                    >
                                                                                        <ColorPickerInput />
                                                                                    </InputGroup>
                                                                                </ColorPickerControl>
                                                                            </ColorPickerRoot>
                                                                        </Group>
                                                                    </Fieldset.Content>
                                                                </Fieldset.Root>
                                                            </Box>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </Box>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                            </StepsContent>
                        </Box>

                        <Group>
                            <StepsPrevTrigger asChild>
                                <Button variant="outline" size="sm">
                                    Voltar
                                </Button>
                            </StepsPrevTrigger>
                            <StepsNextTrigger asChild>
                                <Button variant="outline" size="sm">
                                    Próximo
                                </Button>
                            </StepsNextTrigger>
                        </Group>
                    </StepsRoot>
                    <Box flex={1} overflow={'auto'}>
                        <Heading mb={3} textAlign={'center'}>Como vai ficar 👇</Heading>
                        <Swiper pagination={{ clickable: true }} onSlideChange={handleSlideChange} effect={'fade'} modules={[Pagination, EffectFade]}>
                            {
                                slides.filter(slide => title[slide.type]).map((slide, index) => (
                                    <SwiperSlide key={slide.id}>
                                        <Flex borderRadius={'md'} h={'vh'} pos={'relative'} pt={16} pb={24} px={8} textAlign={'center'} background={`linear-gradient(135deg, ${cor1[slide.type]} 0%, ${cor2[slide.type]} 100%)`} gap={6} align={'center'} justify={'center'} direction={'column'}>
                                            <IconButton zIndex={2} pos={'absolute'} top={4} onClick={() => setVolume(prev => !prev)} right={4} variant={'plain'}>
                                                {volume ? <BiVolumeMute /> : <BiVolumeFull />}
                                            </IconButton>

                                            <Presence animationName={{ _open: "slide-from-bottom-full", _closed: "slide-to-bottom-full" }} zIndex={2} animationDuration="slowest" lazyMount present={activeSlide === index}>
                                                <Heading color={'white'} size={'6xl'} fontWeight={'bold'}>{title[slide.type]}</Heading>
                                            </Presence>

                                            <Presence animationName={{ _open: "slide-from-bottom-full", _closed: "slide-to-bottom-full" }} zIndex={2} animationDuration="slowest" lazyMount present={activeSlide === index}>
                                                <Text color={'white'} textAlign={'center'} fontSize={'xl'} fontWeight={'semibold'}>{text[slide.type]}</Text>
                                            </Presence>

                                            {
                                                slide.image &&
                                                <Presence mt={12} animationName={{ _open: `slide-from-left-full`, _closed: `slide-to-right-full`, }} zIndex={2} animationDuration="slowest" present={activeSlide === index}>
                                                    <Box rotate={slide.id % 2 ? 15 : -15} bg={'white'} p={4} borderRadius={'sm'} shadow={'lg'} minH={64} w={64}>
                                                        <Box>
                                                            <Image h={'full'} w={'full'} aspectRatio={4 / 3} src={image[slide.type]} borderRadius={'xs'} alt="Foto do casal" />
                                                        </Box>
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
                    </Box>
                </Flex>
                <Button disabled w={'full'} py={8} size={'lg'} mt={4}>Criar minha surpresa</Button>
            </Box >
            <VideoPlayer videoId={videoId} volume={volume} />
        </>
    )
}

export default Preview