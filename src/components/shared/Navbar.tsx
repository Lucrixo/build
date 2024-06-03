import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { INITIAL_USER, useUserContext } from "@/context/AuthContext";
import { navbarLinks } from "@/constants";
import { INavLink } from "@/types";

const Navbar = () => {
  const { pathname } = useLocation();
  const { mutate: signOut } = useSignOutAccount();
  const navigate = useNavigate();
  const { user, setUser, isAuthenticated, setIsAuthenticated } =
    useUserContext();

  const handleSignOut = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    signOut();
    setIsAuthenticated(false);
    setUser(INITIAL_USER);
    navigate("/sign-in");
  };

  return (
    <section className="w-full flex justify-between items-center my-8 mx-auto px-10 box-border">
      <div className="h-12 w-24">
        <img src="/assets/images/logo_azul.svg" className="h-12 w-24" />
      </div>
      {isAuthenticated ? (
        <>
          {/* Navbar para usuários autenticados */}

          <div className="flex items-center">
            <Link to="/" className=" text-custom font-bold mr-6">
              Home
            </Link>

            <ul className="flex gap-6">
              {navbarLinks.map((link: INavLink) => {
                const isActive = pathname === link.route;
                return (
                  <li
                    key={link.label}
                    className={`centersidebar-link ${
                      isActive && "invert-white"
                    }`}
                  >
                    <NavLink
                      to={link.route}
                      className="flex gap-4 items-center p-4"
                    >
                      {link.label}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex items-center">
            <Link to={`/profile/${user.id}`} className="flex-center gap-3">
              <img
                src={user.imageUrl || "/assets/assets/profile-placeholder.svg"}
                alt="foto do usuário"
                className="h-8 w-8 rounded-full "
              />
            </Link>

            <Button
              variant="ghost"
              className="shad-button_ghost"
              onClick={(e) => handleSignOut(e)}
            >
              <img src="/assets/icons/logout.svg" alt="logout" />
            </Button>
          </div>
        </>
      ) : (
        <>
          {/* Navbar para usuários não autenticados */}

          <div className="flex flex-row justify-around lm:gap-5 sm:gap-0 lg:ml-8 w-40">
            <Link to="/sign-in" className="text-custom font-bold ">
              Login
            </Link>
            <Link to="/sign-up" className="text-custom font-bold">
              Registro
            </Link>
          </div>
        </>
      )}
    </section>
  );
};

export default Navbar;
