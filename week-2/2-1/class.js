var one, two, three;

one = 3;
two = 2;
three = 7;

if ((two < one && one < three) || (three < one && one < two)) {
  console.log(one);
} else if ((one < two && two < three) || (three < two && two < one)) {
  console.log(two);
} else {
  console.log(three);
}
