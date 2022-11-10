import type { NextPage } from 'next';
import Head from 'next/head';
import SideChatBar from 'components/SideChatBar';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Chat App</title>
        <meta property='og:title' content='Chat App' key='title' />
        <meta property='og:description' content='Chat App' key='description'/>
        <meta content='Chat App' key='title' />
        <meta content='Chat App' key='description'/>
      </Head>
      <main>
        <SideChatBar />
      </main>
    </>
  )
}

export default Home;
