import type { NextPage } from "next";
import Head from "next/head";
import FormLogin from "../../components/formLogin/FormLogin";
import Layout from "../../components/layout/Layout";
const Login: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Login - Memex</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div className="flex flex-col justify-center items-center">
          <FormLogin />
        </div>
      </Layout>
    </div>
  );
};

export default Login;
