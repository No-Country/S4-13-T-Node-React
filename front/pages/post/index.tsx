import type { NextPage } from 'next';
import Head from 'next/head';

import Layout from '../../components/layout/Layout';
import PostContainer from '../../components/posts/PostContainer';

const Post: NextPage = () => {
  return (
    <>
      <Head>
        <title>Post - Memex</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <PostContainer />
      </Layout>
    </>
  );
};

export default Post;
