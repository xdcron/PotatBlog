import { useState } from "react";
import InputField from "./InputField";
import { FaPlus } from "react-icons/fa";
import PostingSpinner from "./PostingSpinner";
import Button from "./Button";

import PropTypes from "prop-types";
import { db, storage } from "../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { v4 } from "uuid";
import { useLoginSignUp } from "../contexts/LoginSignUpContext";

Edit.propTypes = {
  postData: PropTypes.object,
  isEdit: PropTypes.func,
};

function Edit({ postData, isEdit }) {
  const [title, setTitle] = useState(postData.title);
  const [headingTitle, setHeadingTitle] = useState(postData.headingTitle);
  const [content, setContent] = useState(postData.content);
  const [postImage, setPostImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { datePosted } = useLoginSignUp();

  async function handlePrevImage() {
    const imageRef = ref(storage, postData.path);
    await deleteObject(imageRef);
  }

  async function editPost(e) {
    e.preventDefault();

    const maxTitleWords = title.split(" ");
    const maxHeadingTitleWords = headingTitle.split(" ");

    try {
      if (maxTitleWords.length > 12) return alert("Too many words");
      if (maxHeadingTitleWords.length > 9) return alert("Too many words");

      setIsLoading(true);
      if (postImage !== null) {
        handlePrevImage();
      }
      const imageRef = postImage
        ? ref(storage, `Images/${postImage?.name + v4()}`)
        : null;
      if (postImage) await uploadBytes(imageRef, postImage);
      const url = postImage ? await getDownloadURL(imageRef) : postData.url;

      const postDoc = doc(db, "Blog Posts", postData.id);
      const updatePost = {
        title,
        headingTitle,
        content,
        path: postImage === null ? postData.path : imageRef._location.path_,
        url,
        datePosted,
      };
      await updateDoc(postDoc, updatePost);
      setIsLoading(false);
      window.location.reload();
      isEdit(false);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <main className="flex justify-center items-center">
      <section className="mt-18">
        <h1 className="text-center font-bold text-[1.5rem] ">Edit Post</h1>
        <form className="flex flex-col gap-3">
          <label className="flex items-center cursor-pointer mt-4 gap-2 font-semibold btn-nav self-start">
            Upload Photo <FaPlus />
            <input
              className="hidden"
              onChange={(e) => {
                setPostImage(e.target.files[0]);
              }}
              type="file"
            />
          </label>
          {postImage ? <p>{postImage.name}</p> : null}
          <InputField
            value={title}
            className="self-start"
            type="text"
            label="Title"
            placeholder="Your title..."
            setValue={setTitle}
          />
          <InputField
            value={headingTitle}
            className="self-start"
            type="text"
            label="Heading Text"
            placeholder="Your heading title..."
            setValue={setHeadingTitle}
          />
          <label className="flex flex-col gap-2 font-semibold">
            Content
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              name="content"
              id="content"
              className="w-[300px] p-2 sm:w-[390px] md:w-[500px] min-h-[280px] border-2 border-black rounded-md"
            ></textarea>
          </label>
          <Button onClick={editPost} className="self-end btn-nav">
            {isLoading ? <PostingSpinner /> : "Post"}
          </Button>
        </form>
      </section>
    </main>
  );
}

export default Edit;
