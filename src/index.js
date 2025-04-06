const data = {};
data.player1 = {};
data.player2 = {};

const content = {};
content.player1 = {};
content.player2 = {};

const playerFieldTemplate = document.getElementById("playerFieldTemplate");

document
  .getElementById("playerOneField")
  .appendChild(
    buildPlayerContent(content.player1, playerFieldTemplate, "player1")
  );

document
  .getElementById("playerTwoField")
  .appendChild(
    buildPlayerContent(content.player2, playerFieldTemplate, "player2")
  );

document.querySelector(".resetButton").addEventListener("click", () => {
  reset();
});

function buildPlayerContent(container, template, playerName) {
  let clone = template.content.cloneNode(true);

  container.name = clone.querySelector(".playerName");
  if (playerName == "player1")
    container.name.innerHTML = "Jose Raul Cardpablanca";
  if (playerName == "player2") container.name.innerHTML = "Anatoly Cardpov";

  container.blueBlock = buildBlock(clone, ".blueBlock", playerName, "blue");
  container.redBlock = buildBlock(clone, ".redBlock", playerName, "red");
  container.purpleBlock = buildBlock(
    clone,
    ".purpleBlock",
    playerName,
    "purple"
  );

  container.convertRedButton = clone.querySelector(".convertRed");
  container.convertPurpleButton = clone.querySelector(".convertPurple");
  container.drawButton = clone.querySelector(".drawButton");

  container.convertRedButton.addEventListener("click", () => {
    tryConvertRed(playerName);
  });

  container.convertPurpleButton.addEventListener("click", () => {
    tryConvertPurple(playerName);
  });

  container.drawButton.addEventListener("click", () => {
    draw(playerName);
  });

  return clone;
}

function buildBlock(node, blockClassName, playerName, resourceName) {
  let block = node.querySelector(blockClassName);

  let blockReferences = {};

  blockReferences.resourceText = block.querySelector(".resourceText");
  blockReferences.addButton = block.querySelector(".add");
  blockReferences.subtractButton = block.querySelector(".subtract");

  blockReferences.addButton.addEventListener("click", () => {
    changeValue(playerName, resourceName, 1);
  });

  blockReferences.subtractButton.addEventListener("click", () => {
    changeValue(playerName, resourceName, -1);
  });

  return blockReferences;
}

const initBlue = 5;
const initRed = 0;
const initPurple = 0;
const blueToRed = 4;
const blueToPurple = 8;
const redToPurple = 2;

function reset() {
  data.player1 = makePlayer();
  data.player2 = makePlayer();

  updateContent();
}

function makePlayer() {
  return { blue: initBlue, red: initRed, purple: initPurple };
}

function tryConvertRed(playerName) {
  let player = data[playerName];
  if (!canConvertRed(player)) return;

  player.blue -= blueToRed;
  player.red += 1;

  updateContent();

  return true;
}

function tryConvertPurple(playerName) {
  let player = data[playerName];
  if (!canConvertPurple(player)) return;

  player.blue -= blueToPurple;
  player.red -= redToPurple;
  player.purple += 1;

  updateContent();

  return true;
}

function canConvertRed(player) {
  if (player.blue < blueToRed) return false;

  return true;
}

function canConvertPurple(player) {
  if (player.blue < blueToPurple) return false;
  if (player.red < redToPurple) return false;

  return true;
}

function updateContent() {
  updatePlayer(data.player1, content.player1);
  updatePlayer(data.player2, content.player2);
}

function updatePlayer(player, playerUI) {
  updateBlock(player.blue, playerUI.blueBlock);
  updateBlock(player.red, playerUI.redBlock);
  updateBlock(player.purple, playerUI.purpleBlock);

  playerUI.convertRedButton.disabled = !canConvertRed(player);
  playerUI.convertPurpleButton.disabled = !canConvertPurple(player);
}

function updateBlock(resource, blockUI) {
  blockUI.resourceText.innerHTML = resource;

  blockUI.subtractButton.disabled = resource <= 0;
}

function changeValue(playerName, resourceName, amount) {
  data[playerName][resourceName] += amount;

  updateContent();
}

function draw(playerName) {
  changeValue(playerName, "blue", 5);
}

reset();
