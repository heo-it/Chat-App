import React, { FunctionComponent } from "react";
import styles from '../styles/sideChatBar.module.css';
import { BiSearch } from 'react-icons/bi';
import ChatListItem from './ChatListItem';
import me from '../user';
import { useRouter } from "next/router";

import { db } from '../firebase';
import {
  doc,
  updateDoc,
  arrayUnion,
  collection,
  query,
  orderBy,
  DocumentData,
} from 'firebase/firestore';
import { useDocument, useCollection } from 'react-firebase-hooks/firestore';

const SideChatBar: FunctionComponent = () => {
  const router = useRouter();

  const [snapshot] = useCollection(collection(db, "chat"));
  const chats = snapshot?.docs.map((doc: DocumentData) => ({
    id: doc.id,
    ...doc.data()
  }));

  /**
   * @description 내 메세지 목록 불러오기
   */
  const getChatList = () => {
    const friends = value?.data()?.friends;
    if (friends) {
      const chats = Object.assign(
        {},
        ...friends.map((name: string) => ({
          [name]: snapshot?.docs
            .filter((doc: DocumentData) => doc.data().sender === name)
            .map((doc: DocumentData) => ({
              id: doc.id,
              ...doc.data(),
            })),
        })),
      );

      return Object.keys(chats).map((user, index) =>
        <ChatListItem key={index} name={user} messages={chats[user]} />
      )
    }
  }

  /**
   * @description 새 메세지 추가
   */
  const addNewChat = async () => {
    const input = prompt("메세지를 보낼 친구의 이메일을 입력해주세요 :)");

    if (!input) {
      return;
      // TODO: email만 입력 가능하도록 제한 두어야함
    } else if (value?.data()?.friends?.includes(input) === false) {

      const senderRef = doc(db, "chat", input);
      await updateDoc(docRef, {
        friends: arrayUnion(input)
      });
      await updateDoc(senderRef, {
        friends: arrayUnion(me.email)
      });
      router.push(`/chat/${input}`);
    }
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
          getChatList()?.map((chat: ChatProps) =>
            <ChatListItem key={chat.id} chat={chat} />
          )
        }
      </div>
    </div>
  );
}

export default SideChatBar;