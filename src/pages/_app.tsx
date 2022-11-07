import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';
import Login from 'components/Login';
import me from '../user';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />

  if (!me) {
    return <Login />
  }
}

export default MyApp
