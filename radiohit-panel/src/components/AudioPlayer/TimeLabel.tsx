'use client'
import React, { useEffect, useState } from "react"
import { useGlobalAudioPlayer } from "react-use-audio-player"

const formatTime = (seconds: number) => {
    if (seconds === Infinity) {
        return "--"
    }
    const floored = Math.floor(seconds)
    let from = 14
    let length = 5
    if (floored >= 3600) {
        from = 11
        length = 8
    }

    return new Date(floored * 1000).toISOString().substr(from, length)
}

export const TimeLabel = () => {
    const [pos, setPos] = useState(0)
    const {  getPosition } = useGlobalAudioPlayer()

    useEffect(() => {
        const i = setInterval(() => {
            setPos(getPosition())
        }, 500)

        return () => clearInterval(i)
    }, [getPosition])

    return <div>{`${formatTime(pos)}`}</div>

}
