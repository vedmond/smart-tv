import React, { useCallback, useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { IProps } from '../types/interface'
import { elementId, phoneNumberSample } from '../constants'
import { newNumberField } from '../utils/newNumberField'
import { VirtualKeyboard } from '../components/VirtualKeyboard'
import { useKeyEventFilter } from '../utils/useKeyEventFilter.hook'

export const RegisterScreen = ({ setScreenName, setPlayerTime }: IProps) => {
  const [valueNumber, setValueNumber] = useState('')
  const [pressKeyNumber, setPressKeyNumber] = useState<string>('')
  const [pressKeyArrow, setPressKeyArrow] = useState<string>('')
  const [handleOnFocus, setHandleOnFocus] = useState<string>('')
  const [indexArr, setIndexArr] = useState<number>(0)
  const [indexElement, setIndexElement] = useState<number>(0)
  const [numberField, setNumberField] = useState(phoneNumberSample)
  const onKeyUp = useKeyEventFilter(setPressKeyNumber, setPressKeyArrow)

  useEffect(() => {
    const time = localStorage.getItem('videoTime')
    if (time) {
      if (setPlayerTime) setPlayerTime(Number(time))
    }
  }, [setPlayerTime])

  const OnFocus = (pressKeyArrow: string) => {
    if (pressKeyArrow === 'ArrowUp') {
      if (indexArr < 6 && elementId[indexArr + 1].length - 1 >= indexElement) {
        setIndexArr(indexArr + 1)
      } else if (
        indexArr < 6 &&
        elementId[indexArr + 1].length - 1 < indexElement
      ) {
        setIndexArr(indexArr + 1)
        setIndexElement(0)
      } else {
        setIndexArr(0)
      }
    }
    if (pressKeyArrow === 'ArrowDown') {
      if (indexArr > 0 && elementId[indexArr - 1].length - 1 >= indexElement) {
        setIndexArr(indexArr - 1)
      } else if (
        indexArr > 0 &&
        elementId[indexArr - 1].length - 1 < indexElement
      ) {
        setIndexArr(indexArr - 1)
        setIndexElement(0)
      } else {
        setIndexArr(6)
      }
    }
    if (pressKeyArrow === 'ArrowRight') {
      if (elementId[indexArr].length - 1 > indexElement) {
        setIndexElement(indexElement + 1)
      } else if (indexArr < 6) {
        setIndexElement(0)
        setIndexArr(indexArr + 1)
      } else if (indexArr >= 6) {
        setIndexElement(0)
        setIndexArr(0)
      }
    }
    if (pressKeyArrow === 'ArrowLeft') {
      if (indexElement >= 1 && indexArr > 0) {
        setIndexElement(indexElement - 1)
      } else if (indexElement <= 0 && indexArr > 0) {
        setIndexElement(elementId[indexArr - 1].length - 1)
        setIndexArr(indexArr - 1)
      } else if (indexArr <= 0) {
        setIndexElement(0)
        setIndexArr(6)
      }
    }
  }

  useEffect(() => {
    setHandleOnFocus(elementId[indexArr][indexElement])
    OnFocus(pressKeyArrow)

    setPressKeyArrow('')
  }, [pressKeyArrow])

  useEffect(() => {
    setValue(pressKeyNumber)
    setNumberField(newNumberField(valueNumber))
    setPressKeyNumber('')
  }, [valueNumber, pressKeyNumber])

  useEffect(() => {
    document.addEventListener('keyup', onKeyUp)
    return () => {
      document.removeEventListener('keyup', onKeyUp)
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
        <div className="checkPersonalDataBlock">
          <div
            className={`checkbox ${
              handleOnFocus === 'check-itm' ? 'handleOnFocus' : ''
            }`}
            id="check-itm"
          >
            <input
              className="checkbox__input"
              type="checkbox"
              id="checkbox_1"
            />
            <label className="checkbox__label" htmlFor="checkbox_1"></label>
          </div>
          <div className="textCheckbox"></div>
        </div>
        <button
          id="submit-itm"
          className={`btnVirtualKeyboard  ${
            handleOnFocus === 'submit-itm' ? 'handleOnFocus' : ''
          }`}
        >
          ПОДТВЕРДИТЬ НОМЕР
        </button>
      </div>
      <button
        id="exit-itm"
        className={`btnExit ${
          handleOnFocus === 'exit-itm' ? 'handleOnFocus' : ''
        }`}
        onClick={onClick}
      >
        <AiOutlineClose />
      </button>
    </>
  )
}
