import { FaGithub } from "react-icons/fa";

function Socials() {
  return (
    <div className="flex gap-4">
      <a
        href="https://github.com/xdcron"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaGithub size="28" />
      </a>
    </div>
  );
}

export default Socials;
