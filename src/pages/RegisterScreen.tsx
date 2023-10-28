import React, { useCallback, useEffect, useState } from 'react'
import { IProps } from '../types/interface'
import { keyboardItems, phoneNumberSample, timeToLogoutSec } from '../constants'
import { newNumberField } from '../utils/newNumberField'
import { VirtualKeyboard } from '../components/VirtualKeyboard'
import { keyEventFilter } from '../utils/keyEventFilter'
import { useNavigationWithArrow } from '../utils/useNavigationWithArrow.hook'
import { CheckboxInput } from '../components/CheckboxInput'
import { SubmitButton } from '../components/SubmitButton'
import { ExitButton } from '../components/ExitButton'
import { PhoneNumberField } from '../components/PhoneNumberField'
import { useArrowNavigationTrace } from '../utils/useArrowNavigationTrace.hook'
import { useDetectActivity } from '../utils/useDetectActivity'

export const RegisterScreen = ({ setScreenName }: IProps) => {
  const [valueNumber, setValueNumber] = useState('')
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [isFullField, setIsFullField] = useState<boolean>(false)
  const [isNavigationArray, setIsNavigationArray] = useState<boolean>(true)
  const [isCursor, setIsCursor] = useState<boolean>(true)
  const [isPhoneNumberError, setIsPhoneNumberError] = useState<boolean>(false)
  const [isEnabledSubmit, setIsEnabledSubmit] = useState<boolean>(false)
  const [pressKeyNumber, setPressKeyNumber] = useState<string>('')
  const [pressKeyArrow, setPressKeyArrow] = useState<string>('')
  const [pressKeyEnter, setPressKeyEnter] = useState<string>('')
  const [mouseOnFocus, setMouseOnFocus] = useState<string>('')
  const [numberField, setNumberField] = useState(phoneNumberSample)

  const handleOnFocus = useNavigationWithArrow(
    pressKeyArrow,
    setPressKeyArrow,
    isNavigationArray,
  )

  const allEvents = {
    valueNumber,
    isChecked,
    pressKeyNumber,
    pressKeyEnter,
    pressKeyArrow,
    mouseOnFocus,
  }

  // const { resetTimeoutTime } = useDetectActivity({
  //   timeToLogoutSec,
  //   setScreenName,
  // })

  useEffect(() => {
    // resetTimeoutTime()                             // потом включить
  }, [valueNumber, isChecked, pressKeyNumber, pressKeyEnter, pressKeyArrow])

  const isArrowNavigation = useArrowNavigationTrace({ allEvents })

  const onKeyUpEvent = keyEventFilter(
    setPressKeyNumber,
    setPressKeyArrow,
    setPressKeyEnter,
  )

  useEffect(() => {
    setIsNavigationArray(true)
    document.addEventListener('keyup', onKeyUpEvent)
    return () => {
      document.removeEventListener('keyup', onKeyUpEvent)
    }
  }, [onKeyUpEvent])

  useEffect(() => {
    const mouseEvent = (event: any) => {
      setIsCursor(true)
      setIsNavigationArray(false)
      if (event.isTrusted) {
        setIsNavigationArray(false)
      }
    }
    document.addEventListener('mousemove', mouseEvent)
    return () => {
      document.removeEventListener('mousemove', mouseEvent)
    }
  }, [])

  useEffect(() => {
    if (isFullField && isChecked) {
      setIsEnabledSubmit(true)
    } else {
      setIsEnabledSubmit(false)
    }
  }, [isFullField, isChecked])

  const addCurrentValue = useCallback(
    (currentKey: string) => {
      setIsPhoneNumberError(false)
      setIsEnabledSubmit(false)
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
      if (valueNumber.length >= 10) {
        if (
          valueNumber.slice(3) === '0000000' ||
          valueNumber.slice(0, 3) === '000'
        ) {
          setIsPhoneNumberError(true)
          setIsFullField(false)
          setIsChecked(false)
        } else {
          setIsFullField(true)
        }
        if (isFullField && isChecked) {
          setIsEnabledSubmit(true)
        }
      }
    },
    [valueNumber],
  )
  useEffect(() => {
    if (pressKeyNumber) {
      setIsCursor(false)
    }
    addCurrentValue(pressKeyNumber)
    setNumberField(newNumberField(valueNumber))
    setPressKeyNumber('')
  }, [valueNumber, pressKeyNumber, addCurrentValue])

  useEffect(() => {
    const filterNumber = [...keyboardItems, '10']
    const key = handleOnFocus.split('')
    key.splice(-4, 4)
    const currentKey = key.join('') ? key.join('') : mouseOnFocus
    if (pressKeyEnter) {
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
  }, [
    pressKeyEnter,
    handleOnFocus,
    isChecked,
    mouseOnFocus,
    isCursor,
    addCurrentValue,
  ])

  useEffect(() => {
    const mouseEventOver = (event: any) => {
      const idElem = event.target.id.split('')
      idElem.splice(-4, 4)
      const currentMouseElement = idElem.join('')

      setMouseOnFocus(currentMouseElement)
    }
    document.addEventListener('mouseover', mouseEventOver)
    return () => {
      document.removeEventListener('mouseover', mouseEventOver)
    }
  }, [])

  const onClickExit = () => {
    if (setScreenName) setScreenName('promo')
  }

  const onClickKey = (event: any) => {
    if (isArrowNavigation || !isCursor) {
      return
    }
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
    if (isChecked && isFullField) {
      if (setScreenName) setScreenName('finally')
    }
    event?.preventDefault()
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="register">
          <div className="titleRegister"></div>
          <PhoneNumberField
            numberField={numberField}
            isPhoneNumberError={isPhoneNumberError}
            onClickKey={onClickKey}
          />
          <VirtualKeyboard
            onClickKey={onClickKey}
            handleOnFocus={handleOnFocus}
            isCursor={isCursor}
            allEvents={allEvents}
          />
          <CheckboxInput
            handleOnFocus={handleOnFocus}
            isChecked={isChecked}
            isPhoneNumberError={isPhoneNumberError}
            onChangeCheckboxInput={onChangeCheckboxInput}
          />
          <SubmitButton
            handleOnFocus={handleOnFocus}
            isEnabledSubmit={isEnabledSubmit}
          />
        </div>
      </form>

      <ExitButton handleOnFocus={handleOnFocus} onClickExit={onClickExit} />
    </>
  )
}
