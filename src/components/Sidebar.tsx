import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@bka-stuff/pe-mfe-utils';
import './styles.css';

const SidebarButton: FC<{ iconClass: string; url: string }> = ({ iconClass, url }) => {
  const navigate = useNavigate();
  const title = url.split('-').join(' ');
  return (
    <button title={title} className="sidebar-btn" onClick={() => navigate(`/${url}`)}>
      <i className={`${iconClass} --candy`} />
    </button>
  );
};

const Sidebar: FC = () => {
  const { user } = useUserStore();

  return (
    <div className="shell-sidebar tw:w-[64px] tw:min-w-[64px] tw:border-r tw:border-purple tw:min-h-[calc(100vh_-_64px)]">
      <SidebarButton iconClass="fas fa-home" url="dashboard" />

      {user ? (
        <>
          <SidebarButton iconClass="fas fa-search-plus" url="job-search" />
          <SidebarButton iconClass="fas fa-smile" url="budget" />
          <SidebarButton iconClass="fas fa-crown" url="home-maintenance" />
          <SidebarButton iconClass="fas fa-crow" url="recipes" />
          <SidebarButton iconClass="fas fa-yin-yang" url="projects" />
          <SidebarButton iconClass="fas fa-dragon" url="stylus" />
        </>
      ) : null}
    </div>
  );
};

export default Sidebar;
