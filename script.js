//www.html5e.org
//loadreport.wesleyhales.com
//phantomJS
//github.com/wesleyhales/loadreport
//accelerometer

function init() {
    window.addEventListener('devicemotion', deviceMotionHandler, false);
    window.addEventListener('deviceorientation', deviceOrientationTest, false);

}
function deviceOrientationTest(event) {
    window.removeEventListener('deviceorientation', deviceOrientationTest);
    if (event.beta != null && event.gamma != null) {
        window.addEventListener('deviceorientation', onDeviceOrientationChange, false);
        movementTimer = setInterval(onRenderUpdate, 10);
    }
}
function deviceMotionHandler(eventData) {
    var acceleration = eventData.accelerationIncludingGravity;

    var rawAcceleration = "[x " + Math.round(acceleration.x) + ", y " +
        Math.round(acceleration.y) + ", z " + Math.round(acceleration.z) + "]";

    updateLeft(acceleration.y);
    updateTop(acceleration.x);
}

function updateLeft(left) {
    var docX = document.getElementById("field").clientWidth;
    var currentX = parseInt(document.getElementById("ball").style.left);
    var ballW = parseInt(document.getElementById("ball").style.width);
    if (currentX + left < 0) {
        currentX = 0;
        left = 0;
    }
    if (currentX + left > docX - ballW) {
        currentX = docX - ballW;
        left = 0;
    }
    var posX = currentX + left;
    document.getElementById("ball").style.left = posX + "px";
}

function updateTop(top) {
    var docY = document.getElementById("field").clientHeight;
    var currentY = parseInt(document.getElementById("ball").style.top);
    var ballH = parseInt(document.getElementById("ball").style.height);
    if (currentY + top < 0) {
        currentY = 0;
        top = 0;
    }
    if (currentY + top > docY - ballH) {
        currentY = docY - ballH;
        top = 0;
    }
    var posY = currentY + top;
    document.getElementById("ball").style.top = posY + "px";
}