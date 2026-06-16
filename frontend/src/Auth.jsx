import {useState} from "react";
import { Navigate } from "react-router-dom";
import AuthCard from "./components/Auth/AuthCard";
import { isAuthenticated } from "./utils/auth";

function Auth(){
    const [isLogin, setIsLogin]= useState(true);

    if (isAuthenticated()) {
        return <Navigate to="/search" replace />;
    }

    return(
        <div className="auth-page">
            <AuthCard isLogin={isLogin} setIsLogin={setIsLogin} />
        </div>
    );
}
export default Auth;