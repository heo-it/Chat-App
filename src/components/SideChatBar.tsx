import React, { FunctionComponent, useState } from 'react';
import styles from '../styles/sideChatBar.module.css';
import { BiSearch } from 'react-icons/bi';
import ChatListItem from './ChatListItem';
import { useRouter } from 'next/router';

import { db } from '../firebase';
import {
  addDoc,
  collection,
  DocumentData,
  orderBy,
  query,
  Timestamp,
} from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';

import isEmail from 'util/isEmail';

export type ChatProps = {
  id: string,
  friends: string[]
  lastCreateAt: Timestamp
}

const SideChatBar: FunctionComponent = () => {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  const [snapshot] = useCollection(collection(db, 'chat'));
  const chats = snapshot?.docs.map((doc: DocumentData) => ({
    id: doc.id,
    ...doc.data()
  }));

  const [searchInput, setSearchInput] = useState<string>('');

  const highlightText = (friends: string[], part: string) => (
    friends.map((f: string) => {
      if (f.includes(part) && f != user?.email) {
        const storng = f.split(part).map((normal: string, i: number) =>
          i > 0 ? `<STRONG>${part}</STRONG>${normal}` : normal
        );
        return storng.join('');
      }
      return f;
    })
  );

  /**
   * @description 내 메세지 목록 불러오기
   */
  const getChatList = (search?: string) => (
    search ?
      chats
        ?.filter((chat: ChatProps) => chat.friends.includes(user?.email as string))
        .filter((chat: ChatProps) => chat.friends.filter((f: string) => f.includes(search)).length > 0)
        .map((chat: ChatProps) => ({
          ...chat,
          id : chat.id,
          friends: highlightText(chat.friends, search),
        }))
        .sort((a: ChatProps, b: ChatProps) => a.lastCreateAt < b.lastCreateAt ? 1 : -1)
     : chats?.filter((chat: ChatProps) => chat?.friends.includes(user?.email as string))
        .sort((a: ChatProps, b: ChatProps) => a.lastCreateAt < b.lastCreateAt ? 1 : -1)
  );

  const isChat = (username: string) => {
    const result =  chats?.filter((chat: ChatProps) => 
      chat.friends.includes(user?.email as string) && chat.friends.includes(username)
    );

    return result && result.length > 0;
  }

  /**
   * @description 새 메세지 추가
   */
  const addNewChat = async () => {
    const input = prompt('메세지를 보낼 친구의 이메일을 입력해주세요 :)');

    if (!input) {
      return;
    } else if (!isEmail(input)) {
      alert("이메일 형식이 잘못되었습니다.\n다시 입력해주세요 :(");
      return;
    } else if (!isChat(input)) {
      const docRef = await addDoc(collection(db, 'chat'), { friends: [user?.email, input] });
      router.push(`/chat/${docRef.id}`);
    }
  }

  return (
    <div className={`${styles.container} ${router.query?.id ? styles.chatroom : styles.home}`}>
      <div className={styles.header}>
        <a
          className={styles.logout}
          onClick={(e) => {
            e.preventDefault();
            signOut(auth);
            router.replace('/');
          }}
        >
          로그아웃
        </a>
        <button className={styles.newchatButton} onClick={addNewChat}>+ 새로운 메세지</button>
      </div>
      <div className={styles.searchContainer}>
        <div className={styles.searchBox}>
          <BiSearch size={20} color='gray' />
          <input 
            className={styles.searchInput}
            value={searchInput}
            onChange={(e) => {
              e.preventDefault();
              setSearchInput(e.target.value)
            }}
            placeholder='대화 검색하기'
          />
        </div>
      </div>
      <div className={styles.chatListWrapper}>
        {
          getChatList(searchInput)?.map((chat: ChatProps) =>
            <ChatListItem key={chat.id} chat={chat} />
          )
        }
      </div>
    </div>
  );
}

export default SideChatBar;