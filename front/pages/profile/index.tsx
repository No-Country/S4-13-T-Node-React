import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../../components/layout/Layout';
import UpdatedMemesContainer from '../../components/uploadedMemes/UpdatedMemesContainer';
import UserContainer from '../../components/user/UserContainer';
const Register: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Profile - Memex</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <>
          <UserContainer />
          <div className="px-2 mt-8 sm:mx-auto">
            <h2 className="pl-6 font-orelega text-xl mb-4">Mis memes subidos</h2>
            <UpdatedMemesContainer />
            <UpdatedMemesContainer />
          </div>
        </>
      </Layout>
    </div>
  );
};

export default Register;
