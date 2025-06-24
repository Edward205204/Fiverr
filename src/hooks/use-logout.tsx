import { AppContext } from '@/contexts/app.context';
import { removeLocalStorage } from '@/utils/auth';
import { useContext } from 'react';

export default function useLogout() {
  const { reset } = useContext(AppContext);
  const handleLogout = () => {
    reset();
    removeLocalStorage();
  };
  return { handleLogout };
}
