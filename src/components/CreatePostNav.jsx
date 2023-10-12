import CreatePostLink from "./CreatePostLinks";
import Logo from "./Logo";

function CreatePostNav() {
  return (
    <nav className="py-6 px-10 flex justify-between">
      <Logo />
      <CreatePostLink />
    </nav>
  );
}

export default CreatePostNav;
