import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import VideoPlayer from './VideoPlayer'
import { format } from 'date-fns'
import { Flex, Heading, Presence, Text, IconButton, Box, Fieldset, Input, Image, Group, Icon, Textarea } from '@chakra-ui/react'
import SlideEmoji from './SlideEmoji'
import { StepsContent, StepsNextTrigger, StepsPrevTrigger, StepsRoot, } from '@/components/ui/steps'
import { slides } from '../constants'
import { FileInput, FileUploadRoot } from '@/components/ui/file-upload'
import { CalendarHeart, Camera, ChevronLeft, ChevronRight, Mic, Music, NotebookPen, Puzzle, Volume2, VolumeOff } from 'lucide-react'
import SlideTitle from './SlideTitle'
import { JigsawPuzzle } from 'react-jigsaw-puzzle/lib';
import 'react-jigsaw-puzzle/lib/jigsaw-puzzle.css';
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

function Preview() {
    const MotionBox = motion.create(Box)
    const navigate = useNavigate()
    const [startDate, setStartDate] = useState('')
    const [step, setStep] = useState(0)
    const [volume, setVolume] = useState()
    const [transcript, setTranscript] = useState([])
    const recognition = window.SpeechRecognition || window.webkitSpeechRecognition ? new (window.SpeechRecognition || window.webkitSpeechRecognition)() : null
    const [isListening, setIsListening] = useState(false)
    const [puzzleImage, setPuzzleImage] = useState('')
    const [song, setSong] = useState()
    const [solved, setSolved] = useState(false)
    const [promessed, setPromessed] = useState(false)
    const [finalMessage, setFinalMessage] = useState('')
    const [videoId, setVideoId] = useState()
    const [image, setImage] = useState({ seconds: '/image.png', minutes: '/image.png', hours: '/image.png', days: '/image.png', weeks: '/image.png', months: '/image.png', years: '/image.png' })
    const [imageText, setImageText] = useState({
        seconds: 'Deixe sua mensagem aqui', minutes: 'Deixe sua mensagem aqui', hours: 'Deixe sua mensagem aqui', days: 'Deixe sua mensagem', weeks: 'Deixe sua mensagem aqui', months: 'Deixe sua mensagem aqui', years: 'Deixe sua mensagem aqui'
    })

    const handleCreate = async () => {
        try {
            const form = new FormData()

            for (const key in image) { form.append(`image[${key}]`, image[key]) }
            for (const key in imageText) { form.append(`imageText[${key}]`, imageText[key]) }
            form.append('videoId', videoId)
            form.append('startDate', startDate)
            form.append('finalMessage', finalMessage)
            form.append('puzzleImage', puzzleImage)

            const response = await fetch('/api/surprises', {
                method: 'POST',
                body: form,
            })

            const surpriseId = await response.json()

            navigate(`/surprises/${surpriseId}`)
        } catch (error) {
            console.error(error)
        }
    }

    const handleSong = () => {
        const regex = /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=|(?:youtu\.be\/)))([a-zA-Z0-9_-]{11})/i

        const matched = song.match(regex)

        if (!matched) return

        setVideoId(matched[1])
    }

    const toggleListening = () => {
        if (isListening) {
            recognition.stop()
        } else {
            recognition.start()
        }
        setIsListening(!isListening)
    }

    useEffect(() => {
        if (!recognition) return

        recognition.continuous = true
        recognition.interimResults = true
        recognition.lang = 'pt-BR'

        recognition.onresult = (event) => {
            let transcript = Array.from(event.results).map((result) => result[0].transcript).join('').toLowerCase()

            setTranscript(transcript)

            if (transcript.includes('eu prometo')) {
                setIsListening(false)
                setPromessed(true)
                recognition.stop()
            }
        }

        if (isListening) {
            setTranscript('')
            recognition.start()
        } else {
            recognition.stop()
        }

        return () => recognition.stop()
    }, [isListening])

    useEffect(() => {
        if (!song) return
        handleSong()
    }, [song])

    return (
        <>
            <Box id='create' shadow={'lg'} my={16} p={8} rounded={'md'}>
                <Flex gap={6} wrap={'wrap'}>
                    <Box h={'vh'} flex={2}>
                        <Fieldset.Root>
                            <Fieldset.Content>
                                <Field label={<Flex gap={2}> <Icon color={'pink.400'}><CalendarHeart /></Icon> Início do Relacionamento</Flex>}>
                                    <Input max={format(new Date(), 'yyyy-MM-dd')} type='date' value={startDate} onChange={e => setStartDate(e.target.value)} />
                                </Field>

                                <Field label={<Flex gap={2}> <Icon color={'pink.400'}><Music /></Icon> Música - Youtube</Flex>}>
                                    <Input value={song} onChange={e => setSong(e.target.value)} placeholder='https://www.youtube.com/watch?v=igIfiqqVHtA' />
                                </Field>

                                <Flex gap={2} overflow={'auto'} h={80} direction={'column'}>
                                    {slides.map(slide => (
                                        <Box key={'form' + slide.id}>
                                            {
                                                <Group w={'full'}>
                                                    <Field label={<Flex gap={2}><Icon color={'pink.400'}><Camera /></Icon> Foto para a polaroid</Flex>}>
                                                        <FileUploadRoot flex={1} value={image[slide.type]} onFileChange={({ acceptedFiles }) => setImage(prev => ({
                                                            ...prev, [slide.type]: URL.createObjectURL(acceptedFiles[0])
                                                        }))}>
                                                            <FileInput placeholder={'Foto de vocês'} />
                                                        </FileUploadRoot>
                                                    </Field>
                                                    <Field label={<Flex gap={2}><Icon color={'pink.400'}><NotebookPen /></Icon> Texto para a polaroid</Flex>}>
                                                        <Input value={imageText[slide.type]} minLength={3} maxLength={35} onChange={e => setImageText(prev => ({ ...prev, [slide.type]: e.target.value }))} />
                                                    </Field>
                                                </Group>
                                            }
                                        </Box>
                                    ))}
                                </Flex>
                                <Field label={<Flex gap={2}><Icon color={'pink.400'}><Puzzle /></Icon> Foto para o quebra cabeça</Flex>}>
                                    <FileUploadRoot value={puzzleImage} onFileChange={({ acceptedFiles }) => setPuzzleImage(URL.createObjectURL(acceptedFiles[0]))}><FileInput placeholder={'Foto de vocês '} />
                                    </FileUploadRoot>
                                </Field>
                                <Field label={<Flex gap={2}><Icon color={'pink.400'}><NotebookPen /></Icon> Preencha sua mensagem final </Flex>}>
                                    <Textarea autoresize value={finalMessage} onChange={e => setFinalMessage(e.target.value)} minLength={3} maxLength={600} placeholder={'Se declare aqui ❤️'} />
                                </Field>
                            </Fieldset.Content>
                        </Fieldset.Root>
                    </Box>
                    <Box flex={1}>
                        <Heading mb={3} textAlign={'center'}>Como vai ficar 👇</Heading>

                        <StepsRoot h={'vh'} rounded={'md'} overflow={'hidden'} pos={'relative'} step={step} onStepChange={({ step }) => setStep(step)} count={11}>
                            <IconButton zIndex={2} pos={'absolute'} top={4} onClick={() => setVolume(prev => !prev)} right={4} variant={'plain'}>
                                {volume ? <VolumeOff /> : <Volume2 />}
                            </IconButton>
                            <SlideEmoji />

                            <StepsContent display={'flex'} flexDirection={'column'} h={'full'} py={16} px={8} gap={6} textAlign={'center'} alignItems={'center'} justifyContent={'center'} background={`linear-gradient(135deg, pink 0%, salmon 100%)`} index={0}>
                                <Presence animationName={{ _open: 'slide-from-bottom-full', _closed: 'slide-to-bottom-full' }} zIndex={2} animationDuration='slowest' lazyMount present={step === 0}>
                                    <Heading color={'white'} size={'6xl'} fontWeight={'bold'}>Nossa história</Heading>
                                </Presence>
                                <Presence animationName={{ _open: 'slide-from-bottom-full', _closed: 'slide-to-bottom-full' }} zIndex={2} animationDuration='slowest' lazyMount present={step === 0}>
                                    <Text color={'white'} textAlign={'center'} fontSize={'xl'} fontWeight={'semibold'}>Vamos relembrar nossa história juntos?</Text>
                                </Presence>
                            </StepsContent>
                            {
                                slides.map(slide => (
                                    <StepsContent display={'flex'} flexDirection={'column'} h={'full'} py={16} px={8} textAlign={'center'} background={`linear-gradient(135deg, pink 0%, salmon 100%)`} gap={6} alignItems={'center'} justifyContent={'center'} key={slide.id} index={slide.id}>
                                        <SlideTitle startDate={startDate} type={slide.type} present={slide.id === step} />

                                        <Presence animationName={{ _open: 'slide-from-bottom-full', _closed: 'slide-to-bottom-full' }} zIndex={2} animationDuration='slowest' lazyMount present={step === slide.id}>
                                            <Text color={'white'} textAlign={'center'} fontSize={'xl'} fontWeight={'semibold'}>{slide.text}</Text>
                                        </Presence>
                                        {
                                            image[slide.type] &&
                                            <Presence mt={12} animationName={{ _open: `slide-from-left-full`, _closed: `slide-to-right-full`, }} zIndex={2} animationDuration='slowest' present={step === slide.id}>
                                                <Box rotate={slide.id % 2 ? 15 : -15} bg={'white'} p={4} rounded={'sm'} shadow={'lg'} minH={64} w={64}>
                                                    <Image h={'full'} w={'full'} aspectRatio={4 / 3} src={image[slide.type]} rounded={'xs'} alt='Foto do casal' />
                                                    <Text textAlign={'center'} fontFamily={'cursive'} mt={4} whiteSpace={'normal'} wordBreak={'break-word'}>{imageText[slide.type]}</Text>
                                                </Box>
                                            </Presence>
                                        }
                                    </StepsContent>
                                ))
                            }
                            <StepsContent h={'full'} py={16} px={8} textAlign={'center'} background={`linear-gradient(135deg, pink 0%, salmon 100%)`} index={8}>
                                <Presence animationName={{ _open: 'slide-from-bottom-full', _closed: 'slide-to-bottom-full' }} animationDuration='slowest' lazyMount present={step === 8}>
                                    <Heading color={'white'} size={'2xl'} fontWeight={'bold'}>Você era a peça que faltava na minha vida...</Heading>
                                </Presence>
                                <Presence mt={4} animationName={{ _open: 'slide-from-bottom-full', _closed: 'slide-to-bottom-full' }} animationDuration='slowest' lazyMount present={step === 8}>
                                    <JigsawPuzzle imageSrc={puzzleImage} rows={3} columns={3} onSolved={() => setSolved(true)} />
                                </Presence>
                                <Presence mt={4} animationName={{ _open: 'slide-from-bottom-full', _closed: 'slide-to-bottom-full' }} animationDuration='slowest' lazyMount present={step === 8 && solved}>
                                    <Heading color={'white'} size={'2xl'} fontWeight={'bold'}>Parabéns!</Heading>
                                </Presence>
                            </StepsContent>
                            <StepsContent h={'full'} py={16} px={8} textAlign={'center'} background={`linear-gradient(135deg, pink 0%, salmon 100%)`} index={9}>
                                <Presence animationName={{ _open: 'slide-from-bottom-full', _closed: 'slide-to-bottom-full' }} animationDuration='slowest' lazyMount present={step === 9}>
                                    <Image src={'/image.png'} shadow={'md'} border={'thick solid white'} />
                                </Presence>
                                <Presence mt={6} animationName={{ _open: 'slide-from-bottom-full', _closed: 'slide-to-bottom-full' }} animationDuration='slowest' lazyMount present={step === 9}>
                                    <Text overflow={'auto'} scrollbar={'hidden'} maxH={'80'} color={'white'} textAlign={'center'} fontSize={'lg'} whiteSpace={'normal'} wordBreak={'break-word'} fontWeight={'semibold'}>{finalMessage}</Text>
                                </Presence>
                            </StepsContent>
                            <StepsContent display={'flex'} alignItems={'center'} flexDirection={'column'} justifyContent={'center'} h={'full'} py={16} px={8} textAlign={'center'} background={`linear-gradient(135deg, pink 0%, salmon 100%)`} index={10}>
                                <Presence animationName={{ _open: 'slide-from-bottom-full', _closed: 'slide-to-bottom-full' }} animationDuration='slowest' lazyMount present={step === 10}>
                                    <Heading color={'white'} size={'4xl'} fontWeight={'bold'}>Você promete que vamos passar o resto de nossas vidas juntos?</Heading>
                                </Presence>
                                <Presence mt={16} animationName={{ _open: 'slide-from-bottom-full', _closed: 'slide-to-bottom-full' }} animationDuration='slowest' lazyMount present={step === 10}>
                                    <Text color={'white'} fontWeight={'bold'}>Toque no microfone e repita: 'Eu prometo'</Text>
                                    <Flex _hover={{ cursor: 'pointer' }} justifySelf={'center'} mt={4} bg={'pink.500'} align={'center'} justify={'center'} rounded={'full'} color='white' position='relative' onClick={toggleListening} w={'24'} h={'24'}>
                                        {isListening ? (
                                            <MotionBox display={'flex'} gap={1}>
                                                {[8, 14, 20].map((height, i) => (
                                                    <MotionBox
                                                        key={i}
                                                        w={2}
                                                        bg={'white'}
                                                        rounded={'full'}
                                                        animate={{ height: [8, height, 8] }}
                                                        transition={{
                                                            duration: 0.8,
                                                            repeat: Infinity,
                                                            repeatType: 'mirror',
                                                            ease: 'easeInOut',
                                                            delay: i * 0.2
                                                        }}
                                                    />
                                                ))}
                                            </MotionBox>
                                        ) : (
                                            <Mic />
                                        )}
                                    </Flex>
                                </Presence>
                                <Presence mt={16} animationName={{ _open: 'slide-from-bottom-full', _closed: 'slide-to-bottom-full' }} animationDuration='slowest' lazyMount present={step === 10 && promessed}>
                                    <Heading color={'white'} size={'4xl'} fontWeight={'bold'}>Está prometido!</Heading>
                                </Presence>
                            </StepsContent>

                            <StepsContent h={'full'} py={16} px={8} textAlign={'center'} background={`linear-gradient(135deg, pink 0%, salmon 100%)`} index={11}>
                                <Presence animationName={{ _open: 'slide-from-bottom-full', _closed: 'slide-to-bottom-full' }} animationDuration='slowest' lazyMount present={step === 11}>
                                    <Image h={72} w={'full'} src={'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGE5dzhmOXBzM2dqZzkwOXl5bDF6ODBrZHo3enE5N213djgyamg4NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3lj7wxDu4hcDC/giphy.gif'} />
                                </Presence>
                                <Presence mt={8} animationName={{ _open: 'slide-from-bottom-full', _closed: 'slide-to-bottom-full' }} animationDuration='slowest' lazyMount present={step === 11}>
                                    <Text color={'white'} textAlign={'center'} fontSize={'xl'} fontWeight={'semibold'}>
                                        Este presente é apenas um pequeno reflexo de tudo o que você significa para mim. Cada dia ao seu lado é uma nova aventura, e eu mal posso esperar para continuar escrevendo nossa história juntos. Eu te amo mais do que palavras podem expressar. ❤️ Espero que tenha gostado!
                                    </Text>
                                </Presence>
                            </StepsContent>

                            <Flex px={4} w={'full'} bottom={4} justify={'space-between'} pos={'absolute'}>
                                <StepsPrevTrigger asChild>
                                    <IconButton>
                                        <ChevronLeft />
                                    </IconButton>
                                </StepsPrevTrigger>
                                <StepsNextTrigger asChild>
                                    <IconButton>
                                        <ChevronRight />
                                    </IconButton>
                                </StepsNextTrigger>
                            </Flex>
                        </StepsRoot>
                    </Box>
                </Flex >
                <Button onClick={handleCreate} w={'full'} py={8} size={'lg'} mt={4}>Criar minha surpresa</Button>
            </Box >
            <VideoPlayer videoId={videoId} volume={volume} />
        </>
    )
}

export default Preview