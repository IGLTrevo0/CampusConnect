import LoginForm from "./LoginForm";
import SignUpForm from "./SignupForm";
import "./Auth.css"

function AuthCard({ isLogin, setIsLogin}){
    return(
        <div className="auth-container">
        <div className="auth-card">
            {isLogin ? (<LoginForm setIsLogin={setIsLogin} />) : (<SignUpForm setIsLogin={setIsLogin} />)}
        </div>
        </div>
    );
}
export default AuthCard;