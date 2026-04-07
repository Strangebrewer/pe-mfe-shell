import { AxiosResponse } from 'axios';
import BaseApi from './baseApi';

class UserApi extends BaseApi {
  constructor() {
    super('users');
  }

  me() {
    return this.axiosWithAuth.get(`${this.endpoint}/me`);
  }

  login(data: any) {
    return this.axios.post(`${this.endpoint}/login`, data);
  }

  logout(token: string) {
    return this.axios.post(`/token/revoke`, null, { headers: { Authorization: `Bearer ${token}`}});
  }

  register(data: any) {
    return this.axios.post(`${this.endpoint}/register`, data);
  }

  updatePassword(data: any) {
    return this.axiosWithAuth.put(`${this.endpoint}/password`, data)
  }

  updateUser(data: any) {
    return this.axiosWithAuth.put(`${this.endpoint}`, data);
  }

  delete(id: string): any {
    return null; // override default delete to prevent deleting users
  }
}

export default new UserApi();
