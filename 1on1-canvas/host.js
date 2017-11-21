const [ $hostVideo ] = document.querySelectorAll('canvas');
const [ $guestVideo ] = document.querySelectorAll('video');
const [ $hostTextarea, $guestTextarea ] = document.querySelectorAll('textarea');
const [ $startCamera, $closeConnection, $createOffer, $setAnswer ] = document.querySelectorAll('button');



class Host {
  constructor() {
    this.stream = {
      host: null,
      guest: null,
    };
    this.peer = null;
  }

  startCamera() {
    new window.SimpleDrawingBoard($hostVideo);
    this.stream.host = $hostVideo.captureStream();
    $startCamera.disabled = true;
    $createOffer.disabled = false;
  }
  createOffer() {
    const peer = this.peer = new RTCPeerConnection({
      iceServers: [ { urls: 'stun:stun.skyway.io:3478' } ],
    });
//const peer = new Peer({key: '70be25d9-c5d6-4c97-a3b8-6ca8dea1287b', debug: true});
//peer.on('open', function(id){
//
//    // peerに接続時にランダムなidが生成される
//	 console.log('My peer ID is: ' + id);
//  });

		peer.addEventListener('negotiationneeded', () => {
      peer
        .createOffer()
        .then(sdp => peer.setLocalDescription(sdp));
    });

    peer.addEventListener('icecandidate', ev => {
      if (ev.candidate) {
        return;
      }

      const sdp = ev.currentTarget.localDescription.sdp;
      $hostTextarea.value = sdp;
    });

    peer.addEventListener('addstream', ev => {
      this.stream.guest = ev.stream;
      $guestVideo.srcObject = ev.stream;
    });

    peer.addStream(this.stream.host);

    $createOffer.disabled = true;
    $setAnswer.disabled = false;
  }

  setAnswer() {
    if ($guestTextarea.value.trim().length === 0) {
      console.warn('paste answer sdp.');
      return;
    }

    const sdp = new RTCSessionDescription({
      type: 'answer',
      sdp: $guestTextarea.value,
    });
    this.peer.setRemoteDescription(sdp);

    $setAnswer.disabled = true;
    $closeConnection.disabled = false;
  }

  closeConnection() {
    this.peer.getLocalStreams().forEach(_stopTracks);
    this.peer.getRemoteStreams().forEach(_stopTracks);
    this.peer.close();

    $startCamera.disabled = false;
    $closeConnection.disabled = true;

    function _stopTracks(stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  }
}

const host = new Host();
$startCamera.addEventListener('click', () => host.startCamera());
$createOffer.addEventListener('click', () => host.createOffer());
$setAnswer.addEventListener('click', () => host.setAnswer());
$closeConnection.addEventListener('click', () => host.closeConnection());
