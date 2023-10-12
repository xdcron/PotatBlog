import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreenPage from "./pages/HomeScreenPage";
import LoginPage from "./pages/LoginPage";
import LogInForm from "./components/LogInForm";
import SignUpForm from "./components/SignUpForm";
import { LoginSignUpProvider } from "./contexts/LoginSignUpContext";
import CreatePostPage from "./pages/CreatePostPage";
import Post from "./components/Post";

function App() {
  return (
    <LoginSignUpProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomeScreenPage />} />
          <Route path="login" element={<LoginPage />}>
            <Route index element={<LogInForm />} />
            <Route path="signup" element={<SignUpForm />} />
          </Route>
          <Route path="post/:id" element={<Post />} />
          <Route path="createpost" element={<CreatePostPage />} />
        </Routes>
      </BrowserRouter>
    </LoginSignUpProvider>
  );
}

export default App;
