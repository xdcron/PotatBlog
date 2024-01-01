import PropTypes from "prop-types";
import Nav from "./Nav";
import PostsSideBar from "./PostsSideBar";
import CommentSection from "./CommentSection";
import { useGetPostData } from "../hooks/useGetPostData";
import Button from "./Button";
import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../firebase/firebase";
import { useState } from "react";
import Loaderspinner from "./Loaderspinner";
import Footer from "./Footer";
import { useLoginSignUp } from "../contexts/LoginSignUpContext";
import { deleteObject, ref } from "firebase/storage";
import { FaEdit } from "react-icons/fa";
import Edit from "./Edit";

Post.propTypes = {
  postData: PropTypes.object,
};

function Post() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { postData } = useGetPostData();
  const { isAdmin } = useLoginSignUp();

  const renderContent = () => {
    if (!postData) return;

    const paragraphs = postData.content.split("\n\n");

    return (
      <div>
        {paragraphs.map((paragraph, index) => {
          if (paragraph.startsWith("- ")) {
            // Render a bullet point
            return (
              <ul key={index}>
                <li>{paragraph.substr(2)}</li>
              </ul>
            );
          } else {
            // Render a regular paragraph
            return (
              <p className="mb-6" key={index}>
                {paragraph}
              </p>
            );
          }
        })}
      </div>
    );
  };

  async function handleDeletePost(postToBeDeleteId) {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!isConfirmed) return;
    setIsLoading(true);
    const imageRef = ref(storage, postData.path);
    await deleteObject(imageRef);
    const postDoc = doc(db, "Blog Posts", postToBeDeleteId);
    await deleteDoc(postDoc);
    setIsLoading(false);
    window.location.href = "/";
  }

  function handleEdit() {
    setIsEdit(true);
  }

  if (!postData) return;

  return (
    <>
      <Nav />
      {isLoading ? (
        <div className="flex gap-2 items-center w-full justify-center">
          <p>Deleting Post</p>
          <Loaderspinner />
        </div>
      ) : (
        <>
          {isEdit ? (
            <Edit postData={postData} isEdit={setIsEdit} />
          ) : (
            <main className="relative flex flex-col gap-4 items-center  py-3 px-5 ">
              {isAdmin && (
                <div className="w-full flex gap-2 justify-center sm:justify-end">
                  <Button
                    onClick={handleEdit}
                    className="btn-nav flex items-center gap-1 self-end sm:mr-4 text-[0.6rem] sm:text-[0.8rem] md:text-[1rem] "
                  >
                    Edit Post <FaEdit />
                  </Button>
                  <Button
                    onClick={() => handleDeletePost(postData.id)}
                    className="btn-del self-end sm:mr-4 text-[0.6rem] sm:text-[0.8rem] md:text-[1rem] "
                  >
                    Delete Post
                  </Button>
                </div>
              )}
              <div className="flex flex-col gap-4 items-center  py-1 px-5 ">
                <div className="flex flex-col items-center mb-1 w-full">
                  <h1
                    style={{ fontFamily: "Caveat" }}
                    className="text-[1.7rem] sm:text-[4rem] text-center font-bold"
                  >
                    {postData.title}
                  </h1>
                  <p className="text-center font-medium opacity-[0.8]">
                    {postData.headingTitle}
                  </p>
                  <time className=" text-[0.6rem] sm:text-[0.9rem] opacity-[0.8] ">
                    {postData.datePosted}
                  </time>
                </div>
                <figure className="min-w-[300px] h-[300px] sm:w-[700px] sm:h-[350px] md:w-[900px] md:h-[450px] ">
                  <img
                    className="image shadow-lg"
                    src={postData.url}
                    alt={postData.title}
                  />
                </figure>
                <article className="px-4 sm:px-10 md:px-36 py-7">
                  {renderContent()}
                </article>
              </div>
              <CommentSection />
              <PostsSideBar />
            </main>
          )}
          <Footer />
        </>
      )}
    </>
  );
}

export default Post;
