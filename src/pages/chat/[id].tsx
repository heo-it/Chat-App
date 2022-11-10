import React, { FunctionComponent } from 'react'
import { useRouter } from "next/router";
import Head from 'next/head';
import SideChatBar from 'components/SideChatBar';
import Chatroom from 'components/Chatroom';
import { FChatItemProps } from '../../components/ChatListItem';

import { db } from '../../firebase';
import {
  collection,
  query,
  orderBy,
  DocumentData
} from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const ChatPage: FunctionComponent = function () {
  const router = useRouter();
  const id = router.query.id as string;
  const [user, loading, error] = useAuthState(auth);

  if (!user) {
    router.push("/");
  }

  const getChats = () => {
    /**
     * @description 나에게 보낸 메세지 불러오는 로직
     */
    const q = query(collection(db, `chat/${id}/message`), orderBy("createAt", "desc"));
    const [snapshot] = useCollection(q);

    const chats = snapshot?.docs
      .map((doc: DocumentData) => doc.data())

    return chats != null ? chats : [];
  };

  const allChats = getChats().sort((a: FChatItemProps, b: FChatItemProps) => a.createAt.seconds - b.createAt.seconds);

  return (
    <>
      <Head>
        <title>Chat App</title>
        <meta property="og:title" content="Chat App" key="title" />
        <meta property="og:description" content="Chat App" key="description"/>
        <meta content="Chat App" key="title" />
        <meta content="Chat App" key="description"/>
      </Head>
      <main>
        {/** @media 쿼리로 375px 보다 작을 경우 안보이게 하자. */}
        <SideChatBar />
        <Chatroom id={id} chats={allChats} />
      </main>
    </>
  )
}

export default ChatPage;