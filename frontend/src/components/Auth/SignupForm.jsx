function SignUpForm({ setIsLogin }) {
    const currentYear= new Date().getFullYear();
  return (
    <>
      <h1 className="signup-title">Create Account</h1>
      <p className="signup-sub-title">Show what you build. Find your people</p>
      <div className="inputgroup">
        <label>Full Name</label>
        <input type="text" placeholder="John Doe" />
      </div>
      <div className="input-row">
        <div className="inputgroup">
          <label>Email</label>
          <input type="email" placeholder="you@vitstudent.ac.in" />
        </div>
        <div className="inputgroup">
          <label>Password</label>
          <input type="password" placeholder="min 6 char" />
        </div>
      </div>
      <div className="inputgroup">
        <label>Department</label>
        <input type="text" placeholder="e.g. Computer Science" />
      </div>
      <div className="inputgroup">
        <label>Graduation Year</label>
        <select>
          <option value="">Graduation Year</option>
          {[...Array(11)].map((_,i) => (<option key={currentYear-5+i} value={currentYear-5+i}>
            {currentYear-5+i}
          </option>))}
        </select>
      </div>
      <button className="signupbtn">Create Account</button>

      <p className="auth-footer">
        Already got an account?{" "}
        <span onClick={() => setIsLogin(true)} className="auth-link">
          Sign In
        </span>
      </p>
    </>
  );
}
export default SignUpForm;
