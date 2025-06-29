import path from '@/constants/path';
import { Link } from 'react-router';
import { useContext, useState } from 'react';
import { AppContext } from '@/contexts/app.context';
import Avatar from '@/components/shared/avatar';

export default function HomeHeader() {
  const { isAuthenticated, profile } = useContext(AppContext);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className='py-1 bg-transparent w-full z-50 absolute top-0 left-0 right-0 text-white'>
      <div className='container'>
        <div className='px-0.5 flex items-center justify-between py-4 '>
          <Link to={path.home} className=''>
            <svg width={89} height={27} viewBox='0 0 89 27' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <g fill='#fff'>
                <path d='m81.6 13.1h-3.1c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-13.4h-2.5c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-18.4h6v2.8c1-2.2 2.3-2.8 4.3-2.8h7.3v2.8c1-2.2 2.3-2.8 4.3-2.8h2zm-25.2 5.6h-12.4c.3 2.1 1.6 3.2 3.7 3.2 1.6 0 2.7-.7 3.1-1.8l5.3 1.5c-1.3 3.2-4.5 5.1-8.4 5.1-6.5 0-9.5-5.1-9.5-9.5 0-4.3 2.6-9.4 9.1-9.4 6.9 0 9.2 5.2 9.2 9.1 0 .9 0 1.4-.1 1.8zm-5.7-3.5c-.1-1.6-1.3-3-3.3-3-1.9 0-3 .8-3.4 3zm-22.9 11.3h5.2l6.6-18.3h-6l-3.2 10.7-3.2-10.8h-6zm-24.4 0h5.9v-13.4h5.7v13.4h5.9v-18.4h-11.6v-1.1c0-1.2.9-2 2.2-2h3.5v-5h-4.4c-4.3 0-7.2 2.7-7.2 6.6v1.5h-3.4v5h3.4z' />
              </g>
              <g fill='#1dbf73'>
                <path d='m85.3 27c2 0 3.7-1.7 3.7-3.7s-1.7-3.7-3.7-3.7-3.7 1.7-3.7 3.7 1.7 3.7 3.7 3.7z' />
              </g>
            </svg>
          </Link>
          <div>
            <div className='flex items-center gap-8'>
              <Link to={path.jobs} className='py-[2px] hover:border-b hover:border-b-white transition-all duration-100'>
                Find a job
              </Link>

              {isAuthenticated && profile ? (
                <div className='relative'>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className='flex items-center gap-2 py-1 px-3 rounded-lg hover:bg-white/10 transition-all duration-200'
                  >
                    <div className='w-8 h-8 bg-green-500 rounded-full flex items-center justify-center'>
                      <>
                        {profile.avatar ? (
                          <img src={profile.avatar} alt='avatar' className='w-8 h-8 rounded-full object-cover' />
                        ) : (
                          <span className=' text-white font-bold text-sm'>{profile.name.charAt(0).toUpperCase()}</span>
                        )}
                      </>
                    </div>
                    <span className='text-white font-medium'>{profile.name}</span>
                    <svg
                      className={`w-4 h-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`}
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                    </svg>
                  </button>

                  {showUserMenu && <Avatar profile={profile} />}
                </div>
              ) : (
                <>
                  <Link to={path.signin} className='py-1 hover:border-b hover:border-b-white'>
                    Sign in
                  </Link>
                  <Link
                    to={path.signup}
                    className='bg-transparent border border-white hover:cursor-pointer hover:bg-white hover:text-red-400 transition-all duration-100 px-4 py-1 rounded-sm'
                  >
                    Join
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {showUserMenu && <div className='fixed inset-0 z-40' onClick={() => setShowUserMenu(false)} />}
    </header>
  );
}
