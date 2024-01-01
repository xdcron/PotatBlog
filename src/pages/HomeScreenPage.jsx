import { onAuthStateChanged } from "firebase/auth";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Nav from "../components/Nav";
import PostContainer from "../components/PostContainer";
import { useLoginSignUp } from "../contexts/LoginSignUpContext";
import { auth } from "../firebase/firebase";

function HomeScreenPage() {
  // const { setCurrUser } = useLoginSignUp();

  // onAuthStateChanged(auth, (currUser) => {
  //   setCurrUser(currUser);
  // });
  return (
    <>
      <Nav />
      <Header />
      <PostContainer />
      <Footer />
    </>
  );
}

export default HomeScreenPage;
