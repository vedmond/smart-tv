import React, { useEffect } from 'react'

export const useKeyEventFilter = (valueNumber: string) => {
  console.log('valueNumber =', valueNumber)

  return (e: any) => console.log(valueNumber + e.key)
}
