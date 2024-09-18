import React from 'react';
import { Button } from 'reactstrap';

const Btn = (props) => {
  const { children = '' } = props;
  return <Button {...props}>{children}</Button>;
};

export default Btn;
