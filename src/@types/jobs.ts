export interface Job {
  id: number;
  tenCongViec: string;
  danhGia: number;
  giaTien: number;
  nguoiTao: number;
  hinhAnh: string;
  moTa: string;
  maChiTietLoaiCongViec: number;
  moTaNgan: string;
  saoCongViec: number;
}

export interface JobTypeList {
  id: number;
  tenLoaiCongViec: string;
  dsNhomChiTietLoai: JobGroup[];
}

export interface JobGroup {
  id: number;
  tenNhom: string;
  hinhAnh: string;
  maLoaiCongviec: number;
  dsChiTietLoai: JobDetail[];
}

export interface JobDetail {
  id: number;
  tenChiTiet: string;
}

export interface JobResponse {
  pageIndex: number;
  pageSize: number;
  totalRow: number;
  keywords?: string;
  data: Job[];
}
