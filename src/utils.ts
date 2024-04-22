function componentToHex(c) {
  const hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

export function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export async function loadImage(url: string) {
  const response = await fetch(url);
  const blob = await response.blob();
  return createImageBitmap(blob);
}

export function scaleImageData(ctx, imageData, scale) {
  const scaled = ctx.createImageData(
    imageData.width * scale,
    imageData.height * scale
  );

  for (let row = 0; row < imageData.height; row++) {
    for (let col = 0; col < imageData.width; col++) {
      const sourcePixel = [
        imageData.data[(row * imageData.width + col) * 4 + 0],
        imageData.data[(row * imageData.width + col) * 4 + 1],
        imageData.data[(row * imageData.width + col) * 4 + 2],
        imageData.data[(row * imageData.width + col) * 4 + 3],
      ];
      for (let y = 0; y < scale; y++) {
        const destRow = row * scale + y;
        for (let x = 0; x < scale; x++) {
          const destCol = col * scale + x;
          for (let i = 0; i < 4; i++) {
            scaled.data[(destRow * scaled.width + destCol) * 4 + i] =
              sourcePixel[i];
          }
        }
      }
    }
  }

  return scaled;
}
