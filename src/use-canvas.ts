import { useEffect, useRef, useState } from 'react';

export function useCanvas(
  cb?: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void,
  options?: CanvasRenderingContext2DSettings,
) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();

  useEffect(() => {
    if (!ref.current) return;
    // const offscreen = ref.current.transferControlToOffscreen()
    const ctx = ref.current.getContext('2d', options)!;

    setCtx(ctx);
    cb?.(ctx, ref.current);
  }, []);

  return { ref, ctx };
}
