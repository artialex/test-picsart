import { MouseEvent, useState } from 'react';

export function Test() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }

  // requestAnimationFrame((a) => {});

  return (
    <div
      style={{
        margin: 24,
        width: 4000,
        height: 4000,
        backgroundColor: 'pink',
      }}
      onMouseMove={handleMouseMove}
    >
      Cool
      {JSON.stringify(position)}
      <div
        style={{
          width: 20,
          height: 20,
          backgroundColor: 'lightcyan',
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      >
        Moving
      </div>
      <canvas width={4000} height={4000} />
    </div>
  );
}
