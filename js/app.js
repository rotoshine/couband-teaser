let player = null;
let playIndex = 0;
let muteStatus = false;

const videos = [
  {
    videoId: 'VWTDOfLntUg',
    name: 'Aze Taste - Overnight Sensation',
    startSeconds: 140,
    endSeconds: 150
  },
  {
    videoId: 'BKchHWSChm4',
    name: 'Rocket Express - 애정표현',
    startSeconds: 54,
    endSeconds: 65
  },
  {
    videoId: 'BIUtUwhh-AI',
    name: 'TTB - 60\'s cardin',
    startSeconds: 18,
    endSeconds: 28
  },
  {
    videoId: 'JBZevwaxKMk',
    name: 'TTB - 부비부비',
    startSeconds: 31,
    endSeconds: 39
  },
  {
    videoId: 'iUX8bfBH3-0',
    name: '삼거리 별다방 - 걱정말아요 그대',
    startSeconds: 36,
    endSeconds: 47
  },
  {
    videoId: 'HaIF75HTB8s',
    name: '6시 30분 - 여수 밤바다',
    startSeconds: 33,
    endSeconds: 43
  },
  {
    videoId: 'MeEYXyiFTbg',
    name: '6시 30분 - 봄봄봄',
    startSeconds: 14,
    endSeconds: 23
  },
  {
    videoId: '6MyIzcfcJzo',
    name: '어쿠스틱 밤 - 불장난',
    startSeconds: 120,
    endSeconds: 130
  },
  {
    videoId: 'fCXk90i4JUk',
    name: '어쿠스틱 밤 - 여우야',
    startSeconds: 48,
    endSeconds: 58
  },
  {
    videoId: 'nzMMyJeZxi8',
    name: '쿠뺀 - 하늘을 달리다',
    startSeconds: 119,
    endSeconds: 133
  }
];

// player load
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    width: '640',
    height: '480',
    playerVars: { 'controls': 0 },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onStatusChange
    }
  });
}

function onPlayerReady(event) {
  player.loadVideoById(videos[0]);
  $('#song-name').text(videos[0].name);
  playIndex = 0;
  player.setShuffle(true);
  player.playVideo();
  player.setLoop(true);

  // mobile
  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    player.playVideo();
    player.mute();
  }
}

function onStatusChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    playIndex = playIndex + 1;
    if (playIndex === videos.length) {
      playIndex = 0;
    }
    var nextVideo = videos[playIndex];
    player.cueVideoById(nextVideo);
    player.playVideo();
    $('#song-name').text(nextVideo.name);
  }
}

// event binding
$('#mute-button').on('click', function (e) {
  console.log(muteStatus);
  if (muteStatus) {
    muteStatus = false;
    player.unMute();
    $(e.target).find('i.fa')
      .removeClass('fa-volume-off')
      .addClass('fa-volume-up');

  } else {
    muteStatus = true;
    player.mute();
    $(e.target).find('i.fa')
      .removeClass('fa-volume-up')
      .addClass('fa-volume-off');
  }
});

$('#play-button').on('click', () => {
  player.playVideo();
});