// Web Audio API Ambient Sound Synthesizer
let audioCtx: AudioContext | null = null;
let activeSourceNode: AudioNode | null = null;
let gainNode: GainNode | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playAmbientSound(type: 'rain' | 'forest' | 'cafe' | 'lofi' | 'off', volume: number = 0.3) {
  stopAmbientSound();

  if (type === 'off') return;

  try {
    const ctx = getAudioContext();
    gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(volume, ctx.currentTime);
    gainNode.connect(ctx.destination);

    // Create pink noise buffer
    const bufferSize = ctx.sampleRate * 3;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;
    noiseSource.loop = true;

    if (type === 'rain') {
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);
      noiseSource.connect(filter);
      filter.connect(gainNode);
    } else if (type === 'forest') {
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(500, ctx.currentTime);
      filter.Q.setValueAtTime(1.5, ctx.currentTime);
      noiseSource.connect(filter);
      filter.connect(gainNode);
    } else if (type === 'cafe') {
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, ctx.currentTime);
      noiseSource.connect(filter);
      filter.connect(gainNode);
    } else {
      // Lo-fi warm tone
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, ctx.currentTime);
      noiseSource.connect(filter);
      filter.connect(gainNode);
    }

    noiseSource.start(0);
    activeSourceNode = noiseSource;
  } catch (err) {
    console.warn('Audio playback error:', err);
  }
}

export function stopAmbientSound() {
  if (activeSourceNode) {
    try {
      (activeSourceNode as AudioBufferSourceNode).stop();
      activeSourceNode.disconnect();
    } catch {}
    activeSourceNode = null;
  }
}

export function setAmbientVolume(vol: number) {
  if (gainNode && audioCtx) {
    gainNode.gain.setValueAtTime(Math.max(0, Math.min(1, vol)), audioCtx.currentTime);
  }
}

export function playCompletionChime() {
  try {
    const ctx = getAudioContext();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);
      gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.12);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + idx * 0.12 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.12 + 0.8);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.12);
      osc.stop(ctx.currentTime + idx * 0.12 + 0.8);
    });
  } catch {}
}
