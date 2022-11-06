import type { NextPage } from 'next';
import Head from 'next/head';
import SideChatBar from '../components/SideChatBar';
import Chatroom from 'components/Chatroom';

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
        <Chatroom />
      </main>
    </>
  )
}

export default Home;
