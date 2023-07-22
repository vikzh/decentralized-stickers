import React from 'react';
import '../../../../index.css';

const PlatformItem = ({ img, title }) => (
  <div className="d-flex flex-column align-items-center title-hover position position-relative">
    <div className="w-100 h-75">
      <img src={img} alt="news" className="w-100 my-3 img-card" />
    </div>
    <h6>
      {title}
    </h6>
  </div>
);

export default PlatformItem;
