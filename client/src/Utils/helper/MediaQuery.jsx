export const mediaIsMatch = (type, media) => {
  const query = `(${type}-width: ${media})`;
  return window.matchMedia(query).matches;
};
