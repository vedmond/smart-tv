import React from 'react'
import { phoneNumberSample } from '../constants'
import { IProps } from '../types/interface'

export const PhoneNumberField = ({
  numberField,
  isPhoneNumberError,
  onClickKey,
}: IProps) => {
  return (
    <>
      <input
        type="text"
        value={numberField}
        placeholder={phoneNumberSample}
        onChange={onClickKey}
        tabIndex={-1}
        style={isPhoneNumberError ? { color: 'red' } : undefined}
      />
      <div className="textRegister"></div>
    </>
  )
}
