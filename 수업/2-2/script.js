// // 1

// var arr = [2, 4, 5, 6, 7, 9, 12];

// var i = 0;

// while (i < arr.length) {
//   if (arr[i] % 2 == 1) {
//     console.log(arr[i]);
//   }
//   i++;
// }

// // 2
// while (true) {
//   var num = Number(prompt("1-9 사이의 정수를 입력하세요"));
//   if (num >= 1 && num <= 9) {
//     break;
//   }
// }
// for (var i = 1; i < 10; i++) {
//   console.log(`${num} * ${i} = ${num * i}`);
// }

// 3

// function double(num) {
//   return num * 2;
// }

// console.log(double(3));

var one, two, three;

one = 3;

two = 7;

three = 4;

if (two < one < three || three < one < two) {
  console.log("one");
} else if (one < two < three || three < two < one) {
  console.log("two");
} else {
  console.log("three");
}
