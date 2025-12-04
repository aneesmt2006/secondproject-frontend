import Login from "../components/Login";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const handleLogin = (email: string, password: string) => {
    console.log("Email :", email);
    console.log("password :", password);
  };

  const movetoSignup = () => navigate("/");
  const movetoForgot = () => navigate("/forgot-password");
  const googleSigning = () => navigate("/google-signing");

  return (
    <>
      <Login
        onSubmit={handleLogin}
        onSignUpClick={movetoSignup}
        onForgotPassword={movetoForgot}
        onGoogleSignIn={googleSigning}
      />
    </>
  );
};

export default LoginPage;
