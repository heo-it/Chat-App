import React, { FunctionComponent, MouseEvent } from 'react';
import styles from '../styles/chatListItem.module.css';
import { useRouter } from 'next/router';
import { BiUserCircle } from 'react-icons/bi';
import { Timestamp } from 'firebase/firestore';

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
  name: string,
  messages: ChatItemProps[]
};

const ChatListItem: FunctionComponent<ChatListItemProps> = ({
  name,
  messages
}: ChatListItemProps) => {
  const router = useRouter();

  const handleChatClick = (e: MouseEvent) => {
    e.preventDefault();
    router.push(`/chat/${name}`);
  };

  return (
    <a onClick={handleChatClick}>
    <div className={styles.container}>
        <BiUserCircle color="gray" size={60} />
        <div className={styles.textContainer}>
          <div className={styles.information}>
            <span className={styles.name}>{name}</span>
            <span className={styles.date}>• {messages.length > 0 ? messages[0].createAt.date : ''}</span>
          </div>
          <p className={styles.preview}>{messages.length > 0 ? messages[0].message : ''}</p>
        </div>
    </div>
    </a>
  )
}

export default ChatListItem;