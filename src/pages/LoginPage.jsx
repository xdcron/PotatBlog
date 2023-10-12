import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

function LoginPage() {
  return (
    <>
      <main className="w-full flex flex-col justify-center items-center h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default LoginPage;
