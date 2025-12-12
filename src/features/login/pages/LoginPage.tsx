import { useNavigate } from "react-router-dom";
import Login from "../components/Login";
import { loginAccount } from "../../../services/api/auth.service";
import { toast } from "sonner";
import { useGoogleAuthforRoles } from "../../../hooks/useGoogleAuth";
import { useAppDispatch } from "../../../store/hooks";
import { setUserData, setUpdateUserField } from "../../registration/slice/userSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()

  const onSubmit = async (email: string, password: string) => {
     let response
     try {
       response =  await loginAccount(email,password);
      console.log("Login Response Data:", response.data);
      toast.success(response.message);
      dispatch(setUserData({ ...response.data!, role: 'user' }))
      dispatch(setUpdateUserField({ lmp: response.data!.lmp }));

      navigate('/dashboard',{replace:true})
     } catch (error) {
      
      console.log(error)
       toast.error(error.response?.data.message)
     }
     
  };

  const onGoogleSignIn = useGoogleAuthforRoles({
    role:'user',
    pathRedirect:'/dashboard',
    navigate,
    dispatch
  })

  const onForgotPassword = () => {};

  const onSignUpClick = () => {
    navigate("/");
  };

  return (
    <>
      <Login onSubmit={onSubmit} onGoogleSignIn={onGoogleSignIn}
      onForgotPassword={onForgotPassword}
      onSignUpClick={onSignUpClick} />
    </>
  );
};

export default LoginPage;
