export default interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  avatar: string;
  gender: boolean;
  role: string;
  skill: string[];
  certification: string[];
  bookingJob: string[];
}

export interface UserResponse {
  pageIndex: number;
  pageSize: number;
  totalRow: number;
  keywords: string | null;
  data: User[];
}
