import { Job } from '@/@types/jobs';
import Response from '@/@types/response';
import http from '@/utils/http';

const URL = '/cong-viec/phan-trang-tim-kiem';
export const JobsAPI = {
  getJobs: (params: { pageIndex: number; pageSize: number; keyword: string }) =>
    http.get<Response<Job[]>>(URL, { params })
};
