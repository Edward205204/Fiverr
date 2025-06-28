import http from '@/utils/http';
import { User, UserUpdateRequest, HiredJob } from '@/@types/user';

const baseUrl = {
  getUser: '/users',
  updateUser: '/users',
  uploadAvatar: '/users/upload-avatar',
  getHiredJobs: '/thue-cong-viec/lay-danh-sach-da-thue'
};

class UserApi {
  getUser = (id: number) => {
    return http.get<{ content: User }>(`${baseUrl.getUser}/${id}`);
  };

  updateUser = (id: number, data: UserUpdateRequest) => {
    return http.put(`${baseUrl.updateUser}/${id}`, data);
  };

  uploadAvatar = (file: File, userId?: number) => {
    const formData = new FormData();
    formData.append('formFile', file);

    if (userId) {
      formData.append('userId', userId.toString());
    }

    return http.post(baseUrl.uploadAvatar, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  };

  getHiredJobs = () => {
    return http.get<{ content: HiredJob[] }>(baseUrl.getHiredJobs);
  };
}

const userApi = new UserApi();
export default userApi;
