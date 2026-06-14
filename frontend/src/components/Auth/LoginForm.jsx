function LoginForm({ setIsLogin }) {
  return (
    <>
      <h1 className="login-title">Sign In</h1>
      <p className="login-sub-title">Welcome back, Builder</p>
      <div className="inputgroup">
        <label>Email</label>
        <input type="email" placeholder="you@vitstudent.ac.in" />
      </div>
      <div className="inputgroup">
        <label>Password</label>
        <input type="password" placeholder="Password" />
      </div>
      <button className="loginbtn">Login</button>

      <p className="auth-footer">
        New here?{" "}
        <span onClick={() => setIsLogin(false)} className="auth-link">
          Create an Account
        </span>
      </p>
    </>
  );
}
export default LoginForm;
