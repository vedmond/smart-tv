import React, { useCallback, useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { IProps } from '../types/interface'
import { phoneNumberSample } from '../constants'
import { newNumberField } from '../utils/newNumberField'
import { VirtualKeyboard } from '../components/VirtualKeyboard'
import { keyEventFilter } from '../utils/keyEventFilter'
import { useNavigationWithArrow } from '../utils/useNavigationWithArrow.hook'
import { CheckboxInput } from '../components/CheckboxInput'
import { SubmitButton } from '../components/SubmitButton'
import { ExitButton } from '../components/ExitButton'

export const RegisterScreen = ({ setScreenName, setPlayerTime }: IProps) => {
  const [valueNumber, setValueNumber] = useState('')
  const [pressKeyNumber, setPressKeyNumber] = useState<string>('')
  const [pressKeyArrow, setPressKeyArrow] = useState<string>('')
  const [numberField, setNumberField] = useState(phoneNumberSample)

  const handleOnFocus = useNavigationWithArrow(pressKeyArrow, setPressKeyArrow)

  useEffect(() => {
    const time = localStorage.getItem('videoTime')
    if (time) {
      if (setPlayerTime) setPlayerTime(Number(time))
    }
  }, [setPlayerTime])

  useEffect(() => {
    setValue(pressKeyNumber)
    setNumberField(newNumberField(valueNumber))
    setPressKeyNumber('')
  }, [valueNumber, pressKeyNumber])

  const onKeyUpEvent = keyEventFilter(setPressKeyNumber, setPressKeyArrow)

  useEffect(() => {
    document.addEventListener('keyup', onKeyUpEvent)
    return () => {
      document.removeEventListener('keyup', onKeyUpEvent)
    }
  }, [])

  const onClick = () => {
    if (setScreenName) setScreenName('promo')
  }

  const onClickKey = (event: any) => {
    // const element = document.getElementById(
    //   `${(event!.target as HTMLInputElement)!.id}`,
    // )
    // element?.classList.add('my-class')
    // console.log('element =', element)
    // setTimeout(() => {
    //   element?.classList.remove('my-class')
    // }, 1000)
    event.preventDefault()
    const idKey = (event!.target as HTMLInputElement)!.id.split('')
    idKey.splice(-4, 4)
    const currentKey = idKey.join('')
    setValue(currentKey)
  }

  function setValue(currentKey: string) {
    if (
      valueNumber.length < 10 &&
      currentKey !== '10' &&
      currentKey !== 'keyboard'
    ) {
      setValueNumber(valueNumber + currentKey)
    }
    if (
      (valueNumber.length < 11 && currentKey === '10') ||
      (valueNumber.length < 11 && currentKey === 'Backspace')
    ) {
      const arrayValueNumber = valueNumber.split('')
      arrayValueNumber.pop()
      const stringValueNumber = arrayValueNumber.join('')
      setValueNumber(stringValueNumber)
    }
  }
  return (
    <>
      <div className="register">
        <input
          type="text"
          value={numberField}
          placeholder={phoneNumberSample}
          onChange={onClickKey}
        />
        <div className="titleRegister"></div>
        <div className="phoneNumberBlock">{numberField}</div>
        <div className="textRegister"></div>
        <VirtualKeyboard
          onClickKey={onClickKey}
          handleOnFocus={handleOnFocus}
        />
        <CheckboxInput handleOnFocus={handleOnFocus} />
        <SubmitButton handleOnFocus={handleOnFocus} />
      </div>
      <ExitButton handleOnFocus={handleOnFocus} onClick={onClick} />
    </>
  )
}
