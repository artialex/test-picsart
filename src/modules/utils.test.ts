import { describe, expect, it } from 'vitest';
import { rgbToHex, fastGetImageData } from './utils.ts';

describe('utils', () => {
  describe('rgbToHex', () => {
    it.each([
      [0, 0, 0, '#000000'],
      [255, 0, 0, '#ff0000'],
      [0, 255, 0, '#00ff00'],
      [0, 0, 255, '#0000ff'],
    ])('should convert rgb(%i, %i, %i) to %s', (r, g, b, hex) => {
      expect(rgbToHex(r, g, b)).toBe(hex);
    });
  });

  describe('fastGetImageData', () => {
    // prettier-ignore
    const data = new Uint8ClampedArray([
      0, 0, 0, 0,   1, 1, 1, 1,   1, 1, 1, 1,
      0, 0, 0, 0,   2, 2, 2, 2,   2, 2, 2, 2,
      0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0,
    ]);

    it.each([
      [0, 0, new Uint8ClampedArray([0, 0, 0, 0])],
      [1, 0, new Uint8ClampedArray([1, 1, 1, 1])],
      [1, 1, new Uint8ClampedArray([2, 2, 2, 2])],
    ])('should get a single pixel at %i:%i [when] no dimension provided', (x, y, expected) => {
      expect(fastGetImageData(x, y, data, 3)).toEqual(expected);
      expect(fastGetImageData(x, y, data, 3)).toEqual(expected);
      expect(fastGetImageData(x, y, data, 3)).toEqual(expected);
    });

    it.each([
      [0, 0, new Uint8ClampedArray([0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 2, 2, 2, 2])],
      [1, 0, new Uint8ClampedArray([1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2])],
      [1, 1, new Uint8ClampedArray([2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0])],
    ])('should get a 2x2 subset at i%:i% [when] dimension=2x2', (x, y, expected) => {
      expect(fastGetImageData(x, y, data, 3, 2, 2)).toEqual(expected);
    });
  });
});
