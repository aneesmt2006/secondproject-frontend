import { useState } from "react"


const usePasswordToggler = (initialType:string = 'password') => {
    const [showPassword,setShowPassword] = useState(false)
    const visiblePassword =()=>setShowPassword((prev)=>!prev)

    const inputType = showPassword ? 'text' : initialType

  return {showPassword,visiblePassword,inputType}
}

export default usePasswordToggler
