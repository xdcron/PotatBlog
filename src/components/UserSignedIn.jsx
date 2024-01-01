import { useLoginSignUp } from "../contexts/LoginSignUpContext";
import Button from "./Button";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

function UserSignedIn() {
  const { currUser } = useLoginSignUp();

  const photoURL = currUser?.photoURL;
  const dislpayName = currUser?.displayName?.split(" ");

  async function LogOut() {
    try {
      await signOut(auth);
      window.location.href = "/";
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="md:flex flex md:flex-row items-center flex-col gap-2">
      <figure className="w-[30px] h-[30px]">
        <img
          className="rounded-full w-full h-full"
          src={photoURL ? photoURL : "default-img.png"}
          alt={dislpayName}
        />
      </figure>
      <span
        style={{ fontFamily: "Caveat" }}
        className="capitalize text-[1.2rem] font-extrabold"
      >
        Hello, {dislpayName[0]}
      </span>
      <Button className="btn-nav" onClick={LogOut}>
        Sign Out
      </Button>
    </div>
  );
}

export default UserSignedIn;
