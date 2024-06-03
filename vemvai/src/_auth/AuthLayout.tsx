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

          <section className="auth-section flex flex-col md:flex-row items-center justify-center py-10 gap-10">
            <div className="md:w-1/4 flex flex-col justify-center items-center">
              <img src="/assets/images/logo_azul.svg" alt="Logo" className="w-40 h-auto mb-6" />
              <h2 className="text-2xl font-semibold mb-4">VemVai soluções práticas.</h2>
              <p className="text-lg text-center">Somos uma empresa inovadora dedicada a fornecer soluções de qualidade para nossos clientes.</p>
            </div>
            <div className="md:w-1/2">
              <Outlet />
            </div>
          </section>
          <section>
            <Footer />
          </section>
        </>
      )}
    </>
  );
}
