import { Dispatch, MouseEventHandler, SetStateAction } from 'react'

export interface OnProgressProps {
  played: number
  playedSeconds: number
  loaded: number
  loadedSeconds: number
}

export interface IProps {
  isVisible?: boolean
  playerTime?: number
  handleOnFocus?: string
  isChecked?: boolean
  numberField?: string
  pressKeyArrow?: string
  isCursor?: boolean
  isPhoneNumberError?: boolean
  isEnabledSubmit?: boolean
  isLoading?: boolean
  allEvents?: {
    valueNumber: string
    isChecked: boolean
    pressKeyNumber: string
    pressKeyEnter: string
    pressKeyArrow: string
    mouseOnFocus: string
  }
  timeToLogoutSec?: number
  onChangeCheckboxInput?: (event: any) => void
  onClickKey?: (event: any) => void
  onClickExit?: MouseEventHandler<HTMLButtonElement>
  setScreenName?: Dispatch<
    SetStateAction<'promo' | 'register' | 'finally' | ''>
  >
  setPlayerTime?: Dispatch<SetStateAction<number>>
}
