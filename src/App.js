import React, { useState } from 'react';
import Chat, { Bubble, useMessages } from '@chatui/core';
import '@chatui/core/dist/index.css';
import axios from 'axios';

const App = () => {
  const { messages, appendMsg, setTyping } = useMessages([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSend(type, val) {
    if (type === 'text' && val.trim()) {
      appendMsg({
        type: 'text',
        content: { text: val },
        position: 'right',
      });

      setTyping(true);
      setIsLoading(true);

      axios
        .post('https://137.74.193.119:5353/get_response', { userSpeech: val })
        .then((response) => {
          const aiResponse = response.data.response;

          appendMsg({
            type: 'text',
            content: { text: "OK"+aiResponse },
            position: 'left',
          });

          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  }

  function renderMessageContent(msg) {
    const { content } = msg;
    return <Bubble content={content.text} />;
  }

  return (
    <Chat
      navbar={{ title: 'Assistant' }}
      messages={messages}
      renderMessageContent={renderMessageContent}
      onSend={handleSend}
      placeholder="Type a message..."
      isLoading={isLoading}
    />
  );
};

export default App;
