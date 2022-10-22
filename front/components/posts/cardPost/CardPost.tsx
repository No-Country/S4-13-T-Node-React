import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { CardPostProps } from '../../../interfaces';
import { UserDataState } from '../../../redux/slice/userDataSlice';
import { RootState } from '../../../redux/store';
import LeftIcons from './LeftIcons';
import RightIcons from './RightIcons';

const CardPost = ({ id, imageUrl, author, title, hrefPost, authorId }: CardPostProps) => {
  const [imageHeight, setImageHeight] = useState<number>(0);
  const [imageWidth, setImageWidth] = useState<number>(0);

  const { data } = useSelector<RootState, UserDataState>(state => state.userDataReducer);

  return (
    <div className={`border-2 border-secondary rounded-3xl ${hrefPost ? 'mb-8' : ''} first:mt-4 py-2.5 w-[344px]`}>
      <div className="flex justify-between items-center font-roboto px-6 mt-1 mb-3 gap-[8px]">
        {hrefPost ? (
          <Link href={hrefPost}>
            <a>
              <p className="cursor-pointer">{title}</p>
            </a>
          </Link>
        ) : (
          <p className="pointer">{title}</p>
        )}

        {author ? (
          // <div
          //   className={`w-[30%] flex flex-col justify-end font-bold cursor-pointer ${
          //     authorId == id ? 'text-accent' : 'text-primary'
          //   }`}
          // >
          <Link href={`/profile?id=${authorId}`}>
            <a
              className={`w-[28%] h-full flex flex-col justify-end font-bold cursor-pointer text-right active:text-secondary ${
                authorId == id ? 'text-accent' : 'text-primary'
              }
            `}
            >
              <p className="text-right leading-none truncate">{author}</p>
            </a>
          </Link>
        ) : (
          // </div>
          <>
            {data?.access_token ? (
              <div className="flex justify-center items-center gap-x-3">
                <svg
                  width="17"
                  height="20"
                  viewBox="0 0 17 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="cursor-pointer"
                >
                  <path
                    d="M15.9998 18H1.99981C1.73459 18 1.48024 18.1053 1.2927 18.2929C1.10517 18.4804 0.999808 18.7348 0.999808 19C0.999808 19.2652 1.10517 19.5196 1.2927 19.7071C1.48024 19.8946 1.73459 20 1.99981 20H15.9998C16.265 20 16.5194 19.8946 16.7069 19.7071C16.8945 19.5196 16.9998 19.2652 16.9998 19C16.9998 18.7348 16.8945 18.4804 16.7069 18.2929C16.5194 18.1053 16.265 18 15.9998 18ZM1.99981 16H2.08981L6.25981 15.62C6.71661 15.5745 7.14384 15.3732 7.46981 15.05L16.4698 6.04998C16.8191 5.68095 17.0079 5.18849 16.9948 4.68052C16.9817 4.17254 16.7677 3.69049 16.3998 3.33998L13.6598 0.59998C13.3022 0.264076 12.8336 0.0713388 12.3431 0.058432C11.8527 0.0455252 11.3746 0.213349 10.9998 0.52998L1.99981 9.52998C1.67657 9.85594 1.47531 10.2832 1.42981 10.74L0.999808 14.91C0.986337 15.0564 1.00534 15.2041 1.05547 15.3424C1.1056 15.4806 1.18561 15.6062 1.28981 15.71C1.38325 15.8027 1.49406 15.876 1.6159 15.9258C1.73774 15.9755 1.8682 16.0007 1.99981 16ZM12.2698 1.99998L14.9998 4.72998L12.9998 6.67998L10.3198 3.99998L12.2698 1.99998ZM3.36981 10.91L8.99981 5.31998L11.6998 8.01998L6.09981 13.62L3.09981 13.9L3.36981 10.91Z"
                    fill="#74726F"
                  />
                </svg>

                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="cursor-pointer"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17 5V4C17 3.46957 16.7893 2.96086 16.4142 2.58579C16.0391 2.21071 15.5304 2 15 2H9C8.46957 2 7.96086 2.21071 7.58579 2.58579C7.21071 2.96086 7 3.46957 7 4V5H4C3.73478 5 3.48043 5.10536 3.29289 5.29289C3.10536 5.48043 3 5.73478 3 6C3 6.26522 3.10536 6.51957 3.29289 6.70711C3.48043 6.89464 3.73478 7 4 7H5V18C5 18.7956 5.31607 19.5587 5.87868 20.1213C6.44129 20.6839 7.20435 21 8 21H16C16.7956 21 17.5587 20.6839 18.1213 20.1213C18.6839 19.5587 19 18.7956 19 18V7H20C20.2652 7 20.5196 6.89464 20.7071 6.70711C20.8946 6.51957 21 6.26522 21 6C21 5.73478 20.8946 5.48043 20.7071 5.29289C20.5196 5.10536 20.2652 5 20 5H17ZM15 4H9V5H15V4ZM17 7H7V18C7 18.2652 7.10536 18.5196 7.29289 18.7071C7.48043 18.8946 7.73478 19 8 19H16C16.2652 19 16.5196 18.8946 16.7071 18.7071C16.8946 18.5196 17 18.2652 17 18V7Z"
                    fill="#74726F"
                  />
                  <path d="M9 9H11V17H9V9ZM13 9H15V17H13V9Z" fill="#74726F" />
                </svg>
              </div>
            ) : null}
          </>
        )}
      </div>
      <div className="relative w-full">
        {hrefPost ? (
          <Link href={hrefPost}>
            <a>
              <Image
                src={imageUrl}
                width={340}
                height={imageHeight > 1000 && imageWidth > 800 ? 800 : imageHeight}
                onLoadingComplete={e => {
                  setImageWidth(e.naturalWidth);
                  setImageHeight(e.naturalHeight);
                }}
                alt="meme"
              />
            </a>
          </Link>
        ) : (
          <Image
            src={imageUrl}
            width={340}
            height={imageHeight > 1000 && imageWidth > 800 ? 800 : imageHeight}
            onLoadingComplete={e => {
              setImageWidth(e.naturalWidth);
              setImageHeight(e.naturalHeight);
            }}
            alt="meme"
          />
        )}
      </div>
      <div className="flex justify-between items-center py-1 px-0.5 mt-1">
        <LeftIcons id={id} hrefPost={hrefPost} />
        <RightIcons id={id} />
      </div>
    </div>
  );
};

export default CardPost;
