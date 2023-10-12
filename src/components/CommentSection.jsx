import { useEffect, useState } from "react";
import Comment from "./Comment";
import Button from "./Button";
import { useLoginSignUp } from "../contexts/LoginSignUpContext";
import { useGetPostData } from "../hooks/useGetPostData";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { v4 } from "uuid";
import PostingSpinner from "./PostingSpinner";
import { FaComment } from "react-icons/fa";
import { BiCommentAdd } from "react-icons/bi";

function CommentSection() {
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const { currUser } = useLoginSignUp();
  const { postData } = useGetPostData();
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    async function getPostData() {
      await postData;
      setCommentList(postData.comments);
    }
    getPostData();
  }, [postData]);

  async function handleNewComment(e) {
    e.preventDefault();
    if (!currUser) return alert("Sign In to comment");
    if (newComment === "") return alert("Comment cant be empty");

    const commentObj = {
      user: currUser.uid,
      comment: newComment,
      displayName: currUser.displayName,
      photoURL: currUser.photoURL,
      uid: currUser.uid,
      id: v4(),
    };
    try {
      const newList = [...commentList, commentObj];
      setCommentList(newList);
      setIsLoading(true);
      setDisable(true);
      const commentDoc = doc(db, "Blog Posts", postData.id);
      const updateComments = { comments: [...newList] };
      await updateDoc(commentDoc, updateComments);
      setNewComment("");
      setIsLoading(false);
      setDisable(false);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="flex flex-col py-10 min-w-[300px]  sm:w-[700px]  md:w-[900px]">
      <div>
        <span className="font-bold">
          {!isLoading && commentList.length}{" "}
          {commentList.length === 1 ? "Comment" : "Comments"}
        </span>
        <form className="flex flex-col sm:flex-row sm:flex gap-3 sm:items-center py-5">
          <label className="flex flex-col gap-3 border-0 border-b-2 border-black f focus:outline-none">
            <span className="text-[1.1rem] font-semibold flex gap-2 items-center">
              Add Comment <FaComment />
            </span>
            <input
              disabled={disable}
              value={newComment}
              className="min-w-[300px] sm:w-[500px]  md:w-[650px] p-3 focus:outline-none "
              onChange={(e) => setNewComment(e.target.value)}
              type="text"
              placeholder="Add Comment..."
            />
          </label>
          <Button
            onClick={handleNewComment}
            className=" flex btn-nav self-start sm:self-end"
          >
            {isLoading ? <PostingSpinner /> : <BiCommentAdd size={20} />}
          </Button>
        </form>
      </div>
      <div className="mb-4">
        <h4>Comments:</h4>
      </div>
      {!isLoading &&
        commentList.map((comment) => (
          <Comment
            setCommentList={setCommentList}
            commentList={commentList}
            comment={comment}
            key={comment.id}
          />
        ))}
    </div>
  );
}

export default CommentSection;
