import React, { FunctionComponent } from 'react'

const ChatPage: FunctionComponent = function () {

  return (
    <>
      <Head>
        <title>Chat App</title>
        <meta content="Chat App" key="title" />
        <meta content="Chat App" key="description"/>
      </Head>
      <main>
        {/** @media 쿼리로 375px 보다 작을 경우 안보이게 하자. */}
        <SideChatBar />
        <Chatroom />
      </main>
    </>
  )
}

export default ChatPage;