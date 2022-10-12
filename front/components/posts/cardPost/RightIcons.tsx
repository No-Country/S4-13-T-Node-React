import { useState } from 'react';
import ButtonsShare from './ButtonsShare';

const RightIcons = ({ id }: { id: string | number }) => {
  const [share, setShare] = useState(false);

  return (
    <div className="flex justify-around items-center gap-x-3 px-3">
      <div className={`flex transition-all gap-0 ${share ? 'gap-x-4' : ''}`} onClick={() => setShare(true)}>
        {share ? (
          <ButtonsShare id={id} />
        ) : (
          <svg
            className="cursor-pointer"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.3891 19.6292C22.6988 19.6326 22.0181 19.7879 21.3972 20.0835C20.7763 20.3791 20.2311 20.8076 19.8018 21.3373L13.0606 17.2072C13.3063 16.4301 13.3063 15.5984 13.0606 14.8213L19.8018 10.6912C20.486 11.5214 21.448 12.0876 22.5173 12.2893C23.5867 12.4911 24.6944 12.3154 25.6443 11.7934C26.5941 11.2714 27.3248 10.4367 27.7069 9.43734C28.0889 8.43794 28.0977 7.33827 27.7316 6.33314C27.3655 5.32801 26.6483 4.48229 25.7069 3.9458C24.7654 3.40931 23.6607 3.21667 22.5882 3.40202C21.5157 3.58737 20.5448 4.13873 19.8475 4.95844C19.1501 5.77815 18.7713 6.81329 18.7781 7.8805C18.7825 8.28464 18.8446 8.68619 18.9626 9.07345L12.2214 13.2036C11.6262 12.4694 10.8128 11.9348 9.89373 11.6739C8.97469 11.413 7.9956 11.4388 7.09218 11.7476C6.18876 12.0565 5.40576 12.6331 4.85171 13.3976C4.29766 14.1621 4 15.0765 4 16.0142C4 16.9519 4.29766 17.8664 4.85171 18.6308C5.40576 19.3953 6.18876 19.9719 7.09218 20.2808C7.9956 20.5897 8.97469 20.6154 9.89373 20.3546C10.8128 20.0937 11.6262 19.5591 12.2214 18.8249L18.9626 22.955C18.8446 23.3423 18.7825 23.7438 18.7781 24.1479C18.7781 25.0417 19.0486 25.9153 19.5552 26.6584C20.0619 27.4015 20.782 27.9807 21.6245 28.3227C22.4671 28.6647 23.3942 28.7542 24.2886 28.5798C25.183 28.4055 26.0046 27.9751 26.6495 27.3432C27.2943 26.7112 27.7335 25.9061 27.9114 25.0295C28.0893 24.153 27.998 23.2444 27.649 22.4187C27.3 21.593 26.709 20.8873 25.9508 20.3908C25.1925 19.8942 24.301 19.6292 23.3891 19.6292ZM23.3891 5.16926C23.9362 5.16926 24.4711 5.32827 24.9261 5.62619C25.381 5.9241 25.7356 6.34754 25.945 6.84296C26.1544 7.33837 26.2092 7.88351 26.1025 8.40944C25.9957 8.93537 25.7322 9.41847 25.3453 9.79764C24.9584 10.1768 24.4655 10.435 23.9288 10.5396C23.3921 10.6443 22.8359 10.5906 22.3303 10.3854C21.8248 10.1802 21.3927 9.83265 21.0887 9.38679C20.7848 8.94093 20.6225 8.41674 20.6225 7.8805C20.6225 7.16144 20.914 6.47182 21.4328 5.96337C21.9516 5.45491 22.6553 5.16926 23.3891 5.16926ZM8.63407 18.7255C8.0869 18.7255 7.55201 18.5665 7.09705 18.2685C6.64209 17.9706 6.28749 17.5472 6.0781 17.0518C5.86871 16.5564 5.81392 16.0112 5.92067 15.4853C6.02742 14.9594 6.2909 14.4763 6.67782 14.0971C7.06473 13.7179 7.55768 13.4597 8.09434 13.3551C8.631 13.2505 9.18726 13.3042 9.69279 13.5094C10.1983 13.7146 10.6304 14.0621 10.9344 14.5079C11.2384 14.9538 11.4006 15.478 11.4006 16.0142C11.4006 16.7333 11.1092 17.4229 10.5903 17.9314C10.0715 18.4398 9.36781 18.7255 8.63407 18.7255ZM23.3891 26.8592C22.8419 26.8592 22.307 26.7002 21.852 26.4023C21.3971 26.1043 21.0425 25.6809 20.8331 25.1855C20.6237 24.6901 20.5689 24.1449 20.6757 23.619C20.7824 23.0931 21.0459 22.61 21.4328 22.2308C21.8197 21.8516 22.3127 21.5934 22.8493 21.4888C23.386 21.3842 23.9423 21.4379 24.4478 21.6431C24.9533 21.8483 25.3854 22.1958 25.6894 22.6417C25.9934 23.0875 26.1556 23.6117 26.1556 24.1479C26.1556 24.867 25.8641 25.5566 25.3453 26.0651C24.8265 26.5735 24.1228 26.8592 23.3891 26.8592Z"
              fill="#7F32EC"
            />
          </svg>
        )}
      </div>
      <svg
        className="cursor-pointer"
        width="30"
        height="26"
        viewBox="0 0 30 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21.4498 2.5C22.1779 2.49939 22.8987 2.64413 23.5701 2.92575C24.2416 3.20736 24.85 3.62018 25.3598 4.14C26.4102 5.20638 26.999 6.64316 26.999 8.14C26.999 9.63685 26.4102 11.0736 25.3598 12.14L14.9998 22.63L4.63978 12.14C3.58936 11.0736 3.00056 9.63685 3.00056 8.14C3.00056 6.64316 3.58936 5.20638 4.63978 4.14C5.14987 3.62055 5.75835 3.20795 6.42969 2.92629C7.10102 2.64464 7.82175 2.49957 8.54978 2.49957C9.2778 2.49957 9.99853 2.64464 10.6699 2.92629C11.3412 3.20795 11.9497 3.62055 12.4598 4.14L14.9998 6.74L17.5298 4.16C18.038 3.63399 18.6471 3.21586 19.3207 2.93064C19.9942 2.64542 20.7183 2.49895 21.4498 2.5ZM21.4498 0.500003C20.4554 0.49916 19.4709 0.696858 18.5539 1.0815C17.6369 1.46615 16.806 2.03 16.1098 2.74L14.9998 3.86L13.8898 2.74C13.1927 2.03129 12.3616 1.46841 11.4448 1.08419C10.528 0.699974 9.54384 0.502097 8.54978 0.502097C7.55571 0.502097 6.57159 0.699974 5.65479 1.08419C4.73798 1.46841 3.90683 2.03129 3.20978 2.74C1.79165 4.18363 0.99707 6.12636 0.99707 8.15C0.99707 10.1736 1.79165 12.1164 3.20978 13.56L14.9998 25.5L26.7898 13.56C28.2079 12.1164 29.0025 10.1736 29.0025 8.15C29.0025 6.12636 28.2079 4.18363 26.7898 2.74C26.0929 2.03091 25.2618 1.46765 24.345 1.08306C23.4282 0.698482 22.444 0.500276 21.4498 0.500003Z"
          fill="#7F32EC"
        />
      </svg>
    </div>
  );
};

export default RightIcons;
