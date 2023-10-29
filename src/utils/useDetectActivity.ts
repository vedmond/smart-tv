import { useEffect } from 'react'
import { IProps } from '../types/interface'

export const useDetectActivity = ({
  timeToLogoutSec,
  setScreenName,
}: IProps) => {
  useEffect(() => {
    const interval = setInterval(() => {
      const expireTime = localStorage.getItem('expireTime')
      if (expireTime) {
        if (+expireTime - Math.round(Date.now() / 1000) <= 0 && setScreenName) {
          setScreenName('promo')
        }
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const resetTimeoutTime = () => {
    if (timeToLogoutSec) {
      const expireTime = timeToLogoutSec + Math.round(Date.now() / 1000)
      localStorage.setItem('expireTime', expireTime.toString())
    }
  }

  useEffect(() => {
    const mouseEvent = (event: any) => {
      if (event.isTrusted) {
        resetTimeoutTime()
      }
    }
    document.addEventListener('mousemove', mouseEvent)
    return () => {
      document.removeEventListener('mousemove', mouseEvent)
    }
  }, [])

  return { resetTimeoutTime }
}
