const carCanvas = document.getElementById('carCanvas');
carCanvas.width = 200;
const networkCanvas = document.getElementById('networkCanvas');
networkCanvas.width = 300;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road = new Road(carCanvas.width/2, carCanvas.width*0.9)
// const car = new Car(road.getLaneCenter(1), 100, 30, 50, "AI");

const N = 1;
const cars = generateCars(N);
let bestCar = cars[0];
if(localStorage.getItem("bestBrain")) {
    for(let i=0; i<cars.length; i++) {
        cars[i].brain = JSON.parse(localStorage.getItem("bestBrain"));
        if(i!=0) {
            NeuralNetwork.mutate(cars[i].brain, 0.5);
        }
    }
}
// car.draw(ctx);

// const traffic = [
//     new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2, getRandomColor()),
//     new Car(road.getLaneCenter(0), -300, 30, 50, "DUMMY", 2, getRandomColor()),
//     new Car(road.getLaneCenter(2), -300, 30, 50, "DUMMY", 2, getRandomColor()),
//     new Car(road.getLaneCenter(0), -500, 30, 50, "DUMMY", 2, getRandomColor()),
//     new Car(road.getLaneCenter(2), -500, 30, 50, "DUMMY", 2, getRandomColor()),
//     new Car(road.getLaneCenter(1), -700, 30, 50, "DUMMY", 2, getRandomColor()),
//     new Car(road.getLaneCenter(2), -700, 30, 50, "DUMMY", 2, getRandomColor())
// ];
const traffic = [];
const laneCount = road.laneCount; // usually 3
let y = -100;

for (let i = 0; i < 60; i++) {
    const lane = Math.floor(Math.random() * laneCount); // randomly select lane 0, 1, or 2
    // const speed = 1.5 + Math.random(); // random speed between 1.5 and 2.5
    const speed = 1.5;
    traffic.push(
        new Car(
            road.getLaneCenter(lane),
            y,
            30,
            50,
            "DUMMY",
            speed,
            getRandomColor()
        )
    );
    y -= 150 + Math.floor(Math.random() * 150); // random vertical spacing
}


animate();

function save() {
    localStorage.setItem("bestBrain",
        JSON.stringify(bestCar.brain)
    );
}

function discard() {
    localStorage.removeItem("bestBrain");
}

function generateCars(N) {
    const cars = [];
    for(let i=1; i<=N; i++) {
        cars.push(new Car(road.getLaneCenter(1), 100, 30, 50, "AI"));
    }
    return cars;
}

function animate(time) {
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, []);
    }

    for (let i=0; i<cars.length; i++) {
        cars[i].update(road.borders, traffic);
    }

    bestCar = cars.find(
        c => c.y == Math.min(...cars.map(c => c.y))
    );
    // car.update(road.borders, traffic);
    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;

    carCtx.save();
    // carCtx.translate(0, -car.y + carCanvas.height * 0.7);
    // carCtx.translate(0, -cars[0].y + carCanvas.height * 0.7);
    carCtx.translate(0, -bestCar.y + carCanvas.height * 0.7);

    road.draw(carCtx);

    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(carCtx, "red");
    }

    carCtx.globalAlpha=0.2;

    for (let i=0; i<cars.length; i++) {
        cars[i].draw(carCtx, "blue");
    }

    carCtx.globalAlpha=1;
    // cars[0].draw(carCtx, "blue", true);
    bestCar.draw(carCtx, "blue", true);

    // car.draw(carCtx, "blue");
    carCtx.restore();

    networkCtx.lineDashOffset=-time/50;
    // Visualizer.drawNetwork(networkCtx, car.brain);
    // Visualizer.drawNetwork(networkCtx, cars[0].brain);
    Visualizer.drawNetwork(networkCtx, bestCar.brain);
    requestAnimationFrame(animate);
}


