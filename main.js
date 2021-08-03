Webcam.set({
    width:350,
    height:350,
    image_format:"png",
    png_quality:90
})

var camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'">'
    });
}

console.log('ml5 version', ml5.version);

var classifier = ml5.imageClassifier('https://storage.googleapis.com/tm-model/Zk5cwd585/model.json',modelLoaded);

function modelLoaded()
{
    console.log("Model Loaded");
}

function speak()
{
    var synth = window.speechSynthesis;
    var speak_data1 = "The first emoji prediction is" + prediction_1;
    var speak_data2 = "The second emoji prediction is" + prediction_2;
    var utterThis = new SpeechSynthesisisUtterance(speak_data1 + speak_data2);
    synth.speak(utterThis);
}