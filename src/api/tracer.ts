import { axiosAuth } from '../utils/authClient';
const { TRACER_SERVICE_URL } = process.env;

function getTraces(id: string) {
  return axiosAuth.get(`${TRACER_SERVICE_URL as string}/traces/${id}`);
}

export default {
  getTraces,
};
