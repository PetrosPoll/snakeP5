let numSegments = 10;
let direction = 'right';

const xStart = 0; //starting x coordinate for snake
const yStart = 250; //starting y coordinate for snake
const diff = 10;

let xCor = [];
let yCor = [];

let xFake1 = undefined;
let yFake1 = undefined;

let xFake2 = undefined;
let yFake2 = undefined;

let xFruit = 200;
let yFruit = 200;

let bgColor = 0;
let strWh = 10;
let fmrate = 15;

let scoreElem;
let bestScoreElem;
let bestScore1 = 0;


function setup() {
	
	scoreElem = createDiv('Score = 0');
	scoreElem.position(20, 40);

	bestScoreElem = createDiv('Best Score = 0');
	bestScoreElem.position(20, 20);
	
	scoreElem.style('color', 'white');
	bestScoreElem.style('color', 'white');
	createCanvas(500, 500);
	stroke(255);

	for (let i = 0; i < numSegments; i++) {
		xCor.push(xStart + i * diff);
		yCor.push(yStart);
	  }
	
	  var button = createButton("reset");
	  button.position(420, 460);
	  button.mousePressed(resetSketch);
}

function resetSketch(){
	
	scoreElem.html('Score = 0');
	direction = 'right';
	numSegments = 10;
	xCor = [];
	yCor = [];
	
	for (let i = 0; i < numSegments; i++) {
		xCor.push(xStart + i * diff);
		yCor.push(yStart);
	  }
	fmrate = 15;
	strWh = 10;

	xFake1 = undefined;
	yFake1 = undefined;
	xFake2 = undefined;
	Fake2 = undefined;

	xFruit = floor(random(10, (width - 100) / 10)) * 10;
	yFruit = floor(random(10, (height - 100) / 10)) * 10;
	  
	loop();
}


function draw() {
	frameRate(fmrate);
	strokeWeight(strWh);
	background(bgColor);

	for (let i = 0; i < numSegments - 1; i++) {
		line(xCor[i], yCor[i], xCor[i + 1], yCor[i + 1]);
	  }
	
	updateSnakeCoordinates();
	checkGameStatus();
	checkForFruit();
}


function updateSnakeCoordinates() {
	for (let i = 0; i < numSegments - 1; i++) {
	  xCor[i] = xCor[i + 1];
	  yCor[i] = yCor[i + 1];
	}
	switch (direction) {
	  case 'right':
		xCor[numSegments - 1] = xCor[numSegments - 2] + diff;
		yCor[numSegments - 1] = yCor[numSegments - 2];
		break;
	  case 'up':
		xCor[numSegments - 1] = xCor[numSegments - 2];
		yCor[numSegments - 1] = yCor[numSegments - 2] - diff;
		break;
	  case 'left':
		xCor[numSegments - 1] = xCor[numSegments - 2] - diff;
		yCor[numSegments - 1] = yCor[numSegments - 2];
		break;
	  case 'down':
		xCor[numSegments - 1] = xCor[numSegments - 2];
		yCor[numSegments - 1] = yCor[numSegments - 2] + diff;
		break;
	}
  }
  

  function checkGameStatus() {
	if (
	  xCor[xCor.length - 1] > width ||
	  xCor[xCor.length - 1] < 0 ||
	  yCor[yCor.length - 1] > height ||
	  yCor[yCor.length - 1] < 0 ||
	  checkSnakeCollision()
	) {
		noLoop();
		const scoreVal = parseInt(scoreElem.html().substring(8));
		scoreElem.html('Game ended! Your score was : ' + scoreVal);
		
		if(bestScore1 <= scoreVal){
		bestScore1 = scoreVal;
		bestScoreElem.html('Best Score = '+ bestScore1);
		}	
	}
  }
  

  function checkSnakeCollision() {
	const snakeHeadX = xCor[xCor.length - 1];
	const snakeHeadY = yCor[yCor.length - 1];
	for (let i = 0; i < xCor.length - 1; i++) {
	  if (xCor[i] === snakeHeadX && yCor[i] === snakeHeadY) {
		return true;
	  }
	}
  }

  
  function checkForFruit() {
	point(xFruit, yFruit);
	point(xFake1, yFake1);
	point(xFake2, yFake2);
	if (xCor[xCor.length - 1] === xFruit && yCor[yCor.length - 1] === yFruit) {
	  
		const prevScore = parseInt(scoreElem.html().substring(8));
	  scoreElem.html('Score = ' + (prevScore + 1));

	  xCor.unshift(xCor[0]);
	  yCor.unshift(yCor[0]);
	  numSegments++;

	  updateFruitCoordinates(prevScore);
	}
  }
  

  function updateFruitCoordinates(prevScore) {

	switch (strWh) {
		case 10:
		  if (prevScore == 2) {
			strWh--;			
		  }
		  break;
		case 9:
		if (prevScore == 4) {
			strWh--;
		  }
		  break;
		case 8:
		if (prevScore == 6) {
			strWh--;
		  }
		  break;
		case 7:
		if (prevScore == 8) {
			strWh--;
		  }
		  break;
		}

		if(prevScore > 7 && prevScore < 20){
			xFake1 = floor(random(10, (width - 100) / 10)) * 10;
			yFake1 = floor(random(10, (height - 100) / 10)) * 10;
			fmrate = 20;
		}else if (prevScore > 20){
			xFake2 = floor(random(10, (width - 100) / 10)) * 10;
			yFake2 = floor(random(10, (height - 100) / 10)) * 10;
			xFake1 = floor(random(10, (width - 100) / 10)) * 10;
			yFake1 = floor(random(10, (height - 100) / 10)) * 10;
			fmrate = 25;
		}
	
	xFruit = floor(random(10, (width - 100) / 10)) * 10;
	yFruit = floor(random(10, (height - 100) / 10)) * 10;
  }


  
  function keyPressed() {
	switch (keyCode) {
	  case 37:
		if (direction !== 'right') {
		  direction = 'left';
		}
		break;
	  case 39:
		if (direction !== 'left') {
		  direction = 'right';
		}
		break;
	  case 38:
		if (direction !== 'down') {
		  direction = 'up';
		}
		break;
	  case 40:
		if (direction !== 'up') {
		  direction = 'down';
		}
		break;
	}
  }
  