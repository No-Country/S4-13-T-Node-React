import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../../components/layout/Layout';
import CardPost from '../../components/cardPost/CardPost';
const Login: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Lo Nuevo - Memex</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div className="flex flex-col min-w-screen w-full sm:w-[512px] lg:w-[1024px]">
          <div className="flex w-full justify-around items-center mt-4 max-w-[344px] mx-auto">
            <h1 className="font-orelega text-[24px] leading-[26px]">Lo nuevo</h1>
            <button className="font-roboto font-bold text-primary text-base leading-[19px] border-2 border-primary rounded-lg py-2 px-4">
              Subir meme
            </button>
          </div>
          <div className="px-2 mx-auto">
            <CardPost />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Login;