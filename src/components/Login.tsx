import React, { FunctionComponent, useEffect } from 'react';
import { useRouter } from 'next/router';
import me from '../user';

import { db } from '../firebase';
import {
  doc,
  setDoc,
} from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';

const Login: FunctionComponent = function () {
  const router = useRouter();
  const docRef = doc(db, "chat", me.email);
  const [value] = useDocument(docRef);

  /**
   * 회원 가입 이후 로직
   * TODO: firebase Login/Join
   */
  const addUser = async () => {
    const isUserExist = value?.data();

    if (!isUserExist) {
      await setDoc(doc(db, 'chat', me.email), { friends: [] });
    }
  };

  useEffect(() => {
    addUser();
    router.replace('/');
  }, []);

  return <div>로그인 페이지</div>;
}

export default Login;
