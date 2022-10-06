import React, { useState } from "react";
import { SearchProp } from "../interfaces";

const useSearchHook = () => {
  const [inputValue, setInputValue] = useState<SearchProp["text"]>();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("busqueda:", inputValue);
  };

  return {
    handleInput,
    inputValue,
    handleSubmit,
  };
};

export default useSearchHook;
