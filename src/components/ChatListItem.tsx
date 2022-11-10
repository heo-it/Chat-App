import React, { FunctionComponent, MouseEvent } from 'react';
import styles from '../styles/chatListItem.module.css';
import { useRouter } from 'next/router';
import { BiUserCircle } from 'react-icons/bi';
import { Timestamp } from 'firebase/firestore';
import { ChatProps } from './SideChatBar';

import { db } from '../firebase';
import {
  collection,
  query,
  orderBy,
  DocumentData,
} from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

import dayjs from 'dayjs';

type ChatListItemProps = {
  chat: ChatProps
};

const ChatListItem: FunctionComponent<ChatListItemProps> = ({
  chat
}: ChatListItemProps) => {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  const q = query(collection(db, `chat/${chat.id}/message`), orderBy('createAt'));
  const [snapshot] = useCollection(q);
  const chats = snapshot?.docs.map((doc: DocumentData) => doc.data());

  const handleChatClick = (e: MouseEvent) => {
    e.preventDefault();
    router.push(`/chat/${chat.id}`);
  };

  const formattedDate = (timestamp: Timestamp) => (
    dayjs(timestamp.toDate()).format('YYYY.MM.DD')
  );

  const getSender = (friends: string[]) => (
    friends.find((friend: string) => friend !== user?.email)
  );

  return (
    chats ?
      <a onClick={handleChatClick}>
        <div className={styles.container}>
            <BiUserCircle className={styles.image} size={50} width={50} height={50} />
            <div className={styles.textContainer}>
              <div className={styles.information}>
                <span className={styles.name} dangerouslySetInnerHTML={{ __html: getSender(chat.friends) as string}} />
                <span className={styles.date}>• {chats?.[0] ? formattedDate(chats[0].createAt) : ''}</span>
              </div>
              <p className={styles.preview}>{chats?.[0] ? chats[0].message : ''}</p>
            </div>
        </div>
      </a>
    : <></>
  )
}

export default ChatListItem;