import "./App.css";
import React, { useMemo, useState } from "react";
import { loadImage, rgbToHex } from "./utils.ts";
import { useCanvas } from "./use-canvas.ts";
import { Picker } from "./Picker.tsx";

// const EXAMPLE_IMAGE =
//   "1920x1080-4598441-beach-water-pier-tropical-sky-sea-clouds-island-palm-trees.jpg";

const EXAMPLE_IMAGE = "4000x4000.jpg";

const SAFE_ZONE = 5;
export const PIXEL_SIZE = 12;
export const PIXELS_AROUND = 8;

export default function App() {
  const [tool, setTool] = useState<"none" | "dropper">("none");

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [selectedColor, setSelectedColor] = useState<string>("");

  const main = useCanvas(
    (ctx, canvas) => {
      loadImage(EXAMPLE_IMAGE).then((img) => {
        canvas.width = img.width + SAFE_ZONE * 2;
        canvas.height = img.height + SAFE_ZONE * 2;

        ctx.drawImage(img, SAFE_ZONE, SAFE_ZONE, img.width, img.height);
      });
    },
    {
      willReadFrequently: false,
    }
  );

  const currentColor = useMemo(() => {
    if (!main.ctx) return "lightgray";

    const { data } = main.ctx.getImageData(position.x, position.y, 1, 1);

    return rgbToHex(data[0], data[1], data[2]).toUpperCase();
  }, [main, position]);

  const rect = useMemo(() => {
    if (!main.ref.current) return null;

    return main.ref.current.getBoundingClientRect();
  }, [main]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPosition({ x, y });
  };

  const handleClick = () => {
    setSelectedColor(currentColor || "lightgray");
  };

  return (
    <main className={tool}>
      <div className="toolbar">
        <button
          className="picker-btn"
          style={{
            backgroundColor: tool === "dropper" ? "lightblue" : "lightgray",
          }}
          onClick={() => {
            setTool((prev) => (prev === "dropper" ? "none" : "dropper"));
          }}
        >
          Picker
        </button>
        <div>{selectedColor}</div>
        <div
          style={{ backgroundColor: selectedColor, width: 100, height: 60 }}
        />
      </div>
      <div className="canvases">
        <canvas
          ref={main.ref}
          onMouseMove={handleMouseMove}
          onClick={handleClick}
        />
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
