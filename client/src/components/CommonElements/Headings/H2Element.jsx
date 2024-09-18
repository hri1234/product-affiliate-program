import React from 'react';

const H2 = (props) => {
  const { children = '' } = props;
  return <h2 {...props}>{children}</h2>;
};

export default H2;
