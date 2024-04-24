import { createContext, PropsWithChildren, useContext, useState } from 'react';
interface Position {
  x: number;
  y: number;
}
interface PickerState {
  currentColor: string;
  setCurrentColor: (color: string) => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  imageBitmap: ImageBitmap;
  imageData: Uint8ClampedArray | null;
  setImageData: (data: Uint8ClampedArray) => void;
  position: Position;
  setPosition: (position: Position) => void;
}

const PickerContext = createContext<PickerState | null>(null);

interface PickerProviderProps extends PropsWithChildren {
  imageBitmap: ImageBitmap;
}

/**
 * @see readme.md for more information
 */
export function PickerProvider(props: PickerProviderProps) {
  const [currentColor, setCurrentColor] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [imageData, setImageData] = useState<Uint8ClampedArray | null>(null);

  return (
    <PickerContext.Provider
      value={{
        currentColor,
        setCurrentColor,
        selectedColor,
        setSelectedColor,
        imageBitmap: props.imageBitmap,
        imageData,
        setImageData,
        position,
        setPosition,
      }}
    >
      {props.children}
    </PickerContext.Provider>
  );
}

export function usePickerContext() {
  return useContext(PickerContext) as PickerState;
}
