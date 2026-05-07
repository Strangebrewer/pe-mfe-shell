import { axiosPublic, axiosAuth } from "../utils/authClient";

export default class BaseApi {
  axiosWithAuth;
  axios;
  endpoint;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.axios = axiosPublic;
    this.axiosWithAuth = axiosAuth;
  }

  get(query?: Record<string, any>, shouldTrace = false) {
    const searchParams = new URLSearchParams(query).toString();
    const headers: Record<string, any> = {};
    if (shouldTrace) headers['X-Trace-ID'] = crypto.randomUUID();
    return this.axiosWithAuth.get(`${this.endpoint}${query ? '?' + searchParams : ''}`, { headers });
  }

  getOne(id: string, shouldTrace = false) {
    const headers: Record<string, any> = {};
    if (shouldTrace) headers['X-Trace-ID'] = crypto.randomUUID();
    return this.axiosWithAuth.get(`${this.endpoint}/${id}`, { headers });
  }

  create(data: Record<string, any>, shouldTrace = false) {
    const headers: Record<string, any> = {};
    if (shouldTrace) headers['X-Trace-ID'] = crypto.randomUUID();
    return this.axiosWithAuth.post(this.endpoint, data, { headers });
  }

  update(item: any, shouldTrace = false) {
    const headers: Record<string, any> = {};
    if (shouldTrace) headers['X-Trace-ID'] = crypto.randomUUID();
    return this.axiosWithAuth.put(`${this.endpoint}/${item.id}`, item, { headers });
  }

  delete(id: string, shouldTrace = false) {
    const headers: Record<string, any> = {};
    if (shouldTrace) headers['X-Trace-ID'] = crypto.randomUUID();
    return this.axiosWithAuth.delete(`${this.endpoint}/${id}`, { headers });
  }
}
