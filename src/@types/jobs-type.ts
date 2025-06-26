export interface JobType {
  id: number;
  tenLoaiCongViec: string;
}

export interface JobTypeResponse {
  pageIndex: number;
  pageSize: number;
  totalRow: number;
  keywords: string | null;
  data: JobType[];
}

export interface JobTypeDetail {
  id: number;
  tenNhom: string;
  hinhAnh: string;
  maLoaiCongviec: number;
  dsChiTietLoai: JobTypeDetailItem[];
}

export interface JobTypeDetailItem {
  id: number;
  tenChiTiet: string;
}

export interface JobTypeDetailResponse {
  pageIndex: number;
  pageSize: number;
  totalRow: number;
  keywords: string;
  data: JobTypeDetail[];
}

export interface CreateJobTypeRequest {
  id: number;
  tenLoaiCongViec: string;
}

export interface CreateJobTypeDetailRequest {
  id: number;
  tenChiTiet: string;
}

export interface CreateJobTypeGroupRequest {
  id: number;
  tenChiTiet: string;
  maLoaiCongViec: number;
  danhSachChiTiet: string[];
}

export interface UpdateJobTypeGroupRequest {
  id: number;
  tenChiTiet: string;
  maLoaiCongViec: number;
  danhSachChiTiet: string[];
}

export interface JobTypeSuccessResponse {
  id: number;
  tenLoaiCongViec: string;
}

export interface JobTypeDetailSuccessResponse {
  id: number;
  tenChiTiet: string;
  maLoaiCongViec: number;
  danhSachChiTiet: string[];
  hinhAnh: string;
}

export interface JobTypeGroupSuccessResponse {
  id: number;
  tenChiTiet: string;
  maLoaiCongViec: number;
  danhSachChiTiet: string[];
}
