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
  const [playing, setPlaying] = useState<boolean>(true)
  const [isStart, setIsStart] = useState<boolean>(false)
  const [isVisibleBanner, setIsVisibleBanner] = useState<boolean>(false)
  // const [youtubeState, setYoutubeState] = useState<IYoutubeState>()

  // useEffect(() => {
  //   console.log('playerTime =', playerTime)
  //   const playerVars = {
  //     showinfo: 0,
  //     start: `${playerTime}`,
  //     rel: '0',
  //     modestbranding: 1,
  //   }
  //   setYoutubeState(playerVars)
  // }, [playerTime])

  const videoPlaybackTime = (progress: OnProgressProps) => {
    // console.log(Math.round(progress.playedSeconds))
    localStorage.setItem(
      'videoTime',
      JSON.stringify(Math.round(progress.playedSeconds)),
    )
    if (Math.round(progress.playedSeconds) >= 5) {
      setIsVisibleBanner(true)
    }
    // if (Math.round(progress.playedSeconds) >= 76) {
    //   setIsVisibleBanner(false)
    // localStorage.setItem('videoTime', JSON.stringify(0))
    // if (setPlayerTime) setPlayerTime(0)
    // причина в том что нужно вызывать перерендер
    // }
  }
  return (
    <>
      <ReactPlayer
        {...playerSettings}
        playing={playing}
        config={{
          youtube: {
            // playerVars: { ...youtubeState },
            playerVars: {
              showinfo: 0,
              start: `${playerTime}`,
              rel: '0',
              modestbranding: 1,
            },
          },
        }}
        onStart={() => setIsStart(true)}
        onProgress={videoPlaybackTime}
      />
      <Curtain isVisible={isVisibleBanner} setScreenName={setScreenName} />
    </>
  )
}
