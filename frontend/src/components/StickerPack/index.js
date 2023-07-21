import React from 'react';
import { Grid, Paper } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';
import StickerItem from './components/StickerItem';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  fontFamily: 'Lucida Grande, Lucida Sans Unicode, Arial, Helvetica, Verdana, sans-serif',
  boxShadow: 'none',
}));

const StickerPack = ({ stickerPacks }) => (
  <div className="my-3 pack-wrapper my-5" ref={stickerPacks}>
    <h3 className="text-center mb-4">Sticker Pack</h3>
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }}>
      {Array.from(Array(12)).map((_, index) => (
        <Grid item xs={2} sm={4} md={4} key={[index]}>
          <Item>
            <StickerItem id={index + 1} />
          </Item>
        </Grid>
      ))}
    </Grid>
  </div>
);

export default StickerPack;
