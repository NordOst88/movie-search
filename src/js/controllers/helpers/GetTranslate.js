export default async function GetTranslate(str) {
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200510T210333Z.e52cd19249305324.c79471476cd6e852119012146dfc007d5927d44c&text=${str}&lang=ru-en`;
  const response = await fetch(url);
  const result = await response.json();
  return result.text[0];
}
