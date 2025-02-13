import React, { createContext, useContext, useEffect, useState } from 'react'
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInMonths, differenceInSeconds, differenceInWeeks, differenceInYears } from 'date-fns'

const StartDateContext = createContext()

export const StartDateProvider = ({ children }) => {
    const [startDate, setStartDate] = useState('')

    const [coupleDate, setCoupleDate] = useState({
        first: 'Nossa História',
        seconds: 0,
        minutes: 0,
        hours: 0,
        days: 0,
        weeks: 0,
        months: 0,
        years: 0,
        last: 'É apenas o começo!'
    })

    const handleTimeTogether = () => {
        const start = new Date(startDate)
        const today = new Date()

        setCoupleDate(prev => ({
            ...prev,
            seconds: differenceInSeconds(today, start) ? `${differenceInSeconds(today, start).toLocaleString()} ${differenceInSeconds(today, start) > 1 ? 'Segundos' : 'Segundo'}` : 0,
            minutes: differenceInMinutes(today, start) ? `${differenceInMinutes(today, start).toLocaleString()} ${differenceInMinutes(today, start) > 1 ? 'Minutos' : 'Minuto'}` : 0,
            hours: differenceInHours(today, start) ? `${differenceInHours(today, start).toLocaleString()} ${differenceInHours(today, start) > 1 ? 'Horas' : 'Hora'}` : 0,
            days: differenceInDays(today, start) ? `${differenceInDays(today, start).toLocaleString()} ${differenceInDays(today, start) > 1 ? 'Dias' : 'Dia'}` : 0,
            weeks: differenceInWeeks(today, start) ? `${differenceInWeeks(today, start).toLocaleString()} ${differenceInWeeks(today, start) > 1 ? 'Semanas' : 'Semana'}` : 0,
            months: differenceInMonths(today, start) ? `${differenceInMonths(today, start).toLocaleString()} ${differenceInMonths(today, start) > 1 ? 'Meses' : 'Mês'}` : 0,
            years: differenceInYears(today, start) ? `${differenceInYears(today, start).toLocaleString()} ${differenceInYears(today, start) > 1 ? 'Anos' : 'Ano'}` : 0
        }))
    }

    useEffect(() => {
        if (!startDate) return
        handleTimeTogether()
        const interval = setInterval(() => { handleTimeTogether() }, 1000)
        return () => clearInterval(interval)
    }, [startDate])

    return (
        <StartDateContext.Provider value={{ startDate, setStartDate, coupleDate }}>
            {children}
        </StartDateContext.Provider>
    )
}

export const useStartDate = () => useContext(StartDateContext)