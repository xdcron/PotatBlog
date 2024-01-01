import { FaBars, FaTimes } from "react-icons/fa";
import Button from "./Button";
import { useState } from "react";
import UserSignedIn from "./UserSignedIn";
import { useLoginSignUp } from "../contexts/LoginSignUpContext";
import { FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Links() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { currUser, isAdmin, blogPosts } = useLoginSignUp();

  const handleRedirect = (path) => {
    // Use navigate with replace option to replace the current path
    navigate(path, { replace: true });
  };

  function handleShowMenu() {
    setShowMenu(!showMenu);
  }

  return (
    <>
      <ul
        className={`${
          showMenu
            ? "fixed  top-4 w-[60%] p-5 pt-8 md:hidden flex flex-col items-center bg-white justify-center right-0 "
            : ""
        } ${!showMenu && "hidden"} md:flex gap-3`}
      >
        {showMenu && (
          <FaTimes
            size="20"
            onClick={handleShowMenu}
            className="absolute top-2 right-3"
          />
        )}

        <li>
          {currUser ? (
            <UserSignedIn />
          ) : (
            <Button
              onClick={() => handleRedirect("/login")}
              className="btn-nav"
            >
              Login
            </Button>
          )}
        </li>
        <li>
          {isAdmin && blogPosts.length !== 0 && (
            <Button
              onClick={() => handleRedirect("/createpost")}
              className="btn-nav flex items-center gap-2"
            >
              Add Post <FaPen />
            </Button>
          )}
        </li>
      </ul>
      <Button className={`md:hidden`} onClick={handleShowMenu}>
        <FaBars size="20" />
      </Button>
    </>
  );
}

export default Links;
