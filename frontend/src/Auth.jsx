import {useState} from "react";
import AuthCard from "./components/Auth/AuthCard";

function Auth(){
    const [isLogin, setIsLogin]= useState(true);

    return(
        <div className="auth-page">
            <AuthCard isLogin={isLogin} setIsLogin={setIsLogin} />
        </div>
    );
}
export default Auth;