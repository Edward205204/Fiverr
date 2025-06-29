import { User } from '@/@types/user';
import managerApi from '@/apis/manager.api';
import SearchBar from '@/components/shared/search';
import UserTable from '@/components/shared/user-table';
import { Button } from '@/components/ui/button';
import { AppContext } from '@/contexts/app.context';
import useQueryConfig from '@/hooks/use-query-config';
import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { toast } from 'react-toastify';

export default function ManageUserPage() {
  const { profile, setProfile } = useContext(AppContext);
  const queryConfig = useQueryConfig();

  const useChangeRoleMutation = useMutation({
    mutationFn: (userId: number) => managerApi.changeRole({ userId, profile: profile || {} }),
    onSuccess: (data) => {
      toast.success('Change role successfully');
      setProfile(data.data.content as User);
    },
    onError: () => {
      toast.error('Change role failed');
    }
  });

  const handleChangeRole = () => {
    if (profile && Number(profile.id) > 0) {
      useChangeRoleMutation.mutate(Number(profile.id));
    }
  };

  return (
    <div className='pt-6 pb-4 border-t border-gray-200'>
      <Button
        className='text-xl underline hover:text-blue-500 cursor-pointer bg-white text-black hover:bg-white'
        onClick={handleChangeRole}
      >
        Become an administrator?
      </Button>

      <div className='my-8'>
        <SearchBar
          placeholder='Search user by name or email'
          targetUrl='/manage-user'
          queryKey='keyword'
          className='w-[75%] h-12'
        />
      </div>

      <div className='mt-8'>
        <UserTable
          keyword={queryConfig.keyword}
          pageIndex={Number(queryConfig.pageIndex)}
          pageSize={Number(queryConfig.pageSize)}
        />
      </div>
    </div>
  );
}
