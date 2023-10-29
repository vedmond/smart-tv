import { IProps } from '../types/interface'

export const CheckboxInput = ({
  handleOnFocus,
  isChecked,
  isPhoneNumberError,
  onChangeCheckboxInput,
}: IProps) => {
  return (
    <>
      {isPhoneNumberError ? (
        <div className="number__error"></div>
      ) : (
        <div className="checkPersonalDataBlock">
          <div
            className={`checkbox ${
              handleOnFocus === 'check-itm' ? 'handleOnFocus' : ''
            }`}
            id="check-itm"
          >
            <input
              className="checkbox__input"
              type="checkbox"
              id="checkbox_1"
              checked={isChecked}
              onChange={onChangeCheckboxInput}
            />
            <label className="checkbox__label" htmlFor="checkbox_1"></label>
          </div>
          <div className="textCheckbox"></div>
        </div>
      )}
    </>
  )
}
