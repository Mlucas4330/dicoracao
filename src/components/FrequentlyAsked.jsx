import React from 'react'
import { Box, Heading } from '@chakra-ui/react'
import {
    AccordionItem,
    AccordionItemContent,
    AccordionItemTrigger,
    AccordionRoot,
} from "@/components/ui/accordion"
import { questions } from '@/constants'

function FrequentlyAsked() {
    return (
        <>
            <Box my={16}>
                <Heading textAlign={'center'} size={'3xl'} fontWeight={'bold'} mb={4}>Perguntas Frequentes</Heading>
                <AccordionRoot size={'lg'} my={12} collapsible defaultValue={["a"]}>
                    {questions.map((item, index) => (
                        <AccordionItem key={index} value={item.value}>
                            <AccordionItemTrigger>{item.title}</AccordionItemTrigger>
                            <AccordionItemContent>{item.text}</AccordionItemContent>
                        </AccordionItem>
                    ))}
                </AccordionRoot>
            </Box>
        </>
    )
}

export default FrequentlyAsked