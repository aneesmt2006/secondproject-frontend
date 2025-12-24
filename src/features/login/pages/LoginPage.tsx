import { useNavigate } from "react-router-dom";
import Login from "../components/Login";
import { loginAccount } from "../../../services/api/auth.service";
import { getUserProfile } from "../../../services/api/medical.service";
import { toast } from "sonner";
import { useGoogleAuthforRoles } from "../../../hooks/useGoogleAuth";
import { useAppDispatch } from "../../../store/hooks";
import { setUserData, setUpdateUserField } from "../../registration/slice/userSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()

  const onSubmit = async (email: string, password: string) => {
     try {
       const loginResponse = await loginAccount(email, password);
       console.log("Login Response Data:", loginResponse.data);
       toast.success(loginResponse.message);
       
       dispatch(setUserData({ ...loginResponse.data!, role: 'user' }));

       // Sync profile data from medical service to get updated LMP and other details
       try {
         const profileResponse = await getUserProfile();
         if (profileResponse.data) {
           dispatch(setUpdateUserField({ lmp: profileResponse.data.lmp }));
         }
       } catch (profileError) {
         console.error("Error syncing profile after login:", profileError);
         // Fallback to login response LMP if profile fetch fails
         if (loginResponse.data?.lmp) {
           dispatch(setUpdateUserField({ lmp: loginResponse.data.lmp }));
         }
       }

       navigate('/dashboard', { replace: true });
     } catch (error) {
       console.log(error);
       toast.error(error.response?.data?.message || "Login failed");
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
      <Login 
        onSubmit={(email, password) => onSubmit(email, password)} 
        onGoogleSignIn={() => onGoogleSignIn()}
        onForgotPassword={onForgotPassword}
        onSignUpClick={onSignUpClick} 
      />
    </>
  );
};

export default LoginPage;
