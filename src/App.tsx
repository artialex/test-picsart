import { useEffect, useState } from 'react';
import { loadImage } from '@/modules/utils.ts';
import { Toolbar, ImageCanvas, PickerProvider, CircleCanvas } from '@/modules/picker';

import './App.css';

const examples = ['1920x1080', '4000x4000'] as const;

export default function App() {
  const [example, setExample] = useState<(typeof examples)[number]>('4000x4000');
  const [tool, setTool] = useState<'none' | 'dropper'>('none');
  const [bitmap, setBitmap] = useState<ImageBitmap>();

  useEffect(() => {
    loadImage(`${example}.jpg`).then((img) => {
      setBitmap(img);
    });
  }, [example]);

  return (
    <main className={tool}>
      {bitmap && (
        <PickerProvider imageBitmap={bitmap}>
          <Toolbar tool={tool} setTool={setTool}>
            {examples.map((example) => (
              <button
                className="toolbar-example-btn"
                key={example}
                onClick={() => setExample(example)}
              >
                Load {example} image
              </button>
            ))}
          </Toolbar>
          <div className="app-canvases">
            <ImageCanvas />
            {tool === 'dropper' && <CircleCanvas />}
          </div>
        </PickerProvider>
      )}
    </main>
  );
}
