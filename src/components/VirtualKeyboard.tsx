import React from 'react'
import { keyboardItems } from '../constants'
import { IProps } from '../types/interface'

export const VirtualKeyboard = ({ onClickKey }: IProps) => {
  return (
    <div className="virtualKeyboardBlock" id="keyboard-box">
      {keyboardItems.map((el, index) => (
        <div
          key={index}
          id={`${index === 10 ? 0 : index + 1}-key`}
          className={`${
            el === 'стереть'
              ? 'virtualKeyboardItem__Backspace'
              : 'virtualKeyboardItems'
          }`}
          onClick={onClickKey}
        >
          <span id={`${index === 10 ? 0 : index + 1}-itm`}>{el}</span>
        </div>
      ))}
    </div>
  )
}
