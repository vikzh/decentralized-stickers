import React from 'react';
import stickerexample from '../../../../assets/doge1.jpeg';
import '../../../../index.css';

const StickerItem = ({id, stikerInfo}) => {
  const address = "0xd3cb7cc59e586869a1cc648eb044682c0124bc6a";

  return (
  <div className="d-flex flex-column text-dark font-weight-bold">
    <div className="w-100 h-75">
      <img src={stikerInfo.imageUrl === '' ? 'https://bafybeihah5hxqcu6zu6rz32xodedefw3wx4pvuje2tbw4six3ajwy7e75e.ipfs.w3s.link/default.png' : stikerInfo.imageUrl} alt="news" className="mb-4" style={{width: "100%"}}/>
    </div>
    <h5>{`Sticker / NFT Id ${id}`}</h5>
    <div className="mb-1">
      {stikerInfo.description === '' ? '💩'  : stikerInfo.description}
    </div>
    <div>{`${address.slice(0, 8)}...${address.slice(-8)}`}</div>
    <div>        <button><a href="https://app.aragon.org/#/daos/polygon/0x16f9891b5f290cf1aacbdaea3c0c8328480201a6/governance/new-proposal">
      Create a Proposal
        </a></button></div>
  </div>
);
}
export default StickerItem;
