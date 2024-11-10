import sharp from 'sharp'

export async function getAverageRGB(
  imageBuffer: Buffer,
): Promise<Uint8ClampedArray> {
  // Resize image to 1x1 to get average color
  const { data } = await sharp(imageBuffer)
    .resize(1, 1, { fit: 'cover' })
    .raw()
    .toBuffer({ resolveWithObject: true })

  // Convert to Uint8ClampedArray and return RGB values
  return new Uint8ClampedArray([data[0], data[1], data[2]])
}

export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')
}
