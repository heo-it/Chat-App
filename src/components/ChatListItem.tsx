import React, { FunctionComponent } from 'react';
import styles from '../styles/chatListItem.module.css';
import { BiUserCircle } from 'react-icons/bi';

const ChatListItem: FunctionComponent = () => {
  return (
    <div className={styles.container}>
      <BiUserCircle color="gray" size={60} />
      <div className={styles.textContainer}>
        <div className={styles.information}>
          <span className={styles.name}>호예진#1e1e1c </span>
          <span className={styles.date}>• 오전 1시 20분</span>
        </div>
        <p className={styles.preview}>채팅 내용 미리 볼 수 있는 영역입니다.</p>
      </div>
    </div>
  )
}

export default ChatListItem;