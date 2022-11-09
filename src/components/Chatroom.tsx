import React, { FunctionComponent, MouseEvent, useState } from 'react'
import styles from '../styles/chatroom.module.css';
import { BiUserCircle } from 'react-icons/bi';
import {
  addDoc,
} from 'firebase/firestore';


const Chatroom: FunctionComponent = () => {
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


const Chatroom: FunctionComponent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.name}>호예진</p>
        <p className={styles.role}>프론트엔드 개발자</p>
      </div>
      <ul className={styles.chatBox}>
        {
          [...Array(10)].map((_, i) => 
            <li className={styles.list}>
              <p className={styles.hr}>2016.02.03</p>
              {/* <hr /> */}

              <div className={styles.chatItem}>
                <BiUserCircle className={styles.image} color="gray" size={40} />
                <div className={styles.chatInfo}>
                  <p className={styles.sender}>호예진</p>
                  <p className={styles.text}>
                    안녕하세요  허예진 님. <br/>
                    트리플X인터파크 채용팀입니다. <br/><br/>

                    트리플X인터파크에 관심을 갖고,  프론트엔드 포지션에 지원해주셔서 진심으로 감사드려요. <br/>
                    예진 님의 과제 시작일이 되어 과제 전형을 안내드리려고 해요. <br/><br/>
                    트리플X인터파크 합류 여정은 [서류 제출 > 과제 전형 > 원패스 면접 > 처우 협의 > 최종합격] 이에요. <br/>
                    좋은 결과 내셔서 꼭 면접에서 뵙길 바라요! <br/>
                  </p>
                  <p className={styles.sendDate}>- 오후 3시 20분</p>
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