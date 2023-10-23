import React, { useEffect } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { IProps } from '../types/interface'

export const RegisterScreen = ({ setScreenName, setPlayerTime }: IProps) => {
  const phoneNumberSample = '+7(___)_ _ _-_ _-_ _'
  const keyboardItems = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'стереть',
    '0',
  ]
  console.log(phoneNumberSample.split('').join(''))

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
      <div className="register">
        <div className="titleRegister"></div>
        <div className="phoneNumberBlock">{phoneNumberSample}</div>
        <div className="textRegister"></div>
        <div className="virtualKeyboardBlock">
          {keyboardItems.map((el) => (
            <div
              key={el}
              className={`${
                el === 'стереть'
                  ? 'virtualKeyboardItem__Backspace'
                  : 'virtualKeyboardItems'
              }`}
            >
              <span>{el}</span>
            </div>
          ))}
        </div>
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
