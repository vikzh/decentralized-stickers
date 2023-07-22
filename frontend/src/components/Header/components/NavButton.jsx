import React, { useState } from 'react';
import '../../../index.css';

const NavButton = ({
  text, activeButton, setActiveButton, featuresStickersClick = false, handleStickersClick = false,
}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="mx-2 p-0 button-wrapper h-100 d-flex flex-column justify-content-between">
      <div className="d-flex justify-content-center button-height">
        <button
          onMouseMove={() => setIsActive(true)}
          onMouseLeave={() => setIsActive(false)}
          onClick={() => {
            if (text.startsWith('Sticker')) {
              handleStickersClick();
            }
            if (text.startsWith('Features')) {
              featuresStickersClick();
            }
            setActiveButton(text);
          }}
          type="button"
        >
          {text}
        </button>
      </div>
      <div className={`${isActive || activeButton === text ? 'divider-active' : ''} divider w-100`} />
    </div>
  );
};

export default NavButton;
