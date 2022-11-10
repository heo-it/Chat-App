import React, { FunctionComponent } from 'react';
import styles from '../styles/sideChatBar.module.css';
import { BiSearch } from 'react-icons/bi';
import ChatListItem from './ChatListItem';
import { useRouter } from 'next/router';

import { db } from '../firebase';
import {
  addDoc,
  collection,
  DocumentData,
} from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

export type ChatProps = {
  id: string,
  friends: string[]
}

const SideChatBar: FunctionComponent = () => {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  const [snapshot] = useCollection(collection(db, 'chat'));
  const chats = snapshot?.docs.map((doc: DocumentData) => ({
    id: doc.id,
    ...doc.data()
  }));

  /**
   * @description 내 메세지 목록 불러오기
   */
  const getChatList = () => (
    chats?.filter((chat: ChatProps) => chat.friends.includes(user?.email as string))
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
      // TODO: email만 입력 가능하도록 제한 두어야함
    } else if (!isChat(input)) {
      const docRef = await addDoc(collection(db, 'chat'), { friends: [user?.email, input] });
      router.push(`/chat/${docRef.id}`);
    }
  }

  return (
    <div className={`${styles.container} ${router.query.id ? styles.chatroom : styles.home}`}>
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
          <input className={styles.searchInput} placeholder='대화 검색하기' />
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