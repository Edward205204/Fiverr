import { Job, JobDetailPage3, JobResponse, JobTypeComment } from '@/@types/jobs';
import { JobDetail, JobTypeList } from '@/@types/jobs';
import Response from '@/@types/response';
import { ThueCongViec } from '@/@types/services';
import http from '@/utils/http';

const baseUrl = {
  jobs: '/cong-viec',
  jobsPaging: '/cong-viec/phan-trang-tim-kiem',
  jobDetail: '/cong-viec',
  uploadImage: '/cong-viec/upload-hinh-cong-viec',
  getJobs: '/cong-viec/phan-trang-tim-kiem',
  getJobTypes: '/cong-viec/lay-menu-loai-cong-viec',
  getJobDetail: '/cong-viec/lay-cong-viec-chi-tiet',
  getJobComment: '/binh-luan/lay-binh-luan-theo-cong-viec',
  userGetJob: '/thue-cong-viec'
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
    http.get<Response<JobResponse>>(baseUrl.getJobs, { params });
  getJobTypes = () => http.get<Response<JobTypeList[]>>(baseUrl.getJobTypes);

  getJobDetail = (maCongViec: number) => {
    return http.get<Response<JobDetailPage3[]>>(`${baseUrl.getJobDetail}/${maCongViec}`);
  };
  getJobComment = (maCongViec: number) => {
    return http.get<Response<JobTypeComment[]>>(`${baseUrl.getJobComment}/${maCongViec}`);
  };

  userGetJob = (body: ThueCongViec) => {
    return http.post<Response<ThueCongViec>>(baseUrl.userGetJob, body);
  };
}

const jobApi = new JobApi();
export default jobApi;
