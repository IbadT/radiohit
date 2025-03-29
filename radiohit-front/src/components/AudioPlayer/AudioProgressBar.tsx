import { AudioProgressBarHelper } from "@/components/AudioPlayer/AudioProgressBarHelper";
import React, { useEffect, useState } from "react";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import { usePlayer } from "@/lib/hooks/usePlayer";

const MainAudioProgress = ({ handleChangePlaybackSeek, isRadioPlayed }) => {
    const { getPosition, duration} =
        useGlobalAudioPlayer();
    const [pos, setPos] = useState(0);

    useEffect(() => {
        const i = setInterval(() => {
            setPos(getPosition());
        }, 20);

        return () => clearInterval(i);
    }, [getPosition]);


    return (
        <AudioProgressBarHelper
            className="cursor-pointer"
            defaultValue={[0]}
            min={0}
            max={duration > 0 ? duration : 100}
            step={0.1}
            value={[pos]}
            //@ts-ignore
            isRadioPlayed={isRadioPlayed}
            onValueChange={(val) => handleChangePlaybackSeek(val)}
        />
    );
};

export default MainAudioProgress;
