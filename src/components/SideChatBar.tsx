import React, { FunctionComponent } from "react";
import styles from '../styles/sideChatBar.module.css';
import { BiSearch } from 'react-icons/bi';
import ChatListItem from './ChatListItem';
import me from '../user';

import { db } from '../firebase';
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore/lite';

const SideChatBar: FunctionComponent = () => {

  /**
   * @description 새 메세지 추가
   */
  const addNewChat = async () => {
    const input = prompt("메세지를 보낼 친구의 이메일을 입력해주세요 :)");

    if (!input) {
      return;
    } else {
      const docRef = doc(db, "chat", me.email);
      const docSnap = await getDoc(docRef);

      docSnap.exists() &&
      docSnap.data().friends.includes(input) === false &&
      await updateDoc(docRef, {
        friends: arrayUnion(input)
      });
    }
    // 메세지 추가 후 리스트 업데이트
  }
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.unreadText}>{`안읽은 대화(2)`}</span>
        <button className={styles.newchatButton} onClick={addNewChat}>+ 새로운 메세지</button>
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