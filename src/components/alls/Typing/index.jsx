import { useEffect, useState } from 'react';

const TypingIndicator = ({ isTyping, fullName,color="#3e9ff3" }) => {
  const [dots, setDots] = useState('...');

  useEffect(() => {
    if (isTyping) {
      const interval = setInterval(() => {
        setDots((dots) => (dots.length < 3 ? dots + '.' : '.'));
      }, 500);
      return () => clearInterval(interval);
    } else {
      setDots('...');
    }
  }, [isTyping]);

  return (
    <div
      style={{
        fontSize: '15px',
        color: color,
        textAlign: 'center',
        opacity: isTyping ? '100%' : '0',
      }}
    >
      {fullName} đang nhập<span>{dots}</span>
    </div>
  );
};

export default TypingIndicator;