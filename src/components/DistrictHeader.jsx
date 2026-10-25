import React from 'react';
import { EXACT_HEADER_IMAGE } from './logoData';

export const DistrictHeader = ({ className = "" }) => {
  return (
    <div
      className={className}
      style={{
        width: '100%',
        display: 'block',
        lineHeight: 0,
        margin: 0,
        padding: 0,
        userSelect: 'none',
        overflow: 'hidden'
      }}
    >
      <img
        src={EXACT_HEADER_IMAGE}
        alt="District Movies"
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          borderTopLeftRadius: '22px',
          borderTopRightRadius: '22px'
        }}
      />
    </div>
  );
};
