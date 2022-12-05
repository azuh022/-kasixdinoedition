import {
    incrementCustomProperty,
    setCustomProperty,
    getCustomProperty,
} from "./updateCustomProperty.js"

const dinoElem = document.querySelector("[data-dino]")
const JUMP_SPEED = 0.45
const GRAVITY = 0.0015
const DINO_FRAME_COUNT = 2
const FRAME_TIME = 100

let isJumping
let dinoFrame
let currentFrameTime
let yVelocity
let bottom = dinoElem.offsetTop;
export function setupDino() {
    isJumping = false
    dinoFrame = 0
    currentFrameTime = 0
    yVelocity = 0
    setCustomProperty(dinoElem, "--bottom", bottom)
    document.removeEventListener("keydown", onJump)
    document.addEventListener("keydown", onJump)
}

export function updateDino(delta, speedScale) {
    handleRun(delta, speedScale)
}

export function getDinoRect() {
    return dinoElem.getBoundingClientRect()
}

export function setDinoLose() {
    dinoElem.src = "./dino0000.png"
}

function handleRun(delta, speedScale) {
    if (isJumping) {
        dinoElem.src = "./dino0000"
    }

    if (currentFrameTime >= FRAME_TIME) {
        dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT
        dinoElem.src = `./dino000${dinoFrame}.png`
        currentFrameTime -= FRAME_TIME
    }
    currentFrameTime += delta * speedScale
}

function jump() {
    if (dinoElem.classList != "jump") {
        dinoElem.classList.add("jump");

        setTimeout(function() {
            dinoElem.classList.remove("jump");
        }, 300);
    }
}

function onJump(e) {
    if (e.code !== "Space" || isJumping) return

    document.addEventListener("keydown", function(event) {
        jump();
    });
}