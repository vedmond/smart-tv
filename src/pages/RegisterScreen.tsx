import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { IProps } from '../types/interface'
import { phoneNumberSample } from '../constants'
import { newNumberField } from '../utils/newNumberField'
import { VirtualKeyboard } from '../components/VirtualKeyboard'
import { useKeyEventFilter } from '../utils/useKeyEventFilter.hook'

export const RegisterScreen = ({ setScreenName, setPlayerTime }: IProps) => {
  const [valueNumber, setValueNumber] = useState('')
  const [numberField, setNumberField] = useState(phoneNumberSample)

  useEffect(() => {
    const time = localStorage.getItem('videoTime')
    if (time) {
      if (setPlayerTime) setPlayerTime(Number(time))
    }
  }, [setPlayerTime])

  useEffect(() => {
    setNumberField(newNumberField(valueNumber))
  }, [valueNumber])

  const onKeyUp = useKeyEventFilter(valueNumber)

  useEffect(() => {
    document.addEventListener('keyup', onKeyUp)
    return () => {
      document.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  const onClick = () => {
    if (setScreenName) setScreenName('promo')
  }

  const onClickKey = (event: any) => {
    const idKey = (event!.target as HTMLInputElement)!.id.split('')
    idKey.splice(-4, 4)
    const currentKey = idKey.join('')
    if (
      valueNumber.length < 10 &&
      currentKey !== '10' &&
      currentKey !== 'keyboard'
    ) {
      setValueNumber(valueNumber + currentKey)
    }
    if (valueNumber.length < 11 && currentKey === '10') {
      const arr = valueNumber.split('')
      arr.pop()
      const str = arr.join('')
      setValueNumber(str)
    }
  }

  return (
    <>
      <div className="register">
        <input type="text" value={valueNumber} onChange={onClickKey} required />
        <div className="titleRegister"></div>
        <div className="phoneNumberBlock">{numberField}</div>
        <div className="textRegister"></div>
        <VirtualKeyboard onClickKey={onClickKey} />
        <div className="checkPersonalDataBlock">
          <div className="checkbox">
            <input
              className="checkbox__input"
              type="checkbox"
              id="checkbox_1"
            />
            <label className="checkbox__label" htmlFor="checkbox_1"></label>
          </div>
          <div className="textCheckbox"></div>
        </div>
        <button className="btnVirtualKeyboard">ПОДТВЕРДИТЬ НОМЕР</button>
      </div>
      <button className="btnExit" onClick={onClick}>
        <AiOutlineClose />
      </button>
    </>
  )
}
