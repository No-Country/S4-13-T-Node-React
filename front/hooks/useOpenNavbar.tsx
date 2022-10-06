import { useState } from 'react';

const useOpenNavbar = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return { handleClick, open };
};

export default useOpenNavbar;
