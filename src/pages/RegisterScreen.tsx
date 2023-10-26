import React, { useCallback, useEffect, useState } from 'react'
import { IProps } from '../types/interface'
import { keyboardItems, phoneNumberSample } from '../constants'
import { newNumberField } from '../utils/newNumberField'
import { VirtualKeyboard } from '../components/VirtualKeyboard'
import { keyEventFilter } from '../utils/keyEventFilter'
import { useNavigationWithArrow } from '../utils/useNavigationWithArrow.hook'
import { CheckboxInput } from '../components/CheckboxInput'
import { SubmitButton } from '../components/SubmitButton'
import { ExitButton } from '../components/ExitButton'
import { PhoneNumberField } from '../components/PhoneNumberField'

export const RegisterScreen = ({ setScreenName, setPlayerTime }: IProps) => {
  const [valueNumber, setValueNumber] = useState('')
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [isFullField, setIsFullField] = useState<boolean>(false)
  const [pressKeyNumber, setPressKeyNumber] = useState<string>('')
  const [pressKeyArrow, setPressKeyArrow] = useState<string>('')
  const [pressKeyEnter, setPressKeyEnter] = useState<string>('')
  const [numberField, setNumberField] = useState(phoneNumberSample)

  const handleOnFocus = useNavigationWithArrow(pressKeyArrow, setPressKeyArrow)

  useEffect(() => {
    const time = localStorage.getItem('videoTime')
    if (time) {
      if (setPlayerTime) setPlayerTime(Number(time))
    }
  }, [setPlayerTime])

  const onKeyUpEvent = keyEventFilter(
    setPressKeyNumber,
    setPressKeyArrow,
    setPressKeyEnter,
  )

  useEffect(() => {
    document.addEventListener('keyup', onKeyUpEvent)
    return () => {
      document.removeEventListener('keyup', onKeyUpEvent)
    }
  }, [onKeyUpEvent])

  const addCurrentValue = useCallback(
    (currentKey: string) => {
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
      valueNumber.length >= 10 ? setIsFullField(true) : setIsFullField(false)
    },
    [valueNumber],
  )
  useEffect(() => {
    addCurrentValue(pressKeyNumber)
    setNumberField(newNumberField(valueNumber))
    setPressKeyNumber('')
  }, [valueNumber, pressKeyNumber, addCurrentValue])

  useEffect(() => {
    if (pressKeyEnter) {
      const filterNumber = [...keyboardItems, '10']
      const key = handleOnFocus.split('')
      key.splice(-4, 4)
      const currentKey = key.join('')
      if (filterNumber.includes(currentKey)) {
        addCurrentValue(currentKey)
      }
      if (currentKey === 'check') {
        setIsChecked(!isChecked)
      }
      if (currentKey === 'exit') {
        setValueNumber('')
        setIsChecked(false)
        setIsFullField(false)
        if (setScreenName) setScreenName('promo')
      }
      if (currentKey === 'submit') {
        handleSubmit()
      }
    }
    setPressKeyEnter('')
  }, [pressKeyEnter, handleOnFocus, isChecked, addCurrentValue])

  const onClickExit = () => {
    if (setScreenName) setScreenName('promo')
  }

  const onClickKey = (event: any) => {
    event.preventDefault()
    const idKey = (event!.target as HTMLInputElement)!.id.split('')
    idKey.splice(-4, 4)
    const currentKey = idKey.join('')
    addCurrentValue(currentKey)
  }

  const onChangeCheckboxInput = () => {
    setIsChecked(!isChecked)
  }

  function handleSubmit(event?: any) {
    if (isChecked && isFullField) console.log('submit')
    event?.preventDefault()
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="register">
          <div className="titleRegister"></div>
          <PhoneNumberField numberField={numberField} onClickKey={onClickKey} />
          <VirtualKeyboard
            onClickKey={onClickKey}
            handleOnFocus={handleOnFocus}
          />
          <CheckboxInput
            handleOnFocus={handleOnFocus}
            isChecked={isChecked}
            onChangeCheckboxInput={onChangeCheckboxInput}
          />
          <SubmitButton handleOnFocus={handleOnFocus} />
        </div>
      </form>

      <ExitButton handleOnFocus={handleOnFocus} onClickExit={onClickExit} />
    </>
  )
}
