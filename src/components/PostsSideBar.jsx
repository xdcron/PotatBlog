import { useParams } from "react-router-dom";
import { useLoginSignUp } from "../contexts/LoginSignUpContext";
import PostSideBarItem from "./PostSideBarItem";

function PostsSideBar() {
  const { blogPosts } = useLoginSignUp();
  const { id } = useParams();

  const sideBarPosts = blogPosts.filter((posts) => posts.id !== id);

  return (
    <div className=" flex flex-col items-start self-start sm:px-14 min-w-[300px]  sm:w-[700px]  md:w-[900px]">
      <h2 className="text-[2rem] font-bold ">
        {sideBarPosts.length > 0 && "Other Posts"}
      </h2>
      <ul className="flex flex-col py-3 gap-6">
        {sideBarPosts.map((post) => (
          <PostSideBarItem post={post} key={post.id} />
        ))}
      </ul>
    </div>
  );
}

export default PostsSideBar;
