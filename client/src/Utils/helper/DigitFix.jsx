export const DigitFix = (num) => {
  const formattedNumber = num.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  return formattedNumber;
};
