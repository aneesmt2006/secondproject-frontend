

export interface LoginProps {
    handleSubmitLogin:(email:string,password:string)=>Promise<boolean>
    role:string
}