import Link from 'next/link';
import Image from 'next/image';

function Footer() {
  return (
    <div className="inset-x-0 w-full mx-auto sm:w-[512px] lg:w-[1024px] font-roboto text-sm lg:text-base">
      <div className="bg-accent h-18 min-screen mx-2 rounded-t-lg flex justify-around items-center text-white text-center lg:justify-center">
        <ul className="w-[140px] lg:flex lg:gap-x-10 lg:w-auto">
          <li>
            <Link href="#">
              <a>Privacidad</a>
            </Link>
          </li>
          <li>
            <Link href="#">
              <a>Reglas del sitio</a>
            </Link>
          </li>
        </ul>
        <div className="lg:mx-10">
          <Link href="/">
            <a>
              <Image src="/assets/logo/logoMobile.png" width="54px" height="43px" />
            </a>
          </Link>
        </div>
        <ul className="w-[140px] lg:flex lg:gap-x-10 lg:w-auto">
          <li>
            <Link href="#">
              <a>Contacto</a>
            </Link>
          </li>
          <li>
            <Link href="#">
              <a>Términos de servicio</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
