import { Job, JobTypeList } from '@/@types/jobs';
import Response from '@/@types/response';
import http from '@/utils/http';

const BASE_URL = {
  getJobs: '/cong-viec/phan-trang-tim-kiem',
  getJobTypes: '/cong-viec/lay-menu-loai-cong-viec'
};
export const JobsAPI = {
  getJobs: (params: { pageIndex: number; pageSize: number; keyword: string }) =>
    http.get<Response<Job[]>>(BASE_URL.getJobs, { params }),
  getJobTypes: () => http.get<Response<JobTypeList[]>>(BASE_URL.getJobTypes)
};
