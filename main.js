status1 = "";
objects = [];
video = "";

function preload()
{
}

function setup()
{
    canvas = createCanvas(380 , 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function start()
{
    objectDetector =ml5.objectDetector("cocossd" , modelLoaded);
    document.getElementById("status").innerHTML= "Status : Object Detecting";
}

function draw() 
{
    image(video, 0, 0, 380, 380);
    if(status1 !="")
    {
        r=random(255);
        g=random(255);
        b=random(255);

        objectDetector.detect(video,gotResults);
        for (i=0; i<objects.length; i++)
        {
            document.getElementById("status").innerHTML= "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML= "Number Of Objects Detected are : "+ objects.length;
            fill(r,g,b);
            percent = floor(objects[i].confidence*100);
            console.log(percent);
            text(objects[i].label + " "+ percent +"%" , objects[i].x , objects[i].y );
            noFill();
            stroke(r,g,b);
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
        }
    }
  
}

function modelLoaded()
{
    console.log("modelLoaded");
    status1 = true;
    objectDetector.detect(video, gotResults);
}

function gotResults(error , result)
{
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log(result);
        objects = result;
    }
}