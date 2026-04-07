import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const Sidebar: FC = () => {
  const navigate = useNavigate();

  return (
    <div className='tw:w-[64px] tw:min-w-[64px] tw:border-r tw:border-grey tw:min-h-[calc(100vh_-_64px)]'>
      <div>
        <button className='sidebar-btn' onClick={() => navigate('/dashboard')}>
          <i className='fas fa-home --candy' />
        </button>
      </div>

      <div>
        <button className='sidebar-btn' onClick={() => navigate('/job-search')}>
          <i className='fas fa-search-plus --candy' />
        </button>
      </div>

      <div>
        <button className='sidebar-btn'>
          <i className='fas fa-smile --candy' />
        </button>
      </div>

      <div>
        <button className='sidebar-btn'>
          <i className='fas fa-crown --candy' />
        </button>
      </div>

      <div>
        <button className='sidebar-btn'>
          <i className='fas fa-crow --candy' />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
