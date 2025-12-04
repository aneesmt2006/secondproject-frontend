import { toast } from "sonner";
import { googleAuthforRolesProps } from "../features/registration/types/register.type"; 
import { googleAuth } from "../services/api/auth.service";
import { GoogleAuthResult } from "../features/registration/types/register.type";
import { useGoogleLogin } from "@react-oauth/google";
import { setUserData, setUpdateUserField } from "../features/registration/slice/userSlice";
import { getUserProfile } from "../services/api/medical.service";


export const useGoogleAuthforRoles = ({
  navigate,
  pathRedirect,
  role,
  dispatch
}: googleAuthforRolesProps) => {
  const ResponseGoogle = async (authResult: GoogleAuthResult) => {
    
    try {
      if (authResult["code"]) {
        console.log(authResult.code);
        let response;
        if (role === "user") {
          response = await googleAuth(authResult.code, role);
            if(response){
          localStorage.setItem('email',String(response.data))
         }
          // Fetch profile data
           try {
             const profileResponse = await getUserProfile();
             if (profileResponse.data) {
                dispatch(setUpdateUserField({ lmp: profileResponse.data.lmp }));
             }
           } catch (e) { console.error(e) }
        } else {
          response = await googleAuth(authResult.code, role);
        }
       

        
        dispatch(setUserData(response.data!))
        toast.success(response.message);
        navigate(`${pathRedirect}`,{replace:true});
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: ResponseGoogle,
    onError: ResponseGoogle,
    flow: "auth-code",
  });

  return googleLogin;
};
