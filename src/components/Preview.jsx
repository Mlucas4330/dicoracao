import React from 'react'
import { Box, Fieldset, Flex, Input } from '@chakra-ui/react'
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import Plans from './Plans'
import Create from './Create'
import VideoPlayer from './VideoPlayer'
import { useSong } from '@/providers/SongProvider'
import { useStartDate } from '@/providers/StartDateProvider'
import { RadioCardItem, RadioCardLabel, RadioCardRoot } from "@/components/ui/radio-card"
import { format } from 'date-fns'


function Preview() {
    const { startDate, setStartDate } = useStartDate()
    const { song, setSong, volume, videoId } = useSong()
    const emojis = ['❤️', '🌺', '✨', '💌', '💛', '🤍', '❤️‍🔥']

    return (
        <>
            <Flex my={16} shadow={'lg'} p={8} borderRadius={'md'} gap={6}>
                <Fieldset.Root>
                    <Fieldset.Content>
                        <Plans />

                        <Field label={'Início do Relacionamento'}>
                            <Input max={format(new Date(), "yyyy-MM-dd")} type='date' value={startDate} onChange={e => setStartDate(e.target.value)} />
                        </Field>

                        <Field label={"Música - Youtube"}>
                            <Input value={song} onChange={e => setSong(e.target.value)} placeholder='https://www.youtube.com/watch?v=igIfiqqVHtA' />
                            <VideoPlayer videoId={videoId} volume={volume} />
                        </Field>

                        <Field label={'Mensagem Final'}>
                            <Textarea autoresize placeholder='Abra o seu coração aqui! ❤️' />
                        </Field>

                        <RadioCardRoot justify="center" value={emoji} onValueChange={({ value }) => handleChange(type, 'emoji', value)}>
                            <RadioCardLabel>Emoji</RadioCardLabel>
                            <HStack>
                                {emojis.map(item => (
                                    <RadioCardItem indicator={false} label={item} key={item} value={item} />
                                ))}
                            </HStack>
                        </RadioCardRoot>
                    </Fieldset.Content>
                </Fieldset.Root>
                <Box id='create' overflow={'auto'} mt={4}>
                    <Create />
                </Box>
            </Flex>
            <Button disabled w={'full'} py={8} size={'lg'} mt={4}>Criar minha surpresa</Button>
        </>
    )
}

export default Preview