import React from 'react'
import Styles from './form-status-styles.scss'
import Spinner from '../spinner/spinner'

type Props = {
  isLoading: boolean
  mainError: string
}

const FormStatus: React.FC<Props> = (props: Props) => {
  return (
    <div className={Styles.errorWrap}>
      { props.isLoading && <Spinner className={Styles.spinner}/>}
      { props.mainError && <span className={Styles.error}>{props.mainError}</span>}
    </div>
  )
}

export default FormStatus
