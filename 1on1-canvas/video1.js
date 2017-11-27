
var conn;
var peer = new Peer({key: '70be25d9-c5d6-4c97-a3b8-6ca8dea1287b', debug: true});

	peer.on('open', function(id){

		// peerに接続時にランダムなidが生成される
	 console.log('My peer ID is: ' + id);
		$('#my-id').text(id);
	});

		 //リモートから発信を受けたときの処理
		peer.on('call', function(call){
			// 自分のストリームを渡す
			call.answer(localStream);

			// リモートのビデオを表示
			showPeerVideo(call);
		});

		var localStream;
		var existingCall;

		$(function(){

			showMyVideo();

			$('#make-call').click(function(){

				var callee_id = $('#callee-id').val();

				//相手に自分のストリームを渡す
				var call = peer.call(callee_id, localStream);
				
				showPeerVideo(call);
			});

			$('#end-call').click(function(){
				existingCall.close();
			});

		});


		function showMyVideo () {

			// 音声・ビデオストリームを取得
				// コールバックにストリームが渡されるので、オブジェクトURLを生成し、
				// videoタグのsrcにセットする
			var myVideo = document.getElementById("my-video");
			localStream = myVideo.captureStream();
		}

		function showPeerVideo (call) {

			// 相手のストリームが渡されたときの処理
			call.on('stream', function(stream){
			// 映像ストリームオブジェクト stream をURL.createObjectURL を用い
			// URLに変換した後、video 要素の src 属性に指定することで、映像が表示される
			var peerVideo = document.getElementById("peer-video");
			peerVideo.srcObject = stream;
			});

			existingCall = call;

			$('#peer-id').text(call.peer);
		}