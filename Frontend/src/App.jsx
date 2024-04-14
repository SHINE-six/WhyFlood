import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadStepPageJsonData } from '../features/data/dataSlice';
import Viewport from './Viewport.jsx'
import LeftPanel from './LeftPanel.jsx'
import RightPanel from './RightPanel.jsx'

const App = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.data);

  useEffect(() => {
    dispatch(loadStepPageJsonData('GlobalConfiguration/pageActivation.json'));
  }, [dispatch]);


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='relative'>
      <div className='fixed w-screen h-screen'>
        <Viewport/>
      </div>
      <LeftPanel/>
      <RightPanel/>
    </div>
  );
};

export default App;
