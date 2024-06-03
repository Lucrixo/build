import Footer from '@/components/shared/Footer'
import Navbar from '@/components/shared/Navbar'

import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className='w-full md:flex flex-col items-center justify-center'>
      <Navbar/>

      <section className='flex flex-1 h-full justify-center'>
        <Outlet />
      </section>

      <Footer />
    </div>
  )
}

export default RootLayout