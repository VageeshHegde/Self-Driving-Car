let controlMode = "AI"; // default
let cars = [];
let bestCar;

function stopAllSounds() {
    const allCars = [...cars || []]; // cars array from your simulation

    allCars.forEach(car => {
        if (car.startSound) {
            car.startSound.pause();
            car.startSound.currentTime = 0;
            car.hasPlayedStartSound = false;
        }
        if (car.crashSound) {
            car.crashSound.pause();
            car.crashSound.currentTime = 0;
            car.hasPlayedCrashSound = false;
        }
    });
}

document.getElementById("aiMode").addEventListener("click", () => {
    stopAllSounds();       
    controlMode = "AI";
    startSimulation();
});

document.getElementById("gameMode").addEventListener("click", () => {
    stopAllSounds();       
    controlMode = "KEYS";
    startSimulation();
});

const carCanvas = document.getElementById('carCanvas');
carCanvas.width = 200;
const networkCanvas = document.getElementById('networkCanvas');
networkCanvas.width = 300;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);
const N = 1;

const traffic = [];
const laneCount = road.laneCount;
let y = -100;

for (let i = 0; i < 60; i++) {
    const lane = Math.floor(Math.random() * laneCount);
    const speed = 1.5;
    traffic.push(
        new Car(road.getLaneCenter(lane), y, 30, 50, "DUMMY", speed, getRandomColor())
    );
    y -= 150 + Math.floor(Math.random() * 150);
}

function generateCars(N, mode) {
    const cars = [];
    for (let i = 1; i <= N; i++) {
        cars.push(new Car(road.getLaneCenter(1), 100, 30, 50, mode));
    }
    return cars;
}

function startSimulation() {
    cars = generateCars(N, controlMode);
    bestCar = cars[0];

    if (controlMode === "AI") {
        fetch("bestBrain.json")
            .then(res => res.json())
            .then(brain => {
                for (let i = 0; i < cars.length; i++) {
                    cars[i].brain = brain;
                    if (i != 0) {
                        NeuralNetwork.mutate(cars[i].brain, 0.5);
                    }
                }
            })
            .catch(error => {
                console.error("Failed to load bestBrain.json:", error);
            });
    }

    animate();
}

function animate(time) {
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, []);
    }

    for (let i = 0; i < cars.length; i++) {
        cars[i].update(road.borders, traffic);
    }

    bestCar = cars.find(c => c.y === Math.min(...cars.map(c => c.y)));

    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;

    carCtx.save();
    carCtx.translate(0, -bestCar.y + carCanvas.height * 0.7);
    road.draw(carCtx);

    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(carCtx, "red");
    }

    carCtx.globalAlpha = 0.2;
    for (let i = 0; i < cars.length; i++) {
        cars[i].draw(carCtx, "blue");
    }
    carCtx.globalAlpha = 1;
    bestCar.draw(carCtx, "blue", true);
    carCtx.restore();

    networkCtx.lineDashOffset = -time / 50;
    Visualizer.drawNetwork(networkCtx, bestCar.brain);
    requestAnimationFrame(animate);
}

// Initial load
startSimulation();
