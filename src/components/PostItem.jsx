import { Link } from "react-router-dom";
import PropTypes from "prop-types";

PostItem.propTypes = {
  isSingleColumn: PropTypes.bool,
  firstPost: PropTypes.bool,
  postData: PropTypes.object,
  blogPosts: PropTypes.array,
};

function PostItem({ isSingleColumn, firstPost, postData, blogPosts }) {
  return (
    <>
      <Link
        to={`post/${postData.id}`}
        className={`post-container ${isSingleColumn ? "sm:col-span-2" : ""} ${
          firstPost ? "sm:col-span-2" : ""
        } ${blogPosts.length === 1 && "sm:col-span-3"}`}
      >
        <img
          src={postData.url}
          alt={postData.title}
          className="image brightness-75 "
        />
        <div className="absolute left-4 bottom-5 px-3">
          <h3 className="font-medium opacity-[0.8]">{postData.title}</h3>
          <p className="sm:text-[1.5rem] font-semibold text-[1.1rem]">
            {postData.headingTitle}
          </p>
          <time>{postData.datePosted}</time>
        </div>
      </Link>
    </>
  );
}

export default PostItem;
