import { IProps } from '../types/interface'

export const SubmitButton = ({ handleOnFocus, isEnabledSubmit }: IProps) => {
  return (
    <button
      id="submit-itm"
      type="submit"
      className={`${
        isEnabledSubmit ? 'btnVirtualKeyboard__enabled' : 'btnVirtualKeyboard'
      }  ${handleOnFocus === 'submit-itm' ? 'handleOnFocus' : ''}`}
      disabled={!isEnabledSubmit}
    >
      ПОДТВЕРДИТЬ НОМЕР
    </button>
  )
}
