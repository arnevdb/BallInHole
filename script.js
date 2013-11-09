//www.html5e.org
//loadreport.wesleyhales.com
//phantomJS
//github.com/wesleyhales/loadreport
//accelerometer
var Timer;
var TotalSeconds;
var ticker;
var t;


function init() {
    CreateTimer("timer",0);
    window.addEventListener('devicemotion', deviceMotionHandler, false);
    window.addEventListener('deviceorientation', deviceOrientationTest, false);


}

function CreateTimer(IimerId,Time){
    Timer = document.getElementById(IimerId);
    TotalSeconds = Time;
    UpdateTimer()
    t = setTimeout("Tick()", 1000);
}

function Tick(){
    TotalSeconds +=1;
    UpdateTimer();
    t = setTimeout("Tick()",1000);
}

function UpdateTimer() {
    var Seconds = TotalSeconds;

    var Hours = Math.floor(Seconds / 3600);
    Seconds -= Hours * (3600);

    var Minutes = Math.floor(Seconds / 60);
    Seconds -= Minutes * (60);


    var TimeStr =  LeadingZero(Minutes) + ":" + LeadingZero(Seconds)


    Timer.innerHTML = TimeStr;
}

function LeadingZero(Time) {

    return (Time < 10) ? "0" + Time : + Time;

}

function deviceOrientationTest(event) {
    window.removeEventListener('deviceorientation', deviceOrientationTest);
    if (event.beta != null && event.gamma != null) {
        window.addEventListener('deviceorientation', onDeviceOrientationChange, false);
        movementTimer = setInterval(onRenderUpdate, 10);
    }
}

function onRenderUpdate(event) {
    var xDelta, yDelta;
    switch (window.orientation) {
        case 0: // portrait - normal
            xDelta = lastOrientation.gamma;
            yDelta = lastOrientation.beta;
            break;
        case 180: // portrait - upside down
            xDelta = lastOrientation.gamma * -1;
            yDelta = lastOrientation.beta * -1;
            break;
        case 90: // landscape - bottom right
            xDelta = lastOrientation.beta;
            yDelta = lastOrientation.gamma * -1;
            break;
        case -90: // landscape - bottom left
            xDelta = lastOrientation.beta * -1;
            yDelta = lastOrientation.gamma;
            break;
        default:
            xDelta = lastOrientation.gamma;
            yDelta = lastOrientation.beta;
    }
    moveBall(xDelta, yDelta);
}

function moveBall(xDelta, yDelta) {
    var ball = document.getElementById("ball");
    ball.top += xDelta;
    ball.left += yDelta;

}
function play(){
    t = setTimeout(Tick(),1000);
}

function pause(){
    clearTimeout(t);
}

function stop(){
    TotalSeconds = 0;
    clearTimeout(t);
}