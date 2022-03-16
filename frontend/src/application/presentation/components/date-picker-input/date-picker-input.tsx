import React from 'react'

import { Input } from 'reactstrap'
import DatePicker, { registerLocale } from 'react-datepicker'

import pt from 'date-fns/locale/pt'

import './date-picker-input.scss'

registerLocale('pt-BR', pt)

type Props = any

const DatePickerInput: React.FC<Props> = (props: Props) => {
  return (
    <DatePicker
      {...props}
      customInput={<CustomizedInput/>}
      placeholderText={props.placeholder}
      locale="pt-BR"
      dateFormat="dd/MM/yyyy"
  />
  )
}

export default DatePickerInput

const CustomizedInput: React.FC<Props> = (props: Props) => {
  return (
    <div className="w-100 inner-addon left-addon">
      <i className="far fa-calendar-alt"></i>
      <Input
        className="w-100 form-control text-center"
        placeholder={props.placeholder}
        value={props.value}
        onClick={props.onClick} />
    </div>
  )
}
