import React, { useState } from 'react'
import { Badge, Box, Flex, Float, FormatNumber, List } from '@chakra-ui/react'
import { RadioCardItem, RadioCardLabel, RadioCardRoot } from "@/components/ui/radio-card"
import { plans } from '@/constants'
import { LuCircleCheck, LuCircleX } from 'react-icons/lu'
import { FaStar } from 'react-icons/fa'

function Plans() {
    const [plan, setPlan] = useState('advanced')

    return (
        <>
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
        </>
    )
}

export default Plans