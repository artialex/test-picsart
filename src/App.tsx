import './App.css';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { loadImage, rgbToHex, somehowProcessTheData } from './utils.ts';
import { useCanvas } from './use-canvas.ts';
import { Picker } from './Picker.tsx';
// import img4000 from '../public/4000x4000.jpg';

// const EXAMPLE_IMAGE = '1920x1080-4598441-beach-water-pier-tropical-sky-sea-clouds-island-palm-trees.jpg';

const EXAMPLE_IMAGE = '4000x4000.jpg';

const SAFE_ZONE = 5;
export const PIXEL_SIZE = 12;
export const PIXELS_AROUND = 8;

export default function App() {
  const [tool, setTool] = useState<'none' | 'dropper'>('none');

  const imageDataRef = useRef<ImageData>();
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const main = useCanvas(
    (ctx, canvas) => {
      loadImage(EXAMPLE_IMAGE).then((img) => {
        canvas.width = img.width + SAFE_ZONE * 2;
        canvas.height = img.height + SAFE_ZONE * 2;

        ctx.drawImage(img, SAFE_ZONE, SAFE_ZONE, img.width, img.height);

        imageDataRef.current = ctx.getImageData(0, 0, img.width, img.height);
      });
    },
    {
      alpha: false,
      willReadFrequently: true,
      desynchronized: true,
    },
  );

  const currentColor = useMemo(() => {
    if (!main.ctx || !imageDataRef.current) return 'lightgray';

    // const data = somehowProcessTheData(imageData, position.x, position.y, 1, 1);
    // console.log('App :: 45', data);

    // Usage of `getImageData` is very slow in Firefox
    const r = imageDataRef.current.data[position.y * 4000 * 4 + position.x * 4];
    const g = imageDataRef.current.data[position.y * 4000 * 4 + position.x * 4 + 1];
    const b = imageDataRef.current.data[position.y * 4000 * 4 + position.x * 4 + 2];
    return rgbToHex(r, g, b).toUpperCase();
    // return rgbToHex(data[0], data[1], data[2]).toUpperCase();
  }, [main, position]);

  const rect = useMemo(() => {
    if (!main.ref.current) return null;

    return main.ref.current.getBoundingClientRect();
  }, [main]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    console.log('App :: 54', x, y);

    setPosition({ x, y });
  };

  const handleClick = () => {
    setSelectedColor(currentColor || 'lightgray');
  };

  return (
    <main className={tool}>
      <div className="toolbar">
        <button
          className="picker-btn"
          style={{
            backgroundColor: tool === 'dropper' ? 'lightblue' : 'lightgray',
          }}
          onClick={() => {
            setTool((prev) => (prev === 'dropper' ? 'none' : 'dropper'));
          }}
        >
          Picker
        </button>
        {JSON.stringify(position)}
        <div>{selectedColor}</div>
        <div style={{ backgroundColor: selectedColor, width: 100, height: 60 }} />
      </div>
      <div className="canvases">
        <canvas ref={main.ref} onClick={handleClick} onMouseMove={handleMouseMove} />

        {main.ctx && (
          <Picker
            ctx={main.ctx}
            size={PIXEL_SIZE * (PIXELS_AROUND * 2 + 1)}
            position={position}
            currentColor={currentColor}
          />
        )}
      </div>
    </main>
  );
}
