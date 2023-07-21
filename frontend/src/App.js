import React, { useRef } from 'react';
import { Container } from '@mui/material';
import TitleImage from './components/TitleImage';
import StickerPack from './components/StickerPack';

const App = () => {
  const stickerPacks = useRef();
  const features = useRef();

  const handleStickersClick = () => stickerPacks.current.scrollIntoView({ behavior: 'smooth' });
  const featuresStickersClick = () => features.current.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="d-flex flex-column w-100">
      <Container maxWidth="lg" className="d-flex flex-column align-items-center justify-content-center">
        <TitleImage />
        <StickerPack stickerPacks={stickerPacks} />
      </Container>
    </div>
  );
};

export default App;
