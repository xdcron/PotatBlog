import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLoginSignUp } from "../contexts/LoginSignUpContext";

function useGetPostData() {
  const { blogPosts } = useLoginSignUp();
  const { id } = useParams();
  const [postData, setPostData] = useState(() => {
    const [data] = blogPosts.filter((post) => id === post.id);
    return data;
  });

  useEffect(() => {
    const [data] = blogPosts.filter((post) => id === post.id);
    setPostData(data);
  }, [blogPosts, id]);

  return { postData };
}

export { useGetPostData };
