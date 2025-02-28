import React, { useEffect, useState } from 'react'
import { Flex, Heading, Presence, Text, IconButton, Box, Image } from '@chakra-ui/react'
import { StepsContent, StepsNextTrigger, StepsPrevTrigger, StepsRoot, } from '@/components/ui/steps'
import { slides } from '../constants'
import { ChevronLeft, ChevronRight, Mic, Volume2, VolumeOff } from 'lucide-react'
import { JigsawPuzzle } from 'react-jigsaw-puzzle/lib';
import 'react-jigsaw-puzzle/lib/jigsaw-puzzle.css';
import { useParams } from 'react-router-dom'
import SlideTitle from '@/components/SlideTitle'
import SlideEmoji from '@/components/SlideEmoji'

function Surprise() {
    const { id } = useParams()
    const recognition = window.SpeechRecognition || window.webkitSpeechRecognition ? new (window.SpeechRecognition || window.webkitSpeechRecognition)() : null

    const [surprise, setSurprise] = useState({})
    const [volume, setVolume] = useState(false)
    const [step, setStep] = useState(0)
    const [isListening, setIsListening] = useState(false)
    const [solved, setSolved] = useState(false)
    const [promessed, setPromessed] = useState(false)

    const getSurprise = async () => {
        const response = await fetch('http://localhost:3000/api/surprises/' + id)

        const surprise = await response.json()

        setSurprise(surprise)
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
        getSurprise()
    }, [])

    useEffect(() => {
        if (!recognition) return

        recognition.continuous = true
        recognition.interimResults = true
        recognition.lang = 'pt-BR'

        recognition.onresult = (event) => {
            let transcript = Array.from(event.results).map((result) => result[0].transcript).join('').toLowerCase()

            if (transcript.includes('eu prometo')) {
                setIsListening(false)
                setPromessed(true)
                recognition.stop()
            }
        }

        if (isListening) {
            recognition.start()
        } else {
            recognition.stop()
        }

        return () => recognition.stop()
    }, [isListening])

    return (
        <StepsRoot h={'vh'} pos={'relative'} step={step} onStepChange={({ step }) => setStep(step)} count={10}>
            <IconButton zIndex={2} pos={'absolute'} top={4} onClick={() => setVolume(prev => !prev)} right={4} variant={'plain'}>
                {volume ? <VolumeOff /> : <Volume2 />}
            </IconButton>
            <SlideEmoji />

            <StepsContent display={'flex'} flexDirection={'column'} h={'full'} py={16} px={12} gap={6} textAlign={'center'} alignItems={'center'} justifyContent={'center'} background={`linear-gradient(135deg, pink 0%, salmon 100%)`} index={0}>
                <Presence animationName={{ _open: 'slide-from-bottom-full', _closed: 'slide-to-bottom-full' }} zIndex={2} animationDuration='slowest' lazyMount present={step === 0}>
                    <Heading color={'white'} size={'6xl'} fontWeight={'bold'}>Nossa história</Heading>
                </Presence>
                <Presence animationName={{ _open: 'slide-from-bottom-full', _closed: 'slide-to-bottom-full' }} zIndex={2} animationDuration='slowest' lazyMount present={step === 0}>
                    <Text color={'white'} textAlign={'center'} fontSize={'xl'} fontWeight={'semibold'}>Vamos relembrar nossa história juntos?</Text>
                </Presence>
            </StepsContent>
            {
                slides.map(slide => (
                    <StepsContent display={'flex'} flexDirection={'column'} h={'full'} py={16} px={12} textAlign={'center'} background={`linear-gradient(135deg, pink 0%, salmon 100%)`} gap={6} alignItems={'center'} justifyContent={'center'} key={slide.id} index={slide.id}>
                        <SlideTitle startDate={surprise.startDate} type={slide.type} present={slide.id === step} />

                        <Presence animationName={{ _open: 'slide-from-bottom-full', _closed: 'slide-to-bottom-full' }} zIndex={2} animationDuration='slowest' lazyMount present={step === slide.id}>
                            <Text color={'white'} textAlign={'center'} fontSize={'xl'} fontWeight={'semibold'}>{slide.text}</Text>
                        </Presence>
                        {
                            surprise.image[slide.type] &&
                            <Presence mt={12} animationName={{ _open: `slide-from-left-full`, _closed: `slide-to-right-full`, }} zIndex={2} animationDuration='slowest' present={step === slide.id}>
                                <Box rotate={slide.id % 2 ? 15 : -15} bg={'white'} p={4} rounded={'sm'} shadow={'lg'} minH={64} w={64}>
                                    <Image h={'full'} w={'full'} aspectRatio={4 / 3} src={surprise.image[slide.type]} rounded={'xs'} alt='Foto do casal' />
                                    <Text textAlign={'center'} fontFamily={'cursive'} fontStyle={'italic'} mt={4} whiteSpace={'normal'} wordBreak={'break-word'}>{surprise.imageText[slide.type]}</Text>
                                </Box>
                            </Presence>
                        }
                    </StepsContent>
                ))
            }
            <StepsContent h={'full'} py={16} px={12} textAlign={'center'} background={`linear-gradient(135deg, pink 0%, salmon 100%)`} index={8}>
                <Presence animationName={{ _open: 'slide-from-bottom-full', _closed: 'slide-to-bottom-full' }} animationDuration='slowest' lazyMount present={step === 8}>
                    <Heading color={'white'} size={'2xl'} fontWeight={'bold'}>Você era a peça que faltava na minha vida...</Heading>
                </Presence>
                <Presence mt={4} animationName={{ _open: 'slide-from-bottom-full', _closed: 'slide-to-bottom-full' }} animationDuration='slowest' lazyMount present={step === 8}>
                    <JigsawPuzzle imageSrc={URL.createObjectURL(surprise.puzzleImage)} rows={3} columns={3} onSolved={() => setSolved(true)} />
                </Presence>
                <Presence mt={4} animationName={{ _open: 'slide-from-bottom-full', _closed: 'slide-to-bottom-full' }} animationDuration='slowest' lazyMount present={step === 8 && solved}>
                    <Heading color={'white'} size={'2xl'} fontWeight={'bold'}>Parabéns!</Heading>
                </Presence>
            </StepsContent>
            <StepsContent h={'full'} py={16} px={12} textAlign={'center'} background={`linear-gradient(135deg, pink 0%, salmon 100%)`} index={9}>
                <Presence animationName={{ _open: 'slide-from-bottom-full', _closed: 'slide-to-bottom-full' }} animationDuration='slowest' lazyMount present={step === 9}>
                    <Image maxH={64} maxW={64} justifySelf={'center'} rounded={'xs'} src={URL.createObjectURL(surprise.finalMessageImage)} shadow={'md'} border={'thick solid white'} />
                </Presence>
                <Presence mt={6} animationName={{ _open: 'slide-from-bottom-full', _closed: 'slide-to-bottom-full' }} animationDuration='slowest' lazyMount present={step === 9}>
                    <Text overflow={'auto'} scrollbar={'hidden'} maxH={'64'} color={'white'} textAlign={'center'} fontSize={'lg'} whiteSpace={'normal'} wordBreak={'break-word'} fontWeight={'semibold'}>{surprise.finalMessage}</Text>
                </Presence>
            </StepsContent>
            <StepsContent display={'flex'} alignItems={'center'} flexDirection={'column'} justifyContent={'center'} h={'full'} py={16} px={12} textAlign={'center'} background={`linear-gradient(135deg, pink 0%, salmon 100%)`} index={10}>
                <Presence animationName={{ _open: 'slide-from-bottom-full', _closed: 'slide-to-bottom-full' }} animationDuration='slowest' lazyMount present={step === 10}>
                    <Heading color={'white'} size={'4xl'} fontWeight={'bold'}>E por fim... Você promete que vamos passar o resto de nossas vidas juntos?</Heading>
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
    )
}

export default Surprise