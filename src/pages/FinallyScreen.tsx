import React from 'react'
import { IProps } from '../types/interface'
import { ExitButton } from '../components/ExitButton'

export const FinallyScreen = ({ setScreenName, setPlayerTime }: IProps) => {
  return (
    <>
      <div className="finally">
        <div className="finally__text"></div>
      </div>
      <ExitButton />
    </>
  )
}
