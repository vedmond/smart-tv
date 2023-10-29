import { useEffect } from 'react'
import { IProps } from '../types/interface'
import { ExitButton } from '../components/ExitButton'
import { useDetectActivity } from '../utils/useDetectActivity'
import { timeToLogoutSec } from '../constants'

export const FinallyScreen = ({ setScreenName }: IProps) => {
  const handleOnFocus = 'exit-itm'
  const currentPlayerTime = 0
  localStorage.setItem('videoTime', currentPlayerTime.toString())
  const { resetTimeoutTime } = useDetectActivity({
    timeToLogoutSec,
    setScreenName,
  })

  useEffect(() => {
    resetTimeoutTime()
  }, [resetTimeoutTime])

  useEffect(() => {
    const onKeyUpEvent = (event: any) => {
      if (event.key === 'Enter') {
        if (setScreenName) setScreenName('promo')
      }
    }
    document.addEventListener('keyup', onKeyUpEvent)
    return () => {
      document.removeEventListener('keyup', onKeyUpEvent)
    }
  }, [setScreenName])

  const onClickExit = () => {
    if (setScreenName) setScreenName('promo')
  }

  return (
    <>
      <div className="finally">
        <div className="finally__text"></div>
      </div>
      <ExitButton onClickExit={onClickExit} handleOnFocus={handleOnFocus} />
    </>
  )
}
