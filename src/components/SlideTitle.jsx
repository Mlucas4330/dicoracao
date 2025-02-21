import React, { useEffect, useState } from 'react'
import { Heading, Presence } from '@chakra-ui/react'
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInMonths, differenceInSeconds, differenceInWeeks, differenceInYears } from 'date-fns'

function SlideTitle({ startDate, type, present }) {
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

    const handleTitle = () => {
        if (['first', 'last'].includes(type)) {
            return title[type]
        }

        const timeMap = { 'seconds': 'Segundo', 'minutes': 'Minuto', 'hours': 'Hora', 'days': 'Dia', 'weeks': 'Semana', 'months': 'Mês', 'years': 'Ano' }

        return title[type].toLocaleString() + ' ' + (type === 'months' ? (title[type] > 1 ? 'Meses' : 'Mês') : timeMap[type] + (title[type] > 1 ? 's' : ''))
    }

    useEffect(() => {
        if (!startDate) return
        handleTimeTogether()
        const interval = setInterval(() => { handleTimeTogether() }, 1000)
        return () => clearInterval(interval)
    }, [startDate])

    return (
        <>
            <Presence animationName={{ _open: "slide-from-bottom-full", _closed: "slide-to-bottom-full" }} zIndex={2} animationDuration="slowest" lazyMount present={present}>
                <Heading color={'white'} size={'6xl'} fontWeight={'bold'}>
                    {handleTitle()}
                </Heading>
            </Presence>
        </>
    )
}

export default SlideTitle