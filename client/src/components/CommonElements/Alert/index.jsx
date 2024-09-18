/* eslint-disable quotes */
/* eslint-disable object-curly-spacing */
import Btn from '../Button';
import React from 'react';
import { Alert } from 'reactstrap';

const Alerts = (props) => {
  const { children = '', attrBtn = '', closeBtn = '', divCls = '', btnContent = '', ...res } = props;
  return (
    <Alert {...res}>
      {children}
      {closeBtn ? (
        <Btn {...attrBtn}>
          <span className={divCls} dangerouslySetInnerHTML={{ __html: btnContent }} />
        </Btn>
      ) : (
        ''
      )}
    </Alert>
  );
};

export default Alerts;
