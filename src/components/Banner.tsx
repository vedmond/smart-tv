import { IProps } from '../types/interface'

export const Banner = ({ isVisible, setScreenName }: IProps) => {
  const visibleBanner = {
    right: '0',
    transitionDuration: '0.8s',
  }
  const onClick = () => {
    if (setScreenName) setScreenName('register')
  }

  return (
    <div className="banner" style={isVisible ? visibleBanner : undefined}>
      <div className="titleBanner"></div>
      <div className="qrCode"></div>
      <div className="textBanner"></div>
      <button className="bannerButton" onClick={onClick}>
        ок
      </button>
    </div>
  )
}
