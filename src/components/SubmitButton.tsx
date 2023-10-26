import React from 'react'
import { IProps } from '../types/interface'

export const SubmitButton = ({ handleOnFocus }: IProps) => {
  return (
    <button
      id="submit-itm"
      className={`btnVirtualKeyboard  ${
        handleOnFocus === 'submit-itm' ? 'handleOnFocus' : ''
      }`}
    >
      ПОДТВЕРДИТЬ НОМЕР
    </button>
  )
}
