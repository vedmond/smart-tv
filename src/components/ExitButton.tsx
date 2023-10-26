import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { IProps } from '../types/interface'

export const ExitButton = ({ handleOnFocus, onClickExit }: IProps) => {
  return (
    <button
      id="exit-itm"
      className={`btnExit ${
        handleOnFocus === 'exit-itm' ? 'handleOnFocus' : ''
      }`}
      onClick={onClickExit}
    >
      <AiOutlineClose />
    </button>
  )
}
