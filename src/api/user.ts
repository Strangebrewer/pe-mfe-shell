import { axiosPublic, axiosAuth } from '../utils/authClient';

class UserApi {
  axiosWithAuth;
  axios;
  endpoint;
  constructor() {
    this.endpoint = 'users';
    this.axios = axiosPublic;
    this.axiosWithAuth = axiosAuth;
  }

  me() {
    return this.axiosWithAuth.get('users/me');
  }

  login(data: any) {
    return this.axios.post('users/login', data);
  }

  logout(token: string) {
    return this.axios.post('token/revoke', null, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  register(data: any) {
    return this.axios.post('users/register', data);
  }

  updatePassword(data: any) {
    return this.axiosWithAuth.put('users/password', data);
  }

  updateUser(data: any) {
    return this.axiosWithAuth.put('users', data);
  }
}

export default new UserApi();
