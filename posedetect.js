let video;
let poseNet;
let noseX = 0;
let noseY = 0;
let rX = 0;
let rY = 0;
let lX = 0;
let lY = 0;

function setup() {
  createCanvas(400, 400)
  video = createCapture(VIDEO)
  video.hide()
  poseNet = ml5.poseNet(video , modelReady);
  poseNet.on('pose' , poses_detect)
}

function poses_detect(poses){
	console.log(poses)
	if(poses.length > 0){
    //nose
	let nose_X = poses[0].pose.keypoints[0].position.x
	let nose_Y = poses[0].pose.keypoints[0].position.y
  noseX = lerp(noseX , nose_X , 0.5);
  noseY = lerp(noseY , nose_Y , 0.5);
    
    
    //righteye
  let nose_rX = poses[0].pose.keypoints[1].position.x
	let nose_rY = poses[0].pose.keypoints[1].position.y
  rX = lerp(rX , nose_rX , 0.5);
  rY = lerp(rY , nose_rY , 0.5);
	}
  
  //lefteye
  let nose_lX = poses[0].pose.keypoints[2].position.x
	let nose_lY = poses[0].pose.keypoints[2].position.y
  lX = lerp(lX , nose_lX , 0.5);
  lY = lerp(lY , nose_lY , 0.5);
}

function modelReady(){
	console.log('model is ready!')
}

function draw() {
  background(220)
  image(video,0,0)
  
  let d = dist(noseX , noseY , rX , rY)
  fill(255 , 0 , 0)
  ellipse(noseX , noseY ,50)
  
  fill(0 , 255 , 0)
  ellipse(rX , rY ,50)
  
  
  fill(0 , 255 , 0)
  ellipse(lX , lY ,50)
  
    stroke(153);
  line(noseX, noseY, rX, rY);
  line(noseX, noseY, lX, lY);
  line(rX, rY, lX, lY);
}

//lerp(val1 , val2 , num between 0 and 1)