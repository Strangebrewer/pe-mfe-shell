import api from '../api';
import { authClient } from '../utils/authClient';
import { useUserStore } from '@bka-stuff/mfe-utils';

export const useGetCurrentUser = () => {
  const { setUser } = useUserStore();
  async function getCurrentUser() {
    const response = await api.user.me();
    if (response?.data) {
      setUser(response.data);
      return response.data;
    }
  }
  return [getCurrentUser];
};

export const useLogin = () => {
  const { setUser } = useUserStore();
  async function login(credentials: any) {
    const response = await api.user.login(credentials);
    if (response?.data) {
      setUser(response.data.user);
      authClient.setTokens(response.data.accessToken, response.data.refreshToken)
    }
  }
  return [login];
};

export const useLogout = () => {
  const { clearUser } = useUserStore();
  async function logout() {
    await api.user.logout(authClient.getRefreshToken() || "");
    authClient.logout();
    clearUser();
  }
  return [logout];
};

