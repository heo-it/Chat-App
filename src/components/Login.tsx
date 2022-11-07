import React, { FunctionComponent, useEffect } from 'react';
import { useRouter } from 'next/router';
import me from '../user';

import { db } from '../firebase';
import {
  collection,
  doc,
  getDocs,
  setDoc,
} from 'firebase/firestore/lite';

const Login: FunctionComponent = function () {
  const router = useRouter();
  /**
   * 회원 가입 이후 로직
   * TODO: firebase Login/Join
   */
   const addUser = async () => {
    const querySnapshot = await getDocs(collection(db, "chat"));
    const isUserExist =  querySnapshot.docs?.find(doc => doc.id === me.email);

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
