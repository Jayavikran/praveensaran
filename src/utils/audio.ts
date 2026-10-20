/**
 * Web Audio API gentle Music Box / Celesta synthesizer for royalty-free baby lullaby.
 * Plays a soft, soothing lullaby melody loop with natural chime decays.
 */

class LullabyPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timeoutIds: number[] = [];
  private gainNode: GainNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.2, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a single soft music box chime with sine + harmonic overtone
  private playNote(freq: number, startTime: number, duration: number = 1.2) {
    if (!this.ctx || !this.gainNode) return;

    // Primary fundamental oscillator
    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    // Subtle harmonic overtone for music box bell warmth
    const overtone = this.ctx.createOscillator();
    const overtoneGain = this.ctx.createGain();
    overtone.type = 'triangle';
    overtone.frequency.setValueAtTime(freq * 2, startTime);

    // Envelope: quick attack, sparkling sustain, gentle exponential decay
    noteGain.gain.setValueAtTime(0.001, startTime);
    noteGain.gain.exponentialRampToValueAtTime(0.18, startTime + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    overtoneGain.gain.setValueAtTime(0.001, startTime);
    overtoneGain.gain.exponentialRampToValueAtTime(0.04, startTime + 0.02);
    overtoneGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration * 0.7);

    osc.connect(noteGain);
    overtone.connect(overtoneGain);
    noteGain.connect(this.gainNode);
    overtoneGain.connect(this.gainNode);

    osc.start(startTime);
    overtone.start(startTime);

    osc.stop(startTime + duration);
    overtone.stop(startTime + duration);
  }

  // Melodic notes in Hz (C5, D5, E5, F5, G5, A5, B5, C6)
  private readonly notes: Record<string, number> = {
    C5: 523.25,
    D5: 587.33,
    E5: 659.25,
    F5: 698.46,
    G5: 783.99,
    A5: 880.0,
    B5: 987.77,
    C6: 1046.5,
    G4: 392.0,
    A4: 440.0,
  };

  // Gentle classic Brahms / Twinkle lullaby sequence: [note, duration in seconds]
  private readonly melody: Array<[string, number]> = [
    // Phrase 1
    ['E5', 0.5], ['E5', 0.5], ['G5', 0.8],
    ['E5', 0.5], ['E5', 0.5], ['G5', 0.8],
    ['E5', 0.4], ['G5', 0.4], ['C6', 0.6], ['B5', 0.4], ['A5', 0.4], ['A5', 0.4], ['G5', 0.9],
    // Phrase 2
    ['D5', 0.5], ['E5', 0.4], ['F5', 0.6],
    ['D5', 0.5], ['E5', 0.4], ['F5', 0.6],
    ['D5', 0.4], ['F5', 0.4], ['B5', 0.5], ['A5', 0.4], ['G5', 0.4], ['B5', 0.4], ['C6', 1.0],
  ];

  public start() {
    this.initContext();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.scheduleLoop();
  }

  private scheduleLoop() {
    if (!this.isPlaying || !this.ctx) return;

    let timeOffset = this.ctx.currentTime + 0.1;
    for (const [note, dur] of this.melody) {
      const freq = this.notes[note] || 523.25;
      this.playNote(freq, timeOffset, dur * 2.2);
      timeOffset += dur;
    }

    // Schedule next cycle after melody completes
    const totalDurationMs = (timeOffset - this.ctx.currentTime + 1.2) * 1000;
    const tid = window.setTimeout(() => {
      if (this.isPlaying) {
        this.scheduleLoop();
      }
    }, totalDurationMs);
    this.timeoutIds.push(tid);
  }

  public stop() {
    this.isPlaying = false;
    this.timeoutIds.forEach((id) => clearTimeout(id));
    this.timeoutIds = [];
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const lullabyPlayer = new LullabyPlayer();
