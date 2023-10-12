import { useState } from "react";
import { useLoginSignUp } from "../contexts/LoginSignUpContext";
import { addDoc } from "firebase/firestore";
import { storage } from "../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import InputField from "./InputField";
import Button from "./Button";
import CreatePostNav from "./CreatePostNav";
import PostingSpinner from "./PostingSpinner";

import { FaPlus } from "react-icons/fa";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [headingTitle, setHeadingTitle] = useState("");
  const [content, setContent] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { isAdmin, blogPostReference, datePosted } = useLoginSignUp();
  console.log(datePosted);

  async function createNewPost(e) {
    e.preventDefault();
    const maxTitleWords = title.split(" ");
    const maxHeadingTitleWords = headingTitle.split(" ");

    try {
      if (maxTitleWords.length > 12) return alert("Too many words");
      if (maxHeadingTitleWords.length > 9) return alert("Too many words");
      if (postImage === null) return alert("No Image Chosen");
      if (title === "") return alert("Please Enter a Title");
      if (headingTitle === "") return alert("Please Enter a Heading Title");
      if (content === "") return alert("Body/Content is empty");

      setIsLoading(true);
      const id = v4();
      const imageRef = ref(storage, `Images/${postImage.name + v4()}`);
      await uploadBytes(imageRef, postImage);
      const url = await getDownloadURL(imageRef);

      await addDoc(blogPostReference, {
        title,
        headingTitle,
        content,
        datePosted,
        comments: [],
        id,
        url,
        path: imageRef._location.path_,
      });

      setIsLoading(false);
      alert("Posted Successfully!");
      window.location.href = "/";
    } catch (err) {
      console.error(err.message);
    }
    setTitle("");
    setHeadingTitle("");
    setContent("");
  }

  return (
    <>
      {isAdmin && (
        <>
          <CreatePostNav />
          <main className="flex justify-center items-center">
            <section className="mt-18">
              <h1 className="text-center font-bold text-[1.5rem] ">
                Create A New Post!
              </h1>
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
                <Button onClick={createNewPost} className="self-end btn-nav">
                  {isLoading ? <PostingSpinner /> : "Post"}
                </Button>
              </form>
            </section>
          </main>
        </>
      )}
    </>
  );
}

export default CreatePost;
