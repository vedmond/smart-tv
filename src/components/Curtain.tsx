import { IProps } from '../types/interface'
import { Banner } from './Banner'

export const Curtain = ({ isVisible, setScreenName }: IProps) => {
  return (
    <div className="playerCurtain">
      <Banner isVisible={isVisible} setScreenName={setScreenName} />
    </div>
  )
}
