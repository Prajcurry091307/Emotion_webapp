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
    var utterThis = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    synth.speak(utterThis);
}

function check()
{
    var img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, result)
{
    if(error)
    {
        console.error(error);
    }else{
        console.log(result);
        document.getElementById("result_emotion_name").innerHTML = result[0].label;
        document.getElementById("result_emotion_name2").innerHTML = result[1].label;
        prediction_1 = result[0].label;
        prediction_2 = result[1].label;
        speak();
        
        if(result[0].label=="Happy")
        {
            document.getElementById("update_emoji").innerHTML = "&#128522;";
            //document.getElementById("update_emoji").innerHTML = "Hi";
        }
        if(result[0].label=="Sad")
        {
            document.getElementById("update_emoji").innerHTML = "&#128532;";
        }
       /* if(result[0].label=="angry")
        {
            document.getElementById("update_emoji").innerHTML = "&#128548;";
      }   */
        if(result[1].label=="Happy")
        {
            document.getElementById("update_emoji2").innerHTML = "&#128522;";
        }
        if(result[1].label=="Sad")
        {
            document.getElementById("update_emoji2").innerHTML = "&#128532;";
        }
        /*if(result[1].label=="angry")
        {
            document.getElementById("update_emoji2").innerHTML = "&#128548;";
        }*/

    }
}
