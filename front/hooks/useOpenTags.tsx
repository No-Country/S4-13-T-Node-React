import { useState } from 'react';

const useOpenTags = () => {
  const [openTag, setOpenTag] = useState<boolean>(false);

  const handleOpen = () => {
    setOpenTag(!openTag);
  };

  return { handleOpen, openTag };
};

export default useOpenTags;
