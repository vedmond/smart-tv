import React, { useEffect } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { IProps } from '../types/interface'

export const RegisterScreen = ({ setScreenName, setPlayerTime }: IProps) => {
  useEffect(() => {
    const time = localStorage.getItem('videoTime')
    if (time) {
      if (setPlayerTime) setPlayerTime(Number(time))
    }
  }, [setPlayerTime])
  const onClick = () => {
    if (setScreenName) setScreenName('promo')
  }
  return (
    <>
      <div className="register"></div>
      <button className="btnExit" onClick={onClick}>
        <AiOutlineClose />
      </button>
    </>
  )
}
