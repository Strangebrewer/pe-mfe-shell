import { FC, useState } from 'react';
import { TransparentButton, useUserStore } from '@bka-stuff/mfe-utils';

import LoginModal from './LoginModal';
import { useLogout } from '../hooks/userHooks';
import { useLocation, useNavigate } from 'react-router-dom';

const Header: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [logout] = useLogout();

  const { user, isReady } = useUserStore();

  function getHeaderLinks() {
    const path = location.pathname;
    switch (true) {
      case path.startsWith('/dashboard'):
        return (
          <>
            <TransparentButton size='lg' color="indigo" text="Dashboard" onClick={() => navigate('/dashboard')} />
            <TransparentButton size='lg' color="red" text="Bills" onClick={() => navigate('/dashboard/bills')} />
          </>
        );
      default:
        return <></>;
    }
  }

  function auth() {
    if (user) {
      logout();
      return;
    }
    setShowLoginModal(!showLoginModal);
  }

  return (
    <nav className='tw:border tw:border-[#ccc] tw:h-[64px] tw:flex tw:items-center tw:relative'>
      <h1 className='tw:mr-[96px]'>Microfrontend Shell</h1>

      <div className='tw:flex tw:gap-[16px]'>
        {getHeaderLinks()}
      </div>

      {isReady
        ? (
          <button
            className='tw:right-[16px] tw:absolute'
            onClick={auth}
          >
            {user ? 'Logout' : 'Login'}
          </button>
        ) : null}
      <LoginModal close={() => setShowLoginModal(false)} isOpen={showLoginModal} />
    </nav>
  );
};

export default Header;
