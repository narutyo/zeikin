import { useToast } from "vue-toastification"
import "vue-toastification/dist/index.css"

const toast = useToast()
const timeout = 2000

export const useShowToast = () => {
  return {
    toastSuccess: toastSuccess,
    toastError: toastError,
  }
}

const toastSuccess = <T>(str: string) => {
  toast.success(str, {
    timeout
  });  
};

const toastError = <T>(str: string) => {
  toast.error(str, {
    timeout
  });  
};