import React, { useState } from 'react';
import { Card } from 'antd';
import ChatHeader from './chatHeader';
import ChatContent from './chatContent';
import ChatInput from './chatInput';
import ChatSidebar from './chatSidebar';
import dummyData from './dummyData';
import './chatWidget.css';

const ChatWidget = () => {
  const [visible, setVisible] = useState(false);
  const [activeOrder, setActiveOrder] = useState(dummyData[0]);
  const [currentUser, setCurrentUser] = useState('user1');

  const toggleDrawer = () => {
    setVisible(!visible);
  };

  const handleOrderClick = (order) => {
    setActiveOrder(order);
  };

  const sendMessage = (message) => {
    const newMessage = {
      sender: currentUser,
      message: message,
      timestamp: new Date().toISOString(),
    };
    const updatedMessages = [...activeOrder.messages, newMessage];
    const updatedOrder = { ...activeOrder, messages: updatedMessages };
    setActiveOrder(updatedOrder);
  };

  return (
    <div className="chat-widget-container">
      {visible ? (
        <Card className="chat-card">
          <ChatHeader toggleDrawer={toggleDrawer} orderName={activeOrder.orderName} />
          <div className="chat-main">
            <div className="chat-body">
              <ChatSidebar handleOrderClick={handleOrderClick} activeOrderId={activeOrder.orderId} />
              <div className="chat-content-container">
                <ChatContent messages={activeOrder.messages} />
              </div>
            </div>
            <ChatInput sender={currentUser} onSendMessage={sendMessage} />
          </div>
        </Card>
      ) : (
        <div className="chat-bar" onClick={toggleDrawer}>
          <span className="chat-bar-text">Messages</span>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
