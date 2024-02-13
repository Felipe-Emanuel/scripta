import { ToastContainer, ToastOptions } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface ToastProps {
  options?: ToastOptions
}

export function Toast({ options }: ToastProps) {
  return (
    <ToastContainer
      {...options}
      className="z-50"
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  )
}
