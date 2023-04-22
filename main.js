song1 = "";
song2 = "";

function preload()
{
   song1 = loadSound("music.mp3");
   song2 = loadSound("music2.mp3");
}

rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
song_name = "";

function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}


function draw(){
    image(video,0,0,600,530);

    fill("#00ff00");
    stroke("#ff0000");

    song_name = song2.isPlaying();
    console.log(song_name);
    song_name1 = song1.isPlaying();
    console.log(song_name1);

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        song1.stop();
        if(song_name == false){
            song2.play();
        }
        else{
            console.log("Song Name: Peter Pan Song");
            document.getElementById("song_name_button").innerHTML = "Song Name: Peter Pan Song";
        }
    }
        if(scorerightWrist > 0.2){
            circle(rightWrist_x,rightWrist_y,20);
            song2.stop();
            if(song_name1 == false){
                song1.play();
            }
            else{
                console.log("Song Name: Harry Potter Theme Song");
                document.getElementById("song_name_button").innerHTML = "Song Name: Harry Potter Theme Song";
            }
    }
}

function modelLoaded(){
    console.log("poseNet Is Initialized");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log(scorerightWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}
