import axios from 'axios';
import { createAuthClient } from '@bka-stuff/pe-mfe-utils';

const BASE_URL = process.env.AUTH_URL || 'http://localhost:8080';

export const axiosPublic = axios.create({ baseURL: BASE_URL });
export const axiosAuth = axios.create({ baseURL: BASE_URL });

export const authClient = createAuthClient({
  axiosPublic,
  axiosAuth,
  onLogout: () => {
    console.log('Logged out');
  },
});

authClient.attach();
