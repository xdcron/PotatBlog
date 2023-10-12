import { FaBars, FaTimes } from "react-icons/fa";

import Button from "./Button";
import { useState } from "react";
import UserSignedIn from "./UserSignedIn";

function CreatePostLink() {
  const [showMenu, setShowMenu] = useState(false);

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
        } ${!showMenu && "hidden"} md:flex gap-4`}
      >
        {showMenu && (
          <FaTimes
            size="20"
            onClick={handleShowMenu}
            className="absolute top-2 right-3"
          />
        )}

        <li>
          <UserSignedIn />
        </li>
      </ul>
      <Button className={`md:hidden`} onClick={handleShowMenu}>
        <FaBars size="20" />
      </Button>
    </>
  );
}

export default CreatePostLink;
