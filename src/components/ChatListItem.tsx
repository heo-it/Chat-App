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
import { useDocument, useCollection } from 'react-firebase-hooks/firestore';

import dayjs from 'dayjs';

type ChatItem = {
  id: string,
  sender: string,
  message: string
};

export type ChatItemProps = ChatItem & {
  createAt: {
    date: string,
    time: string
  }
}

export type FChatItemProps = ChatItem & {
  createAt: Timestamp
};

type ChatListItemProps = {
  chat: ChatProps
};

const ChatListItem: FunctionComponent<ChatListItemProps> = ({
  chat
}: ChatListItemProps) => {
  const router = useRouter();

  const q = query(collection(db, `chat/${chat.id}/message`), orderBy("createAt", "desc"));
  const [snapshot] = useCollection(q);
  const chats = snapshot?.docs.map((doc: DocumentData) => doc.data());

  const handleChatClick = (e: MouseEvent) => {
    e.preventDefault();
    router.push(`/chat/${chat.id}`);
  };

  const formattedDate = (timestamp: Timestamp) => (
    dayjs(timestamp.toDate()).format("YYYY.MM.DD")
  );
  return (
            <span className={styles.name}>{name}</span>
    chats ?
      <a onClick={handleChatClick}>
        <div className={styles.container}>
            <BiUserCircle color="gray" size={60} />
            <div className={styles.textContainer}>
              <div className={styles.information}>
                <span className={styles.date}>• {formattedDate(chats[0].createAt)}</span>
              </div>
              <p className={styles.preview}>{chats[0].message}</p>
            </div>
        </div>
      </a>
    : <></>
  )
}

export default ChatListItem;