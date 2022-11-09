import React, { FunctionComponent, MouseEvent, useState } from 'react'
import styles from '../styles/chatroom.module.css';
import { BiUserCircle } from 'react-icons/bi';
import { FChatItemProps } from './ChatListItem';
import me from '../user';

import { db } from '../firebase';
import {
  addDoc,
  collection,
} from 'firebase/firestore';


type ChatroomProps = {
  id: string,
  chats: FChatItemProps[];
};

const Chatroom: FunctionComponent<ChatroomProps> = ({
  id,
  chats
}: ChatroomProps) => {
  const [inputValue, setInputValue] = useState<string>("");

  const sendChat = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    await addDoc(collection(db, `chat/${id}/message`), {
      createAt: new Date(),
      message: inputValue,
      sender: me.email
    });
    setInputValue("");
  };


  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.name}>호예진</p>
        <p className={styles.role}>프론트엔드 개발자</p>
      </div>
      <ul className={styles.chatBox}>
        {
              <p className={styles.hr}>2016.02.03</p>
              {/* <hr /> */}

              <div className={styles.chatItem}>
          chats &&
          chats.map((chat: FChatItemProps, i: number) =>
            <li key={i} className={styles.list}>
                <BiUserCircle className={styles.image} color="gray" size={40} />
                  <p className={styles.sendDate}>- 오후 3시 20분</p>
                  <p className={styles.sender}>{chat.sender}</p>
                  <p className={styles.text}>{chat.message}</p>
                </div>
              </div>
            </li>
          )
        }
      </ul>
      <div className={styles.searchBox}>
        <textarea
          className={styles.searchArea}
          placeholder="내용 작성해 주세요."
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