import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link
      style={{ fontFamily: "Poppins" }}
      to="/"
      className="font-extrabold text-[1.7rem]"
    >
      Caleb
    </Link>
  );
}

export default Logo;
