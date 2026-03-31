function convertToRoman(num) {
  if (!num) throw new TypeError("Вы ввели пустую строку");
  if (num < 1 || num > 3999) throw new TypeError("Число вне диапазона (1-3999)");
  if (!Number.isInteger(num)) throw new TypeError("Вы ввели не целое число");

  const romanMap = {
    M: 1000, CM: 900, D: 500, CD: 400,
    C: 100, XC: 90, L: 50, XL: 40,
    X: 10, IX: 9, V: 5, IV: 4, I: 1
  };
  
  let result = '';
  
  for (let key in romanMap) {
    while (num >= romanMap[key]) {
      result += key;
      num -= romanMap[key];
    }
  }

  return result;
}

try {
    console.log(convertToRoman(55));
} catch (error) {
    console.error(`${error.name}: ${error.message}`);
}
try {
    console.log(convertToRoman(""));
} catch (error) {
    console.error(`${error.name}: ${error.message}`);
}
try {
    console.log(convertToRoman("sss"));
} catch (error) {
    console.error(`${error.name}: ${error.message}`);
}
try {
    console.error(convertToRoman(3.6));
} catch (error) {
    console.error(`${error.name}: ${error.message}`);
}
