import { axiosPublic, axiosAuth } from "../utils/authClient";

export default class BaseApi {
  endpoint;
  axios;
  axiosWithAuth;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.axios = axiosPublic;
    this.axiosWithAuth = axiosAuth;
  }

  get(query: any) {
    const searchParams = new URLSearchParams(query).toString();
    return this.axiosWithAuth.get(`${this.endpoint}${query ? "?" + searchParams : ""}`);
  }

  getOne(id: string, query: any) {
    const searchParams = new URLSearchParams(query).toString();
    return this.axiosWithAuth.get(`${this.endpoint}/${id}${query ? '?' + searchParams : ''}`);
  }

  create(item: any) {
    return this.axiosWithAuth.post(`${this.endpoint}`, item);
  }

  update(item: any) {
    return this.axiosWithAuth.put(`${this.endpoint}/${item.id}`, item);
  }

  delete(id: string) {
    return this.axiosWithAuth.delete(`${this.endpoint}/${id}`);
  }
}
