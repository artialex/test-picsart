import { usePickerContext } from '../PickerProvider.tsx';
import { PropsWithChildren } from 'react';

import './Toolbar.css';

interface ToolbarProps extends PropsWithChildren {
  tool: 'none' | 'dropper';
  setTool: (tool: 'none' | 'dropper') => void;
}

export function Toolbar({ tool, setTool, children }: ToolbarProps) {
  const { selectedColor } = usePickerContext();

  return (
    <div className="toolbar">
      <div className="toolbar-tools">
        <button
          className={`toolbar-btn ${tool === 'dropper' ? 'selected' : ''}`}
          onClick={() => {
            setTool(tool === 'dropper' ? 'none' : 'dropper');
          }}
        >
          Picker
        </button>
        <div>{selectedColor || 'not selected'}</div>
        <div
          className="toolbar-selected-color"
          style={{ backgroundColor: selectedColor || 'lightgray' }}
        />
      </div>

      <div className="toolbar-examples">{children}</div>
    </div>
  );
}
