import type { NextPage } from 'next';
import Head from 'next/head';

import Layout from '../../components/layout/Layout';

const Random: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Memes Random - Memex</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div className="flex flex-col min-w-screen w-full sm:w-[512px] lg:w-[1024px] mt-[56px]">
          <div className="flex w-full justify-around items-center mt-4 max-w-[344px] mx-auto">
            <h1 className="font-orelega text-[24px] leading-[26px]">Memes Random</h1>
            <button className="font-roboto font-bold text-primary text-base leading-[19px] border-2 border-primary rounded-lg py-2 px-4 active:text-secondary active:border-secondary">
              Subir meme
            </button>
          </div>
          <div className="flex flex-col justify-center items-center min-h-[80vh]">
            <h2 className="font-orelega text-[20px] leading-[22px] text-center w-[250px]">Memes Random</h2>
            //TODO: Container get memes random
            <div className="flex flex-col mt-4 gap-y-4">Container</div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Random;
