import Image from 'next/image';
import React from 'react';

function Search404() {
  return (
    <div className="flex flex-col w-[400px]">
      <Image src={'/assets/404/search404.svg'} width={306} height={399} />
      <p className="font-roboto pt-[62px] pb-[27px] text-center text-xl">
        Podés probar con palabras alternativas o sinónimos y puede que tengas suerte.
      </p>
      <Image src={'/assets/logo/logoChico.svg'} width="86px" height="76px" />
    </div>
  );
}

export default Search404;
