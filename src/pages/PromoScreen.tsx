import { useState } from 'react'
import ReactPlayer from 'react-player'
import { IProps, OnProgressProps } from '../types/interface'
import { playerSettings } from '../constants/'
import { Curtain } from '../components/Curtain'

export const PromoScreen = ({ setScreenName, isTimePlayerToggle }: IProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isVisibleBanner, setIsVisibleBanner] = useState<boolean>(false)

  const currentPlayerTime = isTimePlayerToggle
    ? localStorage.getItem('videoTime')
    : '0'

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
        onStart={() => setIsLoading(false)}
        onProgress={videoPlaybackTime}
      />
      <Curtain
        isVisible={isVisibleBanner}
        setScreenName={setScreenName}
        isLoading={isLoading}
      />
    </>
  )
}
