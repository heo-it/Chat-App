import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';
import Login from 'components/Login';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

function MyApp({ Component, pageProps }: AppProps) {
  const [user, loading, error] = useAuthState(auth);

  if (!user) {
    return (
      <>
        <Head>
          <title>Chat App</title>
          <meta property='og:title' content='Chat App' key='title' />
          <meta property='og:description' content='Chat App' key='description'/>
          <meta content='Chat App' key='title' />
          <meta content='Chat App' key='description'/>
        </Head>
        <main>
          <Login />
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Chat App</title>
        <meta property='og:title' content='Chat App' key='title' />
        <meta property='og:description' content='Chat App' key='description'/>
        <meta content='Chat App' key='title' />
        <meta content='Chat App' key='description'/>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
