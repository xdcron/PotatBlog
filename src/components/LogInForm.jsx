import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import InputField from "./InputField";
import HorizontalRule from "./HorizontalRule";
import Button from "./Button";
import FormBody from "./FormBody";
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import Loaderspinner from "./Loaderspinner";
import { useLoginSignUp } from "../contexts/LoginSignUpContext";

function LogInForm() {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle } = useLoginSignUp();

  async function LoginUser(e) {
    e.preventDefault();
    try {
      if (!loginEmail || !loginPassword)
        return alert("email or password field is empty");
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      if (user) setIsLoading(true);

      setIsLoading(false);
      navigate("/");
    } catch (err) {
      if (err.message === "Firebase: Error (auth/invalid-login-credentials).") {
        alert(
          "Account does not exist, please create an account or continue with Google."
        );
        setLoginEmail("");
        setLoginPassword("");
      }
    }
  }

  function googleSignIn(e) {
    e.preventDefault();
    signInWithGoogle();
  }

  return (
    <div>
      {isLoading ? (
        <Loaderspinner />
      ) : (
        <>
          <h1 className="text-center text-[1.8rem] font-semibold mb-2">
            Sign In
          </h1>
          <FormBody>
            <div className="flex flex-col gap-2 mb-5">
              <InputField
                value={loginEmail}
                setValue={setLoginEmail}
                label="Email"
                type="email"
                placeholder="Enter your email..."
              />
              <InputField
                value={loginPassword}
                setValue={setLoginPassword}
                label="Password"
                type="password"
                placeholder="Enter your password..."
              />
              <Button onClick={LoginUser} className="btn-log">
                Login
              </Button>
            </div>
            <HorizontalRule />
            <Button onClick={googleSignIn} className="google">
              <FaGoogle size={22} /> Continue with Google
            </Button>
          </FormBody>
          <div className="flex items-center justify-between text-[0.9rem]">
            <p className="flex items-center gap-2  py-2">
              Dont have an account?
              <Link className=" underline underline-offset-4" to="signup">
                Sign up here
              </Link>
            </p>
            <Link className="underline underline-offset-4" to="/">
              Home
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default LogInForm;
