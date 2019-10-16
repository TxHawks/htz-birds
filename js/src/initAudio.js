let isAutoplayEnabled = false;
const audioEl = document.getElementById('audioEl');
const autoplayBtn = document.getElementById('autoplayBtn');
const autoplayIcon = document.getElementById('autoplayIcon');
const autoplayIsPlayingText = autoplayBtn.dataset.playingText;
const autoplayIsPausedText = autoplayBtn.dataset.pausedText;
const autoplayBtnText = document.getElementById('autoplayBtnText');
const playBtns = Array.from(document.getElementsByClassName('jsPlayBtn'));

const introAudio = audioEl.src;

const infosSentinal = new IntersectionObserver(onIntersect, {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
});

export default function initAudio() {

  autoplayInit();
  initPlayPauseBtns();
}

function autoplayInit() {
  // initialize autoplay button
  autoplayBtn.addEventListener('mousedown', (evt) => {
    if (isAutoplayEnabled) disableAutoplay();
    else enableAutoplay();
  });
}

function onIntersect(entries, observer) {
  entries.forEach(entry => {
    const { isIntersecting, intersectionRatio, target, } = entry;

    if (isAutoplayEnabled && intersectionRatio >= 0.5) {
      const btn = target.querySelector('.jsPlayBtn');
      if (!isPlaying(btn)) playSound(btn);
      infosSentinal.unobserve(target);
    }
  });
}

function initPlayPauseBtns() {
  playBtns.forEach(btn => {
    btn.addEventListener('mouseup', evt => {
      if (isPlaying(btn)) pauseSound(btn, { shouldDisableAutoplay: true, });
      else playSound(btn);
    });
  });
}



function playSound(btn) {
  const textEl = btn.closest('.jsBirdInfoStatus')
    .querySelector('.jsBirdInfoStatusText');
  const textContent = textEl.dataset.textPause;
  const src = getSrc(btn.dataset.audio);

  if (!audioEl.paused) audioEl.pause();

  audioEl.src = src;
  audioEl.play();
  audioEl.addEventListener('ended', handlePlaybackEnd);
  audioEl.addEventListener('pause', handlePlaybackEnd);
  btn.classList.add('isPauseBtn');
  textEl.textContent = textContent;

  function handlePlaybackEnd() {
    pauseSound(btn, { force: true, });
    audioEl.removeEventListener('ended', handlePlaybackEnd);
    audioEl.removeEventListener('pause', handlePlaybackEnd);
  }
}

function pauseSound(btn, { restoreAudio, shouldDisableAutoplay, force, } = {}) {
  if (!audioEl.paused || force) {
    const textEl = btn.closest('.jsBirdInfoStatus')
      .querySelector('.jsBirdInfoStatusText');

    const textContent = textEl.dataset.textPlay;
    // restore autoplay button to original state
    if (shouldDisableAutoplay) disableAutoplay({ restoreAudio, });
    else audioEl.pause();

    // Change button state
    btn.classList.remove('isPauseBtn');

    // Change text
    textEl.textContent = textContent;
  }
}

function disableAutoplay({ restoreAudio = true, } = {}) {
  isAutoplayEnabled = false;
  audioEl.autoplay = isAutoplayEnabled;
  autoplayIcon.classList.add('isPaused');
  autoplayBtnText.textContent = autoplayIsPausedText;
  if (restoreAudio) audioEl.src = introAudio;
  audioEl.pause();
  infosSentinal.disconnect();
  playBtns.forEach(btn => {
    pauseSound(btn, { shouldDisableAutoplay: false, force: true, });
  });
}

function enableAutoplay({ restoreAudio = true, } = {}) {
  isAutoplayEnabled = true;
  audioEl.autoplay = isAutoplayEnabled;
  autoplayIcon.classList.remove('isPaused');
  autoplayBtnText.textContent = autoplayIsPlayingText;
  if (restoreAudio) audioEl.src = introAudio;
  audioEl.play();

  const infos = Array.from(document.getElementsByClassName('jsBirdInfo'));
  // initialize play-by-viewport
  infos.forEach(info => { infosSentinal.observe(info); });

  if (typeof ga === 'function') ga('send', 'event', 'Interactive-birds', 'autoplay-sound');
}

function getSrc(filename) {
  return `./static/audio/${filename}.mp3`
}

function isPlaying(btn) {
  const nextAudioFile = btn.dataset.audio;
  const prevSrc = audioEl.src;
  const prevAudioFile = prevSrc.slice(prevSrc.lastIndexOf('/') + 1, -4);

  return !audioEl.paused && (prevAudioFile === nextAudioFile);
}
