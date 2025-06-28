import {
  JobType,
  JobTypeResponse,
  JobTypeDetail,
  JobTypeDetailResponse,
  CreateJobTypeRequest,
  CreateJobTypeDetailRequest,
  CreateJobTypeGroupRequest,
  UpdateJobTypeGroupRequest,
  JobTypeSuccessResponse,
  JobTypeDetailSuccessResponse,
  JobTypeGroupSuccessResponse
} from '@/@types/jobs-type';
import Response from '@/@types/response';
import http from '@/utils/http';

const baseUrl = {
  jobTypes: '/loai-cong-viec',
  jobTypeDetails: '/chi-tiet-loai-cong-viec',
  jobTypePaging: '/loai-cong-viec/phan-trang-tim-kiem',
  jobTypeDetailPaging: '/chi-tiet-loai-cong-viec/phan-trang-tim-kiem',
  addJobTypeGroup: '/chi-tiet-loai-cong-viec/them-nhom-chi-tiet-loai',
  updateJobTypeGroup: '/chi-tiet-loai-cong-viec/sua-nhom-chi-tiet-loai',
  uploadImage: '/chi-tiet-loai-cong-viec/upload-hinh-nhom-loai-cong-viec'
};

class JobsTypeApi {
  getJobTypes = (params: { pageIndex: number; pageSize: number; keyword?: string }) => {
    return http.get<Response<JobTypeResponse>>(baseUrl.jobTypePaging, { params });
  };

  getJobTypeById = (id: number) => {
    return http.get<Response<JobType>>(`${baseUrl.jobTypes}/${id}`);
  };

  createJobType = (body: CreateJobTypeRequest) => {
    return http.post<Response<JobTypeSuccessResponse>>(baseUrl.jobTypes, body);
  };

  updateJobType = (id: number, body: CreateJobTypeRequest) => {
    return http.put<Response<JobTypeSuccessResponse>>(`${baseUrl.jobTypes}/${id}`, body);
  };

  deleteJobType = (id: number) => {
    return http.delete<Response<string>>(`${baseUrl.jobTypes}/${id}`);
  };

  getJobTypeDetails = (params: { pageIndex: number; pageSize: number; keyword?: string }) => {
    return http.get<Response<JobTypeDetailResponse>>(baseUrl.jobTypeDetailPaging, { params });
  };

  getJobTypeDetailById = (id: number) => {
    return http.get<Response<JobTypeDetail>>(`${baseUrl.jobTypeDetails}/${id}`);
  };

  createJobTypeDetail = (body: CreateJobTypeDetailRequest) => {
    return http.post<Response<JobTypeDetailSuccessResponse>>(baseUrl.jobTypeDetails, body);
  };

  updateJobTypeDetail = (id: number, body: CreateJobTypeDetailRequest) => {
    return http.put<Response<JobTypeDetailSuccessResponse>>(`${baseUrl.jobTypeDetails}/${id}`, body);
  };

  deleteJobTypeDetail = (id: number) => {
    return http.delete<Response<string>>(`${baseUrl.jobTypeDetails}/${id}`);
  };

  createJobTypeGroup = (body: CreateJobTypeGroupRequest) => {
    return http.post<Response<JobTypeGroupSuccessResponse>>(baseUrl.addJobTypeGroup, body);
  };

  updateJobTypeGroup = (id: number, body: UpdateJobTypeGroupRequest) => {
    return http.put<Response<JobTypeGroupSuccessResponse>>(`${baseUrl.updateJobTypeGroup}/${id}`, body);
  };

  uploadJobTypeGroupImage = (maNhomLoaiCongViec: number, formData: FormData) => {
    return http.post<Response<string>>(`${baseUrl.uploadImage}/${maNhomLoaiCongViec}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  };
}

const jobsTypeApi = new JobsTypeApi();
export default jobsTypeApi;
