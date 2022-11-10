import React, { FunctionComponent, MouseEvent, useState, useRef, useEffect } from 'react'
import styles from '../styles/chatroom.module.css';
import { BiUserCircle } from 'react-icons/bi';
import { FChatItemProps } from './ChatListItem';

import { db } from '../firebase';
import {
  addDoc,
  collection,
  Timestamp
} from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

import dayjs from 'dayjs';
import { LinkItUrl } from 'react-linkify-it';

type ChatroomProps = {
  id: string,
  chats: FChatItemProps[];
};

const Chatroom: FunctionComponent<ChatroomProps> = ({
  id,
  chats
}: ChatroomProps) => {
  const [user, loading, error] = useAuthState(auth);
  const [inputValue, setInputValue] = useState<string>('');

  const scrollRef = useRef<HTMLLIElement>(null);

  const sendChat = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    await addDoc(collection(db, `chat/${id}/message`), {
      createAt: new Date(),
      message: inputValue,
      sender: user?.email
    });
    setInputValue('');
  };

  const formattedDate = (timestamp: Timestamp) => (
    dayjs(timestamp.toDate()).format('YYYY.MM.DD')
  );

  const formattedTime = (timestamp: Timestamp) => (
    dayjs(timestamp.toDate()).format('HH:mm')
  );

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end'
    });
  }, [chats]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.name}>호예진</p>
        <p className={styles.role}>프론트엔드 개발자</p>
      </div>
      <ul className={styles.chatBox}>
        {
          chats &&
          chats.map((chat: FChatItemProps, i: number) =>
            <li key={i} className={styles.list} ref={i === chats.length - 1 ? scrollRef : null}>
              {
                (i === 0 ||
                formattedDate(chat.createAt) != formattedDate(chats[i - 1].createAt)) &&
                <p className={styles.hr}>{formattedDate(chat.createAt)}</p>
              }
              <div className={`${styles.chatItem} ${chat.sender === user?.email ? styles.chatItemRight: ''}`}>
                <BiUserCircle className={styles.image} size={40} />
                <div className={`${styles.chatInfo} ${chat.sender === user?.email ? styles.chatRight : ''}`}>
                  <p className={styles.sender}>{chat.sender}</p>
                  <LinkItUrl>
                    <p className={styles.message}>
                      {chat.message}
                    </p>
                  </LinkItUrl>
                  <p className={styles.sendDate}>{`- ${formattedTime(chat.createAt)}`}</p>
                </div>
              </div>
            </li>
          )
        }
      </ul>
      <div className={styles.searchBox}>
        <textarea
          className={styles.searchArea}
          placeholder='내용 작성해 주세요.'
          value={inputValue}
          onChange={(e) =>
            setInputValue(e.target.value)
          }
        ></textarea>
        <div className={styles.buttonWrapper}>
          <button className={styles.button} onClick={sendChat}>보내기</button>
        </div>
      </div>
    </div>
  )
}

export default Chatroom;