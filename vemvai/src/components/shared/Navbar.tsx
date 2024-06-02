import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations'
import { useUserContext } from '@/context/AuthContext';


const Navbar = () => {
  const { mutate: signOut, isSuccess} = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if(isSuccess) {
      navigate(0);
    }
  }, [isSuccess])

  return (
    <section className='navbar'>
      <div>
        <Link to='/' className='flex gap-3 items-center'>
        <img/>
        </Link>
      </div>
      <div>
        <Button variant='ghost' className='shad-button_ghost' onClick={() => signOut}>
          <img src='/assets/icons/logout.svg' alt='logout' />
        </Button>
        <Link to={`/profile/${user.id}`} className='flex-center gap-3'>
          <img 
          src={user.imageUrl || '/assets/assets/profile-placeholder.svg'}
          alt=''
          className='h-8 w-8 rounded-full '
          />
        </Link>
      </div>
    </section>
  )
}

export default Navbar