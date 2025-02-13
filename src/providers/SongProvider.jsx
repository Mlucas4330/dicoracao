import { createContext, useContext, useEffect, useState } from "react";

const SongContext = createContext()

export const SongProvider = (({ children }) => {
    const [volume, setVolume] = useState()
    const [song, setSong] = useState()
    const [videoId, setVideoId] = useState()

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

    return (
        <SongContext.Provider value={{ volume, setVolume, song, setSong, videoId, setVideoId }}>
            {children}
        </SongContext.Provider>
    )
})

export const useSong = () => useContext(SongContext)