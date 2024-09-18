import React from 'react';

const H3 = (props) => {
  const { children = '' } = props;
  return <h3 {...props}>{children}</h3>;
};

export default H3;
