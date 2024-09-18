import React from 'react';

const Footer = (props) => {
  const { children = '' } = props;
  return <footer {...props}> {children}</footer>;
};

export default Footer;
