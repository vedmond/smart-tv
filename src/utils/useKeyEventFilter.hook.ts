import React, { Dispatch, useEffect } from 'react'
import { arrowItems, keyboardItems } from '../constants'

export const useKeyEventFilter = (
  setPressKeyNumber: Dispatch<React.SetStateAction<string>>,
  setPressKeyArrow: Dispatch<React.SetStateAction<string>>,
) => {
  return (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    const filterArrow = [...arrowItems]
    const filterNumber = [...keyboardItems, 'Backspace']
    if (filterArrow.includes(e.key)) setPressKeyArrow(e.key)
    if (filterNumber.includes(e.key)) setPressKeyNumber(e.key)
  }
}
