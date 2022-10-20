import React from 'react';
import Link from 'next/link';
import { IHrefPostProps } from '../../../interfaces';
import ButtonIcon from './ButtonIcon';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { addRemoveFav, UserDataState } from '../../../redux/slice/userDataSlice';
import { useAxios } from '../../../hooks/useAxios';

const LeftIcons = ({ hrefPost, id }: { hrefPost?: IHrefPostProps; id: number }) => {
  const { favorites } = useSelector<RootState, UserDataState>(state => state.userDataReducer);
  const dispatch = useDispatch();
  // Revisar porque el favoritos no funciona dentro de un post. Por eso agregue el idPost, se puede borrar

  const api = useAxios();

  const handleFavorite = () => {
    api
      .post(`/post/${id}/favorite`)
      .then(res => {
        if (res.status === 200) {
          dispatch(addRemoveFav({ id }));
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="flex px-2 gap-x-2">
      <div onClick={handleFavorite}>
        <ButtonIcon
          icon={
            <svg
              className="cursor-pointer"
              width="24"
              height="26"
              viewBox="0 0 24 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {favorites.some(favorite => favorite.id === id) ? (
                <path
                  d="M1.33325 3.94136V23.3894C1.33325 24.576 2.76925 25.172 3.60925 24.332L11.9999 15.9414L20.3906 24.332C21.2306 25.172 22.6666 24.5774 22.6666 23.3894V3.94136C22.6666 3.23411 22.3856 2.55583 21.8855 2.05574C21.3854 1.55564 20.7072 1.27469 19.9999 1.27469H3.99992C3.29267 1.27469 2.6144 1.55564 2.1143 2.05574C1.6142 2.55583 1.33325 3.23411 1.33325 3.94136Z"
                  fill="#FD8A09"
                  stroke="#7F32EC"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : (
                <path
                  d="M1.3335 3.94132V23.3893C1.3335 24.576 2.7695 25.172 3.6095 24.332L12.0002 15.9413L20.3908 24.332C21.2308 25.172 22.6668 24.5773 22.6668 23.3893V3.94132C22.6668 3.23408 22.3859 2.5558 21.8858 2.05571C21.3857 1.55561 20.7074 1.27466 20.0002 1.27466H4.00016C3.29292 1.27466 2.61464 1.55561 2.11454 2.05571C1.61445 2.5558 1.3335 3.23408 1.3335 3.94132V3.94132Z"
                  stroke="#7F32EC"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </svg>
          }
          iconName="Favoritos"
        />
      </div>

      <ButtonIcon
        icon={
          hrefPost ? (
            <Link href={hrefPost}>
              <a>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M13.9998 0.666016C21.3638 0.666016 27.3332 6.63535 27.3332 13.9993C27.3332 21.3633 21.3638 27.3327 13.9998 27.3327C11.8718 27.3356 9.77428 26.8271 7.88385 25.85L2.78252 27.2727C2.4979 27.3521 2.19729 27.3544 1.91148 27.2794C1.62567 27.2044 1.36494 27.0548 1.15599 26.8459C0.947053 26.6369 0.797417 26.3762 0.722418 26.0904C0.647419 25.8046 0.649753 25.504 0.729182 25.2193L2.15318 20.122C1.17365 18.2299 0.663746 16.1299 0.666515 13.9993C0.666515 6.63535 6.63585 0.666016 13.9998 0.666016ZM13.9998 2.66602C10.9941 2.66602 8.11138 3.86006 5.98597 5.98547C3.86056 8.11088 2.66652 10.9936 2.66652 13.9993C2.66652 15.9593 3.16385 17.8433 4.09718 19.5153L4.29718 19.8753L2.81452 25.1873L8.13052 23.7047L8.49052 23.9047C10.003 24.7456 11.688 25.229 13.4163 25.3178C15.1446 25.4065 16.8703 25.0983 18.461 24.4168C20.0517 23.7353 21.4652 22.6985 22.5931 21.386C23.721 20.0735 24.5334 18.5202 24.9679 16.845C25.4025 15.1699 25.4476 13.4175 25.0999 11.7223C24.7522 10.027 24.0209 8.43386 22.962 7.06504C21.9032 5.69621 20.5449 4.58804 18.9914 3.82551C17.4379 3.06298 15.7304 2.66635 13.9998 2.66602ZM9.66652 15.3327H15.6638C15.9172 15.3328 16.1611 15.429 16.3462 15.602C16.5314 15.7749 16.6439 16.0117 16.6612 16.2645C16.6785 16.5173 16.5992 16.7672 16.4393 16.9637C16.2794 17.1603 16.0508 17.2888 15.7998 17.3233L15.6638 17.3327H9.66652C9.41315 17.3326 9.16926 17.2364 8.98413 17.0634C8.79899 16.8904 8.68642 16.6536 8.66915 16.4008C8.65188 16.1481 8.7312 15.8982 8.89109 15.7016C9.05098 15.5051 9.27952 15.3765 9.53052 15.342L9.66652 15.3327H15.6638H9.66652ZM9.66652 10.666H18.3398C18.5931 10.6664 18.8368 10.7629 19.0216 10.936C19.2065 11.1091 19.3188 11.3458 19.3359 11.5985C19.353 11.8512 19.2736 12.1009 19.1137 12.2973C18.9538 12.4937 18.7254 12.6222 18.4745 12.6567L18.3398 12.666H9.66652C9.41315 12.6659 9.16926 12.5697 8.98413 12.3967C8.79899 12.2237 8.68642 11.9869 8.66915 11.7342C8.65188 11.4814 8.7312 11.2315 8.89109 11.0349C9.05098 10.8384 9.27952 10.7099 9.53052 10.6753L9.66652 10.666H18.3398H9.66652Z"
                    fill="#7F32EC"
                  />
                </svg>
              </a>
            </Link>
          ) : (
            <Link href="#comments">
              <a>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M13.9998 0.666016C21.3638 0.666016 27.3332 6.63535 27.3332 13.9993C27.3332 21.3633 21.3638 27.3327 13.9998 27.3327C11.8718 27.3356 9.77428 26.8271 7.88385 25.85L2.78252 27.2727C2.4979 27.3521 2.19729 27.3544 1.91148 27.2794C1.62567 27.2044 1.36494 27.0548 1.15599 26.8459C0.947053 26.6369 0.797417 26.3762 0.722418 26.0904C0.647419 25.8046 0.649753 25.504 0.729182 25.2193L2.15318 20.122C1.17365 18.2299 0.663746 16.1299 0.666515 13.9993C0.666515 6.63535 6.63585 0.666016 13.9998 0.666016ZM13.9998 2.66602C10.9941 2.66602 8.11138 3.86006 5.98597 5.98547C3.86056 8.11088 2.66652 10.9936 2.66652 13.9993C2.66652 15.9593 3.16385 17.8433 4.09718 19.5153L4.29718 19.8753L2.81452 25.1873L8.13052 23.7047L8.49052 23.9047C10.003 24.7456 11.688 25.229 13.4163 25.3178C15.1446 25.4065 16.8703 25.0983 18.461 24.4168C20.0517 23.7353 21.4652 22.6985 22.5931 21.386C23.721 20.0735 24.5334 18.5202 24.9679 16.845C25.4025 15.1699 25.4476 13.4175 25.0999 11.7223C24.7522 10.027 24.0209 8.43386 22.962 7.06504C21.9032 5.69621 20.5449 4.58804 18.9914 3.82551C17.4379 3.06298 15.7304 2.66635 13.9998 2.66602ZM9.66652 15.3327H15.6638C15.9172 15.3328 16.1611 15.429 16.3462 15.602C16.5314 15.7749 16.6439 16.0117 16.6612 16.2645C16.6785 16.5173 16.5992 16.7672 16.4393 16.9637C16.2794 17.1603 16.0508 17.2888 15.7998 17.3233L15.6638 17.3327H9.66652C9.41315 17.3326 9.16926 17.2364 8.98413 17.0634C8.79899 16.8904 8.68642 16.6536 8.66915 16.4008C8.65188 16.1481 8.7312 15.8982 8.89109 15.7016C9.05098 15.5051 9.27952 15.3765 9.53052 15.342L9.66652 15.3327H15.6638H9.66652ZM9.66652 10.666H18.3398C18.5931 10.6664 18.8368 10.7629 19.0216 10.936C19.2065 11.1091 19.3188 11.3458 19.3359 11.5985C19.353 11.8512 19.2736 12.1009 19.1137 12.2973C18.9538 12.4937 18.7254 12.6222 18.4745 12.6567L18.3398 12.666H9.66652C9.41315 12.6659 9.16926 12.5697 8.98413 12.3967C8.79899 12.2237 8.68642 11.9869 8.66915 11.7342C8.65188 11.4814 8.7312 11.2315 8.89109 11.0349C9.05098 10.8384 9.27952 10.7099 9.53052 10.6753L9.66652 10.666H18.3398H9.66652Z"
                    fill="#7F32EC"
                  />
                </svg>
              </a>
            </Link>
          )
        }
        iconName="Comentar"
      />
    </div>
  );
};

export default LeftIcons;
