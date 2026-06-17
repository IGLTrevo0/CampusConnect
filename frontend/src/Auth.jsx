import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthCard from "./components/Auth/AuthCard";
import { isAuthenticated } from "./utils/auth";

function Auth() {
  const location = useLocation();
  const isLoginFromState = location.state?.isLogin;
  const [isLogin, setIsLogin] = useState(isLoginFromState ?? true);
  const [prevIsLoginState, setPrevIsLoginState] = useState(isLoginFromState);

  if (isLoginFromState !== undefined && isLoginFromState !== prevIsLoginState) {
    setPrevIsLoginState(isLoginFromState);
    setIsLogin(isLoginFromState);
  }

  if (isAuthenticated()) {
    return <Navigate to="/search" replace />;
  }

  return (
    <div className="auth-page">
      <AuthCard isLogin={isLogin} setIsLogin={setIsLogin} />
    </div>
  );
}

export default Auth;
