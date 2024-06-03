import { Outlet, Navigate } from "react-router-dom";

import { useUserContext } from "@/context/AuthContext";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

export default function AuthLayout() {
  const { isAuthenticated } = useUserContext();

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
        <section>
          <Navbar />
        </section>
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <Outlet />
          </section>

          <section>
            <Footer/>
          </section>
        </>  
      )}
    </>
  );
}