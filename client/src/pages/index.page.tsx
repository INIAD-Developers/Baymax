import { SendOutlined } from '@ant-design/icons';
import { AutoComplete, Button } from 'antd';
import assert from 'assert';
import dotenv from 'dotenv';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { useSendMsg } from 'src/utils/sendMsg';
import { userAtom } from '../atoms/user';
dotenv.config();
//a

const Home = () => {
  const [user] = useAtom(userAtom);
  const [msg, setMsg] = useState('');
  const [roomId, setRoomId] = useState('');

  //ちょっといじれば声でる
  // const voice= (messages: MessageModel[]) => {
  //   const sortedMessages = messages.sort((a, b) => b.sent_at - a.sent_at);
  //   const latestMessage = sortedMessages.find((message) => message.sender_Id === 2);

  //   if (latestMessage) {
  //     const uttr = new SpeechSynthesisUtterance(latestMessage.content);
  //     window.speechSynthesis.speak(uttr);
  //   } else {
  //     console.log("最新の sender_Id が 2 のメッセージが見つかりませんでした。");
  //   }
  // };

  const sendMsg = useSendMsg();
  //メッセージ送信
  const sendMsgs = async () => {
    const SendMsg = await sendMsg(msg);
    assert(SendMsg, 'コメントなし');
    console.log(SendMsg);
  };

  const onMsg = (msg: string) => {
    setMsg(msg);
  };

  if (!user) return <Loading visible />;

  return (
    <>
      <BasicHeader user={user} />
      <AutoComplete
        style={{ width: '40%', height: '80%', position: 'fixed', top: '95%', right: '30%' }}
        onSearch={onMsg}
        placeholder="input her"
      />
      <Button
        icon={<SendOutlined />}
        style={{ position: 'fixed', top: '95%', right: '30%' }}
        type="primary"
        onClick={() => sendMsgs()}
      />
    </>
  );
};

export default Home;
