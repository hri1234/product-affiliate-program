export const lineClam = (num) => {
  const style = {
    display: '-webkit-box',
    WebkitLineClamp: num,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  };
  return style;
};
