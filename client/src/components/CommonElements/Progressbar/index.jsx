import React from 'react';
import { Progress } from 'reactstrap';

const Progressbar = (props) => {
  const { children = '', ...res } = props;
  return <Progress {...res}>{children}</Progress>;
};

export default Progressbar;
