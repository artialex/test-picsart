import { Stage, Layer, Image, Group, Circle, KonvaNodeEvents } from 'react-konva';
import image4000 from '../public/4000x4000.jpg';
import { useEffect, useState } from 'react';
import { loadImage } from './utils.ts';
import throttle from 'lodash.throttle';

console.log('KonvaApp :: 5', image4000);
const EXAMPLE_IMAGE = '4000x4000.jpg';

export function KonvaApp() {
  const [loaded, setLoaded] = useState<ImageBitmap>();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    loadImage(EXAMPLE_IMAGE).then((img) => {
      console.log('KonvaApp :: 14', img);

      setLoaded(img);
    });

    setLoaded;
  }, []);

  const handleMouseMove: KonvaNodeEvents['onMouseMove'] = throttle((evt) => {
    console.log(evt);
    setTimeout(() => {
      setPosition({
        x: evt.evt.x,
        y: evt.evt.y,
      });
    }, 0);
  });

  /*
  useEffect(() => {
    addEventListener('mousemove', (e) => {
      console.log('KonvaApp :: 37', e.x, e.y);
    });
  }, []);
*/

  if (!loaded) {
    return null;
  }

  return (
    <Stage width={4000} height={4000} onMouseMove={handleMouseMove}>
      <Layer>
        <Image image={loaded} />
      </Layer>
      <Layer>
        <Group>
          <Circle width={40} height={40} x={position.x} y={position.y} fill="white" />
        </Group>
      </Layer>
    </Stage>
  );
}
