import {
  ThueCongViec,
  ThueCongViecResponse,
  ThueCongViecCreateRequest,
  BinhLuan,
  BinhLuanCreateRequest
} from '@/@types/services';
import Response from '@/@types/response';
import http from '@/utils/http';

const baseUrl = {
  thueCongViec: '/thue-cong-viec',
  binhLuan: '/binh-luan'
};

class ServicesApi {
  getThueCongViecList = (params: { pageIndex: number; pageSize: number; keyword?: string }) => {
    return http.get<Response<ThueCongViecResponse>>(baseUrl.thueCongViec, { params });
  };

  getThueCongViecById = (id: number) => {
    return http.get<Response<ThueCongViec>>(`${baseUrl.thueCongViec}/${id}`);
  };

  createThueCongViec = (body: ThueCongViecCreateRequest) => {
    return http.post<Response<ThueCongViec>>(baseUrl.thueCongViec, body);
  };

  updateThueCongViec = (id: number, body: ThueCongViecCreateRequest) => {
    return http.put<Response<ThueCongViec>>(`${baseUrl.thueCongViec}/${id}`, body);
  };

  deleteThueCongViec = (id: number) => {
    return http.delete<Response<string>>(`${baseUrl.thueCongViec}/${id}`);
  };

  // BinhLuan APIs
  getBinhLuanList = () => {
    return http.get<Response<BinhLuan[]>>(baseUrl.binhLuan);
  };

  getBinhLuanById = (id: number) => {
    return http.get<Response<BinhLuan>>(`${baseUrl.binhLuan}/${id}`);
  };

  createBinhLuan = (body: BinhLuanCreateRequest) => {
    return http.post<Response<BinhLuan>>(baseUrl.binhLuan, body);
  };

  updateBinhLuan = (id: number, body: BinhLuanCreateRequest) => {
    return http.put<Response<BinhLuan>>(`${baseUrl.binhLuan}/${id}`, body);
  };

  deleteBinhLuan = (id: number) => {
    return http.delete<Response<string>>(`${baseUrl.binhLuan}/${id}`);
  };
}

const servicesApi = new ServicesApi();
export default servicesApi;
