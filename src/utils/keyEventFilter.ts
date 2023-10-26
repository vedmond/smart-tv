import React, { Dispatch, useEffect } from 'react'
import { arrowItems, keyboardItems } from '../constants'

export const keyEventFilter = (
  setPressKeyNumber: Dispatch<React.SetStateAction<string>>,
  setPressKeyArrow: Dispatch<React.SetStateAction<string>>,
  setPressKeyEnter: Dispatch<React.SetStateAction<string>>,
) => {
  return (event: any) => {
    event.preventDefault()
    event.stopPropagation()
    const filterEnter = 'Enter'
    const filterArrow = [...arrowItems]
    const filterNumber = [...keyboardItems, 'Backspace']
    if (filterEnter.includes(event.key)) setPressKeyEnter(event.key)
    if (filterArrow.includes(event.key)) setPressKeyArrow(event.key)
    if (filterNumber.includes(event.key)) setPressKeyNumber(event.key)
  }
}
