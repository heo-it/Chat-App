import React, { FunctionComponent } from "react";
import styles from '../styles/sideChatBar.module.css';
import { BiSearch } from 'react-icons/bi';
import ChatListItem from './ChatListItem';

const SideChatBar: FunctionComponent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.unreadText}>{`안읽은 대화(2)`}</span>
        <button className={styles.newchatButton}>+ 새로운 메세지</button>
      </div>
      <div className={styles.searchContainer}>
        <div className={styles.searchBox}>
          <BiSearch size={20} color="gray" />
          <input className={styles.searchInput} placeholder="대화 검색하기" />
        </div>
      </div>
      <div className={styles.chatListWrapper}>
        {
          [...Array(10)].map((_, index) => 
            <ChatListItem key={index} />)
        }
      </div>
    </div>
  );
}

export default SideChatBar;