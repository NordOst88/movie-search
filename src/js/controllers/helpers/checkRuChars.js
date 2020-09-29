export default function checkRuChars(str) {
  const ruChars = /^[?!,.а-яА-ЯёЁ0-9\s]+$/i;
  if (ruChars.test(str)) {
    return true;
  }
  return false;
}
