import { FaGoogle } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import FormBody from "./FormBody";
import HorizontalRule from "./HorizontalRule";
import InputField from "./InputField";

import Loaderspinner from "./Loaderspinner";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useLoginSignUp } from "../contexts/LoginSignUpContext";
import { auth } from "../firebase/firebase";

function SignUpForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle } = useLoginSignUp();

  function handleBack(e) {
    e.preventDefault();
    navigate(-1);
  }

  async function registerUser(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const user = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user.user, { displayName: username });
      setIsLoading(false);
      navigate("/");
    } catch (err) {
      console.error(err.message);
    }
  }

  function googleSignIn(e) {
    e.preventDefault();
    signInWithGoogle();
  }

  return (
    <div>
      <>
        {isLoading ? (
          <Loaderspinner />
        ) : (
          <>
            <h1 className="text-center text-[1.8rem] font-semibold mb-2">
              Create an Account
            </h1>
            <FormBody onSubmit={registerUser}>
              <div className="flex flex-col gap-2 mb-2">
                <InputField
                  setValue={setUsername}
                  label="Username"
                  type="text"
                  placeholder="Enter Username..."
                />
                <InputField
                  setValue={setEmail}
                  label="Email"
                  type="email"
                  placeholder="Enter your email..."
                />
                <InputField
                  setValue={setPassword}
                  label="Password"
                  type="password"
                  placeholder="Enter your password..."
                />
                <Button className="btn-log">Create Account</Button>
              </div>
              <HorizontalRule />
              <Button onClick={googleSignIn} className="google">
                <FaGoogle size={22} /> Continue with Google
              </Button>
            </FormBody>
            <div className="flex items-center justify-between text-[0.9rem]">
              <p className="flex items-center gap-2 text-[0.9rem] py-2">
                Already have an account?
                <Link
                  className=" underline  underline-offset-4"
                  onClick={handleBack}
                >
                  Login here
                </Link>
              </p>
              <Link className="underline underline-offset-4" to="/">
                Home
              </Link>
            </div>
          </>
        )}
      </>
    </div>
  );
}

export default SignUpForm;
