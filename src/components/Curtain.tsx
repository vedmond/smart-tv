import { Spin } from 'antd'
import { IProps } from '../types/interface'
import { Banner } from './Banner'

export const Curtain = ({ isVisible, isLoading, setScreenName }: IProps) => {
  return (
    <div
      className={`${isLoading ? 'playerCurtain__loading' : 'playerCurtain'}`}
    >
      <Spin size="large" style={{ margin: 'auto' }} spinning={isLoading} />
      <Banner isVisible={isVisible} setScreenName={setScreenName} />
    </div>
  )
}
