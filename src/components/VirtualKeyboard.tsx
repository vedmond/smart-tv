import { keyboardItems } from '../constants'
import { IProps } from '../types/interface'
import { useArrowNavigationTrace } from '../utils/useArrowNavigationTrace.hook'

export const VirtualKeyboard = ({
  onClickKey,
  handleOnFocus,
  allEvents,
  isCursor,
}: IProps) => {
  const isArrowNavigation = useArrowNavigationTrace({ allEvents })
  return (
    <div
      className={`${
        isArrowNavigation || !isCursor
          ? 'virtualKeyboardBlock__none'
          : 'virtualKeyboardBlock'
      }`}
      id="keyboard-box"
    >
      {keyboardItems.map((el, index) => (
        <div
          key={index}
          id={`${index === 10 ? 0 : index + 1}-key`}
          className={`${
            el === 'стереть'
              ? 'virtualKeyboardItem__Backspace'
              : 'virtualKeyboardItems'
          }
          ${
            handleOnFocus === `${index === 10 ? 0 : index + 1}-key`
              ? 'handleOnFocus'
              : ''
          }`}
          onClick={onClickKey}
        >
          <span id={`${index === 10 ? 0 : index + 1}-itm`}>{el}</span>
        </div>
      ))}
    </div>
  )
}
