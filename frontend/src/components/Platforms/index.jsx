import React from 'react';
import { Box, Grid, Paper } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';
import PlatformItem from './components/PlatformItem';
import StikerPackImage from '../../assets/Stikers3.png';
import DaoImage from '../../assets/dao.png';
import Action from '../../assets/action.png';
import Schema from '../../assets/schema.png';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'start',
  color: '#0088cc',
  boxShadow: 'none',
  alignItems: 'end',
  fontFamily: 'Lucida Grande, Lucida Sans Unicode, Arial, Helvetica, Verdana, sans-serif',
  cursor: 'pointer',
}));

const platformsArray = [
  {
    img: StikerPackImage,
    title: (
      <div className="d-flex align-items-center justify-content-center">
        <span className="px-2">
          Stiker Pack managed by <strong>Community</strong>
        </span>
      </div>
    ),
  },
  {
    img: DaoImage,
    title: (
      <div className="d-flex align-items-center justify-content-center">
        <span className="px-2">
          <strong>ApeCoin</strong> based DAO
        </span>
      </div>
    ),
  },
  {
    img: Action,
    title: (
      <div className="d-flex align-items-center justify-content-center">
        <span className="px-2">
          Automatic update <strong>On-Chain</strong>
        </span>
      </div>
    ),
  },
  {
    img: Schema,
    title: (
      <div className="d-flex align-items-center justify-content-center">
        <span className="px-2">
          Automatic Update on <strong>Telegram</strong>
        </span>
      </div>
    ),
  },
];

const Platforms = () => (
  <Box sx={{ marginTop: '3%', width: '65%' }}>
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 5 }} sx={{ alignItems: 'end' }}>
      {platformsArray.map((elem, index) => (
        <Grid item xs={12} sm={6} md={6} key={[index]}>
          <Item>
            <PlatformItem img={elem.img} title={elem.title} />
          </Item>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default Platforms;
