import React, { FunctionComponent, MouseEvent } from 'react';
import styles from '../styles/chatListItem.module.css';
import { useRouter } from 'next/router';
import { BiUserCircle } from 'react-icons/bi';
import { ChatProps } from './SideChatBar';
import { ChatItem } from './Chatroom';
import { formattedDate } from 'util/getFormatted';

import { db } from '../firebase';
import {
  doc,
  collection,
  query,
  orderBy,
  DocumentData,
  where,
  getDocs,
  updateDoc
} from 'firebase/firestore';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

type ChatListItemProps = {
  chat: ChatProps
};

const ChatListItem: FunctionComponent<ChatListItemProps> = ({
  chat
}: ChatListItemProps) => {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  const q = query(collection(db, `chat/${chat.id}/message`), orderBy('createAt', 'desc'));
  const [snapshot] = useCollection(q);
  const chats = snapshot?.docs.map((doc: DocumentData) => doc.data());

  const setReadChat = async () => {
    const statusQuery = query(collection(db, `chat/${chat.id}/message`), where("status", "==", false));
    const statusSnapshot = await getDocs(statusQuery);
    const idList = statusSnapshot?.docs
      .filter((doc: DocumentData) => doc.data().sender != user?.email)
      .map((doc: DocumentData) => doc.id);

    for (let id of idList) {
      const statusRef = doc(db, `chat/${chat.id}/message`, id);

      try {
        await updateDoc(statusRef, { status: true });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleChatClick = (e: MouseEvent) => {
    e.preventDefault();
    setReadChat();
    router.push(`/chat/${chat.id}`);
  };

  const getSender = (friends: string[]) => (
    friends.find((friend: string) => friend !== user?.email)
  );

  const getUnReadCount = () => (
    chats && chats[0] &&
      chats[0]?.status === false && chats.filter((chat: ChatItem) => chat.sender != user?.email && chat.status === false).length
  );

  return (
    chats ?
      <a onClick={handleChatClick}>
        <div className={styles.container}>
            <BiUserCircle className={styles.image} size={50} width={50} height={50} />
            <div className={styles.textContainer}>
              <div className={styles.information}>
                <span className={`${styles.name} ${getUnReadCount() ? styles.unread : ''}`} dangerouslySetInnerHTML={{ __html: getSender(chat.friends) as string}} />
                { getUnReadCount() > 0 && <span>{`(${getUnReadCount()})`}</span> }
                { chats[0] && <span className={styles.date}>{`• ${formattedDate(chats[0]?.createAt)}`}</span> }
              </div>
              { chats[0] && <p className={styles.preview}>{chats[0]?.message}</p> }
            </div>
        </div>
      </a>
    : <></>
  )
}

export default ChatListItem;