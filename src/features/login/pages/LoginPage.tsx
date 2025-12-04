import { useNavigate } from "react-router-dom";
import Login from "../components/Login";
import { loginAccount } from "../../../services/api/auth.service";
import { toast } from "sonner";
import { useGoogleAuthforRoles } from "../../../hooks/useGoogleAuth";
import { useAppDispatch } from "../../../store/hooks";
import { setUserData, setUpdateUserField } from "../../registration/slice/userSlice";
import { getUserProfile } from "../../../services/api/medical.service";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()

  const onSubmit = async (email: string, password: string) => {
     let response
     try {
       response =  await loginAccount(email,password);
      toast.success(response.message);
      dispatch(setUserData(response.data!))

      try {
        const profileResponse = await getUserProfile();
        if (profileResponse.data) {
          dispatch(setUpdateUserField({ lmp: profileResponse.data.lmp }));
        }
      } catch (error) {
        console.log("Error fetching profile on login:", error);
      }

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
