import React from 'react';

const BlockQuotes = (props) => {
  const { children = '' } = props;

  return <blockquote {...props}>{children}</blockquote>;
};

export default BlockQuotes;
