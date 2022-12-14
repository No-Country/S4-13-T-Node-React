import type { NextPage } from 'next';
import Head from 'next/head';
import FormUpload from '../../components/formUpload/FormUpload';
import Layout from '../../components/layout/Layout';

const Upload: NextPage = () => {
  return (
    <>
      <Head>
        <title>Subir Meme - Memex</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div className="flex flex-col min-w-screen w-full sm:w-[512px] lg:w-[1024px] mt-[56px]">
          <div className="w-full flex flex-col gap-y-4 mt-4 mx-auto max-w-[344px] min-h-[80vh]">
            <h1 className="font-orelega text-[24px] leading-[26px]">Subir meme</h1>
            <FormUpload />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Upload;
