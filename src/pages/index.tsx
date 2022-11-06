import type { NextPage } from 'next';
import Head from 'next/head';
import SideChatBar from '../components/SideChatBar';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Chat App</title>
        <meta content="Chat App" key="title" />
        <meta content="Chat App" key="description"/>
      </Head>
      <main>
        <SideChatBar />
      </main>
    </>
  )
}

export default Home;
