import React, { useState } from 'react';
import NavButton from './components/NavButton';
import LongMenu from './components/Menu';
import { useWindowSize } from '../../hooks';
import '../../index.css';


const Header = ({ handleStickersClick, featuresStickersClick }) => {
  const [activeButton, setActiveButton] = useState('Home');
  const [width] = useWindowSize();


  return (
    <div className="header-wrapper d-flex justify-content-center">
      <div className="d-flex align-items-center justify-content-between buttons-wrapper">
        <div className="d-flex h-100">
          <NavButton text="Home" activeButton={activeButton} setActiveButton={setActiveButton} />
          <NavButton
            text="Sticker Packs"
            activeButton={activeButton}
            setActiveButton={setActiveButton}
            handleStickersClick={handleStickersClick}
          />
        </div>
        <LongMenu />
      </div>
    </div>
  );
};

export default Header;
