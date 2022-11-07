import React, { FunctionComponent } from 'react';
import styles from '../styles/chatListItem.module.css';
import { BiUserCircle } from 'react-icons/bi';
import { ChatItem } from './SideChatBar';

type ChatListItemProps = {
  name: string,
  messages: ChatItem[]
}

const ChatListItem: FunctionComponent<ChatListItemProps> = ({
  name,
  messages
}: ChatListItemProps) => {
  return (
    <div className={styles.container}>
      <BiUserCircle color="gray" size={60} />
      <div className={styles.textContainer}>
        <div className={styles.information}>
          <span className={styles.name}>{name}</span>
          <span className={styles.date}>• {messages.length > 0 ? messages[0].createAt.seconds : ''}</span>
        </div>
        <p className={styles.preview}>{messages.length > 0 ? messages[0].message : ''}</p>
      </div>
    </div>
  )
}

export default ChatListItem;