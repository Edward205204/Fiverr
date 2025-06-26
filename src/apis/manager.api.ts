import User, { UserResponse } from '@/@types/user';
import Response from '@/@types/response';
import http from '@/utils/http';

const baseUrl = {
  changeRole: '/users',
  getUsers: 'users/phan-trang-tim-kiem',
  getUserById: '/users'
};

class ManagerApi {
  changeRole({ userId, role = 'ADMIN', profile }: { userId: number; role?: string; profile: User | object }) {
    return http.put<Response<User>>(`${baseUrl.changeRole}/${userId}`, {
      ...profile,
      role
    });
  }
  getUsers = (params: { pageIndex: number; pageSize: number; keyword?: string }) => {
    return http.get<Response<UserResponse>>(baseUrl.getUsers, { params });
  };

  getUserById = (userId: number) => {
    return http.get<Response<User>>(`${baseUrl.getUserById}/${userId}`);
  };
}

const managerApi = new ManagerApi();
export default managerApi;
