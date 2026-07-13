import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import ErrorToast from "./ErrorToast";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data?.data));
      navigate("/");
    } catch (err) {
      if (err.response) {
        // server responded with an oror (e.g. wrong credentials)
        setError(err.response.data || "Invalid email or password.");
      } else if (err.request) {
        // request sent, no response came back
        setError("Network error — please check your connection.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true },
      );
      dispatch(addUser(res?.data?.data));
      navigate("/profile");
    } catch (err) {
      if (err.response) {
        // server responded with an oror (e.g. wrong credentials)
        setError(err.response.data || "Sign up failed.");
      } else if (err.request) {
        // request sent, no response came back
        setError("Network error — please check your connection.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };
  return (
    <div className="flex justify-center my-10">
      <ErrorToast error={error} />
      <div className="card bg-base-300 w-96 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>
          {!isLoginForm && (
            <>
              {" "}
              <fieldset className="fieldset">
                <label className="label" htmlFor="firstName">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="input"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </fieldset>
              <fieldset className="fieldset">
                <label className="label" htmlFor="lastName">
                  last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="input"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </fieldset>
            </>
          )}{" "}
          <fieldset className="fieldset">
            <label className="label" htmlFor="email">
              Email Id
            </label>
            <input
              type="text"
              id="email"
              className="input"
              value={emailId}
              onChange={(e) => {
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
                setPassword(e.target.value);
              }}
            />
          </fieldset>
          <div className="card-actions flex justify-center my-5">
            <button
              className="btn btn-primary"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>
          <p
            className=" mx-auto py-5 cursor-pointer"
            onClick={() => setIsLoginForm(!isLoginForm)}
          >
            {isLoginForm ? "New User ? Sign Up" : "Existing user ? Login here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
