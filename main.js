video = "";
var status = '';
objects = [];

function preload() {
    video = createVideo('video.mp4');
}

function setup() { 
    canvas = createCanvas(300, 300); 
    canvas.center();   
    video.hide(); 

}



function draw() {
    image(video, 0, 0, 300, 300);

    if(status != "") {
        objectDetector.detect(video, gotResults);
        for(i=0; i < objects.length; i++) {

            document.getElementById("status").innerHTML = 'Status: Object Detected';
            document.getElementById('objectNo').innerHTML = "No. of Objects: " + objects.length

            fill("#000000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent +"%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#000000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].width);
            
        }
    }
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = 'Status: Detecting Objects';
}

function modelLoaded() {
    console.log('model loaded');
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);

}

function gotResults(error, results) {

    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        objects = results;
    }

}