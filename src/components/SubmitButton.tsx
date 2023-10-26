import React from 'react'
import { IProps } from '../types/interface'

export const SubmitButton = ({ handleOnFocus }: IProps) => {
  return (
    <button
      id="submit-itm"
      type="submit"
      className={`btnVirtualKeyboard  ${
        handleOnFocus === 'submit-itm' ? 'handleOnFocus' : ''
      }`}
    >
      ПОДТВЕРДИТЬ НОМЕР
    </button>
  )
}
