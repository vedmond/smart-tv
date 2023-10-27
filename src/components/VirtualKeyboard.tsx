import React, { useEffect, useState } from 'react'
import { keyboardItems } from '../constants'
import { IProps } from '../types/interface'
import { useArrowNavigationTrace } from '../utils/useArrowNavigationTrace.hook'

export const VirtualKeyboard = ({
  onClickKey,
  handleOnFocus,
  allEvents,
}: IProps) => {
  const isArrowNavigation = useArrowNavigationTrace({ allEvents })

  return (
    <div
      className={`${
        isArrowNavigation
          ? 'virtualKeyboardBlock__arrow'
          : 'virtualKeyboardBlock'
      }`}
      id="keyboard-box"
    >
      {keyboardItems.map((el, index) => (
        <div
          key={index}
          id={`${index === 10 ? 0 : index + 1}-key`}
          className={`${
            el === 'стереть'
              ? 'virtualKeyboardItem__Backspace'
              : 'virtualKeyboardItems'
          }
          ${
            handleOnFocus === `${index === 10 ? 0 : index + 1}-key`
              ? 'handleOnFocus'
              : ''
          }`}
          onClick={onClickKey}
        >
          <span id={`${index === 10 ? 0 : index + 1}-itm`}>{el}</span>
        </div>
      ))}
    </div>
  )
}
