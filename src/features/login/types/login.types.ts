export interface LoginProps {
  onSubmit: (email: string, password: string) => void;
  onGoogleSignIn: () => void;
  onForgotPassword: () => void;
  onSignUpClick: () => void;
}

export interface onSubmitProp {
    onSubmit:(email:string,password:string)=>void
}

export interface loginData{
    email:string,
    password:string,
}