// src/components/WhatsAppChatButton.js
import React from 'react';
import './WhatsAppChatButton.scss'; // Import your SCSS file for styling

const WhatsAppChatButton = () => {
  const handleClick = () => {
    window.open('https://wa.me/9968940221?text=Hello!%20I%20need%20help', '_blank', 'noopener,noreferrer');
 // Open in a new tab
  };

  return (
    <div className="whatsapp-chat-button" onClick={handleClick}>
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png" 
        alt="WhatsApp"
      />
    </div>
  );
};

export default WhatsAppChatButton;
