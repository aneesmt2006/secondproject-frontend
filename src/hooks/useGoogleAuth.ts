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
}: googleAuthforRolesProps): (() => void) => {
  const ResponseGoogle = async (authResult: GoogleAuthResult) => {
    
    try {
      if (authResult["code"]) {
        const response = await googleAuth(authResult.code, role);
        
        if (response.data && role === "user") {
          localStorage.setItem('email', String(response.data.email || ""));
        }

        dispatch(setUserData({ ...response.data!, role: role as any }));

        if (role === "user") {
          // Sync profile data from medical service to get updated LMP
          try {
            const profileResponse = await getUserProfile();
            if (profileResponse.data) {
              dispatch(setUpdateUserField({ lmp: profileResponse.data.lmp }));
            }
          } catch (profileError) {
            console.error("Error syncing profile after Google login:", profileError);
          }
        }

        toast.success(response.message);
        navigate(`${pathRedirect}`, { replace: true });
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
