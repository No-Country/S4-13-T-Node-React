import React from 'react';

const ButtonIcon = ({ icon, iconName }: { icon: React.ReactNode; iconName: string }) => {
  return (
    <div className="flex flex-col justify-around items-center w-[43px] h-[50px]">
      {icon}
      <p className="text-[10px] text-primary font-roboto">{iconName}</p>
    </div>
  );
};

export default ButtonIcon;
