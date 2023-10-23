import React, { useState, useRef, useEffect } from 'react'
import ReactPlayer from 'react-player'
import { OnProgressProps } from '../types/interface'
import { playerSettings } from '../constants/'
import { Banner } from '../components/Banner'
import { Curtain } from '../components/Curtain'

export const PromoScreen = () => {
  const [time, setTime] = useState<number>(0)
  const [playing, setPlaying] = useState<boolean>(true)
  const [isStart, setIsStart] = useState<boolean>(false)
  const [isVisibleBanner, setIsVisibleBanner] = useState<boolean>(false)

  const videoPlaybackTime = (progress: OnProgressProps) => {
    if (Math.round(progress.playedSeconds) >= 5) {
      setIsVisibleBanner(true)
    }
    if (Math.round(progress.playedSeconds) >= 76) {
      setIsVisibleBanner(false)
    }
  }
  return (
    <>
      <ReactPlayer
        {...playerSettings}
        playing={playing}
        config={{
          youtube: {
            playerVars: {
              showinfo: 0,
              start: `${time}`,
              rel: '0',
              modestbranding: 1,
            },
          },
        }}
        onStart={() => setIsStart(true)}
        onProgress={videoPlaybackTime}
      />
      <Curtain isVisible={isVisibleBanner} />
    </>
  )
}
