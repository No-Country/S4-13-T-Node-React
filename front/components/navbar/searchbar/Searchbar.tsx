import { useState, useEffect } from 'react';

import useSearchHook from '../../../hooks/useSearchHook';

export const Searchbar = () => {
  const { handleInput, handleSubmit } = useSearchHook();

  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <form onSubmit={handleSubmit} className="absolute right-12 top-1 w-auto mx-auto lg:top-16 ">
      <input
        onChange={handleInput}
        name="search"
        className="text-white placeholder:text-white peer cursor-pointer relative z-10 h-12 w-12 rounded-[50px] border border-transparent bg-transparent pl-12 outline-none focus:w-56 focus:cursor-text focus:border-primary focus:pl-16 focus:pr-4 focus:mr-4 ease-linear duration-500"
        placeholder="search..."
      />
      {size.width >= 1440 ? (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-white peer-focus:stroke-primary 
        lg:text-primary lg:peer-focus:border-primary lg:outline lg:rounded-b lg:peer-focus:outline-none lg:h-16 lg:peer-focus:h-auto"
        >
          <path
            d="M27.6094 25.7161L23.0761 21.1961C24.5387 19.3327 25.3324 17.0317 25.3294 14.6628C25.3294 12.5531 24.7038 10.4908 23.5318 8.73672C22.3597 6.9826 20.6938 5.61542 18.7447 4.80809C16.7956 4.00075 14.6509 3.78952 12.5818 4.20109C10.5127 4.61267 8.61205 5.62857 7.12029 7.12033C5.62853 8.61209 4.61263 10.5127 4.20106 12.5818C3.78948 14.651 4.00072 16.7957 4.80805 18.7448C5.61538 20.6938 6.98256 22.3597 8.73668 23.5318C10.4908 24.7039 12.5531 25.3295 14.6628 25.3295C17.0316 25.3324 19.3327 24.5388 21.1961 23.0761L25.7161 27.6095C25.8401 27.7344 25.9875 27.8336 26.15 27.9013C26.3125 27.969 26.4867 28.0039 26.6628 28.0039C26.8388 28.0039 27.0131 27.969 27.1755 27.9013C27.338 27.8336 27.4855 27.7344 27.6094 27.6095C27.7344 27.4855 27.8336 27.3381 27.9013 27.1756C27.969 27.0131 28.0038 26.8388 28.0038 26.6628C28.0038 26.4868 27.969 26.3125 27.9013 26.15C27.8336 25.9876 27.7344 25.8401 27.6094 25.7161ZM6.66277 14.6628C6.66277 13.0806 7.13196 11.5338 8.01101 10.2182C8.89006 8.90265 10.1395 7.87727 11.6013 7.27177C13.0631 6.66627 14.6716 6.50784 16.2235 6.81652C17.7753 7.1252 19.2008 7.88713 20.3196 9.00595C21.4384 10.1248 22.2004 11.5502 22.509 13.1021C22.8177 14.6539 22.6593 16.2625 22.0538 17.7243C21.4483 19.1861 20.4229 20.4355 19.1073 21.3146C17.7917 22.1936 16.245 22.6628 14.6628 22.6628C12.541 22.6628 10.5062 21.82 9.00591 20.3197C7.50562 18.8194 6.66277 16.7845 6.66277 14.6628Z"
            fill="#7F32EC"
          />
        </svg>
      ) : (
        <svg
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-white peer-focus:stroke-primary 
lg:text-primary lg:peer-focus:border-primary lg:outline lg:rounded-b lg:peer-focus:outline-none lg:h-16 lg:peer-focus:h-auto"
        >
          <path
            d="M24.6094 22.7161L20.0761 18.1961C21.5387 16.3327 22.3324 14.0317 22.3294 11.6628C22.3294 9.5531 21.7038 7.4908 20.5318 5.73671C19.3597 3.98259 17.6938 2.61542 15.7447 1.80808C13.7956 1.00075 11.6509 0.789508 9.5818 1.20109C7.5127 1.61266 5.61205 2.62856 4.12029 4.12032C2.62853 5.61208 1.61263 7.5127 1.20106 9.5818C0.789478 11.651 1.00072 13.7957 1.80805 15.7448C2.61538 17.6938 3.98256 19.3597 5.73668 20.5318C7.4908 21.7039 9.5531 22.3295 11.6628 22.3295C14.0316 22.3324 16.3327 21.5388 18.1961 20.0761L22.7161 24.6095C22.8401 24.7344 22.9875 24.8336 23.15 24.9013C23.3125 24.969 23.4867 25.0039 23.6628 25.0039C23.8388 25.0039 24.0131 24.969 24.1755 24.9013C24.338 24.8336 24.4855 24.7344 24.6094 24.6095C24.7344 24.4855 24.8336 24.338 24.9013 24.1756C24.969 24.0131 25.0038 23.8388 25.0038 23.6628C25.0038 23.4868 24.969 23.3125 24.9013 23.15C24.8336 22.9875 24.7344 22.8401 24.6094 22.7161ZM3.66277 11.6628C3.66277 10.0805 4.13196 8.5338 5.01101 7.2182C5.89006 5.90264 7.1395 4.87726 8.6013 4.27176C10.0631 3.66626 11.6716 3.50783 13.2235 3.81651C14.7753 4.1252 16.2008 4.88712 17.3196 6.00594C18.4384 7.1248 19.2004 8.5502 19.509 10.1021C19.8177 11.6539 19.6593 13.2625 19.0538 14.7243C18.4483 16.1861 17.4229 17.4355 16.1073 18.3146C14.7917 19.1936 13.245 19.6628 11.6628 19.6628C9.541 19.6628 7.5062 18.8199 6.00591 17.3197C4.50562 15.8194 3.66277 13.7845 3.66277 11.6628Z"
            fill="#F3ECE4"
          />
        </svg>
      )}
    </form>
  );
};
