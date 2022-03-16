const useValidate = (callback: () => any) => async (): Promise<void> => {
  callback()
}

export default useValidate
