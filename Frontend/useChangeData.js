import { useDispatch } from 'react-redux';
import { modifyData, addData } from './features/data/dataSlice';

const useModifyData = () => {
  const dispatch = useDispatch();

  const handleModifyData = (key, newValue) => {
    dispatch(modifyData({ key, value: newValue }));
  };

  return handleModifyData;
};

const useAddData = () => {
  const dispatch = useDispatch();

  const handleAddData = (key, value) => {
    dispatch(addData({ key, value }));
  };

  return handleAddData;
};

export { useModifyData, useAddData };
