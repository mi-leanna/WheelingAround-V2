// ml5.js: Pose Classification
// The Coding Train / Daniel Shiffman
// Copied and slightly modified by Ben Kosa
// https://thecodingtrain.com/tracks/ml5js-beginners-guide/ml5/7-posenet/2-pose-classifier
// https://youtu.be/FYgYyq-xqAw

// All code: https://editor.p5js.org/Greatroot/sketches/9dpCW-nMR (from Ben and for CSE 493F FP, Wheeling Around)

// Separated into three sketches (these are from Coding Train)
// 1: Data Collection: https://editor.p5js.org/codingtrain/sketches/kTM0Gm-1q
// 2: Model Training: https://editor.p5js.org/codingtrain/sketches/-Ywq20rM9
// 3: Model Deployment: https://editor.p5js.org/codingtrain/sketches/c5sDNr8eM

let video;
let poseNet;
let pose;
let skeleton;

let brain;
let poseLabel = "";

let state = 'waiting';
let targetLabel;

// The keypoints we actually care about
// Any keypoints below the hip we don't care about
const first_keypoint_index = 5;
const last_keypoint_index = 10;

function keyPressed() {
  if (key == 't') {
    brain.normalizeData();
    brain.train({epochs: 50}, finished); 
  } else if (key == 's') {
    brain.saveData();
  } else {
    targetLabel = key;
    console.log(targetLabel);
    setTimeout(function() {
      console.log('collecting');
      state = 'collecting';
      setTimeout(function() {
        console.log('not collecting');
        state = 'waiting';
      }, 3000);
    }, 2000);
  }
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);

  let options = {
    inputs: 12,
    outputs: 4,
    task: 'classification',
    debug: true
  }
  brain = ml5.neuralNetwork(options);
  
  // LOAD PRETRAINED MODEL
  // Uncomment to train your own model!
  const modelInfo = {
    model: 'final_model/model.json',
    metadata: 'final_model/model_meta.json',
    weights: 'final_model/model.weights.bin',
  };
  brain.load(modelInfo, brainLoaded);

  // LOAD TRAINING DATA
  // brain.loadData('train_data/wheelchair_sitting_5pts_3classes.json', dataReady);
}

function brainLoaded() {
  console.log('pose classification ready!');
  classifyPose();
}

function classifyPose() {
  if (pose) {
    let inputs = [];
    // console.log("pose");
    // console.log(pose);
    // for (let i = 0; i <= pose.keypoints.length; i++) {
    for (let i = first_keypoint_index; i <= last_keypoint_index; i++) {
      // console.log(`pose.keypoints[${i}]: ${pose.keypoints[i]}`);
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      inputs.push(x);
      inputs.push(y);
    }
    brain.classify(inputs, gotResult);
  } else {
    setTimeout(classifyPose, 100);
  }
}

function gotResult(error, results) {  
  if (results[0].confidence > 0.75) {
    poseLabel = results[0].label.toUpperCase();
  }
  classifyPose();
}

function dataReady() {
  brain.normalizeData();
  brain.train({
    epochs: 50
  }, finished);
}

function finished() {
  console.log('model trained');
  brain.save();
  classifyPose();
}


function gotPoses(poses) {
  // console.log(poses); 
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
    // console.log("Pose:");
    // console.log(pose);
    // console.log("Skeleton:");
    // console.log(skeleton);
    if (state == 'collecting') {
      let inputs = [];
      for (let i = first_keypoint_index; i <= last_keypoint_index; i++) {
        let x = pose.keypoints[i].position.x;
        let y = pose.keypoints[i].position.y;
        inputs.push(x);
        inputs.push(y);
      }
      let target = [targetLabel];
      // console.log("inputs:");
      // console.log(inputs);
      // console.log("target:");
      // console.log(target);
      brain.addData(inputs, target);
    }
  }
}


function modelLoaded() {
  console.log('poseNet ready');
}

function draw() {
  push();
  translate(video.width, 0);
  scale(-1, 1);
  image(video, 0, 0, video.width, video.height);

  if (pose) {
    for (let i = 0; i < skeleton.length; i++) {
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      strokeWeight(2);
      stroke(0);

      line(a.position.x, a.position.y, b.position.x, b.position.y);
    }
    for (let i = first_keypoint_index; i <= last_keypoint_index; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      fill(0);
      stroke(255);
      ellipse(x, y, 16, 16);
    }
  }
  pop();

  fill(255, 0, 255);
  noStroke();
  textSize(512);
  textAlign(CENTER, CENTER);
  text(poseLabel, width / 2, height / 2);
}