let computerNum = 0;
let $playButton = document.getElementById("play-button");
let $userInput = document.getElementById("user-input");
let $resultArea = document.getElementById("result-area");
let $resetButton = document.getElementById("reset-button");
let $chanceArea = document.getElementById("chance-area");
let $hintButton = document.getElementById("hint-button");
let $hintArea = document.getElementById("hint-area");
let $imgItem = document.querySelector(".img-item");
let chances = 3;
let gameOver = 2;
let history = [];
let hintCheck = false;

$playButton.addEventListener("click", play);
$resetButton.addEventListener("click", reset);
$userInput.addEventListener("focus", function () {$userInput.value = "";});
$hintButton.addEventListener("click", function () {
  if (hintCheck === false) {
    hintCheck = true;
    $hintArea.style.display = "block";
    $hintButton.textContent = "정답 숨기기";
  } else {
    hintCheck = false;
    $hintArea.style.display = "none";
    $hintButton.textContent = "정답 보기";
  }
});

$chanceArea.textContent = `남은 기회 : ${chances}번`;

function pickRandomNum() {
  computerNum = Math.floor(Math.random() * 100 + 1);
  $hintArea.textContent = `정답 : ${computerNum}`;
}

function play() {
  let userValue = $userInput.value;

  if (userValue < 1 || userValue > 100) {
    alert("1 ~ 100 사이의 숫자만 입력할 수 있습니다.");
    return;
  }

  if (history.includes(userValue)) {
    alert("중복된 값은 입력할 수 없습니다.");
    return;
  }

  chances--;
  $chanceArea.textContent = `남은 기회 : ${chances}번`;

  if (userValue < computerNum) {
    $resultArea.textContent = "Up!!!";
    $imgItem.src = "images/img_4.gif";
  } else if (userValue > computerNum) {
    $resultArea.textContent = "DOWN!!!";
    $imgItem.src = "images/img_5.gif";
  } else {
    gameOver = 1;
    $resultArea.textContent = "정답!!!";
    $imgItem.src = "images/img_1.gif";
  }

  if (chances <= 0 || gameOver === 1) {
    $playButton.disabled = true;
    $playButton.style.color = "gray";
    if (gameOver !== 1) {
      gameOver = 0;
    }
  }

  if (gameOver === 0) {
    $resultArea.textContent = "게임오버";
    $imgItem.src = "images/img_3.gif";
  }

  history.push(userValue);
}

function reset() {
  $userInput.value = "";
  chances = 3;
  gameOver = 2;
  history = [];
  $chanceArea.textContent = `남은 기회 : ${chances}번`;
  $resultArea.textContent = "";
  $imgItem.src = "images/img_2.gif"
  $playButton.disabled = false;
  $playButton.style.color = "#ff1e9d";
  pickRandomNum();
}

pickRandomNum();