export interface ThueCongViec {
  id: number;
  maCongViec: number;
  maNguoiThue: number;
  ngayThue: string;
  hoanThanh: boolean;
}

export interface BinhLuan {
  id: number;
  maCongViec: number;
  maNguoiBinhLuan: number;
  ngayBinhLuan: string;
  noiDung: string;
  saoBinhLuan: number;
}

export interface ThueCongViecResponse {
  pageIndex: number;
  pageSize: number;
  totalRow: number;
  keywords?: string;
  data: ThueCongViec[];
}

export interface ThueCongViecCreateRequest {
  id: number;
  maCongViec: number;
  maNguoiThue: number;
  ngayThue: string;
  hoanThanh: boolean;
}

export interface BinhLuanCreateRequest {
  id: number;
  maCongViec: number;
  maNguoiBinhLuan: number;
  ngayBinhLuan: string;
  noiDung: string;
  saoBinhLuan: number;
}
