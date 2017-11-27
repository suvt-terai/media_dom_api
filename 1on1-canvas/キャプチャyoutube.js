var div_element = document.createElement("div");
    div_element.innerHTML = '<video></videop>';
    var parent_object = document.getElementById("text");
    parent_object.appendChild(div_element);



var div_element = document.createElement("div");
    div_element.innerHTML = '<video id="youtube" autoplay controls></videop>';
    var parent_object = document.getElementById("pla-shelf");
    parent_object.appendChild(div_element);
var mainVideo = document.getElementById('video-stream html5-main-video');
var subVideo=document.getElementById('youtube');
var stream = mainVideo.captureStream();
subVideo.srcObject = stream;

var div_element = document.createElement("div");
    div_element.innerHTML = '<video id="peer-video" autoplay controls></video><div><p>Your ID: <span id="my-id">...</span></p><p>Callee ID: <span id="peer-id">...</span></p></div><div><input type="text" placeholder="Call user id..." id="callee-id"><button class="pure-button pure-button-success" id="make-call">Call</button><button class="" id="end-call">End call</button></div>';
    var parent_object = document.getElementById("text");
    parent_object.appendChild(div_element);