let x;
let y;
let size;
let angle;
let sides;
let colorIndex;
let shapeTimer;
let colorTimer;
let shapes;

function setup() {
  createCanvas(1450, 900, WEBGL);
  background(0);
  x = 0;
  y = 0;
  size = 50;
  angle = 0;
  sides = 3;
  colorIndex = 0;
  shapeTimer = 0;
  colorTimer = 0;
  shapes = [];
}

function draw() {
  background(0);
  stroke(100);
  noFill();

  // 삼각형에서 각을 추가하여 도형 그리기
  push();
  translate(x, y);
  rotateX(angle);
  rotateY(angle);
  beginShape();
  for (let i = 0; i < sides; i++) {
    let radius = size / 2;
    let vertexX = radius * cos((i * TWO_PI) / sides);
    let vertexY = radius * sin((i * TWO_PI) / sides);
    vertex(vertexX, vertexY);
  }
  endShape(CLOSE);
  pop();

  // 새로운 도형을 도형 배열에 추가
  if (millis() - shapeTimer >= 100) {
    shapeTimer = millis();
    shapes.push({
      x: x,
      y: y,
      size: size,
      angle: angle,
      sides: sides,
    });
    sides++;
    size += 8; // 도형의 크기 10px 증가
    let colors = ["rgba(15,15,15,0.1)", "rgba(212,159,132,0.1)", "#8E75920F"];
    fill(colors[colorIndex % 3]);
    colorIndex++;
  }

  // 기존 도형들 그리기
  for (let i = 0; i < shapes.length; i++) {
    let shape = shapes[i];
    push();
    translate(shape.x, shape.y);
    rotateX(shape.angle);
    rotateY(shape.angle);
    beginShape();
    for (let j = 0; j < shape.sides; j++) {
      let radius = shape.size / 2;
      let vertexX = radius * cos((j * TWO_PI) / shape.sides);
      let vertexY = radius * sin((j * TWO_PI) / shape.sides);
      vertex(vertexX, vertexY);
    }
    endShape(CLOSE);
    pop();
  }

  // 각이 3의 배수일 때마다 3초마다 색이 다른 모양으로 변화
  if (sides % 3 === 0 && millis() - colorTimer >= 10000) {
    colorTimer = millis();
    let colors = ["rgba(15,15,15,0.1)", "rgba(246,101,28,0.1)", "#8E75920F"];
    fill(colors[colorIndex % 2]);
    colorIndex++;
  }
  // 각이 50개가 넘으면 다시 삼각형으로 시작
  if (sides > 150) {
    sides = 3;
    shapes = [];
    size = 2; //도형의 크기 초기화
  }
  // 화면 경계를 벗어나지 않도록 위치 제한
  x = constrain(x, -width / 2, width / 2);
  y = constrain(y, -height / 2, height / 2);

  angle += 0.0091; // 도형 회전 속도 조절
}
