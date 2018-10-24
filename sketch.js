var myPop;
var myCheer;
var analyzer;
var myMic;


var mic, recorder, soundFile;
var state = 0;




function preload(){
  // put preload code here
  myPop = loadSound("./assets/bip.wav");
  myCheer= loadSound("./assets/cheers.wav");
  myMic= loadImage("./assets/mic.png");
}


function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight);
  background (85, 221, 224);


  // create an audio in
  mic = new p5.AudioIn();

  // prompts user to enable their browser mic
  mic.start();

  // create a sound recorder
  recorder = new p5.SoundRecorder();

  // connect the mic to the recorder
  recorder.setInput(mic);

  // this sound file will be used to
  // playback & save the recording
  soundFile = new p5.SoundFile();

  analyzer= new p5.Amplitude();
  analyzer.setInput(soundFile);

  var volume = analyzer.getLevel();
  console.log(volume);
  volume = map(volume, 0, 1, 0.3, 0.8);

textFont("Calibri");
textSize(30);
fill("black");
push();
textAlign(CENTER);
translate(width/2, 0);
  text('click to record', 0, height-50);
  pop();

push();
soundFile.amp(0.5);
imageMode(CENTER);
translate(width/2, height/2);
scale(volume+0.4);
  image(myMic, 0, 0,);
  pop();
}


function mousePressed() {
  // make sure user enabled the mic
  analyzer= new p5.Amplitude();
  analyzer.setInput(soundFile);

  var volume = analyzer.getLevel();
  console.log(volume);
  volume = map(volume, 0, 1, 0.3, 0.8);

  if (state === 0 && mic.enabled) {

    // record to our p5.SoundFile
    recorder.record(soundFile);

    background(242, 100, 25);
    push();
    myPop.play();
    soundFile.amp(0.8);
    imageMode(CENTER);
    translate(width/2, height/2);
    scale(volume+0.6);
      image(myMic, 0, 0);
      pop();
      textFont("Calibri");
      textSize(30);
      fill("black");
      push();
      textAlign(CENTER);
      translate(width/2, 0);
        text('speak! click again to stop recording', 0, height-50);
        pop();
    state++;
  }
  else if (state === 1) {
    background(246, 174, 45);
    push();
    imageMode(CENTER);
    translate(width/2, height/2);
    scale(volume+0.4);
      image(myMic, 0, 0);
      pop();

    // stop recorder and
    // send result to soundFile
    recorder.stop();

    textFont("Calibri");
    textSize(30);
    fill("black");
    push();
    textAlign(CENTER);
    translate(width/2, 0);
      text('click to play and download your recording', 0, height-50);
      pop();
    state++;
  }

  else if (state === 2) {
    background(85, 221, 224);
    myCheer.play();
    push()
    imageMode(CENTER);
    translate(width/2, height/2);
    scale(volume+0.6);
      image(myMic, 0, 0);
      pop();
    soundFile.play(); // play the result!
    save(soundFile, 'mySound.wav');

    textFont("Calibri");
    textSize(30);
    fill("black");
    push();
    textAlign(CENTER);
    translate(width/2, 0);
      text('here you go, thanks for recording!', 0, height-50);
      pop();
    state++;
  }


}

function draw() {
  // put drawing code here

;

//  myPop.play();


  myPop.smooth(1);



  //var myRate = map(mouseY, 0, height, 0, 2)
myPop.rate(1);

//freq(40, [rampTime], [timeFromNow])
//fft = new p5.FFT(300, 300);
}
