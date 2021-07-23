var calibrated = false;
var gc_started = false;
var hm_left = 0;
var hm_top = 0;
var hm_created = false;

window.onload = async function () {

    //////set callbacks for GazeCloudAPI/////////
    GazeCloudAPI.OnCalibrationComplete = function () {
        console.log('gaze Calibration Complete');
        calibrated = true;
    }
    GazeCloudAPI.OnCamDenied = function () { console.log('camera  access denied') }
    GazeCloudAPI.OnError = function (msg) { console.log('err: ' + msg) }
    GazeCloudAPI.UseClickRecalibration = true;
    GazeCloudAPI.OnResult = PlotGaze;

    setInnerText('log_div','start Hyewon')
}

async function changeGC() {
    // change to enabled
    if (document.getElementById("et2").checked) {
        document.getElementById("gazecloudopts").style.display = 'initial';
        gc_started = true;
        if (calibrated)
            document.getElementById("gaze").style.display = 'block';
            setInnerText('log_div','Check Ture')
    } else {
        document.getElementById("gazecloudopts").style.display = 'none';
        GazeCloudAPI.StopEyeTracking();
        gc_started = false;
        document.getElementById("gaze").style.display = 'none';
    }
}


function PlotGaze(GazeData) {
    /*
        GazeData.state // 0: valid gaze data; -1 : face tracking lost, 1 : gaze uncalibrated
        GazeData.docX // gaze x in document coordinates
        GazeData.docY // gaze y in document cordinates
        GazeData.time // timestamp
    */

    var docx = GazeData.docX;
    var docy = GazeData.docY;

    var gaze = document.getElementById("gaze");
    docx -= gaze.clientWidth / 2;
    docy -= gaze.clientHeight / 2;

    gaze.style.left = docx + "px";
    gaze.style.top = docy + "px";

    setInnerText('log_div',gaze.style.left)
    // setInnerText('log_div2',gaze.style.top)



    if (GazeData.state != 0) {
        if (gaze.style.display == 'block')
            gaze.style.display = 'none';
    }
    else {
        if (gaze.style.display == 'none')
            gaze.style.display = 'block';
    }
}


// Kalman Filter defaults to on. Can be toggled by user.
window.applyKalmanFilter = true;

// Set to true if you want to save the data even if you reload the page.
window.saveDataAcrossSessions = true;

// @string.Format("https://zoom.us/wc/{0}/join?prefer=0&un={1}", ViewBag.Id, System.Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes("Name Test")))

// div 내용 바꾸기
function setInnerText(id,log) {
    const element = document.getElementById(id);
    element.innerText 
      = log ;
  } 