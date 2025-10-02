// Get references to the car and game container elements
const car = document.getElementById('car');
const gameContainer = document.querySelector('.game-container');
const frontLeftWheel = document.getElementById('frontLeftWheel');
const frontRightWheel = document.getElementById('frontRightWheel');

// Define boundary constants
const containerWidth = gameContainer.offsetWidth;
const containerHeight = gameContainer.offsetHeight;
const carWidth = car.offsetWidth;
const carHeight = car.offsetHeight;

// Variables for car movement
let carX = car.offsetLeft;
let carY = car.offsetTop;
let carAngle = 90; // Start facing up
let speed = 0;
let acceleration = 0.2;
let friction = 0.05;
let maxSpeed = 5;
let turnSpeed = 3;

// Variable to keep track of pressed keys
let keysPressed = {};

// Function to move the car
function moveCar() {
    // Handle acceleration, braking, and friction
    if (keysPressed['w'] || keysPressed['ArrowUp']) {
        speed += acceleration;
    } else if (keysPressed['s'] || keysPressed['ArrowDown']) {
        speed -= acceleration; // Invert speed for backward movement
    } else {
        speed = Math.abs(speed) < friction ? 0 : speed - Math.sign(speed) * friction;
    }

    speed = Math.max(Math.min(speed, maxSpeed), -maxSpeed); // Prevent exceeding max speed

    // Handle turning
    if ((keysPressed['a'] || keysPressed['ArrowLeft']) && speed !== 0) {
        carAngle -= (speed >= 0) ? turnSpeed : -turnSpeed; // Invert turning direction for backward movement
    } else if ((keysPressed['d'] || keysPressed['ArrowRight']) && speed !== 0) {
        carAngle += (speed >= 0) ? turnSpeed : -turnSpeed; // Invert turning direction for backward movement
    }

    // Update car position
    const angleInRadians = carAngle * (Math.PI / 180);
    const speedX = Math.sin(angleInRadians) * speed;
    const speedY = Math.cos(angleInRadians) * speed;
    carX += speedX;
    carY -= speedY;

    // Check boundaries
    if (carX < 0) {
        carX = 0;
        speed = -speed / 2;
    }
    if (carX + carWidth > containerWidth) {
        carX = containerWidth - carWidth;
        speed = -speed / 2;
    }
    if (carY < 0) {
        carY = 0;
        speed = -speed / 2;
    }
    if (carY + carHeight > containerHeight) {
        carY = containerHeight - carHeight;
        speed = -speed / 2;
    }

    car.style.left = `${carX}px`;
    car.style.top = `${carY}px`;
    car.style.transform = `rotate(${carAngle}deg)`;

    // Update wheel rotation based on turning direction
    rotateWheels((keysPressed['a'] || keysPressed['ArrowLeft']) ? -30 : ((keysPressed['d'] || keysPressed['ArrowRight']) ? 30 : 0));

    // Call this function again on the next frame
    requestAnimationFrame(moveCar);
}

// Function to rotate front wheels
function rotateWheels(angle) {
    frontLeftWheel.style.transform = `rotate(${angle}deg)`;
    frontRightWheel.style.transform = `rotate(${angle}deg)`;
}

// Listen for keydown events
document.addEventListener('keydown', function(event) {
    keysPressed[event.key] = true;
});

// Listen for keyup events
document.addEventListener('keyup', function(event) {
    keysPressed[event.key] = false;
});

// Start the car movement loop
moveCar();
