import React, { Fragment } from 'react';

const Ribbon = (props) => {
  const { children, ...res } = props;
  return (
    <Fragment>
      <div {...res}>{children}</div>
    </Fragment>
  );
};

export default Ribbon;
