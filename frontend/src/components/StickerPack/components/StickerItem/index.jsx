import React from 'react';
import stickerexample from '../../../../assets/doge1.jpeg';
import '../../../../index.css';

const StickerItem = ({ id, address = '0x4D8B52Ad33994A929EE2955a2BBb603eD222E3B9' }) => (
  <div className="d-flex flex-column text-dark font-weight-bold">
    <div className="w-100 h-75">
      <img src={stickerexample} alt="news" className="mb-4" style={{width: "100%"}}/>
    </div>
    <h5>{`NFT Id ${id}`}</h5>
    <div className="mb-1">
      🐶
    </div>
    <div>{`${address.slice(0, 8)}...${address.slice(-8)}`}</div>
  </div>
);

export default StickerItem;
