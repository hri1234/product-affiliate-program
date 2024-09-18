import React from 'react';

const H6 = (props) => {
  const { children = '' } = props;
  return <h6 {...props}>{children}</h6>;
};

export default H6;
