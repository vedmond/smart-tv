import React, { useEffect } from 'react'
import { IProps } from '../types/interface'
import { ExitButton } from '../components/ExitButton'
import { keyEventFilter } from '../utils/keyEventFilter'

export const FinallyScreen = ({ setScreenName, setPlayerTime }: IProps) => {
  const handleOnFocus = 'exit-itm'
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
  }, [])
  if (setPlayerTime) setPlayerTime(0)

  const onClickExit = () => {
    console.log('onClickExit')
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
