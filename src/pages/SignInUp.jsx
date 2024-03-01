import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignInUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signState, setSignState] = useState(false);
  // const navigate = useNavigate();

  // const SignInSuccessToast = () => toast.success("Signin successfull");
  // const SignUpSuccessToast = () => toast.success("Signup successfull");
  // const SignInErrorToast = () =>
  //   toast.success("Error during signin: Request failed with status code 401");

  function swithState() {
    if (signState) setSignState(false);
    else setSignState(true);
  }

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const userData = {
      username: username,
      password: password,
      email: email,
    };

    axios
      .post("https://fakestoreapi.com/auth/login", userData)
      .then((response) => {
        if (response.status === 200) {
          // SignInSuccessToast();
          // toast.success("Signin successfull", { autoClose: 5000 });
          // toast.success("Signin successful!", {
          //   position: "top-right",
          //   autoClose: 5000, // Close the toast after 5000 milliseconds (5 seconds)
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          // });
          localStorage.setItem("isLogin", true);
          setTimeout(() => {
            location.replace("/");
          }, 500);
          localStorage.setItem("toastMessage", "Signin successful!");
        }
      })
      .catch((error) => {
        // SignInErrorToast();
        // toast.error(
        //   "Error during signin: Request failed with status code 401",
        //   { autoClose: 5000 }
        // );
        toast.error(
          "Error during signin: Request failed with status code 401",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
        console.error("Error:", error);
      });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const userData = {
      username: username,
      password: password,
      email: email,
    };

    axios
      .post("https://fakestoreapi.com/users", userData)
      .then((response) => {
        if (response.status === 200) {
          // SignUpSuccessToast();
          // toast.success("Signup successfull", { autoClose: 5000 });
          // toast.success("Signup successful!", {
          //   position: "top-right",
          //   autoClose: 5000, // Close the toast after 5000 milliseconds (5 seconds)
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          // });
          localStorage.setItem("isLogin", true);
          // setTimeout(() => {
          //   location.replace("/");
          // }, 500);
          location.replace("/");
          localStorage.setItem("toastMessage", "Signup successful!");
          // navigate("/");
          // <Link to={"/"} />;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const isDisabledSignInButton = !username || !password || isSubmitting;
  const isDisabledSignUpButton =
    !username || !password || !email || isSubmitting;

  return (
    <>
      <div className="signinup-container" style={{ display: "block" }}>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
          integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
          crossOrigin="anonymous"
        />

        <div
          className={`container ${signState ? "right-panel-active" : ""}`}
          style={{
            background: "#fff",
            borderRadius: "10px",
            boxShadow:
              "0 14px 28px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2)",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            overflow: "hidden",
            width: "768px",
            maxWidth: "100%",
            minHeight: "480px",
          }}
          id="container"
        >
          <div className="form-container sign-up-container">
            <h1 className="logo-sign">Fakecommerce</h1>
            <form onSubmit={handleSignUp}>
              <h1 className="h1">Create Account</h1>
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              <button className="button" disabled={isDisabledSignUpButton}>
                {isSubmitting ? "Loading..." : "Sign Up"}
              </button>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <h1 className="logo-sign">Fakecommerce</h1>
            <form onSubmit={handleSignIn}>
              <h1 className="h1">Sign in</h1>
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              <button className="button" disabled={isDisabledSignInButton}>
                {isSubmitting ? "Loading..." : "Sign In"}
              </button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1 className="h1">Welcome Back!</h1>
                <p className="p">
                  To keep connected with us please login with your personal info
                </p>
                <button className="button ghost" onClick={swithState}>
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1 className="h1">Hello, Friend!</h1>
                <p className="p">
                  Enter your personal details and start the journey with us
                </p>
                <button className="button ghost" onClick={swithState}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
