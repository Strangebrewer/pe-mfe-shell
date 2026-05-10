import { axiosPublic, axiosAuth } from "../utils/authClient";
const { TRACER_URL } = process.env;

function getTraces(id: string) {
  return axiosAuth.get(`${TRACER_URL as string}/traces/${id}`);
}

export default {
  getTraces,
};
