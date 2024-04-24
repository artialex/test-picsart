import React, { useMemo } from 'react';
import { usePickerContext } from '../PickerProvider';
import { useCanvas } from '@/modules/hooks.ts';

import './ImageCanvas.css';

/** @see readme.md */
const SAFE_ZONE = 20;

export function ImageCanvas() {
  const { imageBitmap, setImageData, setPosition, currentColor, setSelectedColor } =
    usePickerContext();

  const canvas = useCanvas(
    (ctx, el) => {
      el.width = imageBitmap.width + SAFE_ZONE * 2;
      el.height = imageBitmap.height + SAFE_ZONE * 2;

      ctx.drawImage(imageBitmap, SAFE_ZONE, SAFE_ZONE, imageBitmap.width, imageBitmap.height);

      setImageData(ctx.getImageData(0, 0, imageBitmap.width, imageBitmap.height).data);
    },
    { willReadFrequently: true },
    [imageBitmap],
  );

  const rect = useMemo(() => {
    if (!canvas.ref.current) return null;

    return canvas.ref.current.getBoundingClientRect();
  }, [canvas]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!rect) return;

    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);

    setPosition({ x, y });
  };

  const handleClick = () => {
    setSelectedColor(currentColor);
  };

  return <canvas ref={canvas.ref} onMouseMove={handleMouseMove} onClick={handleClick} />;
}
