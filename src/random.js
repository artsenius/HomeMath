export default function (n) {
  const digitsLetters = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
    'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
    's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
  ];
  let res = '';
  while (n > 0) {
    res += digitsLetters[Math.floor(Math.random() * 35)];
    n--;
  }
  return res;
};