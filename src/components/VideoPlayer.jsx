import React, { useRef } from "react"
import YouTube from "react-youtube"
import { VisuallyHidden } from "@chakra-ui/react"

const VideoPlayer = ({ videoId, volume }) => {
    const playerRef = useRef(null)

    const onReady = (event) => {
        playerRef.current = event.target
        if (volume) {
            playerRef.current.mute()
        } else {
            playerRef.current.unMute()
        }
    }

    React.useEffect(() => {
        if (playerRef.current) {
            if (volume) {
                playerRef.current.mute()
            } else {
                playerRef.current.unMute()
            }
        }
    }, [volume])

    const opts = {
        height: "390",
        width: "640",
        playerVars: {
            autoplay: 1
        }
    };

    return (
        <VisuallyHidden>
            <YouTube videoId={videoId} opts={opts} onReady={onReady} />
        </VisuallyHidden>
    );
};

export default VideoPlayer