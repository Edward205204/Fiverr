import { Job, JobResponse } from '@/@types/jobs';
import { JobDetail, JobTypeList, JobGroup, JobDetailPage2 } from '@/@types/jobs';
import Response from '@/@types/response';
import http from '@/utils/http';

const baseUrl = {
  jobs: '/cong-viec',
  jobsPaging: '/cong-viec/phan-trang-tim-kiem',
  jobDetail: '/cong-viec',
  uploadImage: '/cong-viec/upload-hinh-cong-viec',
  getJobs: '/cong-viec/phan-trang-tim-kiem',
  getJobTypes: '/cong-viec/lay-menu-loai-cong-viec',
  getJobTypeById: '/cong-viec/lay-loai-cong-viec-theo-id'
};

class JobApi {
  getJobs = (params: { pageIndex: number; pageSize: number; keyword?: string }) => {
    return http.get<Response<JobResponse>>(baseUrl.jobsPaging, { params });
  };

  getJobById = (id: number) => {
    return http.get<Response<JobDetail>>(`${baseUrl.jobDetail}/${id}`);
  };

  createJob = (body: Job) => {
    return http.post<Response<JobDetail>>(baseUrl.jobs, body);
  };

  updateJob = (id: number, body: Job) => {
    return http.put<Response<JobDetail>>(`${baseUrl.jobDetail}/${id}`, body);
  };

  deleteJob = (id: number) => {
    return http.delete<Response<string>>(`${baseUrl.jobDetail}/${id}`);
  };

  uploadJobImage = (id: number, formData: FormData) => {
    return http.post<Response<string>>(`${baseUrl.uploadImage}/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  };

  getJobsManager = (params: { pageIndex: number; pageSize: number; keyword: string }) =>
    http.get<Response<Job[]>>(baseUrl.getJobs, { params });
  getJobTypes = () => http.get<Response<JobTypeList[]>>(baseUrl.getJobTypes);
}

const jobApi = new JobApi();
export default jobApi;
