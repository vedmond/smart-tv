import React, { useState, useRef, useEffect } from 'react'
import ReactPlayer from 'react-player'
import { IProps, OnProgressProps } from '../types/interface'
import { playerSettings } from '../constants/'
import { Banner } from '../components/Banner'
import { Curtain } from '../components/Curtain'

// interface IYoutubeState {
//   showinfo: number
//   start: string
//   rel: string
//   modestbranding: number
// }

export const PromoScreen = ({
  setScreenName,
  setPlayerTime,
  playerTime = 0,
}: IProps) => {
  // const [isStart, setIsStart] = useState<boolean>(false)
  const [isVisibleBanner, setIsVisibleBanner] = useState<boolean>(false)
  const currentPlayerTime = localStorage.getItem('videoTime')

  const videoPlaybackTime = (progress: OnProgressProps) => {
    localStorage.setItem(
      'videoTime',
      JSON.stringify(Math.round(progress.playedSeconds)),
    )
    if (Math.round(progress.playedSeconds) >= 5) {
      setIsVisibleBanner(true)
    }
  }
  return (
    <>
      {currentPlayerTime && (
        <ReactPlayer
          {...playerSettings}
          playing={true}
          config={{
            youtube: {
              playerVars: {
                showinfo: 0,
                start: `${currentPlayerTime}`,
                rel: '0',
                modestbranding: 1,
              },
            },
          }}
          // onStart={() => setIsStart(true)}
          onProgress={videoPlaybackTime}
        />
      )}
      <Curtain isVisible={isVisibleBanner} setScreenName={setScreenName} />
    </>
  )
}
