import React, { useEffect, useState } from 'react'
import { IProps } from '../types/interface'

export const useArrowNavigationTrace = ({ allEvents }: IProps) => {
  const [isArrowNavigation, setIsArrowNavigation] = useState<boolean>(false)
  useEffect(() => {
    const onFocusElementStyle = document.getElementsByClassName('handleOnFocus')
    setIsArrowNavigation(!!onFocusElementStyle.length)
  }, [
    allEvents?.valueNumber,
    allEvents?.isChecked,
    allEvents?.pressKeyArrow,
    allEvents?.pressKeyEnter,
    allEvents?.pressKeyNumber,
    allEvents?.mouseOnFocus,
  ])
  return isArrowNavigation
}
