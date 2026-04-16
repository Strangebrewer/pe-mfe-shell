import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@bka-stuff/pe-mfe-utils';
import './styles.css';

const Sidebar: FC = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();

  return (
    <div className='tw:w-[64px] tw:min-w-[64px] tw:border-r tw:border-grey tw:min-h-[calc(100vh_-_64px)]'>
      <div>
        <button className='sidebar-btn' onClick={() => navigate('/dashboard')}>
          <i className='fas fa-home --candy' />
        </button>
      </div>

      {user ? (
        <>
          <div>
            <button className='sidebar-btn' title="job search" onClick={() => navigate('/job-search')}>
              <i className='fas fa-search-plus --candy' />
            </button>
          </div>

          <div>
            <button className='sidebar-btn' title="budget" onClick={() => navigate('/budget')}>
              <i className='fas fa-smile --candy' />
            </button>
          </div>

          <div>
            <button className='sidebar-btn' title="home maintenance" onClick={() => navigate('/home-maintenance')}>
              <i className='fas fa-crown --candy' />
            </button>
          </div>

          <div>
            <button className='sidebar-btn' title="recipes" onClick={() => navigate('/recipes')}>
              <i className='fas fa-crow --candy' />
            </button>
          </div>

          <div>
            <button className='sidebar-btn' title="projects" onClick={() => navigate('/projects')}>
              <i className='fas fa-yin-yang --candy' />
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Sidebar;
