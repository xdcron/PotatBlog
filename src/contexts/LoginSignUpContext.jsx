import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { provider } from "../firebase/firebase";
import { signInWithPopup } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import PropTypes from "prop-types";

LoginSignUpProvider.propTypes = {
  children: PropTypes.element,
};

const LoginSignUpContext = createContext();

function LoginSignUpProvider({ children }) {
  // useStates
  const [blogPosts, setBlogPosts] = useState([]);
  const [currUser, setCurrUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [blogPostReference, setBlogPostReference] = useState(null);
  const datePosted = getCurrentFormattedDate();

  // UseEffects
  useEffect(() => {
    async function getPosts() {
      const blogPostRef = collection(db, "Blog Posts");
      setBlogPostReference(blogPostRef);
      try {
        setIsLoading(true);
        const postData = await getDocs(blogPostRef);
        setBlogPosts(
          postData.docs.map((post) => ({ ...post.data(), id: post.id }))
        );
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    }
    getPosts();
  }, []);

  useEffect(() => {
    async function handleAdmin() {
      if (
        currUser?.uid === import.meta.env.VITE_ADMINUID ||
        currUser?.uid === import.meta.env.VITE_TESTADMINUID
      )
        setIsAdmin(true);
      else setIsAdmin(false);
    }
    handleAdmin();
  }, [currUser?.uid]);

  function signInWithGoogle() {
    signInWithPopup(auth, provider)
      .then(() => {
        window.location.href = "/";
      })
      .catch((err) => console.error(err));
  }

  onAuthStateChanged(auth, (currUser) => {
    setCurrUser(currUser);
  });

  function getCurrentFormattedDate() {
    const currentDate = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    return currentDate.toLocaleDateString("en-US", options);
  }

  const contextValues = {
    currUser,
    setCurrUser,
    signInWithGoogle,
    isAdmin,
    blogPosts,
    setBlogPosts,
    isLoading,
    blogPostReference,
    datePosted,
  };

  return (
    <LoginSignUpContext.Provider value={contextValues}>
      {children}
    </LoginSignUpContext.Provider>
  );
}

function useLoginSignUp() {
  const context = useContext(LoginSignUpContext);
  if (context === undefined)
    throw new Error(" context was used outside cities Provider");
  return context;
}

export { LoginSignUpProvider, useLoginSignUp };
