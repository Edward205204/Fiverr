import User from '@/@types/user';
import path from '@/constants/path';
import useLogout from '@/hooks/use-logout';

import { Link } from 'react-router';

export default function Avatar({ profile }: { profile: User }) {
  const { handleLogout } = useLogout();

  return (
    <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50'>
      <div className='px-4 py-2 border-b border-gray-100'>
        <p className='text-sm font-medium text-gray-900'>{profile.name}</p>
        <p className='text-xs text-gray-500'>{profile.email}</p>
      </div>
      <Link to={path.manage_user} className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors'>
        Manager
      </Link>
      <button
        onClick={handleLogout}
        className='block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors'
      >
        Logout
      </button>
    </div>
  );
}
