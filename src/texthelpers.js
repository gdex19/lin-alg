export const fracToString = (frac) => {
  if (typeof frac === "string") {
    return frac;
  }
	if (frac.denominator === 1 || frac.numerator === 0) {
		return frac.numerator.toString();
	}
	return "\\frac{" + frac.numerator + "}{" + frac.denominator + "}";
};


// Off stackexchange, credit to @InfiniteSet
export const convertToRoman = (num) => {
  var rnumerals = { 1 : 'I', 2 : 'II', 3 : 'III', 4 : 'IV', 5 : 'V', 6   : 'VI', 7 : 'VII', 
  8 : 'VIII', 9 : 'IX', 10 : 'X', 20 : 'XX', 30 : 'XXX', 40 : 'XL', 50 : 'L', 
  60 : 'LX', 70 : 'LXX', 80 : 'LXXX', 90 : 'XC', 100 : 'C', 200 : 'CC', 300 : 'CCC', 
  400 : 'CD', 500 : 'D', 600 : 'DC', 700 : 'DCC', 800 : 'DCCC', 900 : 'CM', 
  1000: 'M', 2000: 'MM', 3000: 'MMM'};

  var zeros, romNum;
  var arr = num.toString().split("");
  var romArr = [];
  for(var i=0; i < arr.length; i++){
    zeros = "0".repeat((arr.length - i - 1));
    arr[i] = arr[i].concat(zeros);
    romArr.push(rnumerals[(arr[i])]); 
  }
  romNum = romArr.join('');
  return romNum;
}