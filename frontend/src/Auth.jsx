import {useState, useEffect} from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthCard from "./components/Auth/AuthCard";
import { isAuthenticated } from "./utils/auth";

function Auth(){
    const location = useLocation();
    const [isLogin, setIsLogin]= useState(true);

    useEffect(() => {
        if (location.state?.isLogin !== undefined) {
            setIsLogin(location.state.isLogin);
        }
    }, [location.state]);

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