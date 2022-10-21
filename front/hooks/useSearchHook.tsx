import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { SearchProp } from '../interfaces';

const useSearchHook = () => {
  const [inputValue, setInputValue] = useState<SearchProp['text']>();
  const router = useRouter();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    router.push(`/search?word=${inputValue}`);
  };

  return {
    handleInput,
    inputValue,
    handleSubmit,
    setInputValue,
  };
};

export default useSearchHook;
