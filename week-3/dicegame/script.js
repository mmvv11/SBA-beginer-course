var button = document.querySelectorAll("button")[0];

var num = 0;
var play1Number, play2Number;
var reset = false;

function rolling() {
  if (reset) {
    location.reload();
  }

  if (num > 1) {
    num = 0;
  }
  var randomNumber = Math.floor(Math.random() * 6) + 1; //1-6
  var randomImage = "images/" + randomNumber + ".png";
  var image = document.querySelectorAll("img")[num];
  image.setAttribute("src", randomImage);

  if (num === 0) {
    button.innerText = "플레이어-2 굴리기";
    play1Number = randomNumber;
  } else {
    button.innerText = "다시하기";
    reset = true;
    play2Number = randomNumber;
    result(play1Number, play2Number);
  }
  num++;
}

function result(num1, num2) {
  if (num1 > num2) {
    document.getElementById("result").innerHTML = "플레이어 1 승";
  } else if (num1 < num2) {
    document.getElementById("result").innerHTML = "플레이어 2 승";
  } else if (num1 == num2) {
    document.getElementById("result").innerHTML = "무승부";
  }
}

button.addEventListener("click", function () {
  rolling();
});
