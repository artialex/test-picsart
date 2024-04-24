import { usePickerContext } from '../PickerProvider.tsx';
import { fastGetImageData, rgbToHex, scaleImageData } from '@/modules/utils.ts';
import { useCanvas } from '@/modules/hooks.ts';

import './CircleCanvas.css';

const PIXEL_SIZE = 12;
const PIXELS_AROUND = 8;
const DIMENSIONS = PIXELS_AROUND * 2 + 1;
const SIZE = PIXEL_SIZE * DIMENSIONS;

export function CircleCanvas() {
  const { position, imageData, imageBitmap, currentColor, setCurrentColor } = usePickerContext();

  const canvas = useCanvas(
    (ctx) => {
      const data = fastGetImageData(
        position.x - PIXELS_AROUND,
        position.y - PIXELS_AROUND,
        imageData!,
        imageBitmap.width,
        DIMENSIONS,
        DIMENSIONS,
      );

      const scaled = scaleImageData(ctx, new ImageData(data, DIMENSIONS, DIMENSIONS), PIXEL_SIZE);

      ctx.putImageData(scaled, 0, 0);

      const pixel = fastGetImageData(
        //
        PIXELS_AROUND,
        PIXELS_AROUND,
        data,
        DIMENSIONS,
      );

      setCurrentColor(rgbToHex(pixel[0], pixel[1], pixel[2]));
    },
    {},
    [position],
  );

  return (
    <div
      className="circle"
      style={{
        width: SIZE,
        height: SIZE,
        borderColor: currentColor,
        transform: `translate(
          ${position.x - SIZE / 2}px,
          ${position.y - SIZE / 2}px
        )`,
      }}
    >
      <canvas className="circle-canvas" ref={canvas.ref} width={SIZE} height={SIZE} />
      <div
        className="circle-grid"
        style={{
          backgroundSize: `${PIXEL_SIZE}px ${PIXEL_SIZE}px`,
        }}
      >
        <span className="circle-color">{currentColor}</span>
      </div>
    </div>
  );
}
