import PropTypes from "prop-types";
import { useLoginSignUp } from "../contexts/LoginSignUpContext";
import Button from "./Button";
import { db } from "../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useGetPostData } from "../hooks/useGetPostData";
import PostingSpinner from "./PostingSpinner";

Comment.propTypes = {
  comment: PropTypes.object,
  setCommentList: PropTypes.func,
  commentList: PropTypes.array,
};

function Comment({ comment, setCommentList, commentList }) {
  const [isLoading, setIsLoading] = useState(false);
  const { datePosted, currUser } = useLoginSignUp();
  const { postData } = useGetPostData();
  const ownsComment = comment?.uid === currUser?.uid;

  async function handleDeleteComment(e) {
    e.preventDefault();

    try {
      setIsLoading(true);
      const newList = commentList.filter((comm) => comm.id !== comment.id);
      const commentDoc = doc(db, "Blog Posts", postData.id);
      const updateComments = { comments: newList };
      await updateDoc(commentDoc, updateComments);
      setIsLoading(false);
      if (!isLoading) setCommentList(newList);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="mb-3 flex flex-col gap-2 items-start sm:flex-row sm:flex sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <figure className="w-[32px] h-[32px]">
          <img
            className="w-full h-full rounded-full"
            src={comment.photoURL ? comment.photoURL : "default-img.png"}
            alt={comment.displayName}
          />
        </figure>
        <div className="text-[0.9rem]">
          <div className="flex items-center gap-2">
            <h3 className="font-bold ">{comment.displayName}</h3>
            <time className="text-[0.7rem]">{datePosted}</time>
          </div>
          <p className="font-semibold">{comment.comment}</p>
        </div>
      </div>
      {ownsComment && (
        <Button
          onClick={handleDeleteComment}
          className="text-[0.9rem] text-white py-1 px-2 hover:bg-red-500 rounded bg-red-600 font-medium "
        >
          {isLoading ? <PostingSpinner /> : "Delete"}
        </Button>
      )}
    </div>
  );
}

export default Comment;
