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
        <main>
          <Login />
        </main>
    );
  }

  return <Component {...pageProps} />
}

export default MyApp;
