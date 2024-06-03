import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations';
import { INITIAL_USER, useUserContext } from '@/context/AuthContext';
import { navbarLinks } from '@/constants';
import { INavLink } from '@/types';

const Navbar = () => {
  const { pathname } = useLocation();
  const { mutate: signOut } = useSignOutAccount();
  const navigate = useNavigate();
  const { user, setUser, isAuthenticated, setIsAuthenticated } = useUserContext();

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
    <section className='navbar'>
      {isAuthenticated ? (
        <>
          {/* Navbar para usuários autenticados */}
          <div>
            <Link to='/' className='flex gap-3 items-center'>
              Home
            </Link>
          </div>
          <div>
            <Link to={`/profile/${user.id}`} className='flex-center gap-3'>
              <img
                src={user.imageUrl || '/assets/assets/profile-placeholder.svg'}
                alt=''
                className='h-8 w-8 rounded-full '
              />
            </Link>

            <ul className='flex gap-6'>
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
                      <img
                        src={link.imgURL}
                        alt={link.label}
                        className={`group-hover:invert-white ${
                          isActive && "invert-white"
                        }`}
                      />
                      {link.label}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>

          <Button
            variant='ghost'
            className='shad-button_ghost'
            onClick={(e) => handleSignOut(e)}
          >
            <img src='/assets/icons/logout.svg' alt='logout' />
          </Button>
        </>
      ) : (
        <>
          {/* Navbar para usuários não autenticados */}
          <div>
              Logo
          </div>
          <div>
            <Link to="/sign-in" className='flex gap-3 items-center'>
              Login
            </Link>
            <Link to="/sign-up" className='flex gap-3 items-center'>
              Registro
            </Link>
          </div>
        </>
      )}
    </section>
  );
};

export default Navbar;
