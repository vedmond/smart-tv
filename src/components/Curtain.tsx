import React from 'react'
import { IProps } from '../types/interface'
import { Banner } from './Banner'

export const Curtain = ({ isVisible }: IProps) => {
  return (
    <div className="playerCurtain">
      <Banner isVisible={isVisible} />
    </div>
  )
}
