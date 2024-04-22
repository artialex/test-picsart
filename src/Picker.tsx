import { useCanvas } from "./use-canvas.ts";
import { PIXEL_SIZE, PIXELS_AROUND } from "./App.tsx";
import React, { useEffect, useState } from "react";
import { scaleImageData } from "./utils.ts";

interface PickerProps {
  ctx: CanvasRenderingContext2D;
  size: number;
  currentColor: string;
  position: {
    x: number;
    y: number;
  };
}

export const Picker = React.memo(
  ({ ctx, size, position, currentColor = "lightgray" }: PickerProps) => {
    const picker = useCanvas(() => {}, {
      willReadFrequently: true,
    });

    useEffect(() => {
      if (!ctx || !picker.ctx) return;

      const imageData = ctx.getImageData(
        position.x - PIXELS_AROUND,
        position.y - PIXELS_AROUND,
        PIXELS_AROUND * 2 + 1,
        PIXELS_AROUND * 2 + 1
      );

      const scaled = scaleImageData(picker.ctx, imageData, PIXEL_SIZE);

      picker.ctx.putImageData(scaled, 0, 0);
    }, [position, picker]);

    return (
      <div
        className="picker"
        style={{
          width: size,
          height: size,
          borderColor: currentColor,
          transform: `
              translate(
                ${position.x - size / 2}px,
                ${position.y - size / 2}px)`,
        }}
      >
        <canvas
          className="picker-canvas"
          ref={picker.ref}
          width={size}
          height={size}
        />
        <div
          className="picker-grid"
          style={{
            backgroundSize: `${PIXEL_SIZE}px ${PIXEL_SIZE}px`,
            backgroundImage: `
                linear-gradient(to right, #396b8c 0, transparent 1px),
                linear-gradient(to bottom, #396b8c 0, transparent 1px)
            `,
          }}
        >
          <span className="picker-color">{currentColor}</span>
        </div>
      </div>
    );
  }
);
