import { phoneNumberSample } from '../constants'

export const newNumberField = (valueNumber: string) => {
  const field = phoneNumberSample.split('')
  const number = valueNumber.split('')
  const newField = field.map((el) => {
    if (el === '_') {
      const newElement = number.shift()
      newElement ? (el = newElement) : (el = '_')
    }
    return el
  })
  return newField.join('')
}
