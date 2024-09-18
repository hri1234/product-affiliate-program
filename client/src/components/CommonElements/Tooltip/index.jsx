import React from 'react';
import { Tooltip } from 'reactstrap';

const ToolTip = (props) => {
  const { children = '', ...res } = props;
  return <Tooltip {...res}>{children}</Tooltip>;
};

export default ToolTip;
