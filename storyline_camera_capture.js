var storylinePlayer = GetPlayer();
var storylineVar = storylinePlayer.GetVar("personName");    

var target = document.getElementById('slide-window').childNodes[0];

    //Element where camera stream will be
    var vk = document.createElement('video');
    vk.setAttribute('id', 'player');
    vk.setAttribute('width', '50%');
    vk.setAttribute('controls', '');
    vk.setAttribute('autoplay', '');
    target.replaceChild(vk, target.childNodes[0]);

    //Button element to capture the still image
    var bk = document.createElement('button');
    bk.setAttribute('id', 'capture');
    bk.innerHTML = "Capture";
    target.appendChild(bk);

    //Element where the captured image will be
    var ck = document.createElement('canvas');
    ck.setAttribute('id', 'canvas');
    ck.setAttribute('width', '320');
    ck.setAttribute('height', '240');
    ck.innerHTML = '';
    target.appendChild(ck);

    var frm = document.createElement('div');
    frm.setAttribute('id', 'formPost');
    target.appendChild(frm);

    const player = document.getElementById('player');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const captureButton = document.getElementById('capture');

    const constraints = {
      video: true,
    };

  captureButton.addEventListener('click', () => {
      // Draw the video frame to the canvas.
      context.drawImage(player, 0, 0, canvas.width, canvas.height);
      
      //This is where the image will be saved in the cloud
      var request = new XMLHttpRequest();
      request.open("POST", "https://api.cloudinary.com/v1_1/*****YOUR LOCATION******/image/upload", true);
      var data = new FormData();
      data.append('upload_preset', '*****YOUR PASSWORD*****');
      data.append('file', canvas.toDataURL());
      data.append('public_id', storylineVar);
      request.send(data);
      console.log("image sent");

  });

  // Attach the video stream to the video element and autoplay.
  navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => {
      player.srcObject = stream;
    });