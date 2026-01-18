import { useRef } from "react";

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export function useAudioEngine() {
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);

  // Sample playback state
  const bufferRef = useRef<AudioBuffer | null>(null);
  const baseFreqRef = useRef<number>(261.63); // Default to C4

  const ensure = async () => {
    if (ctxRef.current) return ctxRef.current;
    const Ctx = (window.AudioContext || (window as any).webkitAudioContext) as
      | typeof AudioContext
      | undefined;
    if (!Ctx) return null;
    const ctx = new Ctx();
    const master = ctx.createGain();
    master.gain.value = 0.25;
    master.connect(ctx.destination);
    ctxRef.current = ctx;
    masterRef.current = master;
    return ctx;
  };

  const setVolume = (v: number) => {
    const g = masterRef.current;
    if (!g) return;
    g.gain.value = clamp(v, 0, 1);
  };

  const load = async (url: string, baseFrequency: number = 261.63) => {
    const ctx = await ensure();
    if (!ctx) return;
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const decoded = await ctx.decodeAudioData(arrayBuffer);
      bufferRef.current = decoded;
      baseFreqRef.current = baseFrequency;
    } catch (e) {
      console.error("Failed to load audio sample:", e);
    }
  };

  const pluck = async (hz: number, velocity = 0.8, duration = 0.28) => {
    const ctx = await ensure();
    const master = masterRef.current;
    if (!ctx || !master) return;

    if (ctx.state === "suspended") {
      try {
        await ctx.resume();
      } catch {
        // ignore
      }
    }

    const now = ctx.currentTime;
    const g = ctx.createGain();
    g.connect(master);

    // 1. If sample loaded, play as sample
    if (bufferRef.current) {
      const source = ctx.createBufferSource();
      source.buffer = bufferRef.current;
      // Pitch shift: rate = target / base
      source.playbackRate.value = hz / baseFreqRef.current;

      // Velocity affects gain slightly
      g.gain.setValueAtTime(velocity * 0.8, now);
      // Gentle fade out at end of sample or duration
      // Duration of sample might be short, so we let it play or fade?
      // For piano, usually let it ring a bit?
      // We'll enforce a release envelope
      g.gain.linearRampToValueAtTime(velocity * 0.8, now + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, now + duration * 6); // Longer sustain for sample

      source.connect(g);
      source.start(now);
      source.stop(now + duration * 6.5);
      return;
    }

    // 2. Fallback: Synth
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(0.18 * velocity, now + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    const o1 = ctx.createOscillator();
    o1.type = "sine";
    o1.frequency.setValueAtTime(hz, now);

    const o2 = ctx.createOscillator();
    o2.type = "triangle";
    o2.frequency.setValueAtTime(hz * 2, now);

    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.setValueAtTime(3200, now);

    o1.connect(lp);
    o2.connect(lp);
    lp.connect(g);
    g.connect(master);

    o1.start(now);
    o2.start(now);
    o1.stop(now + duration);
    o2.stop(now + duration);
  };

  return { ensure, pluck, setVolume, load, ctxRef };
}
