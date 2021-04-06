import React from 'react';
import Head from 'next/head';
import MainChat from '../components/MainChat';

export default function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>Fathur's Chat</title>
        <link rel="icon" href="/chat.png" />
      </Head>
      <MainChat />
    </React.Fragment>
  )
}
