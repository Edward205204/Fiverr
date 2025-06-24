import http from '@/utils/http';
import { SigninSchemaType, RegisterSchemaType } from '@/utils/rules';

const baseUrl = {
  signup: '/auth/signup',
  signin: '/auth/signin'
};

class AuthApi {
  signUp = (data: RegisterSchemaType) => {
    return http.post(baseUrl.signup, data);
  };

  signin = (data: SigninSchemaType) => {
    return http.post(baseUrl.signin, data);
  };
}

const authApi = new AuthApi();
export default authApi;
