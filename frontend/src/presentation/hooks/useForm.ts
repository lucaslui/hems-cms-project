import { useState } from 'react'

type FormStatus = {
  isLoading: boolean
  mainError: string
}

type Form = {
  try: (callback: Promise<void>) => void
  setError: (error: Error | string) => void
  status: FormStatus
}

const FORM_STATUS_INITIAL_STATE = {
  isLoading: false,
  mainError: ''
}

const useForm: () => Form = () => {
  const [formStatus, setFormStatus] = useState(FORM_STATUS_INITIAL_STATE)

  return {
    try: (callback: Promise<void>) => {
      setFormStatus({ ...FORM_STATUS_INITIAL_STATE, isLoading: true })

      callback.finally(
        () => setFormStatus(FORM_STATUS_INITIAL_STATE)
      ).catch(
        (err: Error) => {
          console.error(err)

          setFormStatus({
            ...FORM_STATUS_INITIAL_STATE,
            mainError: `${err.name}: ${err.message}`
          })
        }
      )
    },
    setError: (error: Error | string) => {
      setFormStatus({
        ...formStatus,
        mainError: error instanceof Error ? error.message : error
      })
    },
    status: formStatus
  }
}

export default useForm
