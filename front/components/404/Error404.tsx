import Image from 'next/image';
import React from 'react';

function Error404() {
  return (
    <>
      <div className="flex flex-col w-[400px]">
        <Image src={'/assets/404/404.svg'} width={308} height={300} />
        <p className="font-roboto pt-[62px] pb-[27px] text-center text-xl">
          Parece que no está lo que estás buscando. Igual hay mucho más para ver en Memex.
        </p>
        <Image src={'/assets/logo/logoChico.svg'} width="86px" height="76px" />
      </div>
    </>
  );
}

export default Error404;
