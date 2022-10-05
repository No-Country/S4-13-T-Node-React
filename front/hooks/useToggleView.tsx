import { useState } from 'react';

const useToggleView = () => {
  const [toggleView, setToggleView] = useState<boolean>(false);

  const handleToggle = () => {
    setToggleView(!toggleView);
  };
  return { handleToggle, toggleView };
};

export default useToggleView;
