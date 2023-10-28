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
      />
      <div
        className="phoneNumberBlock"
        style={isPhoneNumberError ? { color: 'red' } : undefined}
      >
        {numberField}
      </div>
      <div className="textRegister"></div>
    </>
  )
}
