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
  onClickKey?: (event: any) => void
  onClick?: MouseEventHandler<HTMLButtonElement>
  setScreenName?: Dispatch<SetStateAction<'promo' | 'register' | 'finally'>>
  setPlayerTime?: Dispatch<SetStateAction<number>>
}
