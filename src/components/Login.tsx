import React, { FunctionComponent, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../firebase';
import { useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';

import styles from '../styles/login.module.css';

const Login: FunctionComponent = function () {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCreate, setIsCreate] = useState(false);
  const [
    createUserWithEmailAndPassword,
    createUser,
    createLoading,
    createError,
  ] = useCreateUserWithEmailAndPassword(auth);

  const [
    signInWithEmailAndPassword,
    signInUser,
    signInLoading,
    signInError,
  ] = useSignInWithEmailAndPassword(auth);

  if (createUser) {
    setIsCreate(true);
  }

  if (createError) {
    alert('회원가입 도중 오류가 발생했습니다.\n이메일을 확인해주세요.');
  }

  if (signInUser) {
    router.replace('/');
  }

  if (signInError) {
    alert('로그인 도중 오류가 발생했습니다.\n이메일 및 비밀번호를 확인해주세요.');
  }

  return (
    <div className={styles.container}>
      <h2>Chat App 🐳</h2>
      <input
        className={styles.input}
        type='email'
        value={email}
        placeholder='이메일을 입력하세요.'
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className={styles.input}
        type='password'
        value={password}
        placeholder='비밀번호를 입력하세요'
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className={styles.button}
        onClick={() => isCreate ?
          signInWithEmailAndPassword(email, password) : createUserWithEmailAndPassword(email, password)
        }
      >
        {isCreate ? '로그인' : '회원가입'}
      </button>
      <a
        className={styles.link}
        onClick={() => isCreate ?
          setIsCreate(false) : setIsCreate(true)
        }
      >
        {isCreate ? '먼저 회원 가입 하세요 :)' : '이미 가입된 회원이라면? 로그인 하기 :)'}
      </a>
    </div>
  );
}

export default Login;
