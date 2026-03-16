let audioCtx: AudioContext | null = null;
let clickBuffer: AudioBuffer | null = null;
let loading = false;
let muted = false;

function ensureLoaded() {
  if (loading || clickBuffer) return;
  loading = true;
  fetch('/click.mp3')
    .then(res => res.arrayBuffer())
    .then(buf => {
      if (!audioCtx) audioCtx = new AudioContext();
      return audioCtx.decodeAudioData(buf);
    })
    .then(decoded => {
      clickBuffer = decoded;
    })
    .catch(() => {});
}

// Start preloading immediately
if (typeof window !== 'undefined') {
  ensureLoaded();
}

export function playClick() {
  if (muted) return;
  if (!audioCtx) audioCtx = new AudioContext();
  if (audioCtx.state === 'suspended') audioCtx.resume();

  if (!clickBuffer) {
    ensureLoaded();
    return;
  }

  const source = audioCtx.createBufferSource();
  source.buffer = clickBuffer;
  const gain = audioCtx.createGain();
  gain.gain.value = 0.5;
  source.connect(gain);
  gain.connect(audioCtx.destination);
  source.start(0);
}

export function setSoundMuted(val: boolean) {
  muted = val;
}

export function isSoundMuted() {
  return muted;
}
