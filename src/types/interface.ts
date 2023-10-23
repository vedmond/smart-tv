import { Dispatch, SetStateAction } from 'react'

export interface OnProgressProps {
  played: number
  playedSeconds: number
  loaded: number
  loadedSeconds: number
}

export interface IProps {
  isVisible?: boolean
  playerTime?: number
  setScreenName?: Dispatch<SetStateAction<'promo' | 'register' | 'finally'>>
  setPlayerTime?: Dispatch<SetStateAction<number>>
}
