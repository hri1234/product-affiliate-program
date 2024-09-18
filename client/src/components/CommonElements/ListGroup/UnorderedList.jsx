import ListItems from './ListItem';
import React from 'react';
import { ListGroup } from 'reactstrap';

const UL = (props) => {
  const { children = '' } = props;
  return <ListGroup {...props}>{props.listItem ? props.listItem.map((item, i) => <ListItems val={item} key={i} />) : children}</ListGroup>;
};

export default UL;
