import { useCallback, useEffect, useState } from 'react'
import { elementId } from '../constants'

export const useNavigationWithArrow = (
  pressKeyArrow: string,
  setPressKeyArrow: any,
) => {
  const [indexArr, setIndexArr] = useState<number>(0)
  const [indexElement, setIndexElement] = useState<number>(0)
  const [handleOnFocus, setHandleOnFocus] = useState<string>('')

  const handleNavigation = useCallback(
    (pressKeyArrow: string) => {
      if (pressKeyArrow === 'ArrowUp') {
        if (
          indexArr < 6 &&
          elementId[indexArr + 1].length - 1 >= indexElement
        ) {
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
        if (
          indexArr > 0 &&
          elementId[indexArr - 1].length - 1 >= indexElement
        ) {
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
    },
    [indexArr, indexElement],
  )

  useEffect(() => {
    setHandleOnFocus(elementId[indexArr][indexElement])
    handleNavigation(pressKeyArrow)
    setPressKeyArrow('')
  }, [
    pressKeyArrow,
    setPressKeyArrow,
    indexArr,
    indexElement,
    handleNavigation,
  ])

  return handleOnFocus
}
