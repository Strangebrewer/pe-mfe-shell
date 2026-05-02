import { FC, useEffect } from 'react';
import { BaseRouter } from './BaseRouter';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { useGetCurrentUser } from './hooks/userHooks';
import { useUserStore } from '@bka-stuff/pe-mfe-utils';

import { authClient } from './utils/authClient';
import { MINIMUM_LOAD_DELAY } from './utils/constants';

const Shell: FC = () => {
  const [getCurrentUser] = useGetCurrentUser();
  const { setIsReady, clearUser } = useUserStore();

  useEffect(() => {
    (async function () {
      const token = authClient.getAccessToken();
      const refreshToken = authClient.getRefreshToken();
      try {
        if (token || refreshToken) {
          await getCurrentUser();
        } else {
          clearUser();
        }
      } catch (error) {
        console.log('error in App.jsx:::', error);
        authClient.clearTokens();
        clearUser();
      } finally {
        setTimeout(() => setIsReady(true), MINIMUM_LOAD_DELAY);
      }
    })();
  }, []);

  return (
    <div className='tw:max-h-screen'>
      <Header />

      <div className='tw:flex tw:h-[calc(100vh_-_64px)] tw:overflow-hidden tw:pl-[64px]'>
        <Sidebar />
        <div className='tw:flex-1 tw:overflow-y-auto tw:overflow-x-hidden'>
          <BaseRouter />
        </div>
      </div>
    </div>
  );
};

export default Shell;