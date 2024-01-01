import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";

PostSideBarItem.propTypes = {
  post: PropTypes.object,
};

function PostSideBarItem({ post }) {
  const navigate = useNavigate();

  // function handlePost() {
  //   localStorage.setItem("post", JSON.stringify(post));
  //   navigate(`/post/${post.id}`, { replace: true });
  //   window.location.reload();
  // }

  return (
    <Link
      to={`/post/${post.id}`}
      className="cursor-pointer flex items-center gap-2 border-b-4 max-w-[400px] min-h-[100px] min-w-[300px] border-black pb-3"
    >
      <figure className=" min-w-[100px] h-[100px]">
        <img
          className="rounded-md w-full h-full object-cover"
          src={post.url}
          alt={post.title}
        />
      </figure>
      <div>
        <h2 className="font-bold ">{post.title}</h2>
        <p className=" text-[0.9rem]">{post.headingTitle}</p>
        <time className="text-[0.7rem] opacity-[0.8] ">{post.datePosted}</time>
      </div>
    </Link>
  );
}

export default PostSideBarItem;
