import React from 'react'
import { IProps } from '../types/interface'

export const Banner = ({ isVisible }: IProps) => {
  const visibleBanner = {
    right: '0',
    transitionDuration: '0.8s',
  }

  return (
    <div className="banner" style={isVisible ? visibleBanner : undefined}>
      <div className="titleBanner"></div>
      <div className="qrCode"></div>
      <div className="textBanner"></div>
      <button className="bannerButton">ок</button>
    </div>
  )
}
