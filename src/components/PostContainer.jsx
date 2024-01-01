import { useEffect, useState } from "react";
import { FaThList } from "react-icons/fa";
import { useLoginSignUp } from "../contexts/LoginSignUpContext";
import PostItem from "./PostItem";
import Loaderspinner from "./Loaderspinner";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function PostContainer() {
  const navigate = useNavigate();
  const maxImageDisplay = 5;
  const [showMore, setShowMore] = useState(maxImageDisplay);
  const [isSingleColumn, setIsSingleColumn] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);
  const [showLayoutChange, setShowLayoutChange] = useState(false);
  const { blogPosts, isLoading, isAdmin } = useLoginSignUp();
  const smallScreen = 790;
  const shouldShowMore = showMore === maxImageDisplay;

  useEffect(() => {
    async function showLayout() {
      await blogPosts;
      setShowLayoutChange(blogPosts.length > 1 && screenWidth > smallScreen);
    }
    showLayout();
  }, [blogPosts, showLayoutChange, screenWidth]);

  useEffect(() => {
    function getCurrentScreenWidth() {
      const screen = window.innerWidth;
      setScreenWidth(screen);
    }

    // Initial call to get the screen width
    getCurrentScreenWidth();

    // Event listener to update screen width on resize
    window.addEventListener("resize", getCurrentScreenWidth);
  }, [screenWidth]);

  function handleColumn() {
    setIsSingleColumn(!isSingleColumn);
  }

  const handleRedirect = (path) => {
    // Use navigate with replace option to replace the current path
    navigate(path, { replace: true });
  };

  function handleShowMore() {
    setShowMore(shouldShowMore ? blogPosts.length : maxImageDisplay);
  }

  if (isLoading) return <Loaderspinner />;

  return (
    <main className="py-8 px-6 md:px-12 ">
      <div className="p-3 flex justify-between">
        {blogPosts.length !== 0 && (
          <span className="font-semibold">
            {blogPosts.length} {blogPosts.length === 1 ? "Post" : "Posts"}
          </span>
        )}
        {showLayoutChange && (
          <FaThList
            className="cursor-pointer mb-3"
            onClick={handleColumn}
            size="24"
            color={isSingleColumn ? "grey" : "black"}
          />
        )}
      </div>

      <div>
        {blogPosts.length === 0 && isAdmin && (
          <div className="w-full flex justify-center">
            <Button
              onClick={() => handleRedirect("/createpost")}
              className="text-[0.8rem]  md:text-[1rem] btn-nav "
            >
              Add Your First Post
            </Button>
          </div>
        )}

        {blogPosts.length === 0 && !isAdmin && (
          <p className="w-full text-center font-bold text-[1.1rem]">
            Caleb hasn&apos;t posted yet.
          </p>
        )}

        <section
          className={`grid grid-cols-1 sm:grid-cols-2  ${
            isSingleColumn ? "md:grid-cols-1" : "md:grid-cols-3"
          } gap-x-4 gap-y-6`}
        >
          {blogPosts.map(
            (post, i) =>
              i < showMore && (
                <PostItem
                  blogPosts={blogPosts}
                  postData={post}
                  isSingleColumn={isSingleColumn}
                  firstPost={i === 0}
                  key={i}
                />
              )
          )}
        </section>
        {blogPosts.length > maxImageDisplay && (
          <div className="mt-5">
            <Button className="btn-nav" onClick={handleShowMore}>
              {shouldShowMore ? "See All" : "Show Less"}
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}

export default PostContainer;
