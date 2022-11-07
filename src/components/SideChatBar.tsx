import React, { FunctionComponent, useState, useEffect } from "react";
import styles from '../styles/sideChatBar.module.css';
import { BiSearch } from 'react-icons/bi';
import ChatListItem from './ChatListItem';
import me from '../user';

import { db } from '../firebase';
import {
  doc,
  getDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  collection,
  query,
  orderBy,
  DocumentData
} from 'firebase/firestore/lite';

export interface ChatItem {
  id: string,
  sender: string,
  createAt: {
    seconds: number,
    nanoseconds: number
  },
  message: string
}

interface Chat {
  [key: string] : ChatItem[]
}

const SideChatBar: FunctionComponent = () => {
  const [chats, setChats] = useState<Chat>();

  /**
   * @description 내 메세지 목록 불러오기
   */
  const getChatList = async () => {
    const docRef = doc(db, "chat", me.email); // yejin is test data
    const docSnap = await getDoc(docRef);
    const friendList = docSnap.exists() && docSnap.data().friends;

    const q = query(collection(db, `chat/${me.email}/message`), orderBy("createAt", "desc"));
    const querySnapshot = await getDocs(q);

    friendList &&
    setChats(Object.assign({}, ...friendList.map((name: string, i: number) => (
      {
        [name]:
          querySnapshot.docs
            .filter((doc: DocumentData) => doc.data().sender === name)
              .map((doc: DocumentData) => ({
                id: doc.id,
                ...doc.data(),
              }))
      }
    ))));
  }

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

  useEffect(() => {
    getChatList();
  }, []);

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
          chats &&
          Object.keys(chats).map((user, index) =>
            <ChatListItem key={index} name={user} messages={chats[user]} />
          )
        }
      </div>
    </div>
  );
}

export default SideChatBar;