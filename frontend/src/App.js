import React, { useRef } from 'react';
import { Container } from '@mui/material';
import TitleImage from './components/TitleImage';
import StickerPack from './components/StickerPack';
import Platforms from './components/Platforms';
import Header from './components/Header';

const App = () => {
  const stickerPacks = useRef();
  const features = useRef();

  const handleStickersClick = () => stickerPacks.current.scrollIntoView({ behavior: 'smooth' });
  const featuresStickersClick = () => features.current.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="d-flex flex-column w-100">
      <Container maxWidth="lg" className="d-flex flex-column align-items-center justify-content-center">
        <Header handleStickersClick={handleStickersClick} featuresStickersClick={featuresStickersClick} />
        <TitleImage />
        <Platforms />
        <StickerPack stickerPacks={stickerPacks} />
      </Container>
    </div>
  );
};

export default App;
