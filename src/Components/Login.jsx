import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [emailId, setEmailId] = useState("jahnabi@gmail.com");
  const [password, setPassword] = useState("Jahnabi@1010");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:7777/login",
        {
          emailId,
          password,
        },
        { withCredentials: true },
      );
      console.log("User logged in:", res.data);
    } catch (error) {
      console.log("Login failed - ERROR : ", error.message);
    }
  };
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <fieldset className="fieldset">
            <label className="label" htmlFor="email">
              EmailId
            </label>
            <input
              type="text"
              id="email"
              className="input"
              value={emailId}
              onChange={(e) => {
                console.log("Email typed:", e.target.value);
                setEmailId(e.target.value);
              }}
            />
          </fieldset>
          <fieldset className="fieldset">
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="input"
              value={password}
              onChange={(e) => {
                console.log("Password typed:", e.target.value);
                setPassword(e.target.value);
              }}
            />
          </fieldset>

          <div className="card-actions justify-center my-5">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
