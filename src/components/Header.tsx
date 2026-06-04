import { FC, useState } from 'react';
import { Button, TransparentButton, useUserStore } from '@bka-stuff/pe-mfe-utils';

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
            {/* keeping this as an example, but right now these links are not needed */}
            {/* <TransparentButton size='lg' color="indigo" text="Dashboard" onClick={() => navigate('/dashboard')} />
            <TransparentButton size='lg' color="red" text="Bills" onClick={() => navigate('/dashboard/bills')} /> */}
          </>
        );
      case path.startsWith('/budget'):
        return (
          <>
            {path !== '/budget' && path !== '/budget/' ? (
              <span className="tw:absolute tw:margin-auto tw:-left-[60px]">
                <TransparentButton
                  size="lg"
                  color="blue"
                  text="<--"
                  onClick={() => navigate('/budget')}
                />
              </span>
            ) : null}
            <TransparentButton
              size="lg"
              color="blue"
              text="Shared-Mine"
              onClick={() => navigate('/budget/categories/mine')}
            />
            <TransparentButton
              size="lg"
              color="blue"
              text="Shared-Theirs"
              onClick={() => navigate('/budget/categories/theirs')}
            />
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

  const appName = () => {
    const path = location.pathname;
    switch (true) {
      case path.startsWith('/dashboard'):
        return 'DASHBOARD';
      case path.startsWith('/budget'):
        return 'BUDGETING';
      case path.startsWith('/job-search'):
        return 'JOB SEARCH';
      case path.startsWith('/home-maintenance'):
        return 'MAINTENANCE';
      case path.startsWith('/recipes'):
        return 'RECIPES';
      case path.startsWith('/projects'):
        return 'PROJECTS';
      default:
        return '~ NARF! ~';
    }
  };

  return (
    <nav className="tw:h-[64px] tw:flex tw:items-center tw:relative tw:border-b tw:border-purple tw:bg-surface">
      <h1 className="tw:mr-[96px] tw:pl-[16px] tw:text-primary tw:tracking-widest tw:text-sm tw:font-light">
        {appName()}
      </h1>

      <div className="tw:flex tw:gap-[16px] tw:relative">{getHeaderLinks()}</div>

      {isReady ? (
        <div className="tw:absolute tw:right-[16px]">
          <Button last color="blue" text={user ? 'Logout' : 'Login'} onClick={auth} />
        </div>
      ) : null}
      <LoginModal close={() => setShowLoginModal(false)} isOpen={showLoginModal} />
    </nav>
  );
};

export default Header;
